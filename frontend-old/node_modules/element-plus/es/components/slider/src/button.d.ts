import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import { Placement } from "../../popper/index.js";
import _default from "./button.vue.js";
import { ComponentPublicInstance, ExtractPropTypes, ExtractPublicPropTypes, Ref } from "vue";

//#region ../../packages/components/slider/src/button.d.ts
declare const sliderButtonProps: {
  readonly modelValue: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly vertical: BooleanConstructor;
  readonly tooltipClass: StringConstructor;
  readonly placement: EpPropFinalized<StringConstructor, Placement, unknown, "top", boolean>;
};
type SliderButtonProps = ExtractPropTypes<typeof sliderButtonProps>;
type SliderButtonPropsPublic = ExtractPublicPropTypes<typeof sliderButtonProps>;
declare const sliderButtonEmits: {
  "update:modelValue": (value: number) => boolean;
};
type SliderButtonEmits = typeof sliderButtonEmits;
type SliderButtonInstance = ComponentPublicInstance<typeof _default>;
type ButtonRefs = Record<'firstButton' | 'secondButton', Ref<SliderButtonInstance | undefined>>;
interface SliderButtonInitData {
  hovering: boolean;
  dragging: boolean;
  isClick: boolean;
  startX: number;
  currentX: number;
  startY: number;
  currentY: number;
  startPosition: number;
  newPosition: number;
  oldValue: number;
}
//#endregion
export { ButtonRefs, SliderButtonEmits, SliderButtonInitData, SliderButtonInstance, SliderButtonProps, SliderButtonPropsPublic, sliderButtonEmits, sliderButtonProps };