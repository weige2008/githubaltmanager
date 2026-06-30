import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import { DayOrDays } from "../../../time-picker/src/common/props.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";
import { Dayjs } from "dayjs";

//#region ../../packages/components/date-picker-panel/src/props/shared.d.ts
declare const selectionModes: string[];
type RangeState = {
  endDate: null | Dayjs;
  selecting: boolean;
};
type DisabledDateType = (date: Date) => boolean;
type CellClassNameType = (date: Date) => string;
declare const datePickerSharedProps: {
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
declare const panelSharedProps: {
  readonly type: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (((new (...args: any[]) => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange")) | null)[], "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange", unknown>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly dateFormat: StringConstructor;
  readonly timeFormat: StringConstructor;
  readonly showNow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showConfirm: BooleanConstructor;
  readonly showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showWeekNumber: BooleanConstructor;
  readonly border: BooleanConstructor;
  readonly disabled: BooleanConstructor;
  readonly editable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
};
declare const panelRangeSharedProps: {
  readonly unlinkPanels: BooleanConstructor;
  readonly visible: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showConfirm: BooleanConstructor;
  readonly showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly border: BooleanConstructor;
  readonly disabled: BooleanConstructor;
  readonly parsedValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => Dayjs | [Dayjs, Dayjs]) | (() => DayOrDays) | (((new (...args: any[]) => Dayjs | [Dayjs, Dayjs]) | (() => DayOrDays)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly singlePanel: BooleanConstructor;
};
declare const selectionModeWithDefault: (mode: (typeof selectionModes)[number]) => {
  type: StringConstructor;
  values: string[];
  default: string;
};
declare const rangePickerSharedEmits: {
  pick: (range: [Dayjs, Dayjs]) => boolean;
};
type RangePickerSharedEmits = typeof rangePickerSharedEmits;
type PanelRangeSharedProps = ExtractPropTypes<typeof panelRangeSharedProps>;
type PanelRangeSharedPropsPublic = ExtractPublicPropTypes<typeof panelRangeSharedProps>;
//#endregion
export { CellClassNameType, DisabledDateType, PanelRangeSharedProps, PanelRangeSharedPropsPublic, RangePickerSharedEmits, RangeState, datePickerSharedProps, panelRangeSharedProps, panelSharedProps, rangePickerSharedEmits, selectionModeWithDefault };