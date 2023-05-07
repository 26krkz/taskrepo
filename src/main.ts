import getWorkHours from "./getWorkHours";
import getSubTasks from "./getSubTask";
import addTasks from "./addTasks";
// import selectTasks from "./selectTasks";
import checkPostToSlack from "./checkPost";
import getMessage from "./getMessage";
import extractTasks from "./extractTasks";

(async () => {
  // 時間の確認
  const workHours = await getWorkHours();
  // よもやま、mtgの確認
  const subTasks: string[] = await getSubTasks();

  // 本日の作業を選択
  // const todaysSelectTasks: string[] = await selectTasks("本日");
  const extractedTasks = await extractTasks();
  if (!extractedTasks) throw new Error('データの取得に失敗しました。');
  const {todaysTasks, tomorrowsTasks} = extractedTasks;
  console.log(`【本日の作業】\n${todaysTasks}`);
  // 本日の作業に追加があれば追記
  const todaysAddingTasks: string[] = await addTasks("本日");

  // 明日の作業を選択
  // const tommorowsSelectTasks: string[] = await selectTasks(
  //   "明日",
  //   todaysAddingTasks
  // );
  console.log(`【明日の作業】\n${tomorrowsTasks}`);
  // 明日の作業に追加があれば追記
  const tommorowsAddingTasks: string[] = await addTasks("明日");

  // 共有・相談事項の確認
  const message = await getMessage();

  // 取得したデータをまとめる
  const todaysAllTasks = [...todaysTasks, ...todaysAddingTasks];
  const tomorrowsAllTasks = [...tomorrowsTasks, ...tommorowsAddingTasks];

  console.log(`
-----------------------送信するテキスト-----------------------
${workHours}
【本日の作業】${[...todaysAllTasks, ...subTasks].join("、")}
【明日の作業】${tomorrowsAllTasks.join("、")}
【共有・相談事項】${message}
--------------------------------------------------------------
`);

  checkPostToSlack(
    `\`\`\`${workHours}
【本日の作業】${[...todaysAllTasks, ...subTasks].join("、")}
【明日の作業】${tomorrowsAllTasks.join("、")}
【共有・相談事項】${message}\`\`\``
  );
})();
