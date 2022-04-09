const { Image } = require("../models/image");

const imageUpload = async (req, res) => {
  try {
    console.log("File>>", req.body);
    if (!req.body.file) {
      return res.status(409).json("Please Select an Image");
    }
    let image = new Image({
      file: req.body.file,
    });
    await image.save();

    res.status(201).json("Image Uploaded");
  } catch (error) {
    res.status(409).json(error.message);
  }
};

const getImages = async (req, res) => {
  try {
    const photos = await Image.find().sort("date");
    if (photos.length > 0) {
      res.status(200).json(photos);
    } else {
      res.status(404).json("No Image Found");
    }
  } catch (error) {
    res.status(409).json(error.message);
  }
};

//Export
module.exports = {
  imageUpload,
  getImages,
};
