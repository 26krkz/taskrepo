import readline from "readline";

const checkTask = (question: string): Promise<string[]> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      const array: string[] = answer === "" ? [] : answer.split("、");
      resolve(array);
      rl.close();
    });
  });
};

// 作業内容に追加したいことがあれば対話式で追加する。dayには「今日の作業」または「明日の作業」が入る。
const addTasks = async (day: string) => {
  const addingTasks = await checkTask(
    `【${day}の作業】に追加は？(なし/追加の場合カンマ区切り):`
  );
  return Promise.resolve(addingTasks);
};

export default addTasks;
