const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.loginUser);
//TODO add logout operation

module.exports = router;