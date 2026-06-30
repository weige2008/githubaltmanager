import Color from "../utils/color.js";
import * as _$vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/color-picker-panel/src/props/sv-panel.d.ts
interface SvPanelProps {
  color: Color;
  disabled?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `SvPanelProps` instead.
 */
declare const svPanelProps: {
  readonly color: {
    readonly type: _$vue.PropType<Color>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `SvPanelProps` instead.
 */
type SvPanelPropsPublic = ExtractPublicPropTypes<typeof svPanelProps>;
//#endregion
export { SvPanelProps, SvPanelPropsPublic, svPanelProps };