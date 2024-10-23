const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = req.baseUrl; // Get folder name based on the route
    const uploadFolder = `uploads${folderName}`;

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

// File filter to allow only certain image types
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.gif') {
    return cb(new Error('Only images are allowed'), false);
  }
  cb(null, true);
};

// multer configuration for single image
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 } // 1MB file size limit
});

module.exports = { upload };
