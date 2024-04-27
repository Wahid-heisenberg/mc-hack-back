const express = require("express");
const router = express.Router();

const { save_file ,getCompanyFiles , getAllFiles, get_file_by_category  } = require("../controllers/file.controller");
const { upload_file } = require("../middlewares/upload");


router.post("/savefile",upload_file() , save_file);
router.get("/company/:company", getCompanyFiles);
router.get("/all", getAllFiles);
router.get("/category/:category", get_file_by_category);


module.exports = router;