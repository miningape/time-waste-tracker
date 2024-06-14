import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface WastedTime {
  status: "ongoing" | "resolved";
  start: Dayjs;
  end?: Dayjs;
}

export const timeWasted: WastedTime[] = [
  {
    status: "ongoing",
    start: dayjs("2024-06-14T09:00:00"),
  },
];
