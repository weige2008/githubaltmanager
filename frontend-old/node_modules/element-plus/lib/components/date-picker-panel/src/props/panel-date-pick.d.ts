import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import { DayOrDays } from "../../../time-picker/src/common/props.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";
import * as _$dayjs from "dayjs";

//#region ../../packages/components/date-picker-panel/src/props/panel-date-pick.d.ts
declare const panelDatePickProps: {
  readonly parsedValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays) | (((new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly visible: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly format: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly type: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (((new (...args: any[]) => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange")) | null)[], "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange", unknown>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly dateFormat: StringConstructor;
  readonly timeFormat: StringConstructor;
  readonly showNow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showConfirm: BooleanConstructor;
  readonly showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showWeekNumber: BooleanConstructor;
  readonly border: BooleanConstructor;
  readonly disabled: BooleanConstructor;
  readonly editable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
};
type PanelDatePickProps = ExtractPropTypes<typeof panelDatePickProps>;
type PanelDatePickPropsPublic = ExtractPublicPropTypes<typeof panelDatePickProps>;
//#endregion
export { PanelDatePickProps, PanelDatePickPropsPublic, panelDatePickProps };