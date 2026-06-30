import { DialogProps, DialogTransition } from "./dialog.js";
import * as _$vue from "vue";

//#region ../../packages/components/dialog/src/dialog.vue.d.ts
declare var __VLS_43: {
    close: () => void;
    titleId: string;
    titleClass: string;
  }, __VLS_45: {}, __VLS_47: {}, __VLS_50: {};
type __VLS_Slots = {} & {
  header?: (props: typeof __VLS_43) => any;
} & {
  title?: (props: typeof __VLS_45) => any;
} & {
  default?: (props: typeof __VLS_47) => any;
} & {
  footer?: (props: typeof __VLS_50) => any;
};
declare const __VLS_base: _$vue.DefineComponent<DialogProps, {
  /** @description whether the dialog is visible */visible: _$vue.Ref<boolean, boolean>;
  dialogContentRef: _$vue.Ref<any, any>;
  resetPosition: () => void;
  handleClose: () => void;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  open: () => void;
  "update:modelValue": (value: boolean) => void;
  close: () => void;
  opened: () => void;
  closed: () => void;
  openAutoFocus: () => void;
  closeAutoFocus: () => void;
}, string, _$vue.PublicProps, Readonly<DialogProps> & Readonly<{
  onOpen?: (() => any) | undefined;
  "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
  onClose?: (() => any) | undefined;
  onOpened?: (() => any) | undefined;
  onClosed?: (() => any) | undefined;
  onOpenAutoFocus?: (() => any) | undefined;
  onCloseAutoFocus?: (() => any) | undefined;
}>, {
  overflow: boolean;
  transition: DialogTransition;
  appendTo: string | HTMLElement;
  title: string;
  closeOnClickModal: boolean;
  closeOnPressEscape: boolean;
  lockScroll: boolean;
  modal: boolean;
  openDelay: number;
  closeDelay: number;
  headerAriaLevel: string;
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