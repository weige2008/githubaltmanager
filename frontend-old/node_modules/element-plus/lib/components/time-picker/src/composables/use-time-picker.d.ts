import { GetDisabledHours, GetDisabledMinutes, GetDisabledSeconds } from "../common/props.js";
import * as _$vue from "vue";
import { MaybeRefOrGetter } from "vue";
import * as _$dayjs from "dayjs";
import { Dayjs } from "dayjs";

//#region ../../packages/components/time-picker/src/composables/use-time-picker.d.ts
declare const getTimeLists: (disabledHours?: GetDisabledHours, disabledMinutes?: GetDisabledMinutes, disabledSeconds?: GetDisabledSeconds) => {
  getHoursList: (role: string, compare?: Dayjs) => boolean[];
  getMinutesList: (hour: number, role: string, compare?: Dayjs) => boolean[];
  getSecondsList: (hour: number, minute: number, role: string, compare?: Dayjs) => boolean[];
};
declare const buildAvailableTimeSlotGetter: (disabledHours: GetDisabledHours, disabledMinutes: GetDisabledMinutes, disabledSeconds: GetDisabledSeconds) => {
  getAvailableHours: GetDisabledHours;
  getAvailableMinutes: GetDisabledMinutes;
  getAvailableSeconds: GetDisabledSeconds;
};
declare const useOldValue: (props: {
  parsedValue?: string | Dayjs | Dayjs[];
  visible: boolean;
}, options: {
  modelValue: MaybeRefOrGetter<unknown>;
  valueOnClear: MaybeRefOrGetter<unknown>;
}) => _$vue.Ref<string | {
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
  set: (unit: _$dayjs.UnitType, value: number) => Dayjs;
  get: (unit: _$dayjs.UnitType) => number;
  add: (value: number, unit?: _$dayjs.ManipulateType) => Dayjs;
  subtract: (value: number, unit?: _$dayjs.ManipulateType) => Dayjs;
  startOf: (unit: _$dayjs.OpUnitType) => Dayjs;
  endOf: (unit: _$dayjs.OpUnitType) => Dayjs;
  format: (template?: string) => string;
  diff: (date?: _$dayjs.ConfigType, unit?: _$dayjs.QUnitType | _$dayjs.OpUnitType, float?: boolean) => number;
  valueOf: () => number;
  unix: () => number;
  daysInMonth: () => number;
  toDate: () => Date;
  toJSON: () => string;
  toISOString: () => string;
  toString: () => string;
  utcOffset: () => number;
  isBefore: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
  isSame: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
  isAfter: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
  locale: {
    (): string;
    (preset: string | ILocale, object?: Partial<ILocale>): Dayjs;
  };
  localeData: () => _$dayjs.InstanceLocaleDataReturn;
  week: {
    (): number;
    (value: number): Dayjs;
  };
  weekYear: () => number;
  dayOfYear: {
    (): number;
    (value: number): Dayjs;
  };
  isSameOrAfter: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
  isSameOrBefore: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
} | {
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
  set: (unit: _$dayjs.UnitType, value: number) => Dayjs;
  get: (unit: _$dayjs.UnitType) => number;
  add: (value: number, unit?: _$dayjs.ManipulateType) => Dayjs;
  subtract: (value: number, unit?: _$dayjs.ManipulateType) => Dayjs;
  startOf: (unit: _$dayjs.OpUnitType) => Dayjs;
  endOf: (unit: _$dayjs.OpUnitType) => Dayjs;
  format: (template?: string) => string;
  diff: (date?: _$dayjs.ConfigType, unit?: _$dayjs.QUnitType | _$dayjs.OpUnitType, float?: boolean) => number;
  valueOf: () => number;
  unix: () => number;
  daysInMonth: () => number;
  toDate: () => Date;
  toJSON: () => string;
  toISOString: () => string;
  toString: () => string;
  utcOffset: () => number;
  isBefore: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
  isSame: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
  isAfter: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
  locale: {
    (): string;
    (preset: string | ILocale, object?: Partial<ILocale>): Dayjs;
  };
  localeData: () => _$dayjs.InstanceLocaleDataReturn;
  week: {
    (): number;
    (value: number): Dayjs;
  };
  weekYear: () => number;
  dayOfYear: {
    (): number;
    (value: number): Dayjs;
  };
  isSameOrAfter: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
  isSameOrBefore: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
}[] | undefined, string | Dayjs | Dayjs[] | {
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
  set: (unit: _$dayjs.UnitType, value: number) => Dayjs;
  get: (unit: _$dayjs.UnitType) => number;
  add: (value: number, unit?: _$dayjs.ManipulateType) => Dayjs;
  subtract: (value: number, unit?: _$dayjs.ManipulateType) => Dayjs;
  startOf: (unit: _$dayjs.OpUnitType) => Dayjs;
  endOf: (unit: _$dayjs.OpUnitType) => Dayjs;
  format: (template?: string) => string;
  diff: (date?: _$dayjs.ConfigType, unit?: _$dayjs.QUnitType | _$dayjs.OpUnitType, float?: boolean) => number;
  valueOf: () => number;
  unix: () => number;
  daysInMonth: () => number;
  toDate: () => Date;
  toJSON: () => string;
  toISOString: () => string;
  toString: () => string;
  utcOffset: () => number;
  isBefore: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
  isSame: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
  isAfter: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
  locale: {
    (): string;
    (preset: string | ILocale, object?: Partial<ILocale>): Dayjs;
  };
  localeData: () => _$dayjs.InstanceLocaleDataReturn;
  week: {
    (): number;
    (value: number): Dayjs;
  };
  weekYear: () => number;
  dayOfYear: {
    (): number;
    (value: number): Dayjs;
  };
  isSameOrAfter: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
  isSameOrBefore: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
} | {
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
  set: (unit: _$dayjs.UnitType, value: number) => Dayjs;
  get: (unit: _$dayjs.UnitType) => number;
  add: (value: number, unit?: _$dayjs.ManipulateType) => Dayjs;
  subtract: (value: number, unit?: _$dayjs.ManipulateType) => Dayjs;
  startOf: (unit: _$dayjs.OpUnitType) => Dayjs;
  endOf: (unit: _$dayjs.OpUnitType) => Dayjs;
  format: (template?: string) => string;
  diff: (date?: _$dayjs.ConfigType, unit?: _$dayjs.QUnitType | _$dayjs.OpUnitType, float?: boolean) => number;
  valueOf: () => number;
  unix: () => number;
  daysInMonth: () => number;
  toDate: () => Date;
  toJSON: () => string;
  toISOString: () => string;
  toString: () => string;
  utcOffset: () => number;
  isBefore: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
  isSame: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
  isAfter: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
  locale: {
    (): string;
    (preset: string | ILocale, object?: Partial<ILocale>): Dayjs;
  };
  localeData: () => _$dayjs.InstanceLocaleDataReturn;
  week: {
    (): number;
    (value: number): Dayjs;
  };
  weekYear: () => number;
  dayOfYear: {
    (): number;
    (value: number): Dayjs;
  };
  isSameOrAfter: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
  isSameOrBefore: (date?: _$dayjs.ConfigType, unit?: _$dayjs.OpUnitType) => boolean;
}[] | undefined>;
//#endregion
export { buildAvailableTimeSlotGetter, getTimeLists, useOldValue };