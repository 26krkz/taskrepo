import readline from "readline";

// questionに対してyes or noで答えた時にtrue or falseで返す。
// 空文字（ただエンターキーを押す）時はfalseと判断。
// yes or noで答えなければ同じ質問が繰り返される。
const checkTask = (question: string): Promise<boolean> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    const questionFn = () => {
      rl.question(question, (answer) => {
        if (answer === "") {
          resolve(false);
          rl.close();
        } else {
          const regexY = new RegExp(/^y(es)?$/i);
          const regexN = new RegExp(/^n(o)?$/i);
          if (regexY.test(answer)) {
            resolve(true);
            rl.close();
          } else if (regexN.test(answer)) {
            resolve(false);
            rl.close();
          } else {
            console.error("ちゃんと答えて！");
            questionFn(); // ここで質問を繰り返す。
          }
        }
      });
    };
    questionFn();
  });
};

// サブタスク（よもやま、mtg）があったかどうか対話式で取得し、あった場合returnする配列に追加する。
const getSubTasks = async () => {
  let subTasks: Array<string> = [];
  const yomoyama = await checkTask("よもやまあった？(y/N):");
  const mtg = await checkTask("ミーティングあった？(y/N):");
  if (yomoyama) subTasks.push("よもやま");
  if (mtg) subTasks.push("mtg");
  return Promise.resolve(subTasks);
};

export default getSubTasks;
