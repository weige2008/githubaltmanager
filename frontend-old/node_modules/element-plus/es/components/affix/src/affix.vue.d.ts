import { AffixProps } from "./affix.js";
import * as _$vue from "vue";
import * as _$csstype from "csstype";

//#region ../../packages/components/affix/src/affix.vue.d.ts
declare var __VLS_7: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_7) => any;
};
declare const __VLS_base: _$vue.DefineComponent<AffixProps, {
  /** @description update affix status */update: () => void; /** @description update rootRect info */
  updateRoot: () => Promise<void>;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  scroll: (args_0: {
    scrollTop: number;
    fixed: boolean;
  }) => void;
  change: (fixed: boolean) => void;
}, string, _$vue.PublicProps, Readonly<AffixProps> & Readonly<{
  onScroll?: ((args_0: {
    scrollTop: number;
    fixed: boolean;
  }) => any) | undefined;
  onChange?: ((fixed: boolean) => any) | undefined;
}>, {
  position: "top" | "bottom";
  zIndex: _$csstype.Property.ZIndex;
  offset: number;
  appendTo: string | HTMLElement;
  target: string;
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