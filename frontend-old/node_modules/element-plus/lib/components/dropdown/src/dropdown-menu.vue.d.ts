import * as _$vue from "vue";

//#region ../../packages/components/dropdown/src/dropdown-menu.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  onKeydown: {
    readonly type: _$vue.PropType<(e: KeyboardEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>, {
  size: _$vue.ComputedRef<string> | undefined;
  rovingFocusGroupRootStyle: _$vue.Ref<_$vue.StyleValue, _$vue.StyleValue>;
  dropdownKls: _$vue.ComputedRef<string[]>;
  role: _$vue.ComputedRef<"listbox" | "grid" | "menu" | "tooltip" | "dialog" | "group" | "navigation" | "tree" | undefined>;
  triggerId: _$vue.ComputedRef<string>;
  dropdownListWrapperRef: (el: Element | _$vue.ComponentPublicInstance | null) => void;
  handleKeydown: (event: KeyboardEvent) => void;
  onBlur: (e: Event) => void;
  handleFocus: (e: FocusEvent) => void;
  onMousedown: (e: Event) => void;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  onKeydown: {
    readonly type: _$vue.PropType<(e: KeyboardEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default as default };