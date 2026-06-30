import { PopperEffect } from "../../popper/src/popper.js";
import { PopperContentInstance } from "../../popper/src/content.js";
import { Options, Placement } from "../../popper/index.js";
import { ElTooltipContentProps } from "./content.js";
import * as _$vue from "vue";

//#region ../../packages/components/tooltip/src/content.vue.d.ts
declare var __VLS_31: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_31) => any;
};
declare const __VLS_base: _$vue.DefineComponent<ElTooltipContentProps, {
  /**
   * @description el-popper-content component instance
   */
  contentRef: _$vue.Ref<PopperContentInstance | undefined, PopperContentInstance | undefined>;
  /**
   * @description validate current focus event is trigger inside el-popper-content
   */
  isFocusInsideContent: (event?: FocusEvent) => boolean | undefined;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<ElTooltipContentProps> & Readonly<{}>, {
  style: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
  visible: boolean | null;
  content: string;
  offset: number;
  showAfter: number;
  hideAfter: number;
  autoClose: number;
  boundariesPadding: number;
  gpuAcceleration: boolean;
  placement: Placement;
  popperOptions: Partial<Options>;
  strategy: "fixed" | "absolute";
  arrowOffset: number;
  effect: PopperEffect;
  enterable: boolean;
  popperStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
  stopPopperMouseEvent: boolean;
  loop: boolean;
  pure: boolean;
  focusOnShow: boolean;
  trapping: boolean;
  virtualTriggering: boolean;
  teleported: boolean;
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