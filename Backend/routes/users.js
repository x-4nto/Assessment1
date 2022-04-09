const express = require("express");
const router = express.Router();

const { signupUser, loginUser } = require("../controllers/userController");
const { imageUpload, getImages } = require("../controllers/imageController");

const { auth } = require("../middlewares/auth");

//User SignUp
router.post("/signup", signupUser);

//User login
router.post("/login", loginUser);

router.post("/upload", imageUpload);
router.get("/images", getImages);

// //Auth Middleware
// router.use(auth);

//Export
module.exports = router;
