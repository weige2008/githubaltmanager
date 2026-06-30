import { Measurable } from "./constants.js";
import { PopperTriggerProps } from "./trigger.js";
import * as _$vue from "vue";

//#region ../../packages/components/popper/src/trigger.vue.d.ts
declare var __VLS_8: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_8) => any;
};
declare const __VLS_base: _$vue.DefineComponent<PopperTriggerProps, {
  /**
   * @description trigger element
   */
  triggerRef: _$vue.Ref<Measurable | undefined, Measurable | undefined>;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<PopperTriggerProps> & Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default as default };