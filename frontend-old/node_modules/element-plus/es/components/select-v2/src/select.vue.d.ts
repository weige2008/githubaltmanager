import { SFCWithInstall } from "../../../utils/vue/typescript.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { Arrayable } from "../../../utils/typescript.js";
import { PopperEffect, PopperInstance, roleTypes } from "../../popper/src/popper.js";
import { Options, Placement } from "../../popper/index.js";
import { TooltipContentInstance } from "../../tooltip/src/content.js";
import { TooltipTriggerType } from "../../tooltip/src/trigger.js";
import { TooltipInstance, UseTooltipProps } from "../../tooltip/src/tooltip.js";
import { TagProps } from "../../tag/src/tag.js";
import { IconProps } from "../../icon/src/icon.js";
import { ScrollbarDirection } from "../../scrollbar/src/scrollbar.js";
import { Option, OptionType, SelectStates } from "./select.types.js";
import { SelectDropdownInstance } from "./select-dropdown.js";
import { SelectV2Props, TagTooltipProps } from "./defaults.js";
import { Props } from "./useProps.js";
import * as _$vue from "vue";
import * as _$_vueuse_core0 from "@vueuse/core";
import * as _$vue_jsx_runtime0 from "vue/jsx-runtime";

//#region ../../packages/components/select-v2/src/select.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
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
  readonly popperStyle: EpPropFinalized<(new (...args: any[]) => string | false | _$vue.CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue) | (((new (...args: any[]) => string | false | _$vue.CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue)) | null)[], unknown, unknown, undefined, boolean>;
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
}>, {
  modelValue: _$vue.ComputedRef<any>;
  selectedLabel: _$vue.ComputedRef<string | string[]>;
  calculatorRef: _$vue.ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
  inputStyle: _$vue.ComputedRef<{
    minWidth: string;
  }>;
  contentId: _$vue.Ref<string, string>;
  BORDER_HORIZONTAL_WIDTH: number;
  inputId: _$vue.Ref<string | undefined, string | undefined>;
  collapseTagSize: _$vue.ComputedRef<"default" | "small">;
  currentPlaceholder: _$vue.ComputedRef<string>;
  expanded: _$vue.Ref<boolean, boolean>;
  emptyText: _$vue.ComputedRef<string | null>;
  popupHeight: _$vue.ComputedRef<number>;
  debounce: _$vue.ComputedRef<number>;
  allOptions: _$vue.ComputedRef<OptionType[]>;
  allOptionsValueMap: _$vue.ComputedRef<Map<any, any>>;
  filteredOptions: _$vue.Ref<({
    [x: string]: any;
  } | {
    [x: string]: any;
    created?: boolean | undefined;
  })[], OptionType[] | ({
    [x: string]: any;
  } | {
    [x: string]: any;
    created?: boolean | undefined;
  })[]>;
  iconComponent: _$vue.ComputedRef<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
  iconReverse: _$vue.ComputedRef<string>;
  tagStyle: _$vue.ComputedRef<{
    maxWidth: string;
  }>;
  collapseTagStyle: _$vue.ComputedRef<{
    maxWidth: string;
  }>;
  popperSize: _$vue.Ref<number, number>;
  dropdownMenuVisible: _$vue.WritableComputedRef<boolean, boolean>;
  hasModelValue: _$vue.ComputedRef<boolean>;
  shouldShowPlaceholder: _$vue.ComputedRef<boolean>;
  selectDisabled: _$vue.ComputedRef<boolean>;
  selectSize: _$vue.ComputedRef<"" | "default" | "large" | "small">;
  needStatusIcon: _$vue.ComputedRef<boolean>;
  showClearBtn: _$vue.ComputedRef<boolean>;
  states: SelectStates;
  isFocused: _$vue.Ref<boolean, boolean>;
  nsSelect: {
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
  nsInput: {
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
  inputRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  menuRef: _$vue.Ref<SelectDropdownInstance | undefined, SelectDropdownInstance | undefined>;
  tagMenuRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  tooltipRef: _$vue.Ref<TooltipInstance | undefined, TooltipInstance | undefined>;
  tagTooltipRef: _$vue.Ref<TooltipInstance | undefined, TooltipInstance | undefined>;
  selectRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  wrapperRef: _$vue.ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
  selectionRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  prefixRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  suffixRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  collapseItemRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  popperRef: _$vue.ComputedRef<HTMLElement | undefined>;
  validateState: _$vue.ComputedRef<"" | "success" | "error" | "validating">;
  validateIcon: _$vue.ComputedRef<_$vue.DefineComponent<{}, void, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any> | undefined>;
  showTagList: _$vue.ComputedRef<Option[]>;
  collapseTagList: _$vue.ComputedRef<Option[]>;
  debouncedOnInputChange: _$_vueuse_core0.UseDebounceFnReturn<() => void>;
  deleteTag: (event: MouseEvent, option: Option) => void;
  getLabel: (option: Option) => any;
  getValue: (option: Option) => any;
  getDisabled: (option: Option) => any;
  getValueKey: (item: unknown) => any;
  getIndex: (option: Option) => any;
  handleClear: () => void;
  handleClickOutside: (event: Event) => void;
  handleDel: (e: KeyboardEvent) => void;
  handleEsc: () => void;
  focus: () => void;
  blur: () => void;
  handleMenuEnter: () => Promise<void>;
  handleResize: () => void;
  resetSelectionWidth: () => void;
  updateTooltip: () => void;
  updateTagTooltip: () => void;
  updateOptions: () => void;
  toggleMenu: (event?: Event) => void;
  scrollTo: (index: number) => void;
  onInput: (event: Event) => void;
  onKeyboardNavigate: (direction: "forward" | "backward", hoveringIndex?: number | undefined) => void;
  onKeyboardSelect: () => void;
  onEndReached: (direction: ScrollbarDirection) => void;
  onSelect: (option: Option) => void;
  onHover: (idx?: number) => void;
  handleCompositionStart: (event: CompositionEvent) => void;
  handleCompositionEnd: (event: CompositionEvent) => void;
  handleCompositionUpdate: (event: CompositionEvent) => void;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  "update:modelValue": (val: SelectV2Props["modelValue"]) => boolean;
  change: (val: SelectV2Props["modelValue"]) => boolean;
  'end-reached': (direction: ScrollbarDirection) => boolean;
  'remove-tag': (val: unknown) => boolean;
  'visible-change': (visible: boolean) => boolean;
  focus: (evt: FocusEvent) => boolean;
  blur: (evt: FocusEvent) => boolean;
  clear: () => boolean;
}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
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
  readonly popperStyle: EpPropFinalized<(new (...args: any[]) => string | false | _$vue.CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue) | (((new (...args: any[]) => string | false | _$vue.CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue)) | null)[], unknown, unknown, undefined, boolean>;
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
}>> & Readonly<{
  onClear?: (() => any) | undefined;
  onFocus?: ((evt: FocusEvent) => any) | undefined;
  onBlur?: ((evt: FocusEvent) => any) | undefined;
  "onUpdate:modelValue"?: ((val: any) => any) | undefined;
  onChange?: ((val: any) => any) | undefined;
  "onVisible-change"?: ((visible: boolean) => any) | undefined;
  "onEnd-reached"?: ((direction: ScrollbarDirection) => any) | undefined;
  "onRemove-tag"?: ((val: unknown) => any) | undefined;
}>, {
  readonly props: Props;
  readonly height: number;
  readonly scrollbarAlwaysOn: boolean;
  readonly multiple: boolean;
  readonly disabled: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly offset: number;
  readonly modelValue: any;
  readonly automaticDropdown: boolean;
  readonly fallbackPlacements: Placement[];
  readonly placement: EpPropMergeType<(new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], Placement, unknown>;
  readonly popperOptions: Partial<Options>;
  readonly effect: EpPropMergeType<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown>;
  readonly popperStyle: _$vue.StyleValue;
  readonly teleported: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly persistent: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly clearable: boolean;
  readonly clearIcon: EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>;
  readonly tabindex: EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>;
  readonly validateEvent: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly valueOnClear: EpPropMergeType<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown>;
  readonly autocomplete: EpPropMergeType<(new (...args: any[]) => "none" | "both" | "inline" | "list") | (() => "none" | "both" | "inline" | "list") | (((new (...args: any[]) => "none" | "both" | "inline" | "list") | (() => "none" | "both" | "inline" | "list")) | null)[], unknown, unknown>;
  readonly suffixIcon: EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>;
  readonly showArrow: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly valueKey: string;
  readonly debounce: number;
  readonly fitInputWidth: EpPropMergeType<readonly [BooleanConstructor, NumberConstructor], unknown, number | boolean>;
  readonly loading: boolean;
  readonly filterable: boolean;
  readonly collapseTags: boolean;
  readonly maxCollapseTags: number;
  readonly collapseTagsTooltip: boolean;
  readonly tagType: EpPropMergeType<StringConstructor, "info" | "primary" | "success" | "warning" | "danger", unknown>;
  readonly tagEffect: EpPropMergeType<StringConstructor, "dark" | "light" | "plain", unknown>;
  readonly allowCreate: boolean;
  readonly remote: boolean;
  readonly multipleLimit: number;
  readonly defaultFirstOption: boolean;
  readonly reserveKeyword: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly tagTooltip: TagTooltipProps;
  readonly remoteShowSuffix: boolean;
  readonly estimatedOptionHeight: number;
  readonly itemHeight: number;
}, {}, {
  ElSelectMenu: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
    loading: BooleanConstructor;
    data: {
      type: ArrayConstructor;
      required: true;
    };
    hoveringIndex: NumberConstructor;
    width: NumberConstructor;
    id: StringConstructor;
    ariaLabel: StringConstructor;
  }>, () => _$vue_jsx_runtime0.JSX.Element, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
    'end-reached': (direction: ScrollbarDirection) => boolean;
  }, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
    loading: BooleanConstructor;
    data: {
      type: ArrayConstructor;
      required: true;
    };
    hoveringIndex: NumberConstructor;
    width: NumberConstructor;
    id: StringConstructor;
    ariaLabel: StringConstructor;
  }>> & Readonly<{
    "onEnd-reached"?: ((direction: ScrollbarDirection) => any) | undefined;
  }>, {
    loading: boolean;
  }, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
  ElTag: SFCWithInstall<{
    new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<TagProps> & Readonly<{
      onClick?: ((evt: MouseEvent) => any) | undefined;
      onClose?: ((evt: MouseEvent) => any) | undefined;
    }>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
      click: (evt: MouseEvent) => void;
      close: (evt: MouseEvent) => void;
    }, _$vue.PublicProps, {
      type: "primary" | "success" | "info" | "warning" | "danger";
      effect: "dark" | "light" | "plain";
    }, false, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<TagProps> & Readonly<{
      onClick?: ((evt: MouseEvent) => any) | undefined;
      onClose?: ((evt: MouseEvent) => any) | undefined;
    }>, {}, {}, {}, {}, {
      type: "primary" | "success" | "info" | "warning" | "danger";
      effect: "dark" | "light" | "plain";
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & _$vue.ComponentOptionsBase<Readonly<TagProps> & Readonly<{
    onClick?: ((evt: MouseEvent) => any) | undefined;
    onClose?: ((evt: MouseEvent) => any) | undefined;
  }>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
    click: (evt: MouseEvent) => void;
    close: (evt: MouseEvent) => void;
  }, string, {
    type: "primary" | "success" | "info" | "warning" | "danger";
    effect: "dark" | "light" | "plain";
  }, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    } & {
      default?: (props: {}) => any;
    };
  })>;
  ElTooltip: SFCWithInstall<{
    new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<UseTooltipProps> & Readonly<{
      onHide?: ((...args: any[]) => any) | undefined;
      onShow?: ((...args: any[]) => any) | undefined;
      onOpen?: ((...args: any[]) => any) | undefined;
      "onUpdate:visible"?: ((...args: any[]) => any) | undefined;
      "onBefore-show"?: ((...args: any[]) => any) | undefined;
      "onBefore-hide"?: ((...args: any[]) => any) | undefined;
      onClose?: ((...args: any[]) => any) | undefined;
    }>, {
      popperRef: _$vue.Ref<PopperInstance | undefined, PopperInstance | undefined>;
      contentRef: _$vue.Ref<TooltipContentInstance | undefined, TooltipContentInstance | undefined>;
      isFocusInsideContent: (event?: FocusEvent) => boolean | undefined;
      updatePopper: () => void;
      onOpen: (event?: Event, delay?: number) => void;
      onClose: (event?: Event, delay?: number) => void;
      hide: (event?: Event) => void;
    }, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
      hide: (...args: any[]) => void;
      show: (...args: any[]) => void;
      open: (...args: any[]) => void;
      "update:visible": (...args: any[]) => void;
      "before-show": (...args: any[]) => void;
      "before-hide": (...args: any[]) => void;
      close: (...args: any[]) => void;
    }, _$vue.PublicProps, {
      style: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
      role: typeof roleTypes[number];
      visible: boolean | null;
      content: string;
      offset: number;
      showAfter: number;
      hideAfter: number;
      autoClose: number;
      boundariesPadding: number;
      gpuAcceleration: boolean;
      placement: Placement;
      popperOptions: Partial<Options>;
      strategy: "fixed" | "absolute";
      arrowOffset: number;
      effect: PopperEffect;
      enterable: boolean;
      popperStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
      stopPopperMouseEvent: boolean;
      loop: boolean;
      pure: boolean;
      focusOnShow: boolean;
      trapping: boolean;
      virtualTriggering: boolean;
      teleported: boolean;
      showArrow: boolean;
      trigger: Arrayable<TooltipTriggerType>;
      triggerKeys: string[];
    }, false, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<UseTooltipProps> & Readonly<{
      onHide?: ((...args: any[]) => any) | undefined;
      onShow?: ((...args: any[]) => any) | undefined;
      onOpen?: ((...args: any[]) => any) | undefined;
      "onUpdate:visible"?: ((...args: any[]) => any) | undefined;
      "onBefore-show"?: ((...args: any[]) => any) | undefined;
      "onBefore-hide"?: ((...args: any[]) => any) | undefined;
      onClose?: ((...args: any[]) => any) | undefined;
    }>, {
      popperRef: _$vue.Ref<PopperInstance | undefined, PopperInstance | undefined>;
      contentRef: _$vue.Ref<TooltipContentInstance | undefined, TooltipContentInstance | undefined>;
      isFocusInsideContent: (event?: FocusEvent) => boolean | undefined;
      updatePopper: () => void;
      onOpen: (event?: Event, delay?: number) => void;
      onClose: (event?: Event, delay?: number) => void;
      hide: (event?: Event) => void;
    }, {}, {}, {}, {
      style: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
      role: typeof roleTypes[number];
      visible: boolean | null;
      content: string;
      offset: number;
      showAfter: number;
      hideAfter: number;
      autoClose: number;
      boundariesPadding: number;
      gpuAcceleration: boolean;
      placement: Placement;
      popperOptions: Partial<Options>;
      strategy: "fixed" | "absolute";
      arrowOffset: number;
      effect: PopperEffect;
      enterable: boolean;
      popperStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
      stopPopperMouseEvent: boolean;
      loop: boolean;
      pure: boolean;
      focusOnShow: boolean;
      trapping: boolean;
      virtualTriggering: boolean;
      teleported: boolean;
      showArrow: boolean;
      trigger: Arrayable<TooltipTriggerType>;
      triggerKeys: string[];
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & _$vue.ComponentOptionsBase<Readonly<UseTooltipProps> & Readonly<{
    onHide?: ((...args: any[]) => any) | undefined;
    onShow?: ((...args: any[]) => any) | undefined;
    onOpen?: ((...args: any[]) => any) | undefined;
    "onUpdate:visible"?: ((...args: any[]) => any) | undefined;
    "onBefore-show"?: ((...args: any[]) => any) | undefined;
    "onBefore-hide"?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
  }>, {
    popperRef: _$vue.Ref<PopperInstance | undefined, PopperInstance | undefined>;
    contentRef: _$vue.Ref<TooltipContentInstance | undefined, TooltipContentInstance | undefined>;
    isFocusInsideContent: (event?: FocusEvent) => boolean | undefined;
    updatePopper: () => void;
    onOpen: (event?: Event, delay?: number) => void;
    onClose: (event?: Event, delay?: number) => void;
    hide: (event?: Event) => void;
  }, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
    hide: (...args: any[]) => void;
    show: (...args: any[]) => void;
    open: (...args: any[]) => void;
    "update:visible": (...args: any[]) => void;
    "before-show": (...args: any[]) => void;
    "before-hide": (...args: any[]) => void;
    close: (...args: any[]) => void;
  }, string, {
    style: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
    role: typeof roleTypes[number];
    visible: boolean | null;
    content: string;
    offset: number;
    showAfter: number;
    hideAfter: number;
    autoClose: number;
    boundariesPadding: number;
    gpuAcceleration: boolean;
    placement: Placement;
    popperOptions: Partial<Options>;
    strategy: "fixed" | "absolute";
    arrowOffset: number;
    effect: PopperEffect;
    enterable: boolean;
    popperStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
    stopPopperMouseEvent: boolean;
    loop: boolean;
    pure: boolean;
    focusOnShow: boolean;
    trapping: boolean;
    virtualTriggering: boolean;
    teleported: boolean;
    showArrow: boolean;
    trigger: Arrayable<TooltipTriggerType>;
    triggerKeys: string[];
  }, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    } & {
      content?: (props: {}) => any;
    };
  })>;
  ElIcon: SFCWithInstall<{
    new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<IconProps> & Readonly<{}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, _$vue.PublicProps, {}, false, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<IconProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & _$vue.ComponentOptionsBase<Readonly<IconProps> & Readonly<{}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, {}, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    };
  })>;
}, {
  ClickOutside: _$vue.ObjectDirective<HTMLElement, any, string, any>;
}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default as default };