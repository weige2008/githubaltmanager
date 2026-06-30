import { EpPropMergeType } from "../../../utils/vue/props/types.js";
import { TooltipInstance } from "../../tooltip/src/tooltip.js";
import { ScrollbarDirection, ScrollbarInstance } from "../../scrollbar/src/scrollbar.js";
import { SelectEmits, SelectProps } from "./select.js";
import { OptionBasic, OptionPublicInstance, OptionValue, SelectStates } from "./type.js";
import * as _$vue from "vue";
import { Component } from "vue";
import * as _$_vueuse_core0 from "@vueuse/core";

//#region ../../packages/components/select/src/useSelect.d.ts
declare const useSelect: (props: SelectProps, emit: SelectEmits) => {
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
  iconComponent: _$vue.ComputedRef<EpPropMergeType<(new (...args: any[]) => (string | Component) & {}) | (() => string | Component) | (((new (...args: any[]) => (string | Component) & {}) | (() => string | Component)) | null)[], unknown, unknown>>;
  iconReverse: _$vue.ComputedRef<string>;
  validateState: _$vue.ComputedRef<"" | "success" | "error" | "validating">;
  validateIcon: _$vue.ComputedRef<"" | Component>;
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
};
//#endregion
export { useSelect };