import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import { GetDisabledHours, GetDisabledMinutes, GetDisabledSeconds } from "../common/props.js";
import * as _$vue from "vue";
import * as _$dayjs from "dayjs";

//#region ../../packages/components/time-picker/src/time-picker-com/basic-time-spinner.vue.d.ts
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
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
    readonly type: _$vue.PropType<_$dayjs.Dayjs>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly showSeconds: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly arrowControl: BooleanConstructor;
  readonly amPmMode: EpPropFinalized<(new (...args: any[]) => "" | "a" | "A") | (() => "" | "a" | "A") | (((new (...args: any[]) => "" | "a" | "A") | (() => "" | "a" | "A")) | null)[], unknown, unknown, "", boolean>;
}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  change: (...args: any[]) => void;
  "select-range": (...args: any[]) => void;
  "set-option": (...args: any[]) => void;
}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
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
    readonly type: _$vue.PropType<_$dayjs.Dayjs>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly showSeconds: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly arrowControl: BooleanConstructor;
  readonly amPmMode: EpPropFinalized<(new (...args: any[]) => "" | "a" | "A") | (() => "" | "a" | "A") | (((new (...args: any[]) => "" | "a" | "A") | (() => "" | "a" | "A")) | null)[], unknown, unknown, "", boolean>;
}>> & Readonly<{
  onChange?: ((...args: any[]) => any) | undefined;
  "onSelect-range"?: ((...args: any[]) => any) | undefined;
  "onSet-option"?: ((...args: any[]) => any) | undefined;
}>, {
  readonly arrowControl: boolean;
  readonly showSeconds: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly amPmMode: EpPropMergeType<(new (...args: any[]) => "" | "a" | "A") | (() => "" | "a" | "A") | (((new (...args: any[]) => "" | "a" | "A") | (() => "" | "a" | "A")) | null)[], unknown, unknown>;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
//#endregion
export { _default as default };