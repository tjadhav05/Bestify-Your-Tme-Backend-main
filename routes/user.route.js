const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();

// /api/user
router.get("",userController.getAllUser);
// /api/user/:userId
router.get("/:userId",userController.getUserByUserId);

// /api/user/login
router.post("/login",userController.login);

// Fogot Password
router.post("/forgotPassword/otp",userController.forgotPassword);

// reset Password
router.post("/forgotPassword/reset",userController.resetPassword);


//post method
// /api/user
router.post("/register",userController.create);
//delete method
// /api/user
router.delete("/userId/:userId",userController.deleteUserById);
// /api/user
router.delete("/username/:username",userController.deleteUserByName);

router.post("/login",userController.login)

router.get("/admin/details/test/:email",userController.getAdminDetails)
module.exports=router;

