import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { PosInfo } from "./types.js";
import * as _$vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/tour/src/mask.d.ts
interface MaskProps {
  /**
   * @description mask's zIndex
   */
  zIndex?: number;
  /**
   * @description whether to show the mask
   */
  visible?: boolean;
  /**
   * @description mask's fill
   */
  fill?: string;
  /***
   * @description mask's transparent space position
   */
  pos?: PosInfo | null;
  /**
   * @description whether the target element can be clickable, when using mask
   */
  targetAreaClickable?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `MaskProps` instead.
 */
declare const maskProps: {
  zIndex: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  visible: BooleanConstructor;
  fill: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  pos: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => PosInfo) | (() => PosInfo | null) | (((new (...args: any[]) => PosInfo) | (() => PosInfo | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  targetAreaClickable: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `MaskProps` instead.
 */
type MaskPropsPublic = ExtractPublicPropTypes<typeof maskProps>;
//#endregion
export { MaskProps, MaskPropsPublic, maskProps };