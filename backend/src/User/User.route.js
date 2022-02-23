const express = require("express");
const router = express.Router();
const User = require("./User");
const pubsubRoute = require("../../pubsub");

const userRoutes = {
  addUser: "/addUser",
  updateUser: "/updateUser",
};

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, bio } = req.body;
    const user = await User.create(username, bio);
    await pubsubRoute({ route: userRoutes.addUser });
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
