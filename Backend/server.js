require("dotenv").config();
const config = require("./config");
const port = process.env.PORT || 7777;
const Joi = require("joi");
const cors = require("cors");
Joi.objectId = require("joi-objectid")(Joi);
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/users");

// Connecting Database
mongoose
  .connect(config.mongoDbUrl)
  .then(
    //Listening on port
    app.listen(port, () => {
      console.log("Now connected to MongoDB!");
      console.log(`Server running on port ${port}`);
    })
  )
  .catch((err) => console.error("Unable to connect the Database", err.message));

// Cors
app.use(cors(config.corsOptions));

// For using JSON
// app.use(express.json());
app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ extended: false }));

//For using cookies
app.use(cookieParser());

// Defining All Endpoints
app.use("/users", users);
// app.use("/images", images);

// response for Invalid Endpoints
const notFound = (req, res) => {
  res.status(404).send("Not found");
};
//For All other Endpoints
app.use("/*", notFound);
