import { EpPropMergeType } from "../../../utils/vue/props/types.js";
import * as _$vue from "vue";

//#region ../../packages/components/select/src/option.d.ts
declare const COMPONENT_NAME = "ElOption";
declare const optionProps: {
  value: {
    readonly type: _$vue.PropType<EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  label: {
    readonly type: _$vue.PropType<EpPropMergeType<(StringConstructor | NumberConstructor)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  created: BooleanConstructor;
  disabled: BooleanConstructor;
};
//#endregion
export { COMPONENT_NAME, optionProps };