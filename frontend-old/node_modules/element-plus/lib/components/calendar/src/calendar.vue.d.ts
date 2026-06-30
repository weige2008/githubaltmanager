import { CalendarDateType, CalendarProps } from "./calendar.js";
import * as _$vue from "vue";
import * as _$dayjs from "dayjs";

//#region ../../packages/components/calendar/src/calendar.vue.d.ts
declare var __VLS_1: {
    date: string;
  }, __VLS_49: {
    data: {
      isSelected: boolean;
      type: string;
      day: string;
      date: Date;
    };
  }, __VLS_60: {
    data: {
      isSelected: boolean;
      type: string;
      day: string;
      date: Date;
    };
  };
type __VLS_Slots = {} & {
  header?: (props: typeof __VLS_1) => any;
} & {
  'date-cell'?: (props: typeof __VLS_49) => any;
} & {
  'date-cell'?: (props: typeof __VLS_60) => any;
};
declare const __VLS_base: _$vue.DefineComponent<CalendarProps, {
  /** @description currently selected date */selectedDay: _$vue.WritableComputedRef<_$dayjs.Dayjs | undefined, _$dayjs.Dayjs | undefined>; /** @description select a specific date */
  pickDay: (day: _$dayjs.Dayjs) => void; /** @description select date */
  selectDate: (type: CalendarDateType) => void; /** @description Calculate the validate date range according to the start and end dates */
  calculateValidatedDateRange: (startDayjs: _$dayjs.Dayjs, endDayjs: _$dayjs.Dayjs) => [_$dayjs.Dayjs, _$dayjs.Dayjs][];
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  "update:modelValue": (value: Date) => void;
  input: (value: Date) => void;
}, string, _$vue.PublicProps, Readonly<CalendarProps> & Readonly<{
  "onUpdate:modelValue"?: ((value: Date) => any) | undefined;
  onInput?: ((value: Date) => any) | undefined;
}>, {
  controllerType: "button" | "select";
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default as default };