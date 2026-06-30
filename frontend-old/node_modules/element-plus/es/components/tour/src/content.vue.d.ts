import { TourContentProps } from "./content.js";
import * as _$vue from "vue";
import * as _$_floating_ui_dom0 from "@floating-ui/dom";

//#region ../../packages/components/tour/src/content.vue.d.ts
declare var __VLS_10: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_10) => any;
};
declare const __VLS_base: _$vue.DefineComponent<TourContentProps, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  close: () => void;
}, string, _$vue.PublicProps, Readonly<TourContentProps> & Readonly<{
  onClose?: (() => any) | undefined;
}>, {
  zIndex: number;
  offset: number;
  placement: _$_floating_ui_dom0.Placement;
  strategy: _$_floating_ui_dom0.Strategy;
  reference: HTMLElement | _$_floating_ui_dom0.VirtualElement | null;
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