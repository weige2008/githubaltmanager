import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import { CellClassNameType, DisabledDateType, RangeState } from "../props/shared.js";
import * as _$vue from "vue";
import * as _$dayjs from "dayjs";

//#region ../../packages/components/date-picker-panel/src/date-picker-com/basic-date-table.vue.d.ts
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  readonly showWeekNumber: BooleanConstructor;
  readonly selectionMode: EpPropFinalized<StringConstructor, string, unknown, string, boolean>;
  readonly cellClassName: {
    readonly type: _$vue.PropType<CellClassNameType>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabledDate: {
    readonly type: _$vue.PropType<DisabledDateType>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly date: {
    readonly type: _$vue.PropType<_$dayjs.Dayjs>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly minDate: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs) | (() => _$dayjs.Dayjs | null) | (((new (...args: any[]) => _$dayjs.Dayjs) | (() => _$dayjs.Dayjs | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly maxDate: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs) | (() => _$dayjs.Dayjs | null) | (((new (...args: any[]) => _$dayjs.Dayjs) | (() => _$dayjs.Dayjs | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly parsedValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs | _$dayjs.Dayjs[]) | (() => _$dayjs.Dayjs | _$dayjs.Dayjs[]) | (((new (...args: any[]) => _$dayjs.Dayjs | _$dayjs.Dayjs[]) | (() => _$dayjs.Dayjs | _$dayjs.Dayjs[])) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rangeState: EpPropFinalized<(new (...args: any[]) => RangeState) | (() => RangeState) | (((new (...args: any[]) => RangeState) | (() => RangeState)) | null)[], unknown, unknown, () => {
    endDate: null;
    selecting: boolean;
  }, boolean>;
  readonly disabled: BooleanConstructor;
}>, {
  /**
   * @description focus on current cell
   */
  focus: () => Promise<void | undefined>;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  readonly showWeekNumber: BooleanConstructor;
  readonly selectionMode: EpPropFinalized<StringConstructor, string, unknown, string, boolean>;
  readonly cellClassName: {
    readonly type: _$vue.PropType<CellClassNameType>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabledDate: {
    readonly type: _$vue.PropType<DisabledDateType>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly date: {
    readonly type: _$vue.PropType<_$dayjs.Dayjs>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly minDate: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs) | (() => _$dayjs.Dayjs | null) | (((new (...args: any[]) => _$dayjs.Dayjs) | (() => _$dayjs.Dayjs | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly maxDate: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs) | (() => _$dayjs.Dayjs | null) | (((new (...args: any[]) => _$dayjs.Dayjs) | (() => _$dayjs.Dayjs | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly parsedValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs | _$dayjs.Dayjs[]) | (() => _$dayjs.Dayjs | _$dayjs.Dayjs[]) | (((new (...args: any[]) => _$dayjs.Dayjs | _$dayjs.Dayjs[]) | (() => _$dayjs.Dayjs | _$dayjs.Dayjs[])) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rangeState: EpPropFinalized<(new (...args: any[]) => RangeState) | (() => RangeState) | (((new (...args: any[]) => RangeState) | (() => RangeState)) | null)[], unknown, unknown, () => {
    endDate: null;
    selecting: boolean;
  }, boolean>;
  readonly disabled: BooleanConstructor;
}>> & Readonly<{}>, {
  readonly disabled: boolean;
  readonly showWeekNumber: boolean;
  readonly rangeState: RangeState;
  readonly selectionMode: string;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
//#endregion
export { _default as default };