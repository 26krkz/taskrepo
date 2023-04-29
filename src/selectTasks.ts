const { MultiSelect } = require("enquirer");
import trelloData from "./getFromTrello";

const selectTasks = async (day: string, addingTasks: string[] = []): Promise<string[]> => {
  const tasksData = await trelloData();

  if (tasksData !== undefined && tasksData.length === 0 && addingTasks.length === 0) {
    console.log(`担当チケットがないので【${day}の作業】の選択をスキップします`);
    return [];
  }

  const multiSlelect = new MultiSelect({
    message: `【${day}の作業】を選択してください`,
    choices: [...tasksData, ...addingTasks],
  });

  const res: string[] = multiSlelect
    .run()
    .then((answer: Array<string>) => {
      return answer.map((v) => v.replace(/.*\d{6}_(.*)\（.*/, "$1"));
    })
    .catch(() => {
      console.error;
      return [];
    });
  return res;
};

export default selectTasks;
