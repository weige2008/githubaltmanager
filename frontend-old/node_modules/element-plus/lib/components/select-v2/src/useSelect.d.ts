import { EpPropMergeType } from "../../../utils/vue/props/types.js";
import { TooltipInstance } from "../../tooltip/src/tooltip.js";
import { ScrollbarDirection } from "../../scrollbar/src/scrollbar.js";
import { Option, OptionType, SelectStates } from "./select.types.js";
import { SelectDropdownInstance } from "./select-dropdown.js";
import { SelectV2EmitFn, SelectV2Props } from "./defaults.js";
import * as _$vue from "vue";
import * as _$_vueuse_core0 from "@vueuse/core";

//#region ../../packages/components/select-v2/src/useSelect.d.ts
declare const useSelect: (props: SelectV2Props, emit: SelectV2EmitFn) => {
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
};
//#endregion
export { useSelect as default };