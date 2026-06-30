import { TourGap, TourMask } from "./types.js";
import { TourProps } from "./tour.js";
import * as _$vue from "vue";
import * as _$_floating_ui_dom0 from "@floating-ui/dom";

//#region ../../packages/components/tour/src/tour.vue.d.ts
declare var __VLS_28: {}, __VLS_30: {
    current: number;
    total: number;
  };
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_28) => any;
} & {
  indicators?: (props: typeof __VLS_30) => any;
};
declare const __VLS_base: _$vue.DefineComponent<TourProps, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  "update:modelValue": (value: boolean) => void;
  change: (current: number) => void;
  close: (current: number) => void;
  finish: () => void;
  "update:current": (current: number) => void;
}, string, _$vue.PublicProps, Readonly<TourProps> & Readonly<{
  "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
  onChange?: ((current: number) => any) | undefined;
  onClose?: ((current: number) => any) | undefined;
  onFinish?: (() => any) | undefined;
  "onUpdate:current"?: ((current: number) => any) | undefined;
}>, {
  gap: TourGap;
  mask: TourMask;
  placement: _$_floating_ui_dom0.Placement;
  appendTo: string | HTMLElement;
  showArrow: boolean;
  closeOnPressEscape: boolean;
  showClose: boolean;
  scrollIntoViewOptions: boolean | ScrollIntoViewOptions;
  targetAreaClickable: boolean;
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