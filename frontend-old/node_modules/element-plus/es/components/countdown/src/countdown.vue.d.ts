import { CountdownProps } from "./countdown.js";
import * as _$vue from "vue";
import * as _$dayjs from "dayjs";

//#region ../../packages/components/countdown/src/countdown.vue.d.ts
declare var __VLS_10: string, __VLS_11: {};
type __VLS_Slots = {} & { [K in NonNullable<typeof __VLS_10>]?: (props: typeof __VLS_11) => any };
declare const __VLS_base: _$vue.DefineComponent<CountdownProps, {
  /**
   * @description current display value
   */
  displayValue: _$vue.ComputedRef<string>;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  change: (value: number) => void;
  finish: () => void;
}, string, _$vue.PublicProps, Readonly<CountdownProps> & Readonly<{
  onChange?: ((value: number) => any) | undefined;
  onFinish?: (() => any) | undefined;
}>, {
  format: string;
  value: number | _$dayjs.Dayjs;
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