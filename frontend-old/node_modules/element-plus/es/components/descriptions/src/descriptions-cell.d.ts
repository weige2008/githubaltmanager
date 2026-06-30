import { DescriptionItemVNode } from "./description-item.js";
import { IDescriptionsInject } from "./descriptions.type.js";
import * as _$vue from "vue";
import { PropType } from "vue";

//#region ../../packages/components/descriptions/src/descriptions-cell.d.ts
declare const _default: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  cell: {
    type: PropType<DescriptionItemVNode>;
  };
  tag: {
    type: StringConstructor;
    default: string;
  };
  type: {
    type: StringConstructor;
  };
}>, {
  descriptions: IDescriptionsInject;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  cell: {
    type: PropType<DescriptionItemVNode>;
  };
  tag: {
    type: StringConstructor;
    default: string;
  };
  type: {
    type: StringConstructor;
  };
}>> & Readonly<{}>, {
  tag: string;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default as default };