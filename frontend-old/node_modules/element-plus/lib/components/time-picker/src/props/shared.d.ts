import { EpPropFinalized } from "../../../../utils/vue/props/types.js";
import { GetDisabledHours, GetDisabledMinutes, GetDisabledSeconds } from "../common/props.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/time-picker/src/props/shared.d.ts
declare const disabledTimeListsProps: {
  readonly disabledHours: {
    readonly type: _$vue.PropType<GetDisabledHours>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabledMinutes: {
    readonly type: _$vue.PropType<GetDisabledMinutes>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabledSeconds: {
    readonly type: _$vue.PropType<GetDisabledSeconds>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
type DisabledTimeListsProps = ExtractPropTypes<typeof disabledTimeListsProps>;
type DisabledTimeListsPropsPublic = ExtractPublicPropTypes<typeof disabledTimeListsProps>;
declare const timePanelSharedProps: {
  readonly visible: BooleanConstructor;
  readonly actualVisible: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly format: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
};
type TimePanelSharedProps = ExtractPropTypes<typeof timePanelSharedProps>;
type TimePanelSharedPropsPublic = ExtractPublicPropTypes<typeof timePanelSharedProps>;
//#endregion
export { DisabledTimeListsProps, DisabledTimeListsPropsPublic, TimePanelSharedProps, TimePanelSharedPropsPublic, disabledTimeListsProps, timePanelSharedProps };