import { CalendarDateCellType, DateTableProps } from "./date-table.js";
import * as _$vue from "vue";
import * as _$dayjs from "dayjs";

//#region ../../packages/components/calendar/src/date-table.vue.d.ts
declare var __VLS_1: {
  data: {
    isSelected: boolean;
    type: string;
    day: string;
    date: Date;
  };
};
type __VLS_Slots = {} & {
  'date-cell'?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: _$vue.DefineComponent<DateTableProps, {
  /** @description toggle date panel */getFormattedDate: (day: number, type: CalendarDateCellType) => _$dayjs.Dayjs;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  pick: (value: _$dayjs.Dayjs) => void;
}, string, _$vue.PublicProps, Readonly<DateTableProps> & Readonly<{
  onPick?: ((value: _$dayjs.Dayjs) => any) | undefined;
}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default as default };