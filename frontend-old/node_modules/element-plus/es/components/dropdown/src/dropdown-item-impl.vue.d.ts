import { SFCWithInstall } from "../../../utils/vue/typescript.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { IconProps } from "../../icon/src/icon.js";
import * as _$vue from "vue";

//#region ../../packages/components/dropdown/src/dropdown-item-impl.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  readonly command: EpPropFinalized<readonly [ObjectConstructor, StringConstructor, NumberConstructor], unknown, unknown, () => {}, boolean>;
  readonly disabled: BooleanConstructor;
  readonly divided: BooleanConstructor;
  readonly textValue: StringConstructor;
  readonly icon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>, {
  ns: {
    namespace: _$vue.ComputedRef<string>;
    b: (blockSuffix?: string) => string;
    e: (element?: string) => string;
    m: (modifier?: string) => string;
    be: (blockSuffix?: string, element?: string) => string;
    em: (element?: string, modifier?: string) => string;
    bm: (blockSuffix?: string, modifier?: string) => string;
    bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
    is: {
      (name: string, state: boolean | undefined): string;
      (name: string): string;
    };
    cssVar: (object: Record<string, string>) => Record<string, string>;
    cssVarName: (name: string) => string;
    cssVarBlock: (object: Record<string, string>) => Record<string, string>;
    cssVarBlockName: (name: string) => string;
  };
  itemRef: (el: Element | _$vue.ComponentPublicInstance | null) => void;
  dataset: {
    "data-el-collection-item": string;
  };
  role: _$vue.ComputedRef<string>;
  tabIndex: _$vue.Ref<number, number>;
  handleFocus: (e: Event) => void;
  handleKeydown: (event: KeyboardEvent) => void;
  handleMousedown: (e: Event) => void;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, ("click" | "pointerleave" | "pointermove" | "clickimpl")[], "click" | "pointerleave" | "pointermove" | "clickimpl", _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  readonly command: EpPropFinalized<readonly [ObjectConstructor, StringConstructor, NumberConstructor], unknown, unknown, () => {}, boolean>;
  readonly disabled: BooleanConstructor;
  readonly divided: BooleanConstructor;
  readonly textValue: StringConstructor;
  readonly icon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{
  onClick?: ((...args: any[]) => any) | undefined;
  onPointermove?: ((...args: any[]) => any) | undefined;
  onPointerleave?: ((...args: any[]) => any) | undefined;
  onClickimpl?: ((...args: any[]) => any) | undefined;
}>, {
  readonly disabled: boolean;
  readonly command: EpPropMergeType<readonly [ObjectConstructor, StringConstructor, NumberConstructor], unknown, unknown>;
  readonly divided: boolean;
}, {}, {
  ElIcon: SFCWithInstall<{
    new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<IconProps> & Readonly<{}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, _$vue.PublicProps, {}, false, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<IconProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & _$vue.ComponentOptionsBase<Readonly<IconProps> & Readonly<{}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, {}, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    };
  })>;
}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default as default };