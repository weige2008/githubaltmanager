import { StatisticProps } from "./statistic.js";
import * as _$vue from "vue";
import * as _$dayjs from "dayjs";

//#region ../../packages/components/statistic/src/statistic.vue.d.ts
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {};
type __VLS_Slots = {} & {
  title?: (props: typeof __VLS_1) => any;
} & {
  prefix?: (props: typeof __VLS_3) => any;
} & {
  suffix?: (props: typeof __VLS_5) => any;
};
declare const __VLS_base: _$vue.DefineComponent<StatisticProps, {
  /**
   * @description current display value
   */
  displayValue: _$vue.ComputedRef<string | number | _$dayjs.Dayjs>;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<StatisticProps> & Readonly<{}>, {
  value: number | _$dayjs.Dayjs;
  precision: number;
  decimalSeparator: string;
  groupSeparator: string;
  valueStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
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