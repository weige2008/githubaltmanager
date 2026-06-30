import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { Options, Placement } from "../../popper/index.js";
import { GetDisabledHours, GetDisabledMinutes, GetDisabledSeconds, ModelValueType, SingleOrRange } from "./common/props.js";
import * as _$vue from "vue";
import * as _$vue_jsx_runtime0 from "vue/jsx-runtime";

//#region ../../packages/components/time-picker/src/time-picker.d.ts
declare const _default: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  /**
   * @description whether to pick a time range
   */
  isRange: BooleanConstructor;
  showNow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  showConfirm: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  showWeekNumber: BooleanConstructor;
  ariaLabel: StringConstructor;
  emptyValues: ArrayConstructor;
  valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  disabledDate: {
    readonly type: _$vue.PropType<Function>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  cellClassName: {
    readonly type: _$vue.PropType<Function>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  shortcuts: EpPropFinalized<ArrayConstructor, unknown, unknown, () => never[], boolean>;
  arrowControl: BooleanConstructor;
  tabindex: EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown, 0, boolean>;
  validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  unlinkPanels: BooleanConstructor;
  singlePanel: BooleanConstructor;
  placement: EpPropFinalized<(new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], Placement, unknown, "bottom", boolean>;
  fallbackPlacements: EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | (((new (...args: any[]) => Placement[]) | (() => Placement[])) | null)[], unknown, unknown, readonly ["bottom", "top", "right", "left"], boolean>;
  disabledHours: {
    readonly type: _$vue.PropType<GetDisabledHours>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  disabledMinutes: {
    readonly type: _$vue.PropType<GetDisabledMinutes>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  disabledSeconds: {
    readonly type: _$vue.PropType<GetDisabledSeconds>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  automaticDropdown: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  id: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>) | (((new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  name: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>) | (((new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  popperClass: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | /*elided*/any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | /*elided*/any)[])[])[])[])[])[])[])[])[])[])[]) | (((new (...args: any[]) => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | /*elided*/any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | /*elided*/any)[])[])[])[])[])[])[])[])[])[])[])) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  popperStyle: EpPropFinalized<(new (...args: any[]) => string | false | _$vue.CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue) | (((new (...args: any[]) => string | false | _$vue.CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue)) | null)[], unknown, unknown, undefined, boolean>;
  format: StringConstructor;
  valueFormat: StringConstructor;
  dateFormat: StringConstructor;
  timeFormat: StringConstructor;
  type: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  clearable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  clearIcon: EpPropFinalized<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown, _$vue.DefineComponent<{}, void, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>, boolean>;
  editable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  saveOnBlur: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  prefixIcon: EpPropFinalized<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown, "", boolean>;
  size: {
    readonly type: _$vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "large" | "small", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly: BooleanConstructor;
  disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  placeholder: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => {}, boolean>;
  modelValue: EpPropFinalized<(new (...args: any[]) => string | number | Date | string[] | number[] | Date[]) | (() => ModelValueType | null) | (((new (...args: any[]) => string | number | Date | string[] | number[] | Date[]) | (() => ModelValueType | null)) | null)[], unknown, unknown, "", boolean>;
  rangeSeparator: EpPropFinalized<StringConstructor, unknown, unknown, "-", boolean>;
  startPlaceholder: StringConstructor;
  endPlaceholder: StringConstructor;
  defaultValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>) | (((new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  defaultTime: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>) | (((new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>, () => _$vue_jsx_runtime0.JSX.Element, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  /**
   * @description whether to pick a time range
   */
  isRange: BooleanConstructor;
  showNow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  showConfirm: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  showWeekNumber: BooleanConstructor;
  ariaLabel: StringConstructor;
  emptyValues: ArrayConstructor;
  valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  disabledDate: {
    readonly type: _$vue.PropType<Function>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  cellClassName: {
    readonly type: _$vue.PropType<Function>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  shortcuts: EpPropFinalized<ArrayConstructor, unknown, unknown, () => never[], boolean>;
  arrowControl: BooleanConstructor;
  tabindex: EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown, 0, boolean>;
  validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  unlinkPanels: BooleanConstructor;
  singlePanel: BooleanConstructor;
  placement: EpPropFinalized<(new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], Placement, unknown, "bottom", boolean>;
  fallbackPlacements: EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | (((new (...args: any[]) => Placement[]) | (() => Placement[])) | null)[], unknown, unknown, readonly ["bottom", "top", "right", "left"], boolean>;
  disabledHours: {
    readonly type: _$vue.PropType<GetDisabledHours>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  disabledMinutes: {
    readonly type: _$vue.PropType<GetDisabledMinutes>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  disabledSeconds: {
    readonly type: _$vue.PropType<GetDisabledSeconds>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  automaticDropdown: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  id: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>) | (((new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  name: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>) | (((new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  popperClass: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | /*elided*/any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | /*elided*/any)[])[])[])[])[])[])[])[])[])[])[]) | (((new (...args: any[]) => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | /*elided*/any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | /*elided*/any)[])[])[])[])[])[])[])[])[])[])[])) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  popperStyle: EpPropFinalized<(new (...args: any[]) => string | false | _$vue.CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue) | (((new (...args: any[]) => string | false | _$vue.CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue)) | null)[], unknown, unknown, undefined, boolean>;
  format: StringConstructor;
  valueFormat: StringConstructor;
  dateFormat: StringConstructor;
  timeFormat: StringConstructor;
  type: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  clearable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  clearIcon: EpPropFinalized<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown, _$vue.DefineComponent<{}, void, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>, boolean>;
  editable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  saveOnBlur: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  prefixIcon: EpPropFinalized<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown, "", boolean>;
  size: {
    readonly type: _$vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "large" | "small", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly: BooleanConstructor;
  disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  placeholder: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => {}, boolean>;
  modelValue: EpPropFinalized<(new (...args: any[]) => string | number | Date | string[] | number[] | Date[]) | (() => ModelValueType | null) | (((new (...args: any[]) => string | number | Date | string[] | number[] | Date[]) | (() => ModelValueType | null)) | null)[], unknown, unknown, "", boolean>;
  rangeSeparator: EpPropFinalized<StringConstructor, unknown, unknown, "-", boolean>;
  startPlaceholder: StringConstructor;
  endPlaceholder: StringConstructor;
  defaultValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>) | (((new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  defaultTime: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>) | (((new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{
  "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
  type: string;
  disabled: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  modelValue: EpPropMergeType<(new (...args: any[]) => string | number | Date | string[] | number[] | Date[]) | (() => ModelValueType | null) | (((new (...args: any[]) => string | number | Date | string[] | number[] | Date[]) | (() => ModelValueType | null)) | null)[], unknown, unknown>;
  automaticDropdown: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  fallbackPlacements: Placement[];
  placement: EpPropMergeType<(new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], Placement, unknown>;
  popperOptions: Partial<Options>;
  popperStyle: _$vue.StyleValue;
  clearable: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  clearIcon: EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>;
  editable: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  saveOnBlur: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  prefixIcon: EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>;
  placeholder: string;
  rangeSeparator: string;
  shortcuts: unknown[];
  tabindex: EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown>;
  validateEvent: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  valueOnClear: EpPropMergeType<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown>;
  showNow: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  showConfirm: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  showFooter: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  showWeekNumber: boolean;
  arrowControl: boolean;
  unlinkPanels: boolean;
  singlePanel: boolean;
  readonly: boolean;
  isRange: boolean;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default as default };