require("dotenv").config();

async function pubsub_on_data_change({ route }) {
  const pubsub = require("socket.io-client")(process.env.PUBSUB_URL);
  await pubsub.emit("pubsub_route", { route });
}
module.exports = pubsub_on_data_change;
