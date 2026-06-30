import { IconPropType } from "../../../utils/vue/icon.js";
import { ButtonNativeType, ButtonProps, ButtonType } from "./button.js";
import * as _$vue from "vue";

//#region ../../packages/components/button/src/button.vue.d.ts
declare var __VLS_11: {}, __VLS_35: {}, __VLS_37: {};
type __VLS_Slots = {} & {
  loading?: (props: typeof __VLS_11) => any;
} & {
  icon?: (props: typeof __VLS_35) => any;
} & {
  default?: (props: typeof __VLS_37) => any;
};
declare const __VLS_base: _$vue.DefineComponent<ButtonProps, {
  /** @description button html element */ref: _$vue.Ref<HTMLButtonElement | undefined, HTMLButtonElement | undefined>; /** @description button size */
  size: _$vue.ComputedRef<"" | "default" | "large" | "small">; /** @description button type */
  type: _$vue.ComputedRef<"default" | "" | "text" | "info" | "primary" | "success" | "warning" | "danger">; /** @description button disabled */
  disabled: _$vue.ComputedRef<boolean>; /** @description whether adding space */
  shouldAddSpace: _$vue.ComputedRef<boolean>;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  click: (evt: MouseEvent) => void;
}, string, _$vue.PublicProps, Readonly<ButtonProps> & Readonly<{
  onClick?: ((evt: MouseEvent) => any) | undefined;
}>, {
  type: ButtonType;
  text: boolean;
  round: boolean;
  dashed: boolean;
  disabled: boolean;
  nativeType: ButtonNativeType;
  loadingIcon: IconPropType;
  plain: boolean;
  autoInsertSpace: boolean;
  tag: string | _$vue.Component;
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