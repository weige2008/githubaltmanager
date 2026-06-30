import { Translator } from "../../../../hooks/use-locale/index.js";
import { PanelRangeSharedProps, RangeState } from "../props/shared.js";
import { Shortcut } from "./use-shortcut.js";
import { DefaultValue } from "../utils.js";
import * as _$vue from "vue";
import { Ref } from "vue";
import dayjs, { Dayjs } from "dayjs";

//#region ../../packages/components/date-picker-panel/src/composables/use-range-picker.d.ts
type UseRangePickerProps = {
  sortDates: (minDate: Dayjs | undefined, maxDate: Dayjs | undefined) => void;
  defaultValue: Ref<DefaultValue>;
  defaultTime?: Ref<DefaultValue>;
  leftDate: Ref<Dayjs>;
  rightDate: Ref<Dayjs>;
  step?: number;
  unit: 'month' | 'year';
};
declare const useRangePicker: (props: PanelRangeSharedProps, {
  defaultValue,
  defaultTime,
  leftDate,
  rightDate,
  step,
  unit,
  sortDates
}: UseRangePickerProps) => {
  minDate: Ref<dayjs.Dayjs | undefined, dayjs.Dayjs | undefined>;
  maxDate: Ref<dayjs.Dayjs | undefined, dayjs.Dayjs | undefined>;
  rangeState: Ref<{
    endDate: {
      clone: () => Dayjs;
      isValid: () => boolean;
      year: {
        (): number;
        (value: number): Dayjs;
      };
      month: {
        (): number;
        (value: number): Dayjs;
      };
      date: {
        (): number;
        (value: number): Dayjs;
      };
      day: {
        (): 0 | 1 | 2 | 3 | 4 | 5 | 6;
        (value: number): Dayjs;
      };
      hour: {
        (): number;
        (value: number): Dayjs;
      };
      minute: {
        (): number;
        (value: number): Dayjs;
      };
      second: {
        (): number;
        (value: number): Dayjs;
      };
      millisecond: {
        (): number;
        (value: number): Dayjs;
      };
      set: (unit: dayjs.UnitType, value: number) => Dayjs;
      get: (unit: dayjs.UnitType) => number;
      add: (value: number, unit?: dayjs.ManipulateType) => Dayjs;
      subtract: (value: number, unit?: dayjs.ManipulateType) => Dayjs;
      startOf: (unit: dayjs.OpUnitType) => Dayjs;
      endOf: (unit: dayjs.OpUnitType) => Dayjs;
      format: (template?: string) => string;
      diff: (date?: dayjs.ConfigType, unit?: dayjs.QUnitType | dayjs.OpUnitType, float?: boolean) => number;
      valueOf: () => number;
      unix: () => number;
      daysInMonth: () => number;
      toDate: () => Date;
      toJSON: () => string;
      toISOString: () => string;
      toString: () => string;
      utcOffset: () => number;
      isBefore: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
      isSame: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
      isAfter: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
      locale: {
        (): string;
        (preset: string | ILocale, object?: Partial<ILocale>): Dayjs;
      };
      localeData: () => dayjs.InstanceLocaleDataReturn;
      week: {
        (): number;
        (value: number): Dayjs;
      };
      weekYear: () => number;
      dayOfYear: {
        (): number;
        (value: number): Dayjs;
      };
      isSameOrAfter: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
      isSameOrBefore: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
    } | null;
    selecting: boolean;
  }, RangeState | {
    endDate: {
      clone: () => Dayjs;
      isValid: () => boolean;
      year: {
        (): number;
        (value: number): Dayjs;
      };
      month: {
        (): number;
        (value: number): Dayjs;
      };
      date: {
        (): number;
        (value: number): Dayjs;
      };
      day: {
        (): 0 | 1 | 2 | 3 | 4 | 5 | 6;
        (value: number): Dayjs;
      };
      hour: {
        (): number;
        (value: number): Dayjs;
      };
      minute: {
        (): number;
        (value: number): Dayjs;
      };
      second: {
        (): number;
        (value: number): Dayjs;
      };
      millisecond: {
        (): number;
        (value: number): Dayjs;
      };
      set: (unit: dayjs.UnitType, value: number) => Dayjs;
      get: (unit: dayjs.UnitType) => number;
      add: (value: number, unit?: dayjs.ManipulateType) => Dayjs;
      subtract: (value: number, unit?: dayjs.ManipulateType) => Dayjs;
      startOf: (unit: dayjs.OpUnitType) => Dayjs;
      endOf: (unit: dayjs.OpUnitType) => Dayjs;
      format: (template?: string) => string;
      diff: (date?: dayjs.ConfigType, unit?: dayjs.QUnitType | dayjs.OpUnitType, float?: boolean) => number;
      valueOf: () => number;
      unix: () => number;
      daysInMonth: () => number;
      toDate: () => Date;
      toJSON: () => string;
      toISOString: () => string;
      toString: () => string;
      utcOffset: () => number;
      isBefore: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
      isSame: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
      isAfter: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
      locale: {
        (): string;
        (preset: string | ILocale, object?: Partial<ILocale>): Dayjs;
      };
      localeData: () => dayjs.InstanceLocaleDataReturn;
      week: {
        (): number;
        (value: number): Dayjs;
      };
      weekYear: () => number;
      dayOfYear: {
        (): number;
        (value: number): Dayjs;
      };
      isSameOrAfter: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
      isSameOrBefore: (date?: dayjs.ConfigType, unit?: dayjs.OpUnitType) => boolean;
    } | null;
    selecting: boolean;
  }>;
  lang: Ref<string, string>;
  ppNs: {
    namespace: _$vue.ComputedRef<string>;
    b: (blockSuffix?: string) => string;
    e: (element?: string) => string;
    m: (modifier?: string) => string;
    be: (blockSuffix?: string, element?: string) => string;
    em: (element?: string, modifier?: string) => string;
    bm: (blockSuffix?: string, modifier?: string) => string;
    bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
    is: {
      (name: string, state: boolean | undefined): string;
      (name: string): string;
    };
    cssVar: (object: Record<string, string>) => Record<string, string>;
    cssVarName: (name: string) => string;
    cssVarBlock: (object: Record<string, string>) => Record<string, string>;
    cssVarBlockName: (name: string) => string;
  };
  drpNs: {
    namespace: _$vue.ComputedRef<string>;
    b: (blockSuffix?: string) => string;
    e: (element?: string) => string;
    m: (modifier?: string) => string;
    be: (blockSuffix?: string, element?: string) => string;
    em: (element?: string, modifier?: string) => string;
    bm: (blockSuffix?: string, modifier?: string) => string;
    bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
    is: {
      (name: string, state: boolean | undefined): string;
      (name: string): string;
    };
    cssVar: (object: Record<string, string>) => Record<string, string>;
    cssVarName: (name: string) => string;
    cssVarBlock: (object: Record<string, string>) => Record<string, string>;
    cssVarBlockName: (name: string) => string;
  };
  handleChangeRange: (val: RangeState) => void;
  handleRangeConfirm: (visible?: boolean) => void;
  handleShortcutClick: (shortcut: Shortcut) => void;
  onSelect: (selecting: boolean) => void;
  parseValue: (parsedValue: PanelRangeSharedProps["parsedValue"]) => void;
  t: Translator;
};
//#endregion
export { useRangePicker };