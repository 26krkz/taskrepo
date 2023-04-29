import readline from "readline";

const QA = (question: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
      rl.close();
    });
  });
};

// 作業内容に追加したいことがあれば対話式で追加する。dayには「今日の作業」または「明日の作業」が入る。
const getMessage = async () => {
  const answer = await QA("共有・相談事項はある？");
  return Promise.resolve(answer);
};

export default getMessage;
