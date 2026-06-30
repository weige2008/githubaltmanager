import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import * as _$vue from "vue";
import { CSSProperties, ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/menu/src/sub-menu.d.ts
declare const subMenuProps: {
  readonly index: {
    readonly type: _$vue.PropType<string>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly showTimeout: NumberConstructor;
  readonly hideTimeout: NumberConstructor;
  readonly popperClass: StringConstructor;
  readonly popperStyle: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties) | (((new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: BooleanConstructor;
  readonly teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly popperOffset: NumberConstructor;
  readonly expandCloseIcon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly expandOpenIcon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly collapseCloseIcon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly collapseOpenIcon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
type SubMenuProps = ExtractPropTypes<typeof subMenuProps>;
type SubMenuPropsPublic = ExtractPublicPropTypes<typeof subMenuProps>;
declare const _default: _$vue.DefineComponent<ExtractPropTypes<{
  readonly index: {
    readonly type: _$vue.PropType<string>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly showTimeout: NumberConstructor;
  readonly hideTimeout: NumberConstructor;
  readonly popperClass: StringConstructor;
  readonly popperStyle: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties) | (((new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: BooleanConstructor;
  readonly teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly popperOffset: NumberConstructor;
  readonly expandCloseIcon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly expandOpenIcon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly collapseCloseIcon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly collapseOpenIcon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>, () => _$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
  [key: string]: any;
}>, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<ExtractPropTypes<{
  readonly index: {
    readonly type: _$vue.PropType<string>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly showTimeout: NumberConstructor;
  readonly hideTimeout: NumberConstructor;
  readonly popperClass: StringConstructor;
  readonly popperStyle: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties) | (((new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: BooleanConstructor;
  readonly teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly popperOffset: NumberConstructor;
  readonly expandCloseIcon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly expandOpenIcon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly collapseCloseIcon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly collapseOpenIcon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{}>, {
  readonly disabled: boolean;
  readonly teleported: EpPropMergeType<BooleanConstructor, unknown, unknown>;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { SubMenuProps, SubMenuPropsPublic, _default as default, subMenuProps };