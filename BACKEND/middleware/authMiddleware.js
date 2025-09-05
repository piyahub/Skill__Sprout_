// /backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'), false);
    }
  },
});

const fileUploadMiddleware = upload.single('image');

const fileUploadErrorMiddleware = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Image size must be less than 1MB' });
    }
    return res.status(400).json({ message: 'File upload error' });
  } else if (err.message === 'Only images are allowed') {
    return res.status(400).json({ message: err.message });
  }
  next();
};

const cloudinaryUploadMiddleware = async (req, res, next) => {
  if (!req.file) {
    return next(); // Allow registration without image (optional)
  }

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'aicareercoach' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(req.file.buffer);
    });
    req.imageUrl = result.secure_url;
    // console.log('Cloudinary upload successful:', req.imageUrl); // Debug log
    next();
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ message: 'Image upload failed' });
  }
};

const protect = async (req, res, next) => {
  let token;
  // console.log('Authorization header:', req.headers.authorization);
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // console.log('Token extracted:', token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log('Decoded JWT:', decoded);
      req.user = decoded;
      next();
    } catch (error) {
      console.error('JWT verification error:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.error('No authorization header or invalid format');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { fileUploadMiddleware, fileUploadErrorMiddleware, cloudinaryUploadMiddleware, protect };