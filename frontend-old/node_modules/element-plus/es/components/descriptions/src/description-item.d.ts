import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes, Slot, VNode } from "vue";

//#region ../../packages/components/descriptions/src/description-item.d.ts
declare const descriptionItemProps: {
  label: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  span: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  rowspan: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  width: EpPropFinalized<(StringConstructor | NumberConstructor)[], unknown, unknown, string, boolean>;
  minWidth: EpPropFinalized<(StringConstructor | NumberConstructor)[], unknown, unknown, string, boolean>;
  labelWidth: {
    readonly type: _$vue.PropType<EpPropMergeType<(StringConstructor | NumberConstructor)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  align: EpPropFinalized<StringConstructor, "left" | "center" | "right", unknown, string, boolean>;
  labelAlign: {
    readonly type: _$vue.PropType<EpPropMergeType<StringConstructor, "left" | "center" | "right", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  className: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  labelClassName: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
};
declare const DescriptionItem: _$vue.DefineComponent<ExtractPropTypes<{
  label: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  span: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  rowspan: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  width: EpPropFinalized<(StringConstructor | NumberConstructor)[], unknown, unknown, string, boolean>;
  minWidth: EpPropFinalized<(StringConstructor | NumberConstructor)[], unknown, unknown, string, boolean>;
  labelWidth: {
    readonly type: _$vue.PropType<EpPropMergeType<(StringConstructor | NumberConstructor)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  align: EpPropFinalized<StringConstructor, "left" | "center" | "right", unknown, string, boolean>;
  labelAlign: {
    readonly type: _$vue.PropType<EpPropMergeType<StringConstructor, "left" | "center" | "right", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  className: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  labelClassName: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<ExtractPropTypes<{
  label: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  span: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  rowspan: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  width: EpPropFinalized<(StringConstructor | NumberConstructor)[], unknown, unknown, string, boolean>;
  minWidth: EpPropFinalized<(StringConstructor | NumberConstructor)[], unknown, unknown, string, boolean>;
  labelWidth: {
    readonly type: _$vue.PropType<EpPropMergeType<(StringConstructor | NumberConstructor)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  align: EpPropFinalized<StringConstructor, "left" | "center" | "right", unknown, string, boolean>;
  labelAlign: {
    readonly type: _$vue.PropType<EpPropMergeType<StringConstructor, "left" | "center" | "right", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  className: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  labelClassName: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
}>> & Readonly<{}>, {
  width: EpPropMergeType<(StringConstructor | NumberConstructor)[], unknown, unknown>;
  className: string;
  minWidth: EpPropMergeType<(StringConstructor | NumberConstructor)[], unknown, unknown>;
  label: string;
  span: number;
  rowspan: number;
  align: EpPropMergeType<StringConstructor, "left" | "center" | "right", unknown>;
  labelClassName: string;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
type DescriptionItemProps = ExtractPropTypes<typeof descriptionItemProps>;
type DescriptionItemPropsPublic = ExtractPublicPropTypes<typeof descriptionItemProps>;
type DescriptionItemVNode = VNode & {
  children: {
    [name: string]: Slot;
  } | null;
  props: Partial<DescriptionItemProps> | null;
};
//#endregion
export { DescriptionItemProps, DescriptionItemPropsPublic, DescriptionItemVNode, DescriptionItem as default, descriptionItemProps };