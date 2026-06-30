import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import { CellClassNameType, DisabledDateType, RangeState } from "../props/shared.js";
import * as _$vue from "vue";
import dayjs from "dayjs";

//#region ../../packages/components/date-picker-panel/src/date-picker-com/basic-month-table.vue.d.ts
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
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
    readonly type: _$vue.PropType<dayjs.Dayjs>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  minDate: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => dayjs.Dayjs) | (() => dayjs.Dayjs | null) | (((new (...args: any[]) => dayjs.Dayjs) | (() => dayjs.Dayjs | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  maxDate: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => dayjs.Dayjs) | (() => dayjs.Dayjs | null) | (((new (...args: any[]) => dayjs.Dayjs) | (() => dayjs.Dayjs | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  parsedValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => dayjs.Dayjs | dayjs.Dayjs[]) | (() => dayjs.Dayjs | dayjs.Dayjs[]) | (((new (...args: any[]) => dayjs.Dayjs | dayjs.Dayjs[]) | (() => dayjs.Dayjs | dayjs.Dayjs[])) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  rangeState: EpPropFinalized<(new (...args: any[]) => RangeState) | (() => RangeState) | (((new (...args: any[]) => RangeState) | (() => RangeState)) | null)[], unknown, unknown, () => {
    endDate: null;
    selecting: boolean;
  }, boolean>;
  disabled: BooleanConstructor;
}>, {
  /**
   * @description focus current cell
   */
  focus: () => void;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  select: (...args: any[]) => void;
  pick: (...args: any[]) => void;
  changerange: (...args: any[]) => void;
}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
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
    readonly type: _$vue.PropType<dayjs.Dayjs>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  minDate: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => dayjs.Dayjs) | (() => dayjs.Dayjs | null) | (((new (...args: any[]) => dayjs.Dayjs) | (() => dayjs.Dayjs | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  maxDate: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => dayjs.Dayjs) | (() => dayjs.Dayjs | null) | (((new (...args: any[]) => dayjs.Dayjs) | (() => dayjs.Dayjs | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  parsedValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => dayjs.Dayjs | dayjs.Dayjs[]) | (() => dayjs.Dayjs | dayjs.Dayjs[]) | (((new (...args: any[]) => dayjs.Dayjs | dayjs.Dayjs[]) | (() => dayjs.Dayjs | dayjs.Dayjs[])) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  rangeState: EpPropFinalized<(new (...args: any[]) => RangeState) | (() => RangeState) | (((new (...args: any[]) => RangeState) | (() => RangeState)) | null)[], unknown, unknown, () => {
    endDate: null;
    selecting: boolean;
  }, boolean>;
  disabled: BooleanConstructor;
}>> & Readonly<{
  onSelect?: ((...args: any[]) => any) | undefined;
  onPick?: ((...args: any[]) => any) | undefined;
  onChangerange?: ((...args: any[]) => any) | undefined;
}>, {
  disabled: boolean;
  rangeState: RangeState;
  selectionMode: string;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
//#endregion
export { _default as default };