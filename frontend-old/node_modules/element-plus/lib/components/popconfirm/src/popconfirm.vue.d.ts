import { IconPropType } from "../../../utils/vue/icon.js";
import { PopperEffect, PopperInstance } from "../../popper/src/popper.js";
import { ButtonType } from "../../button/src/button.js";
import { PopconfirmProps } from "./popconfirm.js";
import * as _$vue from "vue";

//#region ../../packages/components/popconfirm/src/popconfirm.vue.d.ts
declare var __VLS_23: {
    confirm: (e: MouseEvent) => void;
    cancel: (e: MouseEvent) => void;
  }, __VLS_41: {};
type __VLS_Slots = {} & {
  actions?: (props: typeof __VLS_23) => any;
} & {
  reference?: (props: typeof __VLS_41) => any;
};
declare const __VLS_base: _$vue.DefineComponent<PopconfirmProps, {
  popperRef: _$vue.ComputedRef<PopperInstance | undefined>;
  hide: () => void;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  confirm: (e: MouseEvent) => void;
  cancel: (e: MouseEvent) => void;
}, string, _$vue.PublicProps, Readonly<PopconfirmProps> & Readonly<{
  onConfirm?: ((e: MouseEvent) => any) | undefined;
  onCancel?: ((e: MouseEvent) => any) | undefined;
}>, {
  width: string | number;
  icon: IconPropType;
  hideAfter: number;
  effect: PopperEffect;
  teleported: boolean;
  confirmButtonType: ButtonType;
  cancelButtonType: ButtonType;
  iconColor: string;
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