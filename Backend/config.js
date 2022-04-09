require("dotenv").config();
module.exports = {
  mongoDbUrl: process.env.MONGODB_URL,
  secretKey: process.env.JWT_ACCESS_KEY,
  refreshKey: process.env.JWT_REFRESH_KEY,
  imgBucket: process.env.IMGBUCKET,
  //CorsOptions
  corsOptions: {
    origin: "*",
    exposedHeaders: "x-auth-token",
  },
};
