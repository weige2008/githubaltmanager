import { IconPropType } from "../../../utils/vue/icon.js";
import { CollapseItemProps } from "./collapse-item.js";
import * as _$vue from "vue";

//#region ../../packages/components/collapse/src/collapse-item.vue.d.ts
declare var __VLS_1: {
    isActive: boolean | undefined;
  }, __VLS_3: {
    isActive: boolean | undefined;
  }, __VLS_22: {};
type __VLS_Slots = {} & {
  title?: (props: typeof __VLS_1) => any;
} & {
  icon?: (props: typeof __VLS_3) => any;
} & {
  default?: (props: typeof __VLS_22) => any;
};
declare const __VLS_base: _$vue.DefineComponent<CollapseItemProps, {
  /** @description current collapse-item whether active */isActive: _$vue.ComputedRef<boolean | undefined>;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<CollapseItemProps> & Readonly<{}>, {
  icon: IconPropType;
  title: string;
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