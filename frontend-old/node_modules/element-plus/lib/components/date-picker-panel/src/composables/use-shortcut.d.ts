import { useLocale } from "../../../../hooks/use-locale/index.js";
import { RangePickerSharedEmits } from "../props/shared.js";
import { SetupContext } from "vue";

//#region ../../packages/components/date-picker-panel/src/composables/use-shortcut.d.ts
type Shortcut = {
  text: string;
  value: [Date, Date] | (() => [Date, Date]);
  onClick?: (ctx: Omit<SetupContext<RangePickerSharedEmits>, 'expose'>) => void;
};
declare const useShortcut: (lang: ReturnType<typeof useLocale>["lang"]) => (shortcut: Shortcut) => void;
//#endregion
export { Shortcut, useShortcut };