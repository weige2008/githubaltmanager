import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ElCollectionInjectionContext, ElCollectionItemInjectionContext } from "../../collection/src/tokens.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes, StyleValue } from "vue";

//#region ../../packages/components/roving-focus-group/src/roving-focus-group.d.ts
declare const rovingFocusGroupProps: {
  style: EpPropFinalized<(new (...args: any[]) => string | false | _$vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | _$vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown, undefined, boolean>;
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
};
type ElRovingFocusGroupProps = ExtractPropTypes<typeof rovingFocusGroupProps>;
type ElRovingFocusGroupPropsPublic = ExtractPublicPropTypes<typeof rovingFocusGroupProps>;
declare const ElCollection: {
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
  }, ElCollectionItem: {
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
  }, COLLECTION_INJECTION_KEY: _$vue.InjectionKey<ElCollectionInjectionContext>, COLLECTION_ITEM_INJECTION_KEY: _$vue.InjectionKey<ElCollectionItemInjectionContext>;
//#endregion
export { ElCollection, ElCollectionItem, ElRovingFocusGroupProps, ElRovingFocusGroupPropsPublic, COLLECTION_INJECTION_KEY as ROVING_FOCUS_COLLECTION_INJECTION_KEY, COLLECTION_ITEM_INJECTION_KEY as ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY, rovingFocusGroupProps };