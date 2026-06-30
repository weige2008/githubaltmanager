import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { Placement } from "../../popper/index.js";
import * as _$vue from "vue";

//#region ../../packages/components/slider/src/button.vue.d.ts
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  readonly modelValue: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly vertical: BooleanConstructor;
  readonly tooltipClass: StringConstructor;
  readonly placement: EpPropFinalized<StringConstructor, Placement, unknown, "top", boolean>;
}>, {
  onButtonDown: (event: MouseEvent | TouchEvent) => void;
  onKeyDown: (event: KeyboardEvent) => void;
  setPosition: (newPosition: number) => Promise<void>;
  hovering: _$vue.Ref<boolean, boolean>;
  dragging: _$vue.Ref<boolean, boolean>;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  "update:modelValue": (value: number) => void;
}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  readonly modelValue: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly vertical: BooleanConstructor;
  readonly tooltipClass: StringConstructor;
  readonly placement: EpPropFinalized<StringConstructor, Placement, unknown, "top", boolean>;
}>> & Readonly<{
  "onUpdate:modelValue"?: ((value: number) => any) | undefined;
}>, {
  readonly vertical: boolean;
  readonly modelValue: number;
  readonly placement: EpPropMergeType<StringConstructor, Placement, unknown>;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
//#endregion
export { _default as default };