import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { PopperEffect } from "../../popper/src/popper.js";
import { Options, Placement } from "../../popper/index.js";
import { TagTooltipProps } from "../../select/src/select.js";
import { AllowDragFunction, AllowDropFunction, FilterNodeMethodFunction, LoadFunction, RenderContentFunction, TreeData, TreeKey, TreeOptionProps } from "../../tree/src/tree.type.js";
import * as _$vue from "vue";

//#region ../../packages/components/tree-select/src/tree-select.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  /**
   * @description The cached data of the lazy node, the structure is the same as the data, used to get the label of the unloaded data
   */
  cacheData: {
    type: ArrayConstructor;
    default: () => never[];
  };
  data: EpPropFinalized<(new (...args: any[]) => TreeData) | (() => TreeData) | (((new (...args: any[]) => TreeData) | (() => TreeData)) | null)[], unknown, unknown, () => never[], boolean>;
  emptyText: {
    readonly type: _$vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  renderAfterExpand: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  nodeKey: StringConstructor;
  checkStrictly: BooleanConstructor;
  defaultExpandAll: BooleanConstructor;
  expandOnClickNode: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  checkOnClickNode: BooleanConstructor;
  checkOnClickLeaf: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  checkDescendants: BooleanConstructor;
  autoExpandParent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  defaultCheckedKeys: {
    readonly type: _$vue.PropType<TreeKey[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  defaultExpandedKeys: {
    readonly type: _$vue.PropType<TreeKey[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  currentNodeKey: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  renderContent: {
    readonly type: _$vue.PropType<RenderContentFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  showCheckbox: BooleanConstructor;
  draggable: BooleanConstructor;
  allowDrag: {
    readonly type: _$vue.PropType<AllowDragFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  allowDrop: {
    readonly type: _$vue.PropType<AllowDropFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  props: EpPropFinalized<(new (...args: any[]) => TreeOptionProps) | (() => TreeOptionProps) | (((new (...args: any[]) => TreeOptionProps) | (() => TreeOptionProps)) | null)[], unknown, unknown, () => {
    children: string;
    label: string;
    disabled: string;
  }, boolean>;
  lazy: BooleanConstructor;
  highlightCurrent: BooleanConstructor;
  load: {
    readonly type: _$vue.PropType<LoadFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  filterNodeMethod: {
    readonly type: _$vue.PropType<FilterNodeMethodFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  accordion: BooleanConstructor;
  indent: EpPropFinalized<NumberConstructor, unknown, unknown, 18, boolean>;
  icon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
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
}>, () => _$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
  [key: string]: any;
}>, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  /**
   * @description The cached data of the lazy node, the structure is the same as the data, used to get the label of the unloaded data
   */
  cacheData: {
    type: ArrayConstructor;
    default: () => never[];
  };
  data: EpPropFinalized<(new (...args: any[]) => TreeData) | (() => TreeData) | (((new (...args: any[]) => TreeData) | (() => TreeData)) | null)[], unknown, unknown, () => never[], boolean>;
  emptyText: {
    readonly type: _$vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  renderAfterExpand: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  nodeKey: StringConstructor;
  checkStrictly: BooleanConstructor;
  defaultExpandAll: BooleanConstructor;
  expandOnClickNode: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  checkOnClickNode: BooleanConstructor;
  checkOnClickLeaf: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  checkDescendants: BooleanConstructor;
  autoExpandParent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  defaultCheckedKeys: {
    readonly type: _$vue.PropType<TreeKey[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  defaultExpandedKeys: {
    readonly type: _$vue.PropType<TreeKey[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  currentNodeKey: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  renderContent: {
    readonly type: _$vue.PropType<RenderContentFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  showCheckbox: BooleanConstructor;
  draggable: BooleanConstructor;
  allowDrag: {
    readonly type: _$vue.PropType<AllowDragFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  allowDrop: {
    readonly type: _$vue.PropType<AllowDropFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  props: EpPropFinalized<(new (...args: any[]) => TreeOptionProps) | (() => TreeOptionProps) | (((new (...args: any[]) => TreeOptionProps) | (() => TreeOptionProps)) | null)[], unknown, unknown, () => {
    children: string;
    label: string;
    disabled: string;
  }, boolean>;
  lazy: BooleanConstructor;
  highlightCurrent: BooleanConstructor;
  load: {
    readonly type: _$vue.PropType<LoadFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  filterNodeMethod: {
    readonly type: _$vue.PropType<FilterNodeMethodFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  accordion: BooleanConstructor;
  indent: EpPropFinalized<NumberConstructor, unknown, unknown, 18, boolean>;
  icon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
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
}>> & Readonly<{}>, {
  props: TreeOptionProps;
  data: TreeData;
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
  checkStrictly: boolean;
  lazy: boolean;
  checkOnClickNode: boolean;
  checkOnClickLeaf: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  filterable: boolean;
  collapseTags: boolean;
  maxCollapseTags: number;
  collapseTagsTooltip: boolean;
  tagType: EpPropMergeType<StringConstructor, "info" | "primary" | "success" | "warning" | "danger", unknown>;
  tagEffect: EpPropMergeType<StringConstructor, "dark" | "light" | "plain", unknown>;
  accordion: boolean;
  draggable: boolean;
  allowCreate: boolean;
  remote: boolean;
  multipleLimit: number;
  defaultFirstOption: boolean;
  reserveKeyword: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  tagTooltip: TagTooltipProps;
  remoteShowSuffix: boolean;
  defaultExpandAll: boolean;
  indent: number;
  renderAfterExpand: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  showCheckbox: boolean;
  expandOnClickNode: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  autoExpandParent: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  checkDescendants: boolean;
  highlightCurrent: boolean;
  cacheData: unknown[];
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default as default };