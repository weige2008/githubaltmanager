import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import { DayOrDays } from "../../../time-picker/src/common/props.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";
import * as _$dayjs from "dayjs";

//#region ../../packages/components/date-picker-panel/src/props/panel-month-range.d.ts
declare const panelMonthRangeProps: {
  readonly unlinkPanels: BooleanConstructor;
  readonly visible: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showConfirm: BooleanConstructor;
  readonly showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly border: BooleanConstructor;
  readonly disabled: BooleanConstructor;
  readonly parsedValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays) | (((new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly singlePanel: BooleanConstructor;
};
declare const panelMonthRangeEmits: string[];
type PanelMonthRangeProps = ExtractPropTypes<typeof panelMonthRangeProps>;
type PanelMonthRangePropsPublic = ExtractPublicPropTypes<typeof panelMonthRangeProps>;
//#endregion
export { PanelMonthRangeProps, PanelMonthRangePropsPublic, panelMonthRangeEmits, panelMonthRangeProps };