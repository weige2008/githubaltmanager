import { CalendarDateCell, CalendarDateCellType, DateTableEmits, DateTableProps } from "./date-table.js";
import * as _$vue from "vue";
import { SetupContext } from "vue";
import dayjs, { Dayjs } from "dayjs";

//#region ../../packages/components/calendar/src/use-date-table.d.ts
declare const useDateTable: (props: DateTableProps, emit: SetupContext<DateTableEmits>["emit"]) => {
  now: dayjs.Dayjs;
  isInRange: _$vue.ComputedRef<boolean>;
  rows: _$vue.ComputedRef<CalendarDateCell[][]>;
  weekDays: _$vue.ComputedRef<string[]>;
  getFormattedDate: (day: number, type: CalendarDateCellType) => Dayjs;
  handlePickDay: ({
    text,
    type
  }: CalendarDateCell) => void;
  getSlotData: ({
    text,
    type
  }: CalendarDateCell) => {
    isSelected: boolean;
    type: string;
    day: string;
    date: Date;
  };
};
//#endregion
export { useDateTable };