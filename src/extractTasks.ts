import getFromGoogleSpreadsheet from "./getFromGoogleSpreadsheet";
import * as dotenv from "dotenv";
dotenv.config();

const extractTasks = async () => {
  const tasks = await getFromGoogleSpreadsheet();
  const spreadSheetsUserName = process.env.SPREADSHEETS_USERNAME;
  if (!tasks || !spreadSheetsUserName) return;

  const taskIndexStart = tasks.findIndex((task) => task[0].indexOf(spreadSheetsUserName) > -1);
  const taskIndexEnd = tasks.findIndex((task, index) => index > taskIndexStart && task[0].indexOf('memo') > -1);
  const extractedTasks = tasks.slice(taskIndexStart, taskIndexEnd).map((task) => task[0]);
  
  const todaysIndex = extractedTasks.findIndex((task) => task.indexOf('today') > -1);
  const tomorrowsIndex = extractedTasks.findIndex((task) => task.indexOf('next day') > -1);
  const todaysTasks = extractedTasks.slice(todaysIndex + 1, tomorrowsIndex);
  const tomorrowsTasks = extractedTasks.slice(tomorrowsIndex + 1);
  return { todaysTasks, tomorrowsTasks };
}

export default extractTasks;