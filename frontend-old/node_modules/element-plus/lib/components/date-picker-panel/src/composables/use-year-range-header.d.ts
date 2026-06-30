import * as _$vue from "vue";
import { Ref, ToRef } from "vue";
import { Dayjs } from "dayjs";

//#region ../../packages/components/date-picker-panel/src/composables/use-year-range-header.d.ts
declare const useYearRangeHeader: ({
  unlinkPanels,
  leftDate,
  rightDate
}: {
  unlinkPanels: ToRef<boolean>;
  leftDate: Ref<Dayjs>;
  rightDate: Ref<Dayjs>;
}) => {
  leftPrevYear: () => void;
  rightNextYear: () => void;
  leftNextYear: () => void;
  rightPrevYear: () => void;
  leftLabel: _$vue.ComputedRef<string>;
  rightLabel: _$vue.ComputedRef<string>;
  leftYear: _$vue.ComputedRef<number>;
  rightYear: _$vue.ComputedRef<number>;
};
//#endregion
export { useYearRangeHeader };