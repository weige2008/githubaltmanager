import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import { DayOrDays } from "../../../time-picker/src/common/props.js";
import * as _$vue from "vue";
import dayjs from "dayjs";

//#region ../../packages/components/date-picker-panel/src/date-picker-com/panel-date-pick.vue.d.ts
declare var __VLS_1: {
    class: string;
  }, __VLS_27: {}, __VLS_40: {}, __VLS_53: {}, __VLS_66: {};
type __VLS_Slots = {} & {
  sidebar?: (props: typeof __VLS_1) => any;
} & {
  'prev-year'?: (props: typeof __VLS_27) => any;
} & {
  'prev-month'?: (props: typeof __VLS_40) => any;
} & {
  'next-month'?: (props: typeof __VLS_53) => any;
} & {
  'next-year'?: (props: typeof __VLS_66) => any;
};
declare const __VLS_base: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  readonly parsedValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => dayjs.Dayjs | [dayjs.Dayjs, dayjs.Dayjs]) | (() => DayOrDays) | (((new (...args: any[]) => dayjs.Dayjs | [dayjs.Dayjs, dayjs.Dayjs]) | (() => DayOrDays)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly visible: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly format: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
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
}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  "panel-change": (...args: any[]) => void;
  pick: (...args: any[]) => void;
  "set-picker-option": (...args: any[]) => void;
}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  readonly parsedValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => dayjs.Dayjs | [dayjs.Dayjs, dayjs.Dayjs]) | (() => DayOrDays) | (((new (...args: any[]) => dayjs.Dayjs | [dayjs.Dayjs, dayjs.Dayjs]) | (() => DayOrDays)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly visible: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly format: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
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
}>> & Readonly<{
  "onPanel-change"?: ((...args: any[]) => any) | undefined;
  onPick?: ((...args: any[]) => any) | undefined;
  "onSet-picker-option"?: ((...args: any[]) => any) | undefined;
}>, {
  readonly visible: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly border: boolean;
  readonly disabled: boolean;
  readonly editable: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly showNow: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly showConfirm: boolean;
  readonly showFooter: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly showWeekNumber: boolean;
  readonly format: string;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default as default };