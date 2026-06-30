import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import _default from "./bar.vue.js";
import * as _$vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/scrollbar/src/bar.d.ts
interface BarProps {
  always?: boolean;
  minSize: number;
}
/**
 * @deprecated Removed after 3.0.0, Use `BarProps` instead.
 */
declare const barProps: {
  readonly always: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly minSize: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `BarProps` instead.
 */
type BarPropsPublic = ExtractPublicPropTypes<typeof barProps>;
type BarInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { BarInstance, BarProps, BarPropsPublic, barProps };