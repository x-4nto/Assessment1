const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
require("dotenv").config();
const auth = (req, res, next) => {
  try {
    const authHeader =
      req.headers["authorization"] ||
      req.headers["Authorization"] ||
      req.headers["x-access-token"];

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ error: "No token provided, please login again!" });
      }

      jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, user) => {
        if (error) {
          if (error.name === "TokenExpiredError") {
            return res
              .status(403)
              .json({ error: "Session timed out,please login again" });
          } else if (error.name === "JsonWebTokenError") {
            return res
              .status(403)
              .json({ error: "Invalid token,please login again!" });
          } else {
            //catch other unprecedented errors
            return res.status(403).json({ error: error.message });
          }
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};
