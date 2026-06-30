import { EmitFn } from "../../../utils/vue/typescript.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { PopperEffect } from "../../popper/src/popper.js";
import { Options, Placement } from "../../popper/index.js";
import { ScrollbarDirection } from "../../scrollbar/src/scrollbar.js";
import { Props } from "../../select-v2/src/useProps.js";
import _default from "./select.vue.js";
import * as _$vue from "vue";
import { CSSProperties, ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/select/src/select.d.ts
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
declare const selectProps: {
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
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties) | (((new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties)) | null)[], unknown, unknown>>;
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
};
declare const selectEmits: {
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
};
type SelectProps = ExtractPropTypes<typeof selectProps>;
type SelectPropsPublic = ExtractPublicPropTypes<typeof selectProps>;
type SelectEmits = EmitFn<typeof selectEmits>;
type SelectInstance = InstanceType<typeof _default> & unknown;
type SelectOptionProps = Props;
//#endregion
export { SelectEmits, SelectInstance, SelectOptionProps, SelectProps, SelectPropsPublic, TagTooltipProps, selectEmits, selectProps };