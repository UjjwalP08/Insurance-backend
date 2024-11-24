
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('./cloudinary-config');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Specify folder in Cloudinary
        format: async (req, file) => 'jpeg', // Set the file format (optional)
        public_id: (req, file) => file.originalname.split('.')[0], // Use file name as public_id
    },
});
const upload = multer({ storage: storage })

module.exports = upload