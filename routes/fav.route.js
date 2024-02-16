const express = require("express");
const favController = require("../controller/fav.controller");
const router = express.Router();

// /api/fav
router.post("",favController.AddtoFav);
// /api/fav
router.delete("/:username/:quizname",favController.deleteFav);
// /api/fav
router.get("/username/:username",favController.getQuetionByUsername);


module.exports=router;