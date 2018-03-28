const express = require('express');
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    const aFile = file.originalname.split('.');
    cb(null, `${aFile[0]}_${Date.now()}.${aFile[1]}`);
  }
});

const upload = multer({
  storage: storage
});

router.post('/', upload.array("file", 20), function (req, res, next) {

  let arr = [];

  for (let i in req.files) {
    const fileUrl = `http://${req.headers.host}/upload/${req.files[i].filename}`;
    arr.push(fileUrl);
  }

  res.json({
    code: 200,
    data: arr
  })

});

module.exports = router;