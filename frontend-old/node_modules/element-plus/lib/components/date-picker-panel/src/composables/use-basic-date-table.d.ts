import { Translator } from "../../../../hooks/use-locale/index.js";
import { DateCell } from "../types.js";
import { BasicDateTableEmits, BasicDateTableProps } from "../props/basic-date-table.js";
import * as _$vue from "vue";
import { SetupContext } from "vue";
import dayjs, { Dayjs } from "dayjs";

//#region ../../packages/components/date-picker-panel/src/composables/use-basic-date-table.d.ts
declare const useBasicDateTable: (props: BasicDateTableProps, emit: SetupContext<BasicDateTableEmits>["emit"]) => {
  WEEKS: _$vue.ComputedRef<string[]>;
  rows: _$vue.ComputedRef<DateCell[][] | {
    column?: number | undefined;
    customClass?: string | undefined;
    disabled?: boolean | undefined;
    end?: boolean | undefined;
    inRange?: boolean | undefined;
    row?: number | undefined;
    selected?: {
      clone: () => Dayjs;
      isValid: () => boolean;
      year: {
        (): number;
        (value: number): Dayjs;
      };
      month: {
        (): number;
        (value: number): Dayjs;
      };
      date: {
        (): number;
        (value: number): Dayjs;
      };
      day: {
        (): 0 | 1 | 2 | 3 | 4 | 5 | 6;
        (value: number): Dayjs;
      };
      hour: {
        (): number;
        (value: number): Dayjs;
      };
      minute: {
        (): number;
        (value: number): Dayjs;
      };
      second: {
        (): number;
        (value: number): Dayjs;
      };
      millisecond: {
        (): number;
        (value: number): Dayjs;
      };
      set: (unit: dayjs.UnitType, value: number) => Dayjs;
      get: (unit: dayjs.UnitType) => number;
      add: (value: number, unit?: dayjs.ManipulateType) => Dayjs;
      subtract: (value: number, unit?: dayjs.ManipulateType) => Dayjs;
      startOf: (unit: dayjs.OpUnitType) => Dayjs;
      endOf: (unit: dayjs.OpUnitType) => Dayjs;
      format: (template?: string) => string;
      diff: (date?: dayjs.ConfigType, unit?: dayjs.QUnitType | dayjs.OpUnitType, float?: boolean) => number;
      valueOf: () => number;
      unix: () => number;
      daysInMonth: () => number;
      toDate: () => Date;
      toJSON: () => string;
      toISOString: () => string;
      toString: () => string;
      utcOffset: () => number;
      isBefore: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
      isSame: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
      isAfter: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
      locale: {
        (): string;
        (preset: string | ILocale, object?: Partial<ILocale>): Dayjs;
      };
      localeData: () => dayjs.InstanceLocaleDataReturn;
      week: {
        (): number;
        (value: number): Dayjs;
      };
      weekYear: () => number;
      dayOfYear: {
        (): number;
        (value: number): Dayjs;
      };
      isSameOrAfter: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
      isSameOrBefore: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
    } | undefined;
    isCurrent?: boolean | undefined;
    isSelected?: boolean | undefined;
    start?: boolean | undefined;
    text?: number | undefined;
    renderText?: string | undefined;
    timestamp?: number | undefined;
    date?: Date | undefined;
    dayjs?: {
      clone: () => Dayjs;
      isValid: () => boolean;
      year: {
        (): number;
        (value: number): Dayjs;
      };
      month: {
        (): number;
        (value: number): Dayjs;
      };
      date: {
        (): number;
        (value: number): Dayjs;
      };
      day: {
        (): 0 | 1 | 2 | 3 | 4 | 5 | 6;
        (value: number): Dayjs;
      };
      hour: {
        (): number;
        (value: number): Dayjs;
      };
      minute: {
        (): number;
        (value: number): Dayjs;
      };
      second: {
        (): number;
        (value: number): Dayjs;
      };
      millisecond: {
        (): number;
        (value: number): Dayjs;
      };
      set: (unit: dayjs.UnitType, value: number) => Dayjs;
      get: (unit: dayjs.UnitType) => number;
      add: (value: number, unit?: dayjs.ManipulateType) => Dayjs;
      subtract: (value: number, unit?: dayjs.ManipulateType) => Dayjs;
      startOf: (unit: dayjs.OpUnitType) => Dayjs;
      endOf: (unit: dayjs.OpUnitType) => Dayjs;
      format: (template?: string) => string;
      diff: (date?: dayjs.ConfigType, unit?: dayjs.QUnitType | dayjs.OpUnitType, float?: boolean) => number;
      valueOf: () => number;
      unix: () => number;
      daysInMonth: () => number;
      toDate: () => Date;
      toJSON: () => string;
      toISOString: () => string;
      toString: () => string;
      utcOffset: () => number;
      isBefore: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
      isSame: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
      isAfter: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
      locale: {
        (): string;
        (preset: string | ILocale, object?: Partial<ILocale>): Dayjs;
      };
      localeData: () => dayjs.InstanceLocaleDataReturn;
      week: {
        (): number;
        (value: number): Dayjs;
      };
      weekYear: () => number;
      dayOfYear: {
        (): number;
        (value: number): Dayjs;
      };
      isSameOrAfter: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
      isSameOrBefore: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
    } | undefined;
    type?: ("normal" | "week" | "prev-month" | "next-month" | "today") | undefined;
  }[][]>;
  tbodyRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  currentCellRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  focus: () => Promise<void | undefined>;
  isCurrent: (cell: DateCell) => boolean;
  isWeekActive: (cell: DateCell) => boolean;
  isSelectedCell: (cell: DateCell) => boolean | undefined;
  handlePickDate: (event: FocusEvent | MouseEvent, isKeyboardMovement?: boolean) => void;
  handleMouseUp: (event: MouseEvent) => void;
  handleMouseDown: (event: MouseEvent) => void;
  handleMouseMove: (event: MouseEvent) => void;
  handleFocus: (event: FocusEvent) => void;
};
declare const useBasicDateTableDOM: (props: BasicDateTableProps, {
  isCurrent,
  isWeekActive
}: Pick<ReturnType<typeof useBasicDateTable>, "isCurrent" | "isWeekActive">) => {
  tableKls: _$vue.ComputedRef<string[]>;
  tableLabel: _$vue.ComputedRef<string>;
  weekHeaderClass: string;
  getCellClasses: (cell: DateCell) => string;
  getRowKls: (cell: DateCell) => (string | {
    current: boolean;
  })[];
  t: Translator;
};
//#endregion
export { useBasicDateTable, useBasicDateTableDOM };