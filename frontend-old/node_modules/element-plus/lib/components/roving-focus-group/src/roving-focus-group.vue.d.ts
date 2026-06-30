import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import * as _$vue from "vue";

//#region ../../packages/components/roving-focus-group/src/roving-focus-group.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: _$vue.DefineComponent<{}, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
  ElFocusGroupCollection: {
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
    setup(): void;
  };
  ElRovingFocusGroupImpl: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
    style: EpPropFinalized<(new (...args: any[]) => string | false | _$vue.CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue) | (((new (...args: any[]) => string | false | _$vue.CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue)) | null)[], unknown, unknown, undefined, boolean>;
    currentTabId: {
      readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string) | (() => string | null) | (((new (...args: any[]) => string) | (() => string | null)) | null)[], unknown, unknown>>;
      readonly required: false;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    defaultCurrentTabId: StringConstructor;
    loop: BooleanConstructor;
    dir: EpPropFinalized<StringConstructor, string, unknown, string, boolean>;
    orientation: {
      readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical" | undefined) | (((new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical" | undefined)) | null)[], unknown, unknown>>;
      readonly required: false;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    onBlur: FunctionConstructor;
    onFocus: FunctionConstructor;
    onMousedown: FunctionConstructor;
  }>, void, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, ("currentTabIdChange" | "entryFocus")[], "currentTabIdChange" | "entryFocus", _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
    style: EpPropFinalized<(new (...args: any[]) => string | false | _$vue.CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue) | (((new (...args: any[]) => string | false | _$vue.CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue)) | null)[], unknown, unknown, undefined, boolean>;
    currentTabId: {
      readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string) | (() => string | null) | (((new (...args: any[]) => string) | (() => string | null)) | null)[], unknown, unknown>>;
      readonly required: false;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    defaultCurrentTabId: StringConstructor;
    loop: BooleanConstructor;
    dir: EpPropFinalized<StringConstructor, string, unknown, string, boolean>;
    orientation: {
      readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical" | undefined) | (((new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical" | undefined)) | null)[], unknown, unknown>>;
      readonly required: false;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    onBlur: FunctionConstructor;
    onFocus: FunctionConstructor;
    onMousedown: FunctionConstructor;
  }>> & Readonly<{
    onCurrentTabIdChange?: ((...args: any[]) => any) | undefined;
    onEntryFocus?: ((...args: any[]) => any) | undefined;
  }>, {
    style: _$vue.StyleValue;
    loop: boolean;
    dir: string;
  }, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default as default };