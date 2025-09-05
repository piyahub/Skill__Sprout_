
// new code for notifying the user for succesful login or registering 
const User = require('../models/User');
const generateOTP = require('../utils/otpGenerator');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, mobile, course, year, rollNumber, address, password } = req.body;
  const image = req.imageUrl || null; // Use imageUrl from middleware

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    user = new User({
      name,
      email,
      mobile,
      course,
      year,
      rollNumber,
      address,
      image,
      password,
      otp,
      otpExpires,
    });

    await user.save();

    // Send OTP email
    const otpSubject = 'Verify Your Email with OTP';
    const otpText = `Your OTP for email verification is ${otp}. It is valid for 10 minutes.`;
    const otpHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f7fa; padding: 20px;">
        <div style="background: linear-gradient(135deg, #007bff, #00d4ff); border-radius: 8px 8px 0 0; padding: 20px; text-align: center;">
          <img src="https://res.cloudinary.com/dgtyqhtor/image/upload/v1753158073/logo_ozh2lv.png" alt="[Your App Name] Logo" style="max-width: 150px; margin-bottom: 10px; display: block; margin-left: auto; margin-right: auto;" />
          <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Welcome to AI CAREER COACH</h1>
        </div>
        <div style="background-color: #ffffff; border-radius: 0 0 8px 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #333; font-size: 20px; text-align: center; margin-bottom: 20px;">Verify Your Email Address</h2>
          <p style="color: #555; font-size: 16px; text-align: center; margin-bottom: 20px;">Thank you for signing up! Please use the OTP below to verify your email address.</p>
          <div style="text-align: center; margin: 20px 0;">
            <span role="text" aria-label="Your OTP is ${otp}" style="display: inline-block; background-color: #007bff; color: #ffffff; font-size: 28px; font-weight: bold; padding: 15px 25px; border-radius: 8px; letter-spacing: 3px; transition: transform 0.2s ease-in-out;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">${otp}</span>
          </div>
          <p style="color: #555; font-size: 14px; text-align: center; margin-bottom: 20px;">This OTP is valid for 10 minutes. Enter it in the verification form to complete your registration.</p>
          <h3 style="color: #333; font-size: 16px; margin-bottom: 10px;">Steps to Verify:</h3>
          <ol style="color: #555; font-size: 14px; padding-left: 20px; margin-bottom: 20px;">
            <li>Copy the OTP above.</li>
            <li>Go to the verification page in AI CAREER COACH.</li>
            <li>Paste the OTP and submit to verify your email.</li>
          </ol>
          <p style="color: #888; font-size: 12px; text-align: center;">If you didn’t request this email, please ignore it or contact our support team at <a href="mailto:ag0567688@gmail.com" style="color: #007bff; text-decoration: none;">ag0567688@gmail.com</a>.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #888; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} AI CAREER COACH. All rights reserved.</p>
        </div>
        <style>
          @media only screen and (max-width: 600px) {
            .container { padding: 10px; }
            h1 { font-size: 20px; }
            h2 { font-size: 18px; }
            .otp { font-size: 24px; padding: 10px 15px; }
            .verify-button { font-size: 14px; padding: 8px 16px; }
          }
        </style>
      </div>
    `;

    const otpEmailSent = await sendEmail(email, otpSubject, otpText, otpHtml);

    if (!otpEmailSent) {
      return res.status(500).json({ message: 'Failed to send OTP' });
    }

    // Send welcome email
    const welcomeSubject = 'Welcome to AI CAREER COACH';
    const welcomeText = `Hello ${name},\n\nThank you for registering with AI CAREER COACH. Your account has been successfully created. Please verify your email address using the OTP sent in a separate email to start using your account.\n\nBest regards,\nThe AI CAREER COACH Team`;
    const welcomeHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f7fa; padding: 20px;">
        <div style="background: linear-gradient(135deg, #007bff, #00d4ff); border-radius: 8px 8px 0 0; padding: 20px; text-align: center;">
          <img src="https://res.cloudinary.com/dgtyqhtor/image/upload/v1753158073/logo_ozh2lv.png" alt="AI CAREER COACH" style="max-width: 150px; margin-bottom: 10px; display: block; margin-left: auto; margin-right: auto;" />
          <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Welcome, ${name}!</h1>
        </div>
        <div style="background-color: #ffffff; border-radius: 0 0 8px 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #333; font-size: 20px; text-align: center; margin-bottom: 20px;">Registration Successful!</h2>
          <p style="color: #555; font-size: 16px; text-align: center; margin-bottom: 20px;">We’re thrilled to have you with AI CAREER COACH! Your account has been successfully created.</p>
          <p style="color: #555; font-size: 14px; text-align: center; margin-bottom: 20px;">Please check your inbox (or spam/junk folder) for the OTP email to verify your email address. It’s valid for 10 minutes.</p>
          <h3 style="color: #333; font-size: 16px; margin-bottom: 10px;">What’s Next?</h3>
          <ul style="color: #555; font-size: 14px; padding-left: 20px; margin-bottom: 20px;">
            <li>Verify your email to unlock full access to AI CAREER COACH.</li>
            <li>Explore our features and start your journey!</li>
            <li>Contact us at <a href="mailto:ag0567688@gmail.com" style="color: #007bff; text-decoration: none;">ag0567688@gmail.com</a> for any assistance.</li>
          </ul>
          <p style="color: #888; font-size: 12px; text-align: center;">If you didn’t sign up for AI CAREER COACH, please ignore this email or reach out to our support team.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #888; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} AI CAREER COACH. All rights reserved.</p>
        </div>
        <style>
          @media only screen and (max-width: 600px) {
            .container { padding: 10px; }
            h1 { font-size: 20px; }
            h2 { font-size: 18px; }
            .verify-button { font-size: 14px; padding: 8px 16px; }
          }
        </style>
      </div>
    `;

    // Send welcome email (non-blocking, doesn't affect registration response)
    await sendEmail(email, welcomeSubject, welcomeText, welcomeHtml).catch((error) => {
      console.error(`Failed to send welcome email to ${email}:`, error);
    });

    res.status(201).json({ message: 'Registration successful, OTP sent to email' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isEmailVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully, please login' });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.isEmailVerified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -otp -otpExpires');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, verifyOTP, login, getUser };