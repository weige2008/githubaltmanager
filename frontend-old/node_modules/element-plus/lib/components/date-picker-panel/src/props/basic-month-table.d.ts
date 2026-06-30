import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import { CellClassNameType, DisabledDateType, RangeState } from "./shared.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";
import * as _$dayjs from "dayjs";

//#region ../../packages/components/date-picker-panel/src/props/basic-month-table.d.ts
declare const basicMonthTableProps: {
  selectionMode: EpPropFinalized<StringConstructor, string, unknown, string, boolean>;
  cellClassName: {
    readonly type: _$vue.PropType<CellClassNameType>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  disabledDate: {
    readonly type: _$vue.PropType<DisabledDateType>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  date: {
    readonly type: _$vue.PropType<_$dayjs.Dayjs>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  minDate: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs) | (() => _$dayjs.Dayjs | null) | (((new (...args: any[]) => _$dayjs.Dayjs) | (() => _$dayjs.Dayjs | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  maxDate: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs) | (() => _$dayjs.Dayjs | null) | (((new (...args: any[]) => _$dayjs.Dayjs) | (() => _$dayjs.Dayjs | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  parsedValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs | _$dayjs.Dayjs[]) | (() => _$dayjs.Dayjs | _$dayjs.Dayjs[]) | (((new (...args: any[]) => _$dayjs.Dayjs | _$dayjs.Dayjs[]) | (() => _$dayjs.Dayjs | _$dayjs.Dayjs[])) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  rangeState: EpPropFinalized<(new (...args: any[]) => RangeState) | (() => RangeState) | (((new (...args: any[]) => RangeState) | (() => RangeState)) | null)[], unknown, unknown, () => {
    endDate: null;
    selecting: boolean;
  }, boolean>;
  disabled: BooleanConstructor;
};
type BasicMonthTableProps = ExtractPropTypes<typeof basicMonthTableProps>;
type BasicMonthTablePropsPublic = ExtractPublicPropTypes<typeof basicMonthTableProps>;
//#endregion
export { BasicMonthTableProps, BasicMonthTablePropsPublic, basicMonthTableProps };