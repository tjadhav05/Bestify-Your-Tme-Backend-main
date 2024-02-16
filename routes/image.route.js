const express = require("express");
const imageController = require("../controller/img.controller");
const router = express.Router();

// /api/image
 router.post("/createimage/images",imageController.AddImageUrl);
router.post("",imageController.getImageUrlByquizName)


module.exports=router;