const multer = require('multer');
const cloudinary = require('cloudinary');
const clodinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const avatarStorage = clodinaryStorage({
  cloudinary: cloudinary,
  folder: 'vimo/avatars'
});
const avatarUpload = multer({ storage: avatarStorage });

const imageStorage = clodinaryStorage({
  cloudinary: cloudinary,
  folder: 'vimo/images'
});
const imageUpload = multer({ storage: imageStorage });

const videoStorage = clodinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'vimo/videos',
    format: 'mp4',
    resource_type: 'video'
  }
});
const videoUpload = multer({ storage: videoStorage });

exports.avatarUpload = avatarUpload;
exports.imageUpload = imageUpload;
exports.videoUpload = videoUpload;
