import { DateCell } from "./types.js";
import { DisabledDateType } from "./props/shared.js";
import { ComputedRef } from "vue";
import dayjs, { Dayjs } from "dayjs";

//#region ../../packages/components/date-picker-panel/src/utils.d.ts
type DayRange = [Dayjs | undefined, Dayjs | undefined];
declare const isValidRange: (range: DayRange) => boolean;
type GetDefaultValueParams = {
  lang: string;
  step?: number;
  unit: 'month' | 'year';
  unlinkPanels: boolean;
};
type DefaultValue = [Date, Date] | Date | undefined;
declare const getDefaultValue: (defaultValue: DefaultValue, {
  lang,
  step,
  unit,
  unlinkPanels
}: GetDefaultValueParams) => dayjs.Dayjs[];
type Dimension = {
  row: number;
  column: number;
};
type BuildPickerTableMetadata = {
  startDate?: Dayjs | null;
  unit: 'month' | 'day';
  columnIndexOffset: number;
  now: Dayjs;
  nextEndDate: Dayjs | null;
  relativeDateGetter: (index: number) => Dayjs;
  setCellMetadata?: (cell: DateCell, dimension: {
    rowIndex: number;
    columnIndex: number;
  }) => void;
  setRowMetadata?: (row: DateCell[]) => void;
};
declare const buildPickerTable: (dimension: Dimension, rows: DateCell[][], {
  columnIndexOffset,
  startDate,
  nextEndDate,
  now,
  unit,
  relativeDateGetter,
  setCellMetadata,
  setRowMetadata
}: BuildPickerTableMetadata) => void;
declare const datesInMonth: (date: Dayjs, year: number, month: number, lang: string) => Date[];
declare const getValidDateOfMonth: (date: Dayjs, year: number, month: number, lang: string, disabledDate?: DisabledDateType) => dayjs.Dayjs;
declare const getValidDateOfYear: (value: Dayjs, lang: string, disabledDate?: DisabledDateType) => dayjs.Dayjs;
declare const correctlyParseUserInput: (value: string | Dayjs | Dayjs[], format: string, lang: string, defaultFormat: ComputedRef<boolean> | undefined) => Dayjs | Dayjs[];
//#endregion
export { DefaultValue, buildPickerTable, correctlyParseUserInput, datesInMonth, getDefaultValue, getValidDateOfMonth, getValidDateOfYear, isValidRange };