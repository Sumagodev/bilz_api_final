const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Extract the folder name from the request
    const folderName = req.baseUrl;
    const uploadFolder = `uploads${folderName}`;

    // Ensure the directory exists
    const uploadPath = path.join(__dirname, '..', uploadFolder);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter to only allow certain image types
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.mp4' && ext !== '.avi' && ext !== '.mov') {
    return cb(new Error('Only media files are allowed'), false);
  }
  cb(null, true);
};

// multer configuration
const upload = multer({
  storage,
  fileFilter,

});

const upload1 = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 } // Set file size limit (1MB)
}).single('img'); // Accept only one file, field name must match 'img'

const upload2 = multer({
  storage,
  fileFilter,
  // limits: { fileSize: 1024 * 1024 } // 1MB limit
}).array('img', 5); 
// Custom middleware to check file size after upload
const validateImageSize = (req, res, next) => {
    if (req.file && req.file.size > 1024 * 1024) { // 300 KB
      return res.status(400).json({ error: 'Image size must be less than 300 KB' });
    }
    next();
  };

  module.exports = { upload,upload1,upload2, validateImageSize };
