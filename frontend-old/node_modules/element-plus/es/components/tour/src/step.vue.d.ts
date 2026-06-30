import { TourMask } from "./types.js";
import { TourStepProps } from "./step.js";
import * as _$vue from "vue";
import * as _$_floating_ui_dom0 from "@floating-ui/dom";

//#region ../../packages/components/tour/src/step.vue.d.ts
declare var __VLS_12: {}, __VLS_14: {};
type __VLS_Slots = {} & {
  header?: (props: typeof __VLS_12) => any;
} & {
  default?: (props: typeof __VLS_14) => any;
};
declare const __VLS_base: _$vue.DefineComponent<TourStepProps, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  close: () => void;
}, string, _$vue.PublicProps, Readonly<TourStepProps> & Readonly<{
  onClose?: (() => any) | undefined;
}>, {
  mask: TourMask;
  placement: _$_floating_ui_dom0.Placement;
  showArrow: boolean;
  showClose: boolean;
  scrollIntoViewOptions: boolean | ScrollIntoViewOptions;
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