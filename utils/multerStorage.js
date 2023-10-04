const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');
const { module } = require('module');

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define the allowed file types
const allowedFileTypes = ['jpg', 'jpeg', 'png', 'pdf'];

// Function to check if the uploaded file has an allowed format
const fileFilter = (req, file, cb) => {
   const extname = path.extname(file.originalname).toLowerCase();
   if (allowedFileTypes.includes(extname)) {
      // Accept the file if the extension matches an allowed format
      cb(null, true);
   } else {
      // Reject the file if the extension doesn't match any allowed format
      cb(new Error('Unsupported file type'), false);
   }
};
// Specify the destination path and file filter function in the storage configuration
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'public/uploads'); // Change the path as needed
   },
   filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${file.fieldname}-${Date.now()}${ext}`;
      cb(null, filename);
   },
});

const upload = multer({ storage, fileFilter });

module.exports ={
upload
}





