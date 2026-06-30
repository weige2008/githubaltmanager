import { UploadDraggerProps } from "./upload-dragger.js";
import * as _$vue from "vue";

//#region ../../packages/components/upload/src/upload-dragger.vue.d.ts
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: _$vue.DefineComponent<UploadDraggerProps, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  file: (file: File[]) => void;
}, string, _$vue.PublicProps, Readonly<UploadDraggerProps> & Readonly<{
  onFile?: ((file: File[]) => any) | undefined;
}>, {
  disabled: boolean;
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