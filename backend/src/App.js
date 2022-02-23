const express = require("express");
const userRouter = require("./User/User.route");
const cors = require("cors");

module.exports = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(userRouter);
  return app;
};
