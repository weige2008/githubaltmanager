import { PanelDateRangeProps } from "../props/panel-date-range.js";
import { ComputedRef, Ref } from "vue";
import { Dayjs } from "dayjs";

//#region ../../packages/components/date-picker-panel/src/composables/use-panel-date-range.d.ts
type CurrentView = 'date' | 'year' | 'month';
type CurrentViewRef = {
  focus: () => void;
};
type Emits = (event: 'pick' | 'set-picker-option' | 'calendar-change' | 'panel-change', ...args: any[]) => void;
declare const usePanelDateRange: (props: PanelDateRangeProps, emit: Emits, leftDate: Ref<Dayjs>, rightDate: Ref<Dayjs>) => {
  leftCurrentView: Ref<CurrentView, CurrentView>;
  rightCurrentView: Ref<CurrentView, CurrentView>;
  leftCurrentViewRef: Ref<CurrentViewRef | undefined, CurrentViewRef | undefined>;
  rightCurrentViewRef: Ref<CurrentViewRef | undefined, CurrentViewRef | undefined>;
  leftYear: ComputedRef<number>;
  rightYear: ComputedRef<number>;
  leftMonth: ComputedRef<number>;
  rightMonth: ComputedRef<number>;
  leftYearLabel: ComputedRef<string>;
  rightYearLabel: ComputedRef<string>;
  showLeftPicker: (view: "month" | "year") => Promise<void>;
  showRightPicker: (view: "month" | "year") => Promise<void>;
  handleLeftYearPick: (year: number) => Promise<void>;
  handleRightYearPick: (year: number) => Promise<void>;
  handleLeftMonthPick: (month: number) => Promise<void>;
  handleRightMonthPick: (month: number) => Promise<void>;
  handlePanelChange: (mode: "month" | "year") => void;
  adjustDateByView: (currentView: CurrentView, date: Dayjs, forward: boolean) => Dayjs;
};
//#endregion
export { Emits, usePanelDateRange };