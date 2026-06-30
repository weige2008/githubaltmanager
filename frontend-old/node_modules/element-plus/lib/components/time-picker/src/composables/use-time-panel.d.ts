import { GetDisabledHours, GetDisabledMinutes, GetDisabledSeconds } from "../common/props.js";
import { Dayjs } from "dayjs";

//#region ../../packages/components/time-picker/src/composables/use-time-panel.d.ts
type UseTimePanelProps = {
  getAvailableHours: GetDisabledHours;
  getAvailableMinutes: GetDisabledMinutes;
  getAvailableSeconds: GetDisabledSeconds;
};
declare const useTimePanel: ({
  getAvailableHours,
  getAvailableMinutes,
  getAvailableSeconds
}: UseTimePanelProps) => {
  timePickerOptions: Record<string, (...args: any[]) => void>;
  getAvailableTime: (date: Dayjs, role: string, first: boolean, compareDate?: Dayjs) => Dayjs;
  onSetOption: ([key, val]: [string, (...args: any[]) => void]) => void;
};
//#endregion
export { useTimePanel };