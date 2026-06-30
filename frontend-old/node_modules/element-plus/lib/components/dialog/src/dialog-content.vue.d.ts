import { DialogContentProps } from "./dialog-content.js";
import * as _$vue from "vue";

//#region ../../packages/components/dialog/src/dialog-content.vue.d.ts
declare var __VLS_1: {}, __VLS_14: {}, __VLS_16: {};
type __VLS_Slots = {} & {
  header?: (props: typeof __VLS_1) => any;
} & {
  default?: (props: typeof __VLS_14) => any;
} & {
  footer?: (props: typeof __VLS_16) => any;
};
declare const __VLS_base: _$vue.DefineComponent<DialogContentProps, {
  resetPosition: () => void;
  updatePosition: () => void;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  close: () => void;
}, string, _$vue.PublicProps, Readonly<DialogContentProps> & Readonly<{
  onClose?: (() => any) | undefined;
}>, {
  overflow: boolean;
  title: string;
  alignCenter: boolean;
  draggable: boolean;
  showClose: boolean;
  ariaLevel: string;
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