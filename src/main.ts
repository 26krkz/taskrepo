import getWorkHours from "./getWorkHours";
import getSubTasks from "./getSubTask";
import addTasks from "./addTasks";
import selectTasks from "./selectTasks";
import checkPostToSlack from "./checkPost";
import getMessage from "./getMessage";

(async () => {
  // 時間の確認
  const workHours = await getWorkHours();
  // よもやま、mtgの確認
  const subTasks: string[] = await getSubTasks();

  // 本日の作業を選択
  const todaysSelectTasks: string[] = await selectTasks("本日");
  // 本日の作業に追加があれば追記
  const todaysAddingTasks: string[] = await addTasks("本日");

  // 明日の作業を選択
  const tommorowsSelectTasks: string[] = await selectTasks("明日", todaysAddingTasks);
  // 明日の作業に追加があれば追記
  const tommorowsAddingTasks: string[] = await addTasks("明日");

  // 共有・相談事項の確認
  const message = await getMessage();

  // 取得したデータをまとめる
  const todaysTasks = [...todaysSelectTasks, ...todaysAddingTasks];
  const tommorowsTasks = [...tommorowsSelectTasks, ...tommorowsAddingTasks];

  console.log(`
-----------------------送信するテキスト-----------------------
${workHours}
【本日の作業】${[...todaysTasks, ...subTasks].join("、")}
【明日の作業】${tommorowsTasks.join("、")}
【共有・相談事項】${message}
--------------------------------------------------------------
`);

  checkPostToSlack(
    `\`\`\`${workHours}
【本日の作業】${[...todaysTasks, ...subTasks].join("、")}
【明日の作業】${tommorowsTasks.join("、")}
【共有・相談事項】${message}\`\`\``
  );
})();
