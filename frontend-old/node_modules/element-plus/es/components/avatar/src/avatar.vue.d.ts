import { AvatarProps } from "./avatar.js";
import * as _$vue from "vue";
import * as _$csstype from "csstype";

//#region ../../packages/components/avatar/src/avatar.vue.d.ts
declare var __VLS_12: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_12) => any;
};
declare const __VLS_base: _$vue.DefineComponent<AvatarProps, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  error: (evt: Event) => void;
}, string, _$vue.PublicProps, Readonly<AvatarProps> & Readonly<{
  onError?: ((evt: Event) => any) | undefined;
}>, {
  src: string;
  fit: _$csstype.Property.ObjectFit;
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