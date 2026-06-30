import { Dayjs } from "dayjs";

//#region ../../packages/components/countdown/src/utils.d.ts
declare const getTime: (value: number | Dayjs) => number;
declare const formatTime: (timestamp: number, format: string) => string;
//#endregion
export { formatTime, getTime };