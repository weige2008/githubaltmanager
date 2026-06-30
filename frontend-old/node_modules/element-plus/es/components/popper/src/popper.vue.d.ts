import { ElPopperInjectionContext } from "./constants.js";
import { PopperProps, roleTypes } from "./popper.js";
import * as _$vue from "vue";

//#region ../../packages/components/popper/src/popper.vue.d.ts
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: _$vue.DefineComponent<PopperProps, ElPopperInjectionContext, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<PopperProps> & Readonly<{}>, {
  role: typeof roleTypes[number];
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