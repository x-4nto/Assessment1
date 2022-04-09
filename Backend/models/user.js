const Joi = require("joi");
require("dotenv");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
    minlength: 5,
    maxlength: 128,
  },
  images: [
    {
      type: String,
      required: false,
      minlength: 5,
      maxlength: 64,
    },
  ],

  date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(8).max(255).required().email(),
    password: Joi.string().min(6).max(128).required(),
  });
  return schema.validate(user);
}

const validateSignup = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(8).max(255).required().email(),
    password: Joi.string().min(6).max(128).required(),
  });
  return schema.validate(user);
};
const validateLoginUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).max(128).required(),
  });
  return schema.validate(user);
};

exports.User = User;
exports.validate = validateUser;
exports.validateLogin = validateLoginUser;
exports.validateSignup = validateSignup;
