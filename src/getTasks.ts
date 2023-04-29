const { Client } = require("@notionhq/client");
require("dotenv").config();

interface notionData {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: { object: string; id: string };
  last_edited_by: {
    object: string;
    id: string;
  };
  cover: null;
  icon: null;
  parent: {
    type: string;
    database_id: string;
  };
  archived: false;
  properties: {
    担当区分: Array<object>;
    "GitLab URL": Array<object>;
    チケットURL: Array<object>;
    "Slack URL": Array<object>;
    作業内容: workDescription;
    ステータス: Array<object>;
    タイトル: Array<object>;
    担当: Array<object>;
    Name: Array<object>;
  };
  url: string;
}

interface workDescription {
  id: string;
  type: "formula";
  formula: {
    type: "string";
    string: string;
  };
}

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;
const retrievePages = async () => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "ステータス",
        select: {
          does_not_equal: "完了",
        },
      },
    });
    const results: notionData[] = response.results;
    if (results !== undefined) return extractTasks(results);
  } catch (error: any) {
    console.error(error.body);
  }
};

// retrievePagesで取得したページの中から"作業内容"の値だけ抽出しtasksにpushしている。
const extractTasks = (results: notionData[]): Array<string> => {
  let tasks: Array<string> = [];
  for (let i = 0; i < results.length; i++) {
    const task = results[i].properties["作業内容"].formula.string;
    tasks.push(task);
  }
  return tasks;
};

export default retrievePages;
