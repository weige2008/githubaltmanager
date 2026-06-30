import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/space/src/item.d.ts
declare const spaceItemProps: {
  readonly prefixCls: {
    readonly type: _$vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
type SpaceItemProps = ExtractPropTypes<typeof spaceItemProps>;
type SpaceItemPropsPublic = ExtractPublicPropTypes<typeof spaceItemProps>;
declare const SpaceItem: _$vue.DefineComponent<ExtractPropTypes<{
  readonly prefixCls: {
    readonly type: _$vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>, () => _$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
  [key: string]: any;
}>, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<ExtractPropTypes<{
  readonly prefixCls: {
    readonly type: _$vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
type SpaceItemInstance = InstanceType<typeof SpaceItem> & unknown;
//#endregion
export { SpaceItemInstance, SpaceItemProps, SpaceItemPropsPublic, SpaceItem as default, spaceItemProps };