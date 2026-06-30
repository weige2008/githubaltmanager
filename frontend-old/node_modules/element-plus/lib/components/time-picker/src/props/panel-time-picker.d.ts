import { EpPropFinalized } from "../../../../utils/vue/props/types.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";
import { Dayjs } from "dayjs";

//#region ../../packages/components/time-picker/src/props/panel-time-picker.d.ts
declare const panelTimePickerProps: {
  readonly datetimeRole: StringConstructor;
  readonly parsedValue: {
    readonly type: _$vue.PropType<Dayjs>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly visible: BooleanConstructor;
  readonly actualVisible: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly format: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
};
type PanelTimePickerProps = ExtractPropTypes<typeof panelTimePickerProps>;
type PanelTimePickerPropsPublic = ExtractPublicPropTypes<typeof panelTimePickerProps>;
//#endregion
export { PanelTimePickerProps, PanelTimePickerPropsPublic, panelTimePickerProps };