import { HueSliderProps } from "../props/slider.js";
import * as _$vue from "vue";

//#region ../../packages/components/color-picker-panel/src/components/hue-slider.vue.d.ts
declare const __VLS_export: _$vue.DefineComponent<HueSliderProps, {
  /**
   * @description bar element ref
   */
  bar: _$vue.ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
  /**
   * @description thumb element ref
   */
  thumb: _$vue.ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
  /**
   * @description thumb top position, only for vertical slider
   */
  thumbTop: _$vue.Ref<number, number>;
  /**
   * @description update hue slider manually
   */
  update: () => void;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<HueSliderProps> & Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
//#endregion
export { _default as default };