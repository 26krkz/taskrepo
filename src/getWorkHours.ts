import readline from "readline";
import { stdin as input, stdout as output } from "process";

class Time {
  time: string;
  timeLength: number;
  constructor(_time: string) {
    this.time = _time;
    this.timeLength = _time.length;
  }

  get hour() {
    if (this.timeLength === 3) {
      return this.time.substring(0, 1);
    } else {
      return this.time.substring(0, 2);
    }
  }

  get min() {
    if (this.timeLength === 3) {
      return this.time.substring(1);
    } else {
      return this.time.substring(2);
    }
  }

  get conversionSec() {
    const hour = Number(this.hour);
    const min = Number(this.min);
    return hour * 3600 + min * 60;
  }
}

// questionに対して入力された数字を取得する
const readInputTime = (
  question: string,
  defaultTime: string
): Promise<string> => {
  const rl = readline.createInterface({ input, output });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      if (answer === "") {
        resolve(defaultTime);
        rl.close();
      } else {
        resolve(answer);
        rl.close();
      }
    });
  });
};

const calculateDiff = (
  startTime: number,
  endTime: number,
  breakTime: number
) => {
  const diff = endTime - startTime - breakTime;
  const hours = Math.floor(diff / 60 / 60);
  const min = Math.floor(diff / 60) % 60;
  if (min === 0) {
    return `${hours}時間00分`;
  }
  return `${hours}時間${min}分`;
};

const getNowTime = () => {
  const date = new Date();
  const hour: string = String(date.getHours()).padStart(2, "0");
  const min: string = String(date.getMinutes()).padStart(2, "0");
  return { min: min, hour: hour };
};

// questionに対して入力した値をreturnに格納する。
const getWorkHours = async () => {
  const nowTime = getNowTime();
  const startTime: string = await readInputTime(
    "開始時間を記入してね(10:00):",
    "1000"
  );
  const endTime: string = await readInputTime(
    `終了時間を記入してね(${nowTime.hour}:${nowTime.min}):`,
    `${nowTime.hour}${nowTime.min}`
  );
  const breakTime: string = await readInputTime(
    "休憩時間を記入してね(1:00):",
    "100"
  );
  const sTime = new Time(startTime);
  const eTime = new Time(endTime);
  const bTime = new Time(breakTime);
  const diff: string = calculateDiff(
    sTime.conversionSec,
    eTime.conversionSec,
    bTime.conversionSec
  );
  const result = `【就業時間】${sTime.hour}:${sTime.min} ~ ${eTime.hour}:${eTime.min}\n【稼働時間の合計】${diff} (休憩：${bTime.hour}時間${bTime.min}分)`;

  return Promise.resolve(result);
};

export default getWorkHours;
