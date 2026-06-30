import { EmitFn } from "../../../utils/vue/typescript.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { PopperEffect } from "../../popper/src/popper.js";
import { Options, Placement } from "../../popper/index.js";
import { ScrollbarDirection } from "../../scrollbar/src/scrollbar.js";
import { Option, OptionType } from "./select.types.js";
import _default from "./select.vue.js";
import { Props } from "./useProps.js";
import * as _$vue from "vue";
import { CSSProperties, ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/select-v2/src/defaults.d.ts
/**
 * @description Tag tooltip configuration interface
 */
interface TagTooltipProps {
  appendTo?: string | HTMLElement;
  placement?: Placement;
  fallbackPlacements?: Placement[];
  effect?: PopperEffect;
  popperClass?: string;
  popperStyle?: string | CSSProperties;
  transition?: string;
  teleported?: boolean;
  popperOptions?: Partial<Options>;
  showAfter?: number;
  hideAfter?: number;
  autoClose?: number;
  offset?: number;
}
declare const selectV2Props: {
  readonly ariaLabel: StringConstructor;
  readonly emptyValues: ArrayConstructor;
  readonly valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  readonly allowCreate: BooleanConstructor;
  readonly autocomplete: EpPropFinalized<(new (...args: any[]) => "none" | "both" | "inline" | "list") | (() => "none" | "both" | "inline" | "list") | (((new (...args: any[]) => "none" | "both" | "inline" | "list") | (() => "none" | "both" | "inline" | "list")) | null)[], unknown, unknown, "none", boolean>;
  readonly automaticDropdown: BooleanConstructor;
  readonly clearable: BooleanConstructor;
  readonly clearIcon: EpPropFinalized<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown, _$vue.DefineComponent<{}, void, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly effect: EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown, "light", boolean>;
  readonly collapseTags: BooleanConstructor;
  readonly collapseTagsTooltip: BooleanConstructor;
  readonly tagTooltip: EpPropFinalized<(new (...args: any[]) => TagTooltipProps) | (() => TagTooltipProps) | (((new (...args: any[]) => TagTooltipProps) | (() => TagTooltipProps)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly maxCollapseTags: EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
  readonly defaultFirstOption: BooleanConstructor;
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly estimatedOptionHeight: EpPropFinalized<NumberConstructor, unknown, unknown, undefined, boolean>;
  readonly filterable: BooleanConstructor;
  readonly filterMethod: {
    readonly type: _$vue.PropType<(query: string) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly height: EpPropFinalized<NumberConstructor, unknown, unknown, 274, boolean>;
  readonly itemHeight: EpPropFinalized<NumberConstructor, unknown, unknown, 34, boolean>;
  readonly id: StringConstructor;
  readonly loading: BooleanConstructor;
  readonly loadingText: StringConstructor;
  readonly modelValue: EpPropFinalized<(new (...args: any[]) => any) | (() => any) | {
    (): any;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => any) | (() => any) | {
    (): any;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, undefined, boolean>;
  readonly multiple: BooleanConstructor;
  readonly multipleLimit: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly name: StringConstructor;
  readonly noDataText: StringConstructor;
  readonly noMatchText: StringConstructor;
  readonly remoteMethod: {
    readonly type: _$vue.PropType<(query: string) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly reserveKeyword: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly options: {
    readonly type: _$vue.PropType<OptionType[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly placeholder: {
    readonly type: _$vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
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
  readonly popperStyle: EpPropFinalized<(new (...args: any[]) => string | false | CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue) | (((new (...args: any[]) => string | false | CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue)) | null)[], unknown, unknown, undefined, boolean>;
  readonly popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => Partial<Options>, boolean>;
  readonly remote: BooleanConstructor;
  readonly debounce: EpPropFinalized<NumberConstructor, unknown, unknown, 300, boolean>;
  readonly size: {
    readonly type: _$vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "large" | "small", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly props: EpPropFinalized<(new (...args: any[]) => Props) | (() => Props) | (((new (...args: any[]) => Props) | (() => Props)) | null)[], unknown, unknown, () => Required<Props>, boolean>;
  readonly valueKey: EpPropFinalized<StringConstructor, unknown, unknown, "value", boolean>;
  readonly scrollbarAlwaysOn: BooleanConstructor;
  readonly validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly offset: EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
  readonly remoteShowSuffix: BooleanConstructor;
  readonly showArrow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly placement: EpPropFinalized<(new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], Placement, unknown, "bottom-start", boolean>;
  readonly fallbackPlacements: EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | (((new (...args: any[]) => Placement[]) | (() => Placement[])) | null)[], unknown, unknown, readonly ["bottom-start", "top-start", "right", "left"], boolean>;
  readonly tagType: {
    readonly default: "info";
    readonly type: _$vue.PropType<EpPropMergeType<StringConstructor, "info" | "primary" | "success" | "warning" | "danger", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly tagEffect: {
    readonly default: "light";
    readonly type: _$vue.PropType<EpPropMergeType<StringConstructor, "dark" | "light" | "plain", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly tabindex: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, 0, boolean>;
  readonly appendTo: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly fitInputWidth: EpPropFinalized<readonly [BooleanConstructor, NumberConstructor], unknown, number | boolean, true, boolean>;
  readonly suffixIcon: EpPropFinalized<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown, _$vue.DefineComponent<{}, void, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>, boolean>;
};
declare const optionV2Props: {
  readonly data: ArrayConstructor;
  readonly disabled: BooleanConstructor;
  readonly hovering: BooleanConstructor;
  readonly item: {
    readonly type: _$vue.PropType<Option>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly index: NumberConstructor;
  readonly style: ObjectConstructor;
  readonly selected: BooleanConstructor;
  readonly created: BooleanConstructor;
};
declare const selectV2Emits: {
  "update:modelValue": (val: SelectV2Props["modelValue"]) => boolean;
  change: (val: SelectV2Props["modelValue"]) => boolean;
  'end-reached': (direction: ScrollbarDirection) => boolean;
  'remove-tag': (val: unknown) => boolean;
  'visible-change': (visible: boolean) => boolean;
  focus: (evt: FocusEvent) => boolean;
  blur: (evt: FocusEvent) => boolean;
  clear: () => boolean;
};
declare const optionV2Emits: {
  hover: (index?: number) => index is number;
  select: (val: Option, index?: number) => boolean;
};
type SelectV2Props = ExtractPropTypes<typeof selectV2Props>;
type SelectV2PropsPublic = ExtractPublicPropTypes<typeof selectV2Props>;
type OptionV2Props = ExtractPropTypes<typeof optionV2Props>;
type OptionV2PropsPublic = ExtractPublicPropTypes<typeof optionV2Props>;
type SelectV2EmitFn = EmitFn<typeof selectV2Emits>;
type OptionV2EmitFn = EmitFn<typeof optionV2Emits>;
type SelectV2Instance = InstanceType<typeof _default> & unknown;
//#endregion
export { OptionV2EmitFn, OptionV2Props, OptionV2PropsPublic, SelectV2EmitFn, SelectV2Instance, SelectV2Props, SelectV2PropsPublic, TagTooltipProps, optionV2Emits, optionV2Props, selectV2Emits, selectV2Props };