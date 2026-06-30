import * as _$vue from "vue";

//#region ../../packages/components/roving-focus-group/src/roving-focus-item.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  focusable: {
    type: BooleanConstructor;
    default: boolean;
  };
  active: BooleanConstructor;
}>, {
  id: _$vue.Ref<string, string>;
  handleKeydown: (event: Event) => void;
  handleFocus: (event: Event) => void;
  handleMousedown: (event: Event) => void;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, ("focus" | "keydown" | "mousedown")[], "focus" | "keydown" | "mousedown", _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  focusable: {
    type: BooleanConstructor;
    default: boolean;
  };
  active: BooleanConstructor;
}>> & Readonly<{
  onFocus?: ((...args: any[]) => any) | undefined;
  onKeydown?: ((...args: any[]) => any) | undefined;
  onMousedown?: ((...args: any[]) => any) | undefined;
}>, {
  active: boolean;
  focusable: boolean;
}, {}, {
  ElRovingFocusCollectionItem: {
    new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, _$vue.PublicProps, {}, true, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & _$vue.ComponentOptionsBase<Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, {}, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & {
    name: string;
    setup(_: unknown, {
      attrs
    }: _$vue.SetupContext): void;
  };
}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default as default };