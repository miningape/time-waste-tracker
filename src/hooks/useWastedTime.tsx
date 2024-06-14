import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { timeWasted } from "./wasted-times";
import dayjs, { Dayjs } from "dayjs";

interface WastedTime {
  labels: string[];
  hoursWasted: number[];
}

function calculateWastedTime(
  startGraphAt: Dayjs,
  currentTime: Dayjs,
  setWastedTimes: Dispatch<SetStateAction<WastedTime>>
) {
  let date = startGraphAt.clone().subtract(1, "day");
  let currentIssueIndex = 0;
  const labels: string[] = [];
  const hoursWasted: number[] = [];

  console.log(
    {
      currentTime: currentTime.format("YYYY-MM-DDTHH:mm:ssZ"),
      date: date.format("YYYY-MM-DDTHH:mm:ssZ"),
    },
    date.isBefore(currentTime)
  );

  while (date.isBefore(currentTime)) {
    // console.log(date);
    if (
      currentIssueIndex < timeWasted.length &&
      timeWasted[currentIssueIndex].start.isSame(date, "day")
    ) {
      const { start, end } = timeWasted[currentIssueIndex];
      const endTime = end === undefined ? currentTime : end;

      console.log(
        {
          start: start.format("YYYY-MM-DDTHH:mm:ssZ"),
          endTime: endTime.format("YYYY-MM-DDTHH:mm:ssZ"),
        },
        endTime.utc(true).diff(start.utc(true)) / (1000 * 60 * 60)
      );

      hoursWasted.push(endTime.diff(start) / (1000 * 60 * 60));
      currentIssueIndex++;
    } else {
      hoursWasted.push(0);
    }

    labels.push(date.format("YYYY-MM-DD"));

    date = date.add(1, "day");
  }

  setWastedTimes({
    labels,
    hoursWasted,
  });
}

export function useWastedTime(): [WastedTime, Dayjs] {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [wastedTimes, setWastedTimes] = useState<WastedTime>({
    hoursWasted: [],
    labels: [],
  });

  const { start: startGraphAt } = timeWasted[0];

  useEffect(() => {
    calculateWastedTime(startGraphAt, currentTime, setWastedTimes);
    const interval = setInterval(() => setCurrentTime(dayjs()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    calculateWastedTime(startGraphAt, currentTime, setWastedTimes);
  }, [currentTime, startGraphAt]);

  return [wastedTimes, currentTime];
}
