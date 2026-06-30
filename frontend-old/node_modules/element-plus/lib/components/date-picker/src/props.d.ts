import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { Options, Placement } from "../../popper/index.js";
import { GetDisabledHours, GetDisabledMinutes, GetDisabledSeconds, ModelValueType, SingleOrRange } from "../../time-picker/src/common/props.js";
import { DatePickerType } from "../../date-picker-panel/src/types.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/date-picker/src/props.d.ts
declare const datePickerProps: {
  readonly type: EpPropFinalized<(new (...args: any[]) => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => DatePickerType) | (((new (...args: any[]) => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => DatePickerType)) | null)[], unknown, unknown, "date", boolean>;
  readonly showNow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showConfirm: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showWeekNumber: BooleanConstructor;
  readonly ariaLabel: StringConstructor;
  readonly emptyValues: ArrayConstructor;
  readonly valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  readonly disabledDate: {
    readonly type: _$vue.PropType<Function>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly cellClassName: {
    readonly type: _$vue.PropType<Function>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly shortcuts: EpPropFinalized<ArrayConstructor, unknown, unknown, () => never[], boolean>;
  readonly arrowControl: BooleanConstructor;
  readonly tabindex: EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown, 0, boolean>;
  readonly validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly unlinkPanels: BooleanConstructor;
  readonly singlePanel: BooleanConstructor;
  readonly placement: EpPropFinalized<(new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], Placement, unknown, "bottom", boolean>;
  readonly fallbackPlacements: EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | (((new (...args: any[]) => Placement[]) | (() => Placement[])) | null)[], unknown, unknown, readonly ["bottom", "top", "right", "left"], boolean>;
  readonly disabledHours: {
    readonly type: _$vue.PropType<GetDisabledHours>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabledMinutes: {
    readonly type: _$vue.PropType<GetDisabledMinutes>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabledSeconds: {
    readonly type: _$vue.PropType<GetDisabledSeconds>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly automaticDropdown: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly id: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>) | (((new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly name: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>) | (((new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly popperClass: {
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
  readonly popperStyle: EpPropFinalized<(new (...args: any[]) => string | false | _$vue.CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue) | (((new (...args: any[]) => string | false | _$vue.CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue)) | null)[], unknown, unknown, undefined, boolean>;
  readonly format: StringConstructor;
  readonly valueFormat: StringConstructor;
  readonly dateFormat: StringConstructor;
  readonly timeFormat: StringConstructor;
  readonly clearable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly clearIcon: EpPropFinalized<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown, _$vue.DefineComponent<{}, void, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly editable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly saveOnBlur: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly prefixIcon: EpPropFinalized<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown, "", boolean>;
  readonly size: {
    readonly type: _$vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "large" | "small", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly readonly: BooleanConstructor;
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly placeholder: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly modelValue: EpPropFinalized<(new (...args: any[]) => string | number | Date | string[] | number[] | Date[]) | (() => ModelValueType | null) | (((new (...args: any[]) => string | number | Date | string[] | number[] | Date[]) | (() => ModelValueType | null)) | null)[], unknown, unknown, "", boolean>;
  readonly rangeSeparator: EpPropFinalized<StringConstructor, unknown, unknown, "-", boolean>;
  readonly startPlaceholder: StringConstructor;
  readonly endPlaceholder: StringConstructor;
  readonly defaultValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>) | (((new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly defaultTime: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>) | (((new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly isRange: BooleanConstructor;
};
type DatePickerProps = ExtractPropTypes<typeof datePickerProps>;
type DatePickerPropsPublic = ExtractPublicPropTypes<typeof datePickerProps>;
//#endregion
export { DatePickerProps, DatePickerPropsPublic, datePickerProps };