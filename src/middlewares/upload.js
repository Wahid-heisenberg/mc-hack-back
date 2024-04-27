const multer = require("multer");

exports.upload_image = (req, res, next) => {
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  let uploads = multer({ storage: storage });

  return uploads.single("image");
};

exports.upload_file = (req, res, next) => {
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },

    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  let uploads = multer({ storage: storage });

  return uploads.single("file");
};

exports.upload_files = (req, res, next) => {
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },

    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  let uploads = multer({ storage: storage });
  return uploads.array("files");
};