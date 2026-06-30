import { EpPropMergeType } from "../../../../utils/vue/props/types.js";
import Color from "../utils/color.js";
import * as _$vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/color-picker-panel/src/props/predefine.d.ts
interface PredefineProps {
  colors: string[];
  color: Color;
  enableAlpha: boolean;
  disabled?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `PredefineProps` instead.
 */
declare const predefineProps: {
  readonly colors: {
    readonly type: _$vue.PropType<string[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly color: {
    readonly type: _$vue.PropType<Color>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly enableAlpha: {
    readonly type: _$vue.PropType<EpPropMergeType<BooleanConstructor, unknown, unknown>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `PredefineProps` instead.
 */
type PredefinePropsPublic = ExtractPublicPropTypes<typeof predefineProps>;
//#endregion
export { PredefineProps, PredefinePropsPublic, predefineProps };