import { TreeNode } from "./types.js";
import * as _$vue from "vue";

//#region ../../packages/components/tree-v2/src/tree-node-content.d.ts
declare const _default: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  readonly node: {
    readonly type: _$vue.PropType<TreeNode>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>, () => _$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
  [key: string]: any;
}> | _$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
  [key: string]: any;
}>[], {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  readonly node: {
    readonly type: _$vue.PropType<TreeNode>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default as default };