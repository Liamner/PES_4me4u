const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'storage/imgs'),
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()// + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${file.fieldname}-${uniqueSuffix}.${file.mimetype.split('/')[1]}`);
  }
});



const upload = multer({ 
    storage: storage,
    /*limits: {
      fileSize: 80000000000 // Compliant: 8MB
    }, */
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png/;
      const mimetype = fileTypes.test(file.mimetype);
      if (mimetype) {
        return cb(null, true);
      }
      cb("Error: File not an image");
    } 
  });

module.exports = upload;