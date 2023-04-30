const ft = require("node-fetch");
import * as dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.TRELLO_KEY;
const apiToken = process.env.TRELLO_TOKEN;

export default () => {
  return ft(
    `https://api.trello.com/1/members/me/cards?key=${apiKey}&token=${apiToken}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then((response: any) => {
      return response.json();
    })
    .then((cards: any) => cards.map((card: any) => card.name))
    .catch((err: any) => console.error(err));
};
