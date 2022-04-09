var mongoose = require("mongoose");

var imageSchema = new mongoose.Schema({
  file: { type: String, required: true },
  date: { type: Date, default: Date.now },
});
const Image = mongoose.model("Image", imageSchema);
exports.Image = Image;
