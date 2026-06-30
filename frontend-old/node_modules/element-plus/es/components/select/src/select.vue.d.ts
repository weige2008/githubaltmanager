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
import { ScrollbarDirection, ScrollbarInstance, ScrollbarProps } from "../../scrollbar/src/scrollbar.js";
import { Option } from "../../select-v2/src/select.types.js";
import { Props } from "../../select-v2/src/useProps.js";
import { SelectProps, TagTooltipProps } from "./select.js";
import { OptionBasic, OptionPublicInstance, OptionValue, SelectContext, SelectStates } from "./type.js";
import * as _$vue from "vue";
import { VNode } from "vue";
import * as _$_vueuse_core0 from "@vueuse/core";

//#region ../../packages/components/select/src/select.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  ariaLabel: StringConstructor;
  emptyValues: ArrayConstructor;
  valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  name: StringConstructor;
  id: StringConstructor;
  modelValue: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Record<string, any> | EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>[]) | (() => EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown> | EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>[] | null) | (((new (...args: any[]) => string | number | boolean | Record<string, any> | EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>[]) | (() => EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown> | EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>[] | null)) | null)[], unknown, unknown, undefined, boolean>;
  autocomplete: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  automaticDropdown: BooleanConstructor;
  size: {
    readonly type: _$vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "large" | "small", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  effect: EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown, string, boolean>;
  disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  clearable: BooleanConstructor;
  filterable: BooleanConstructor;
  allowCreate: BooleanConstructor;
  loading: BooleanConstructor;
  popperClass: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  popperStyle: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | _$vue.CSSProperties) | (() => string | _$vue.CSSProperties) | (((new (...args: any[]) => string | _$vue.CSSProperties) | (() => string | _$vue.CSSProperties)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => Partial<Options>, boolean>;
  remote: BooleanConstructor;
  debounce: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  loadingText: StringConstructor;
  noMatchText: StringConstructor;
  noDataText: StringConstructor;
  remoteMethod: {
    readonly type: _$vue.PropType<(query: string) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  filterMethod: {
    readonly type: _$vue.PropType<(query: string) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  multiple: BooleanConstructor;
  multipleLimit: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  placeholder: {
    readonly type: _$vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  defaultFirstOption: BooleanConstructor;
  reserveKeyword: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  valueKey: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  collapseTags: BooleanConstructor;
  collapseTagsTooltip: BooleanConstructor;
  tagTooltip: EpPropFinalized<(new (...args: any[]) => TagTooltipProps) | (() => TagTooltipProps) | (((new (...args: any[]) => TagTooltipProps) | (() => TagTooltipProps)) | null)[], unknown, unknown, () => {}, boolean>;
  maxCollapseTags: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  clearIcon: EpPropFinalized<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown, _$vue.DefineComponent<{}, void, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>, boolean>;
  fitInputWidth: BooleanConstructor;
  suffixIcon: EpPropFinalized<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown, _$vue.DefineComponent<{}, void, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>, boolean>;
  tagType: {
    default: string;
    type: _$vue.PropType<EpPropMergeType<StringConstructor, "info" | "primary" | "success" | "warning" | "danger", unknown>>;
    required: false;
    validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  tagEffect: {
    default: string;
    type: _$vue.PropType<EpPropMergeType<StringConstructor, "dark" | "light" | "plain", unknown>>;
    required: false;
    validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  remoteShowSuffix: BooleanConstructor;
  showArrow: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  offset: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  placement: EpPropFinalized<(new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], Placement, unknown, string, boolean>;
  fallbackPlacements: EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | (((new (...args: any[]) => Placement[]) | (() => Placement[])) | null)[], unknown, unknown, string[], boolean>;
  tabindex: EpPropFinalized<(StringConstructor | NumberConstructor)[], unknown, unknown, number, boolean>;
  appendTo: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  options: {
    readonly type: _$vue.PropType<Record<string, any>[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  props: EpPropFinalized<(new (...args: any[]) => Props) | (() => Props) | (((new (...args: any[]) => Props) | (() => Props)) | null)[], unknown, unknown, () => Required<Props>, boolean>;
}>, {
  modelValue: _$vue.ComputedRef<string | number | boolean | any[] | Record<string, any> | null | undefined>;
  selectedLabel: _$vue.ComputedRef<string | string[]>;
  calculatorRef: _$vue.ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
  inputStyle: _$vue.ComputedRef<{
    minWidth: string;
  }>;
  getLabel: (option: Option) => any;
  getValue: (option: Option) => any;
  getOptions: (option: Option) => any;
  getDisabled: (option: Option) => any;
  getOptionProps: (option: Record<string, any>) => {
    label: any;
    value: any;
    disabled: any;
  };
  inputId: _$vue.Ref<string | undefined, string | undefined>;
  contentId: _$vue.Ref<string, string>;
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
  states: {
    inputValue: string;
    options: Map<EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>, OptionPublicInstance> & Omit<Map<EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>, OptionPublicInstance>, keyof Map<any, any>>;
    cachedOptions: Map<EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>, OptionPublicInstance> & Omit<Map<EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>, OptionPublicInstance>, keyof Map<any, any>>;
    optionValues: OptionValue[];
    selected: {
      index: number;
      value: OptionValue;
      currentLabel: OptionPublicInstance["currentLabel"];
      isDisabled?: OptionPublicInstance["isDisabled"] | undefined;
    }[];
    hoveringIndex: number;
    inputHovering: boolean;
    selectionWidth: number;
    collapseItemWidth: number;
    previousQuery: string | null;
    selectedLabel: string;
    menuVisibleOnFocus: boolean;
    isBeforeHide: boolean;
  };
  isFocused: _$vue.Ref<boolean, boolean>;
  expanded: _$vue.Ref<boolean, boolean>;
  optionsArray: _$vue.ComputedRef<OptionPublicInstance[]>;
  hoverOption: _$vue.Ref<any, any>;
  selectSize: _$vue.ComputedRef<"" | "default" | "large" | "small">;
  filteredOptionsCount: _$vue.ComputedRef<number>;
  updateTooltip: () => void;
  updateTagTooltip: () => void;
  debouncedOnInputChange: _$_vueuse_core0.UseDebounceFnReturn<() => void>;
  onInput: (event: Event) => void;
  deletePrevTag: (e: KeyboardEvent) => void;
  deleteTag: (event: MouseEvent, tag: OptionBasic) => void;
  deleteSelected: (event: Event) => void;
  handleOptionSelect: (option: OptionPublicInstance) => void;
  scrollToOption: (option: OptionPublicInstance | OptionPublicInstance[] | SelectStates["selected"]) => void;
  hasModelValue: _$vue.ComputedRef<boolean>;
  shouldShowPlaceholder: _$vue.ComputedRef<boolean>;
  currentPlaceholder: _$vue.ComputedRef<string>;
  mouseEnterEventName: string | null;
  needStatusIcon: _$vue.ComputedRef<boolean>;
  showClearBtn: _$vue.ComputedRef<boolean>;
  iconComponent: _$vue.ComputedRef<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
  iconReverse: _$vue.ComputedRef<string>;
  validateState: _$vue.ComputedRef<"" | "success" | "error" | "validating">;
  validateIcon: _$vue.ComputedRef<"" | _$vue.Component>;
  showNewOption: _$vue.ComputedRef<boolean>;
  updateOptions: () => void;
  collapseTagSize: _$vue.ComputedRef<"default" | "small">;
  setSelected: () => void;
  selectDisabled: _$vue.ComputedRef<boolean>;
  emptyText: _$vue.ComputedRef<string | null>;
  handleCompositionStart: (event: CompositionEvent) => void;
  handleCompositionUpdate: (event: CompositionEvent) => void;
  handleCompositionEnd: (event: CompositionEvent) => void;
  handleKeydown: (e: KeyboardEvent) => void;
  onOptionCreate: (vm: OptionPublicInstance) => void;
  onOptionDestroy: (key: OptionValue, vm: OptionPublicInstance) => void;
  handleMenuEnter: () => void;
  focus: () => void;
  blur: () => void;
  handleClearClick: (event: Event) => void;
  handleClickOutside: (event: Event) => void;
  handleEsc: () => void;
  toggleMenu: (event?: Event) => void;
  selectOption: () => void;
  getValueKey: (item: OptionPublicInstance | SelectStates["selected"][0]) => any;
  navigateOptions: (direction: "prev" | "next") => void;
  dropdownMenuVisible: _$vue.WritableComputedRef<boolean, boolean>;
  showTagList: _$vue.ComputedRef<{
    index: number;
    value: OptionValue;
    currentLabel: OptionPublicInstance["currentLabel"];
    isDisabled?: OptionPublicInstance["isDisabled"] | undefined;
  }[]>;
  collapseTagList: _$vue.ComputedRef<{
    index: number;
    value: OptionValue;
    currentLabel: OptionPublicInstance["currentLabel"];
    isDisabled?: OptionPublicInstance["isDisabled"] | undefined;
  }[]>;
  popupScroll: (data: {
    scrollTop: number;
    scrollLeft: number;
  }) => void;
  getOption: (value: OptionValue) => {
    index: number;
    value: EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>;
    currentLabel: any;
  } | {
    index: number;
    value: EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>;
    currentLabel: string | number | boolean;
    readonly isDisabled: boolean;
  };
  endReached: (direction: ScrollbarDirection) => void;
  tagStyle: _$vue.ComputedRef<{
    maxWidth: string;
  }>;
  collapseTagStyle: _$vue.ComputedRef<{
    maxWidth: string;
  }>;
  popperRef: _$vue.ComputedRef<HTMLElement | undefined>;
  inputRef: _$vue.Ref<HTMLInputElement | undefined, HTMLInputElement | undefined>;
  tooltipRef: _$vue.Ref<TooltipInstance | undefined, TooltipInstance | undefined>;
  tagTooltipRef: _$vue.Ref<TooltipInstance | undefined, TooltipInstance | undefined>;
  prefixRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  suffixRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  selectRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  wrapperRef: _$vue.ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
  selectionRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  scrollbarRef: _$vue.Ref<ScrollbarInstance | undefined, ScrollbarInstance | undefined>;
  menuRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  tagMenuRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  collapseItemRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  "update:modelValue": (val: SelectProps["modelValue"] | any) => boolean;
  change: (val: SelectProps["modelValue"] | any) => boolean;
  'popup-scroll': ({
    scrollTop,
    scrollLeft
  }: {
    scrollTop: number;
    scrollLeft: number;
  }) => boolean;
  'end-reached': (direction: ScrollbarDirection) => boolean;
  'remove-tag': (val: unknown) => boolean;
  'visible-change': (visible: boolean) => boolean;
  focus: (evt: FocusEvent) => boolean;
  blur: (evt: FocusEvent) => boolean;
  clear: () => boolean;
}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  ariaLabel: StringConstructor;
  emptyValues: ArrayConstructor;
  valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  name: StringConstructor;
  id: StringConstructor;
  modelValue: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Record<string, any> | EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>[]) | (() => EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown> | EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>[] | null) | (((new (...args: any[]) => string | number | boolean | Record<string, any> | EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>[]) | (() => EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown> | EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>[] | null)) | null)[], unknown, unknown, undefined, boolean>;
  autocomplete: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  automaticDropdown: BooleanConstructor;
  size: {
    readonly type: _$vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "large" | "small", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  effect: EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown, string, boolean>;
  disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  clearable: BooleanConstructor;
  filterable: BooleanConstructor;
  allowCreate: BooleanConstructor;
  loading: BooleanConstructor;
  popperClass: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  popperStyle: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | _$vue.CSSProperties) | (() => string | _$vue.CSSProperties) | (((new (...args: any[]) => string | _$vue.CSSProperties) | (() => string | _$vue.CSSProperties)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => Partial<Options>, boolean>;
  remote: BooleanConstructor;
  debounce: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  loadingText: StringConstructor;
  noMatchText: StringConstructor;
  noDataText: StringConstructor;
  remoteMethod: {
    readonly type: _$vue.PropType<(query: string) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  filterMethod: {
    readonly type: _$vue.PropType<(query: string) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  multiple: BooleanConstructor;
  multipleLimit: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  placeholder: {
    readonly type: _$vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  defaultFirstOption: BooleanConstructor;
  reserveKeyword: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  valueKey: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  collapseTags: BooleanConstructor;
  collapseTagsTooltip: BooleanConstructor;
  tagTooltip: EpPropFinalized<(new (...args: any[]) => TagTooltipProps) | (() => TagTooltipProps) | (((new (...args: any[]) => TagTooltipProps) | (() => TagTooltipProps)) | null)[], unknown, unknown, () => {}, boolean>;
  maxCollapseTags: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  clearIcon: EpPropFinalized<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown, _$vue.DefineComponent<{}, void, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>, boolean>;
  fitInputWidth: BooleanConstructor;
  suffixIcon: EpPropFinalized<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown, _$vue.DefineComponent<{}, void, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>, boolean>;
  tagType: {
    default: string;
    type: _$vue.PropType<EpPropMergeType<StringConstructor, "info" | "primary" | "success" | "warning" | "danger", unknown>>;
    required: false;
    validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  tagEffect: {
    default: string;
    type: _$vue.PropType<EpPropMergeType<StringConstructor, "dark" | "light" | "plain", unknown>>;
    required: false;
    validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  remoteShowSuffix: BooleanConstructor;
  showArrow: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  offset: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  placement: EpPropFinalized<(new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], Placement, unknown, string, boolean>;
  fallbackPlacements: EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | (((new (...args: any[]) => Placement[]) | (() => Placement[])) | null)[], unknown, unknown, string[], boolean>;
  tabindex: EpPropFinalized<(StringConstructor | NumberConstructor)[], unknown, unknown, number, boolean>;
  appendTo: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  options: {
    readonly type: _$vue.PropType<Record<string, any>[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  props: EpPropFinalized<(new (...args: any[]) => Props) | (() => Props) | (((new (...args: any[]) => Props) | (() => Props)) | null)[], unknown, unknown, () => Required<Props>, boolean>;
}>> & Readonly<{
  onClear?: (() => any) | undefined;
  onFocus?: ((evt: FocusEvent) => any) | undefined;
  onBlur?: ((evt: FocusEvent) => any) | undefined;
  "onUpdate:modelValue"?: ((val: any) => any) | undefined;
  onChange?: ((val: any) => any) | undefined;
  "onVisible-change"?: ((visible: boolean) => any) | undefined;
  "onEnd-reached"?: ((direction: ScrollbarDirection) => any) | undefined;
  "onRemove-tag"?: ((val: unknown) => any) | undefined;
  "onPopup-scroll"?: ((args_0: {
    scrollTop: number;
    scrollLeft: number;
  }) => any) | undefined;
}>, {
  props: Props;
  multiple: boolean;
  disabled: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  offset: number;
  modelValue: EpPropMergeType<(new (...args: any[]) => string | number | boolean | Record<string, any> | EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>[]) | (() => EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown> | EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>[] | null) | (((new (...args: any[]) => string | number | boolean | Record<string, any> | EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>[]) | (() => EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown> | EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>[] | null)) | null)[], unknown, unknown>;
  automaticDropdown: boolean;
  fallbackPlacements: Placement[];
  placement: EpPropMergeType<(new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], Placement, unknown>;
  popperOptions: Partial<Options>;
  effect: EpPropMergeType<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown>;
  popperClass: string;
  teleported: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  persistent: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  clearable: boolean;
  clearIcon: EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>;
  tabindex: EpPropMergeType<(StringConstructor | NumberConstructor)[], unknown, unknown>;
  validateEvent: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  valueOnClear: EpPropMergeType<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown>;
  autocomplete: string;
  suffixIcon: EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>;
  showArrow: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  valueKey: string;
  debounce: number;
  fitInputWidth: boolean;
  loading: boolean;
  filterable: boolean;
  collapseTags: boolean;
  maxCollapseTags: number;
  collapseTagsTooltip: boolean;
  tagType: EpPropMergeType<StringConstructor, "info" | "primary" | "success" | "warning" | "danger", unknown>;
  tagEffect: EpPropMergeType<StringConstructor, "dark" | "light" | "plain", unknown>;
  allowCreate: boolean;
  remote: boolean;
  multipleLimit: number;
  defaultFirstOption: boolean;
  reserveKeyword: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  tagTooltip: TagTooltipProps;
  remoteShowSuffix: boolean;
}, {}, {
  ElSelectMenu: _$vue.DefineComponent<{}, {
    ns: {
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
    minWidth: _$vue.Ref<string, string>;
    popperClass: _$vue.ComputedRef<string>;
    isMultiple: _$vue.ComputedRef<boolean>;
    isFitInputWidth: _$vue.ComputedRef<boolean>;
  }, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
  ElOption: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
    value: {
      readonly type: _$vue.PropType<EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>>;
      readonly required: true;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    label: {
      readonly type: _$vue.PropType<EpPropMergeType<(StringConstructor | NumberConstructor)[], unknown, unknown>>;
      readonly required: false;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    created: BooleanConstructor;
    disabled: BooleanConstructor;
  }>, {
    ns: {
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
    id: _$vue.Ref<string, string>;
    containerKls: _$vue.ComputedRef<string[]>;
    currentLabel: _$vue.ComputedRef<boolean | EpPropMergeType<(StringConstructor | NumberConstructor)[], unknown, unknown>>;
    itemSelected: _$vue.ComputedRef<boolean>;
    isDisabled: _$vue.ComputedRef<boolean>;
    select: SelectContext;
    visible: _$vue.Ref<boolean, boolean>;
    hover: _$vue.Ref<boolean, boolean>;
    states: {
      index: number;
      groupDisabled: boolean;
      visible: boolean;
      hover: boolean;
    };
    mouseMoveEventName: "mousemove" | null;
    hoverItem: () => void;
    handleMousedown: (event: MouseEvent) => void;
    updateOption: (query: string) => void;
    selectOptionClick: () => void;
  }, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
    value: {
      readonly type: _$vue.PropType<EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>>;
      readonly required: true;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    label: {
      readonly type: _$vue.PropType<EpPropMergeType<(StringConstructor | NumberConstructor)[], unknown, unknown>>;
      readonly required: false;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    created: BooleanConstructor;
    disabled: BooleanConstructor;
  }>> & Readonly<{}>, {
    disabled: boolean;
    created: boolean;
  }, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
  ElOptions: _$vue.DefineComponent<{}, () => VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }>[], {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
  ElOptionGroup: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
    label: StringConstructor;
    disabled: BooleanConstructor;
  }>, {
    groupRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
    visible: _$vue.ComputedRef<boolean>;
    ns: {
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
  }, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
    label: StringConstructor;
    disabled: BooleanConstructor;
  }>> & Readonly<{}>, {
    disabled: boolean;
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
  ElScrollbar: SFCWithInstall<{
    new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<ScrollbarProps> & Readonly<{
      onScroll?: ((args_0: {
        scrollTop: number;
        scrollLeft: number;
      }) => any) | undefined;
      "onEnd-reached"?: ((direction: ScrollbarDirection) => any) | undefined;
    }>, {
      wrapRef: _$vue.Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
      update: () => void;
      scrollTo: {
        (xCord: number, yCord?: number): void;
        (options: ScrollToOptions): void;
      };
      setScrollTop: (value: number) => void;
      setScrollLeft: (value: number) => void;
      handleScroll: () => void;
    }, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
      scroll: (args_0: {
        scrollTop: number;
        scrollLeft: number;
      }) => void;
      "end-reached": (direction: ScrollbarDirection) => void;
    }, _$vue.PublicProps, {
      height: number | string;
      maxHeight: number | string;
      tabindex: number | string;
      tag: keyof HTMLElementTagNameMap | (string & {});
      distance: number;
      wrapStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
      wrapClass: string | string[];
      viewClass: string | string[];
      viewStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
      minSize: number;
    }, false, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ScrollbarProps> & Readonly<{
      onScroll?: ((args_0: {
        scrollTop: number;
        scrollLeft: number;
      }) => any) | undefined;
      "onEnd-reached"?: ((direction: ScrollbarDirection) => any) | undefined;
    }>, {
      wrapRef: _$vue.Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
      update: () => void;
      scrollTo: {
        (xCord: number, yCord?: number): void;
        (options: ScrollToOptions): void;
      };
      setScrollTop: (value: number) => void;
      setScrollLeft: (value: number) => void;
      handleScroll: () => void;
    }, {}, {}, {}, {
      height: number | string;
      maxHeight: number | string;
      tabindex: number | string;
      tag: keyof HTMLElementTagNameMap | (string & {});
      distance: number;
      wrapStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
      wrapClass: string | string[];
      viewClass: string | string[];
      viewStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
      minSize: number;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & _$vue.ComponentOptionsBase<Readonly<ScrollbarProps> & Readonly<{
    onScroll?: ((args_0: {
      scrollTop: number;
      scrollLeft: number;
    }) => any) | undefined;
    "onEnd-reached"?: ((direction: ScrollbarDirection) => any) | undefined;
  }>, {
    wrapRef: _$vue.Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
    update: () => void;
    scrollTo: {
      (xCord: number, yCord?: number): void;
      (options: ScrollToOptions): void;
    };
    setScrollTop: (value: number) => void;
    setScrollLeft: (value: number) => void;
    handleScroll: () => void;
  }, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
    scroll: (args_0: {
      scrollTop: number;
      scrollLeft: number;
    }) => void;
    "end-reached": (direction: ScrollbarDirection) => void;
  }, string, {
    height: number | string;
    maxHeight: number | string;
    tabindex: number | string;
    tag: keyof HTMLElementTagNameMap | (string & {});
    distance: number;
    wrapStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
    wrapClass: string | string[];
    viewClass: string | string[];
    viewStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
    minSize: number;
  }, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & (new () => {
    $slots: {
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