import { FormItemContext } from "../../../form/src/types.js";
import { SliderEmits, SliderInitData, SliderProps } from "../slider.js";
import { SliderButtonInstance } from "../button.js";
import * as _$vue from "vue";
import { CSSProperties, Ref, SetupContext } from "vue";

//#region ../../packages/components/slider/src/composables/use-slide.d.ts
declare const useSlide: (props: SliderProps, initData: SliderInitData, emit: SetupContext<SliderEmits>["emit"]) => {
  elFormItem: FormItemContext | undefined;
  slider: _$vue.ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
  firstButton: Ref<SliderButtonInstance | undefined, SliderButtonInstance | undefined>;
  secondButton: Ref<SliderButtonInstance | undefined, SliderButtonInstance | undefined>;
  sliderDisabled: _$vue.ComputedRef<boolean>;
  minValue: _$vue.ComputedRef<number>;
  maxValue: _$vue.ComputedRef<number>;
  runwayStyle: _$vue.ComputedRef<CSSProperties>;
  barStyle: _$vue.ComputedRef<CSSProperties>;
  resetSize: () => void;
  setPosition: (percent: number) => Ref<SliderButtonInstance | undefined>;
  emitChange: () => Promise<void>;
  onSliderWrapperPrevent: (event: TouchEvent) => void;
  onSliderClick: (event: MouseEvent | TouchEvent) => void;
  onSliderDown: (event: MouseEvent | TouchEvent) => Promise<void>;
  onSliderMarkerDown: (position: number) => void;
  setFirstValue: (firstValue: number | undefined) => void;
  setSecondValue: (secondValue: number) => void;
};
//#endregion
export { useSlide };