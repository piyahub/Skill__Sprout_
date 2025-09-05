const { GoogleGenerativeAI } = require('@google/generative-ai');
const Email = require('../models/Email');
const emailPrompt = require('../utils/emailPrompt');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

exports.generateEmail = async (req, res) => {
  // console.log('Received request to /api/emails/generate:', { body: req.body, user: req.user });

  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error('Missing GEMINI_API_KEY in environment variables');
      return res.status(500).json({ message: 'Server configuration error: Missing API key' });
    }

    if (!req.user || !req.user.id) {
      console.error('Invalid or missing user authentication:', req.user);
      return res.status(401).json({ message: 'Unauthorized: Invalid or missing token' });
    }

    const {
      name, githubUrl, linkedinUrl, mobileNumber, emailId, jobRole, companyName,
      category, experience, jobDescription, tone, length, skills
    } = req.body;
    const userId = req.user.id;

    if (!name || !emailId || !jobRole || !companyName || !category || !tone || !length) {
      // console.log('Missing required fields:', req.body);
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const prompt = emailPrompt({
      name, githubUrl, linkedinUrl, mobileNumber, emailId, jobRole, companyName,
      category, experience, jobDescription, tone, length, skills
    });

    // console.log('Generated Prompt:', prompt);

    let result;
    try {
      result = await model.generateContent(prompt);
      // console.log('Gemini API call successful');
    } catch (error) {
      console.error('Gemini API call failed:', error.message, error.stack);
      return res.status(500).json({ message: 'Failed to generate content from AI' });
    }

    let responseText = result.response.text().trim();
    // console.log('Raw Gemini Response:', responseText);

    responseText = responseText.replace(/^```json\n|\n```$/g, '');
    // console.log('Cleaned Gemini Response:', responseText);

    let emailContent, subject;
    try {
      let parsed;
      try {
        parsed = JSON.parse(responseText);
        // console.log('Parsed JSON:', parsed);
        subject = parsed.subject && typeof parsed.subject === 'string'
          ? parsed.subject
          : `Application for ${jobRole} at ${companyName}`;
        emailContent = parsed.email && typeof parsed.email === 'string'
          ? parsed.email
          : `**Dear Hiring Manager,**\n\nI am writing to express my interest in the ${jobRole} position at ${companyName}. With ${experience} years of experience, I am confident in my ability to contribute to your team.\n\n**Skills:** ${skills ? skills.split(',').map(s => s.trim()).join(', ') : 'Not provided'}\n\n**Links:**\n${githubUrl ? `- GitHub: ${githubUrl}\n` : ''}${linkedinUrl ? `- LinkedIn: ${linkedinUrl}\n` : ''}\n**Contact:**\n- Email: ${emailId}\n${mobileNumber ? `- Mobile: ${mobileNumber}\n` : ''}\nThank you for considering my application.\n\n**Best regards,**\n${name}`;
      } catch (jsonError) {
        console.warn('Direct JSON parsing failed:', jsonError.message);
        const jsonMatch = responseText.match(/\{[\s\S]*?\}/);
        if (jsonMatch) {
          try {
            parsed = JSON.parse(jsonMatch[0]);
            // console.log('Regex Parsed JSON:', parsed);
            subject = parsed.subject && typeof parsed.subject === 'string'
              ? parsed.subject
              : `Application for ${jobRole} at ${companyName}`;
            emailContent = parsed.email && typeof parsed.email === 'string'
              ? parsed.email
              : `**Dear Hiring Manager,**\n\nI am writing to express my interest in the ${jobRole} position at ${companyName}. With ${experience} years of experience, I am confident in my ability to contribute to your team.\n\n**Skills:** ${skills ? skills.split(',').map(s => s.trim()).join(', ') : 'Not provided'}\n\n**Links:**\n${githubUrl ? `- GitHub: ${githubUrl}\n` : ''}${linkedinUrl ? `- LinkedIn: ${linkedinUrl}\n` : ''}\n**Contact:**\n- Email: ${emailId}\n${mobileNumber ? `- Mobile: ${mobileNumber}\n` : ''}\nThank you for considering my application.\n\n**Best regards,**\n${name}`;
          } catch (regexError) {
            console.warn('Regex JSON parsing failed:', regexError.message);
            subject = `Application for ${jobRole} at ${companyName}`;
            emailContent = responseText || `**Dear Hiring Manager,**\n\nI am writing to express my interest in the ${jobRole} position at ${companyName}. With ${experience} years of experience, I am confident in my ability to contribute to your team.\n\n**Skills:** ${skills ? skills.split(',').map(s => s.trim()).join(', ') : 'Not provided'}\n\n**Links:**\n${githubUrl ? `- GitHub: ${githubUrl}\n` : ''}${linkedinUrl ? `- LinkedIn: ${linkedinUrl}\n` : ''}\n**Contact:**\n- Email: ${emailId}\n${mobileNumber ? `- Mobile: ${mobileNumber}\n` : ''}\nThank you for considering my application.\n\n**Best regards,**\n${name}`;
          }
        } else {
          console.warn('No JSON found; using fallback');
          subject = `Application for ${jobRole} at ${companyName}`;
          emailContent = responseText || `**Dear Hiring Manager,**\n\nI am writing to express my interest in the ${jobRole} position at ${companyName}. With ${experience} years of experience, I am confident in my ability to contribute to your team.\n\n**Skills:** ${skills ? skills.split(',').map(s => s.trim()).join(', ') : 'Not provided'}\n\n**Links:**\n${githubUrl ? `- GitHub: ${githubUrl}\n` : ''}${linkedinUrl ? `- LinkedIn: ${linkedinUrl}\n` : ''}\n**Contact:**\n- Email: ${emailId}\n${mobileNumber ? `- Mobile: ${mobileNumber}\n` : ''}\nThank you for considering my application.\n\n**Best regards,**\n${name}`;
        }
      }
      // Ensure skills are formatted inline for all categories
      if (skills) {
        const skillsList = skills.split(',').map(s => s.trim()).join(', ');
        emailContent = emailContent.replace(/\*\*Skills:\*\*\n([*-].*\n)+/, `**Skills:** ${skillsList}\n`);
      }
      // Adjust subject and content for category-specific fallbacks
      if (!parsed || !parsed.subject) {
        switch (category.toLowerCase()) {
          case 'thank you':
            subject = `Thank You for the ${jobRole} Interview at ${companyName}`;
            emailContent = emailContent || `**Dear Hiring Manager,**\n\nThank you for the opportunity to interview for the ${jobRole} position at ${companyName}. I enjoyed discussing the role and learning more about your team. My skills in ${skills ? skills.split(',').map(s => s.trim()).join(', ') : 'relevant areas'} make me a strong fit for this opportunity.\n\n**Contact:**\n- Email: ${emailId}\n${mobileNumber ? `- Mobile: ${mobileNumber}\n` : ''}\nI look forward to hearing from you.\n\n**Best regards,**\n${name}`;
            break;
          case 'followup':
            subject = `Follow-Up on ${jobRole} Application at ${companyName}`;
            emailContent = emailContent || `**Dear Hiring Manager,**\n\nI am following up on my application for the ${jobRole} position at ${companyName}. I remain very enthusiastic about the opportunity and believe my skills in ${skills ? skills.split(',').map(s => s.trim()).join(', ') : 'relevant areas'} align well with the role.\n\n**Contact:**\n- Email: ${emailId}\n${mobileNumber ? `- Mobile: ${mobileNumber}\n` : ''}\nThank you for your time and consideration.\n\n**Best regards,**\n${name}`;
            break;
          case 'referral':
            subject = `Request for Referral for ${jobRole} at ${companyName}`;
            emailContent = emailContent || `**Dear [Recipient],**\n\nI am reaching out to request a referral for the ${jobRole} position at ${companyName}. With ${experience} years of experience and skills in ${skills ? skills.split(',').map(s => s.trim()).join(', ') : 'relevant areas'}, I believe I am a strong candidate.\n\n**Links:**\n${githubUrl ? `- GitHub: ${githubUrl}\n` : ''}${linkedinUrl ? `- LinkedIn: ${linkedinUrl}\n` : ''}\n**Contact:**\n- Email: ${emailId}\n${mobileNumber ? `- Mobile: ${mobileNumber}\n` : ''}\nThank you for your support.\n\n**Best regards,**\n${name}`;
            break;
          default:
            subject = `Application for ${jobRole} at ${companyName}`;
            emailContent = emailContent || `**Dear Hiring Manager,**\n\nI am writing to express my interest in the ${jobRole} position at ${companyName}. With ${experience} years of experience, I am confident in my ability to contribute to your team.\n\n**Skills:** ${skills ? skills.split(',').map(s => s.trim()).join(', ') : 'Not provided'}\n\n**Links:**\n${githubUrl ? `- GitHub: ${githubUrl}\n` : ''}${linkedinUrl ? `- LinkedIn: ${linkedinUrl}\n` : ''}\n**Contact:**\n- Email: ${emailId}\n${mobileNumber ? `- Mobile: ${mobileNumber}\n` : ''}\nThank you for considering my application.\n\n**Best regards,**\n${name}`;
        }
      }
    } catch (error) {
      console.error('Unexpected error in response parsing:', error.message, error.stack);
      subject = `Application for ${jobRole} at ${companyName}`;
      emailContent = `**Dear Hiring Manager,**\n\nI am writing to express my interest in the ${jobRole} position at ${companyName}. With ${experience} years of experience, I am confident in my ability to contribute to your team.\n\n**Skills:** ${skills ? skills.split(',').map(s => s.trim()).join(', ') : 'Not provided'}\n\n**Links:**\n${githubUrl ? `- GitHub: ${githubUrl}\n` : ''}${linkedinUrl ? `- LinkedIn: ${linkedinUrl}\n` : ''}\n**Contact:**\n- Email: ${emailId}\n${mobileNumber ? `- Mobile: ${mobileNumber}\n` : ''}\nThank you for considering my application.\n\n**Best regards,**\n${name}`;
    }

    // console.log('Final Email Content:', emailContent);

    let savedEmail;
    try {
      const existingEmail = await Email.findOne({
        userId,
        name,
        emailId,
        jobRole,
        companyName,
        category,
        tone,
        length,
        generatedEmail: emailContent,
      });
      if (existingEmail) {
        // console.log('Duplicate email found, returning existing:', existingEmail._id);
        return res.status(200).json({ email: emailContent, emailId: existingEmail._id, subject });
      }

      savedEmail = new Email({
        userId,
        name,
        githubUrl,
        linkedinUrl,
        mobileNumber,
        emailId,
        jobRole,
        companyName,
        category,
        experience,
        jobDescription,
        tone,
        length,
        skills,
        generatedEmail: emailContent,
        subject,
      });
      await savedEmail.save();
      // console.log('Email saved to database:', savedEmail._id);
    } catch (dbError) {
      console.error('Database save failed:', dbError.message, dbError.stack);
      return res.status(500).json({ message: 'Failed to save email to database' });
    }

    res.status(200).json({ email: emailContent, emailId: savedEmail._id, subject });
  } catch (error) {
    console.error('Error generating email:', error.message, error.stack);
    res.status(500).json({ message: 'Failed to generate email' });
  }
};

exports.getUserEmails = async (req, res) => {
  // console.log('Received request to /api/emails/my-emails:', { user: req.user });
  try {
    const emails = await Email.find({ userId: req.user.id }).sort({ createdAt: -1 });
    // console.log('Fetched emails:', emails.length);
    res.status(200).json({ emails: emails || [] });
  } catch (error) {
    console.error('Error fetching emails:', error.message, error.stack);
    res.status(500).json({ message: 'Failed to fetch emails' });
  }
};