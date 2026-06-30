import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import * as _$vue from "vue";
import dayjs from "dayjs";

//#region ../../packages/components/time-picker/src/time-picker-com/panel-time-pick.vue.d.ts
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  readonly datetimeRole: StringConstructor;
  readonly parsedValue: {
    readonly type: _$vue.PropType<dayjs.Dayjs>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly visible: BooleanConstructor;
  readonly actualVisible: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly format: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  "select-range": (...args: any[]) => void;
  pick: (...args: any[]) => void;
  "set-picker-option": (...args: any[]) => void;
}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  readonly datetimeRole: StringConstructor;
  readonly parsedValue: {
    readonly type: _$vue.PropType<dayjs.Dayjs>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly visible: BooleanConstructor;
  readonly actualVisible: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly format: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
}>> & Readonly<{
  "onSelect-range"?: ((...args: any[]) => any) | undefined;
  onPick?: ((...args: any[]) => any) | undefined;
  "onSet-picker-option"?: ((...args: any[]) => any) | undefined;
}>, {
  readonly visible: boolean;
  readonly format: string;
  readonly actualVisible: EpPropMergeType<BooleanConstructor, unknown, unknown>;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
//#endregion
export { _default as default };