const config = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User, validateLogin, validateSignup } = require("../models/user");

//Verify User SignUp
const signupUser = async (req, res) => {
  try {
    // Validate input
    const { error } = validateSignup(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Insert the new user if they do not exist yet
    let foundUser = await User.findOne({ email: req.body.email });
    // If user not exists
    if (foundUser) {
      return res.status(409).send("User already exisits!");
    }

    let user = new User({
      email: req.body.email,
      password: req.body.password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    //Generate JWT on the instance of Login
    const ACCESS_TOKEN_NAME = jwt.sign({ _id: user._id }, config.secretKey, {
      expiresIn: "20m",
    });
    const refreshToken = jwt.sign({ _id: user._id }, config.refreshKey, {
      expiresIn: "1d",
    });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    }); //secure: true,
    res.header("x-auth-token", ACCESS_TOKEN_NAME).status(201).json(user);
  } catch (error) {
    res.json(error.message);
  }
};

//User Login
const loginUser = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    //  Now find the user by their email
    let user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!user) {
      return res.status(404).send("User Not Found.");
    }
    // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send("Incorrect  password.");
    }
    //Generate JWT on the instance of Login
    const ACCESS_TOKEN_NAME = jwt.sign({ _id: user._id }, config.secretKey, {
      expiresIn: "20m",
    });
    const refreshToken = jwt.sign({ _id: user._id }, config.refreshKey, {
      expiresIn: "1d",
    });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    }); //secure: true,
    res.header("x-auth-token", ACCESS_TOKEN_NAME).status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//Export
module.exports = {
  signupUser,
  loginUser,
};
