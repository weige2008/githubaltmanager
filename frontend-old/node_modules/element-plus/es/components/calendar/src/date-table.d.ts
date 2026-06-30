import { EpPropMergeType } from "../../../utils/vue/props/types.js";
import * as _$vue from "vue";
import { ExtractPublicPropTypes } from "vue";
import { Dayjs } from "dayjs";

//#region ../../packages/components/calendar/src/date-table.d.ts
type CalendarDateCellType = 'next' | 'prev' | 'current';
type CalendarDateCell = {
  text: number;
  type: CalendarDateCellType;
};
declare const getPrevMonthLastDays: (date: Dayjs, count: number) => number[];
declare const getMonthDays: (date: Dayjs) => number[];
declare const toNestedArr: (days: CalendarDateCell[]) => CalendarDateCell[][];
interface DateTableProps {
  selectedDay?: Dayjs;
  range?: [Dayjs, Dayjs];
  date: Dayjs;
  hideHeader?: boolean;
}
/**
 *  @deprecated Removed after 3.0.0, Use `DateTableProps` instead.
 */
declare const dateTableProps: {
  readonly selectedDay: {
    readonly type: _$vue.PropType<Dayjs>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly range: {
    readonly type: _$vue.PropType<[Dayjs, Dayjs]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly date: {
    readonly type: _$vue.PropType<Dayjs>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly hideHeader: {
    readonly type: _$vue.PropType<EpPropMergeType<BooleanConstructor, unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 *  @deprecated Removed after 3.0.0, Use `DateTableProps` instead.
 */
type DateTablePropsPublic = ExtractPublicPropTypes<typeof dateTableProps>;
declare const dateTableEmits: {
  pick: (value: Dayjs) => boolean;
};
type DateTableEmits = typeof dateTableEmits;
//#endregion
export { CalendarDateCell, CalendarDateCellType, DateTableEmits, DateTableProps, DateTablePropsPublic, dateTableEmits, dateTableProps, getMonthDays, getPrevMonthLastDays, toNestedArr };