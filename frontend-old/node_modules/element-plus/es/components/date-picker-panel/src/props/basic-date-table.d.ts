import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import { CellClassNameType, DisabledDateType, RangeState } from "./shared.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";
import { Dayjs } from "dayjs";

//#region ../../packages/components/date-picker-panel/src/props/basic-date-table.d.ts
declare const basicDateTableProps: {
  readonly showWeekNumber: BooleanConstructor;
  readonly selectionMode: EpPropFinalized<StringConstructor, string, unknown, string, boolean>;
  readonly cellClassName: {
    readonly type: _$vue.PropType<CellClassNameType>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabledDate: {
    readonly type: _$vue.PropType<DisabledDateType>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly date: {
    readonly type: _$vue.PropType<Dayjs>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly minDate: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => Dayjs) | (() => Dayjs | null) | (((new (...args: any[]) => Dayjs) | (() => Dayjs | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly maxDate: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => Dayjs) | (() => Dayjs | null) | (((new (...args: any[]) => Dayjs) | (() => Dayjs | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly parsedValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => Dayjs | Dayjs[]) | (() => Dayjs | Dayjs[]) | (((new (...args: any[]) => Dayjs | Dayjs[]) | (() => Dayjs | Dayjs[])) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rangeState: EpPropFinalized<(new (...args: any[]) => RangeState) | (() => RangeState) | (((new (...args: any[]) => RangeState) | (() => RangeState)) | null)[], unknown, unknown, () => {
    endDate: null;
    selecting: boolean;
  }, boolean>;
  readonly disabled: BooleanConstructor;
};
declare const basicDateTableEmits: string[];
type BasicDateTableProps = ExtractPropTypes<typeof basicDateTableProps>;
type BasicDateTablePropsPublic = ExtractPublicPropTypes<typeof basicDateTableProps>;
type BasicDateTableEmits = typeof basicDateTableEmits;
type RangePickerEmits = {
  minDate: Dayjs;
  maxDate: null;
};
type DatePickerEmits = Dayjs;
type DatesPickerEmits = Dayjs[];
type MonthsPickerEmits = Dayjs[];
type YearsPickerEmits = Dayjs[];
type WeekPickerEmits = {
  year: number;
  week: number;
  value: string;
  date: Dayjs;
};
type DateTableEmits = RangePickerEmits | DatePickerEmits | DatesPickerEmits | WeekPickerEmits;
//#endregion
export { BasicDateTableEmits, BasicDateTableProps, BasicDateTablePropsPublic, DatePickerEmits, DateTableEmits, DatesPickerEmits, MonthsPickerEmits, RangePickerEmits, WeekPickerEmits, YearsPickerEmits, basicDateTableEmits, basicDateTableProps };