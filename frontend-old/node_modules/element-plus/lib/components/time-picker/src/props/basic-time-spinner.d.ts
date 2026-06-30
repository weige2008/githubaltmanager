import { EpPropFinalized } from "../../../../utils/vue/props/types.js";
import { GetDisabledHours, GetDisabledMinutes, GetDisabledSeconds } from "../common/props.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";
import { Dayjs } from "dayjs";

//#region ../../packages/components/time-picker/src/props/basic-time-spinner.d.ts
declare const basicTimeSpinnerProps: {
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
  readonly role: {
    readonly type: _$vue.PropType<string>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly spinnerDate: {
    readonly type: _$vue.PropType<Dayjs>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly showSeconds: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly arrowControl: BooleanConstructor;
  readonly amPmMode: EpPropFinalized<(new (...args: any[]) => "" | "a" | "A") | (() => "" | "a" | "A") | (((new (...args: any[]) => "" | "a" | "A") | (() => "" | "a" | "A")) | null)[], unknown, unknown, "", boolean>;
};
type BasicTimeSpinnerProps = ExtractPropTypes<typeof basicTimeSpinnerProps>;
type BasicTimeSpinnerPropsPublic = ExtractPublicPropTypes<typeof basicTimeSpinnerProps>;
//#endregion
export { BasicTimeSpinnerProps, BasicTimeSpinnerPropsPublic, basicTimeSpinnerProps };