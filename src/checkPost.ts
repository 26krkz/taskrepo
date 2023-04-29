import readline from "readline";
const postSlack = require("./postSlack");

const checkPostToSlack = (slackText: string) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const questionFn = () => {
    rl.question("slackに送信してもいい？(Y/n)", (answer) => {
      if (answer === "") {
        postSlack(slackText);
        console.log("送信しました");

        rl.close();
      } else {
        const regexY = new RegExp(/^y(es)?$/i);
        const regexN = new RegExp(/^n(o)?$/i);
        if (regexY.test(answer)) {
          postSlack(slackText);
          console.log("送信しました");

          rl.close();
        } else if (regexN.test(answer)) {
          console.log("送信を中断しました");

          rl.close();
        } else {
          console.error("yes or noで答えてください！");
          questionFn();
        }
      }
    });
  };

  questionFn();
};

export default checkPostToSlack;
