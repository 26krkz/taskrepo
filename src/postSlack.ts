const pkg = require("@slack/bolt");
const { App } = pkg;
require("dotenv").config();

const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SECRET_ID,
});

const channelId = "CGSJV8M7H";

module.exports = (text: string) => {
  try {
    app.client.chat.postMessage({
      channel: channelId,
      text: text,
    });
  } catch (error) {
    console.error(error);
  }
};
