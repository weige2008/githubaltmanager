import { Arrayable } from "../../../utils/typescript.js";
import { TooltipTriggerType, UseTooltipTriggerProps } from "./trigger.js";
import { OnlyChildExpose } from "../../slot/src/only-child.js";
import * as _$vue from "vue";

//#region ../../packages/components/tooltip/src/trigger.vue.d.ts
declare var __VLS_16: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_16) => any;
};
declare const __VLS_base: _$vue.DefineComponent<UseTooltipTriggerProps, {
  /**
   * @description trigger element
   */
  triggerRef: _$vue.Ref<{
    forwardRef: HTMLElement;
  } | null, OnlyChildExpose | {
    forwardRef: HTMLElement;
  } | null>;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<UseTooltipTriggerProps> & Readonly<{}>, {
  trigger: Arrayable<TooltipTriggerType>;
  triggerKeys: string[];
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