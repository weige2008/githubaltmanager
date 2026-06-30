import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import { DayOrDays } from "../../../time-picker/src/common/props.js";
import * as _$vue from "vue";
import dayjs from "dayjs";

//#region ../../packages/components/date-picker-panel/src/date-picker-com/panel-year-range.vue.d.ts
declare var __VLS_1: {
    class: string;
  }, __VLS_3: {}, __VLS_16: {}, __VLS_38: {}, __VLS_51: {};
type __VLS_Slots = {} & {
  sidebar?: (props: typeof __VLS_1) => any;
} & {
  'prev-year'?: (props: typeof __VLS_3) => any;
} & {
  'next-year'?: (props: typeof __VLS_16) => any;
} & {
  'prev-year'?: (props: typeof __VLS_38) => any;
} & {
  'next-year'?: (props: typeof __VLS_51) => any;
};
declare const __VLS_base: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  readonly unlinkPanels: BooleanConstructor;
  readonly visible: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showConfirm: BooleanConstructor;
  readonly showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly border: BooleanConstructor;
  readonly disabled: BooleanConstructor;
  readonly parsedValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => dayjs.Dayjs | [dayjs.Dayjs, dayjs.Dayjs]) | (() => DayOrDays) | (((new (...args: any[]) => dayjs.Dayjs | [dayjs.Dayjs, dayjs.Dayjs]) | (() => DayOrDays)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly singlePanel: BooleanConstructor;
}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  readonly unlinkPanels: BooleanConstructor;
  readonly visible: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showConfirm: BooleanConstructor;
  readonly showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly border: BooleanConstructor;
  readonly disabled: BooleanConstructor;
  readonly parsedValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => dayjs.Dayjs | [dayjs.Dayjs, dayjs.Dayjs]) | (() => DayOrDays) | (((new (...args: any[]) => dayjs.Dayjs | [dayjs.Dayjs, dayjs.Dayjs]) | (() => DayOrDays)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly singlePanel: BooleanConstructor;
}>> & Readonly<{}>, {
  readonly visible: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly border: boolean;
  readonly disabled: boolean;
  readonly showConfirm: boolean;
  readonly showFooter: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly unlinkPanels: boolean;
  readonly singlePanel: boolean;
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