import { IconPropType } from "../../../utils/vue/icon.js";
import { RateProps } from "./rate.js";
import * as _$vue from "vue";

//#region ../../packages/components/rate/src/rate.vue.d.ts
declare function setCurrentValue(value: number, event?: MouseEvent): void;
declare function resetCurrentValue(): void;
declare const __VLS_export: _$vue.DefineComponent<RateProps, {
  /** @description set current value */setCurrentValue: typeof setCurrentValue; /** @description reset current value */
  resetCurrentValue: typeof resetCurrentValue;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  "update:modelValue": (value: number) => void;
  change: (value: number) => void;
}, string, _$vue.PublicProps, Readonly<RateProps> & Readonly<{
  "onUpdate:modelValue"?: ((value: number) => any) | undefined;
  onChange?: ((value: number) => any) | undefined;
}>, {
  id: string;
  disabled: boolean;
  modelValue: number;
  max: number;
  textColor: string;
  lowThreshold: number;
  highThreshold: number;
  colors: string[] | Record<number, string>;
  voidColor: string;
  disabledVoidColor: string;
  icons: Array<IconPropType> | Record<number, IconPropType>;
  voidIcon: IconPropType;
  disabledVoidIcon: IconPropType;
  texts: string[];
  scoreTemplate: string;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
//#endregion
export { _default as default };