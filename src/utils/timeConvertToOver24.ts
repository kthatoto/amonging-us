// @ts-expect-error: dayjs
import dayjs from "dayjs";

export default (originDate: Date, time: Date): string => {
  const diffDates: number = dayjs(time)
    .startOf("day")
    .diff(dayjs(originDate).startOf("day"), "day");
  const calculatedHour: number =
    parseInt(dayjs(time).format("HH")) + 24 * diffDates;
  return `${calculatedHour}:${dayjs(time).format("mm")}`;
};
