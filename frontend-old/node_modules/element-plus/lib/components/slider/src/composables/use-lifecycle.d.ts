import { SliderInitData, SliderProps } from "../slider.js";
import * as _$vue from "vue";

//#region ../../packages/components/slider/src/composables/use-lifecycle.d.ts
declare const useLifecycle: (props: SliderProps, initData: SliderInitData, resetSize: () => void) => {
  sliderWrapper: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
};
//#endregion
export { useLifecycle };