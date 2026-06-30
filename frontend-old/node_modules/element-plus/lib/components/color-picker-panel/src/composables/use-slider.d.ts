import { AlphaSliderProps } from "../props/slider.js";
import * as _$vue from "vue";

//#region ../../packages/components/color-picker-panel/src/composables/use-slider.d.ts
interface UseSliderOptions {
  key: 'hue' | 'alpha';
  minValue: number;
  maxValue: number;
}
declare const useSlider: (props: AlphaSliderProps, {
  key,
  minValue,
  maxValue
}: UseSliderOptions) => {
  thumb: _$vue.ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
  bar: _$vue.ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
  currentValue: _$vue.ComputedRef<any>;
  handleDrag: (event: MouseEvent | TouchEvent) => void;
  handleClick: (event: MouseEvent | TouchEvent) => void;
  handleKeydown: (event: KeyboardEvent) => void;
};
interface UseSliderDOMOptions extends Pick<ReturnType<typeof useSlider>, 'bar' | 'thumb' | 'currentValue' | 'handleDrag'> {
  namespace: string;
  maxValue: number;
  getBackground?: () => string;
}
declare const useSliderDOM: (props: AlphaSliderProps, {
  namespace,
  maxValue,
  bar,
  thumb,
  currentValue,
  handleDrag,
  getBackground
}: UseSliderDOMOptions) => {
  rootKls: _$vue.ComputedRef<string[]>;
  barKls: _$vue.ComputedRef<string>;
  barStyle: _$vue.ComputedRef<{
    background: string | undefined;
  }>;
  thumbKls: _$vue.ComputedRef<string>;
  thumbStyle: _$vue.ComputedRef<{
    left: string | undefined;
    top: string | undefined;
  }>;
  thumbLeft: _$vue.Ref<number, number>;
  thumbTop: _$vue.Ref<number, number>;
  update: () => void;
};
//#endregion
export { useSlider, useSliderDOM };