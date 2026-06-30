import { CalendarDateType, CalendarEmits, CalendarProps } from "./calendar.js";
import * as _$vue from "vue";
import { ComputedRef, SetupContext } from "vue";
import dayjs, { Dayjs } from "dayjs";

//#region ../../packages/components/calendar/src/use-calendar.d.ts
declare const useCalendar: (props: CalendarProps, emit: SetupContext<CalendarEmits>["emit"], componentName: string) => {
  calculateValidatedDateRange: (startDayjs: Dayjs, endDayjs: Dayjs) => [Dayjs, Dayjs][];
  date: ComputedRef<dayjs.Dayjs>;
  realSelectedDay: _$vue.WritableComputedRef<dayjs.Dayjs | undefined, dayjs.Dayjs | undefined>;
  pickDay: (day: Dayjs) => void;
  selectDate: (type: CalendarDateType) => void;
  validatedRange: ComputedRef<[dayjs.Dayjs, dayjs.Dayjs][]>;
  handleDateChange: (date: Dayjs | "today") => void;
};
//#endregion
export { useCalendar };