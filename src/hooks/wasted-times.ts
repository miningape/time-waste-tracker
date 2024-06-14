import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

type WastedTime =
  | {
      status: "ongoing";
      start: Dayjs;
    }
  | {
      status: "resolved";
      start: Dayjs;
      end: Dayjs;
    };

export const timeWasted: WastedTime[] = [
  {
    status: "resolved",
    start: dayjs("2024-06-14T09:00:00"),
    end: dayjs("2024-06-14T16:50:00"),
  },
];
