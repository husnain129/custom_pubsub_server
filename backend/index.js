require("dotenv").config();

const express = require("express");
const app = express();
const pubsub_api = require("./pubsub");

const PORT = 3005;
const cors = require("cors");
const userRouter = require("./src/User/User.route");
const pool = require("./src/pool");

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.get("/hello", async (req, res) => {
  res.send("Hello World!");
});

pool
  .connect({
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
