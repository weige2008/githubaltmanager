import { IconPropType } from "../../../utils/vue/icon.js";
import { PopperEffect } from "../../popper/src/popper.js";
import { Placement } from "../../popper/index.js";
import { CascaderNodePathValue, CascaderNodeValue, CascaderOption, CascaderProps, CascaderValue, ExpandTrigger, LazyLoad, Tag, isDisabled, isLeaf } from "../../cascader-panel/src/types.js";
import Node from "../../cascader-panel/src/node.js";
import { CascaderPanelInstance } from "../../cascader-panel/src/instance.js";
import { CascaderComponentProps } from "./cascader.js";
import * as _$vue from "vue";
import { ComputedRef, StyleValue } from "vue";

//#region ../../packages/components/cascader/src/cascader.vue.d.ts
declare var __VLS_26: {}, __VLS_55: {
    data: {
      node?: {
        readonly uid: number;
        readonly level: number;
        readonly value: CascaderNodeValue;
        readonly label: string;
        readonly pathNodes: /*elided*/any[];
        readonly pathValues: CascaderNodeValue[];
        readonly pathLabels: string[];
        childrenData: {
          [x: string]: unknown;
          label?: string | undefined;
          value?: CascaderNodeValue | undefined;
          children?: /*elided*/any[] | undefined;
          disabled?: boolean | undefined;
          leaf?: boolean | undefined;
        }[] | undefined;
        children: /*elided*/any[];
        text: string;
        loaded: boolean;
        checked: boolean;
        indeterminate: boolean;
        loading: boolean;
        readonly data: {
          [x: string]: unknown;
          label?: string | undefined;
          value?: CascaderNodeValue | undefined;
          children?: /*elided*/any[] | undefined;
          disabled?: boolean | undefined;
          leaf?: boolean | undefined;
        };
        readonly config: {
          expandTrigger: ExpandTrigger;
          multiple: boolean;
          checkStrictly: boolean;
          emitPath: boolean;
          lazy: boolean;
          lazyLoad: LazyLoad;
          value: string;
          label: string;
          children: string;
          disabled: string | isDisabled;
          leaf: string | isLeaf;
          hoverThreshold: number;
          checkOnClickNode: boolean;
          checkOnClickLeaf: boolean;
          showPrefix: boolean;
        };
        readonly parent?: /*elided*/any | undefined;
        readonly root: boolean;
        readonly isDisabled: boolean;
        readonly isLeaf: boolean;
        readonly valueByOption: CascaderNodeValue | CascaderNodeValue[];
        appendChild: (childData: CascaderOption) => Node;
        calcText: (allLevels: boolean, separator: string) => string;
        broadcast: (checked: boolean) => void;
        emit: () => void;
        onParentCheck: (checked: boolean) => void;
        onChildCheck: () => void;
        setCheckState: (checked: boolean) => void;
        doCheck: (checked: boolean) => void;
      } | undefined;
      key: number;
      text: string;
      hitState?: boolean | undefined;
      closable: boolean;
    }[];
    deleteTag: (tag: Tag) => void;
  }, __VLS_96: {}, __VLS_110: {}, __VLS_120: {
    item: {
      readonly uid: number;
      readonly level: number;
      readonly value: CascaderNodeValue;
      readonly label: string;
      readonly pathNodes: /*elided*/any[];
      readonly pathValues: CascaderNodeValue[];
      readonly pathLabels: string[];
      childrenData: {
        [x: string]: unknown;
        label?: string | undefined;
        value?: CascaderNodeValue | undefined;
        children?: /*elided*/any[] | undefined;
        disabled?: boolean | undefined;
        leaf?: boolean | undefined;
      }[] | undefined;
      children: /*elided*/any[];
      text: string;
      loaded: boolean;
      checked: boolean;
      indeterminate: boolean;
      loading: boolean;
      readonly data: {
        [x: string]: unknown;
        label?: string | undefined;
        value?: CascaderNodeValue | undefined;
        children?: /*elided*/any[] | undefined;
        disabled?: boolean | undefined;
        leaf?: boolean | undefined;
      };
      readonly config: {
        expandTrigger: ExpandTrigger;
        multiple: boolean;
        checkStrictly: boolean;
        emitPath: boolean;
        lazy: boolean;
        lazyLoad: LazyLoad;
        value: string;
        label: string;
        children: string;
        disabled: string | isDisabled;
        leaf: string | isLeaf;
        hoverThreshold: number;
        checkOnClickNode: boolean;
        checkOnClickLeaf: boolean;
        showPrefix: boolean;
      };
      readonly parent?: /*elided*/any | undefined;
      readonly root: boolean;
      readonly isDisabled: boolean;
      readonly isLeaf: boolean;
      readonly valueByOption: CascaderNodeValue | CascaderNodeValue[];
      appendChild: (childData: CascaderOption) => Node;
      calcText: (allLevels: boolean, separator: string) => string;
      broadcast: (checked: boolean) => void;
      emit: () => void;
      onParentCheck: (checked: boolean) => void;
      onChildCheck: () => void;
      setCheckState: (checked: boolean) => void;
      doCheck: (checked: boolean) => void;
    };
  }, __VLS_133: {}, __VLS_144: {
    item: any;
  }, __VLS_157: {}, __VLS_159: {};
type __VLS_Slots = {} & {
  prefix?: (props: typeof __VLS_26) => any;
} & {
  tag?: (props: typeof __VLS_55) => any;
} & {
  header?: (props: typeof __VLS_96) => any;
} & {
  empty?: (props: typeof __VLS_110) => any;
} & {
  'suggestion-item'?: (props: typeof __VLS_120) => any;
} & {
  empty?: (props: typeof __VLS_133) => any;
} & {
  'suggestion-item'?: (props: typeof __VLS_144) => any;
} & {
  empty?: (props: typeof __VLS_157) => any;
} & {
  footer?: (props: typeof __VLS_159) => any;
};
declare const __VLS_base: _$vue.DefineComponent<CascaderComponentProps, {
  /**
   * @description get an array of currently selected node,(leafOnly) whether only return the leaf checked nodes, default is `false`
   */
  getCheckedNodes: (leafOnly: boolean) => Node[] | undefined;
  /**
   * @description cascader panel ref
   */
  cascaderPanelRef: _$vue.Ref<CascaderPanelInstance | undefined, CascaderPanelInstance | undefined>;
  /**
   * @description toggle the visible of popper
   */
  togglePopperVisible: (visible?: boolean) => void;
  /**
   * @description cascader content ref
   */
  contentRef: ComputedRef<HTMLElement | undefined>;
  /**
   * @description selected content text
   */
  presentText: ComputedRef<string>; /** @description focus the input element */
  focus: () => void; /** @description blur the input element */
  blur: () => void;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  clear: () => void;
  focus: (evt: FocusEvent) => void;
  blur: (evt: FocusEvent) => void;
  "update:modelValue": (value: CascaderValue | null | undefined) => void;
  change: (value: CascaderValue | null | undefined) => void;
  visibleChange: (val: boolean) => void;
  expandChange: (val: CascaderValue) => void;
  removeTag: (val: CascaderNodeValue | CascaderNodePathValue) => void;
}, string, _$vue.PublicProps, Readonly<CascaderComponentProps> & Readonly<{
  onClear?: (() => any) | undefined;
  onFocus?: ((evt: FocusEvent) => any) | undefined;
  onBlur?: ((evt: FocusEvent) => any) | undefined;
  "onUpdate:modelValue"?: ((value: CascaderValue | null | undefined) => any) | undefined;
  onChange?: ((value: CascaderValue | null | undefined) => any) | undefined;
  onVisibleChange?: ((val: boolean) => any) | undefined;
  onExpandChange?: ((val: CascaderValue) => any) | undefined;
  onRemoveTag?: ((val: CascaderNodeValue | CascaderNodePathValue) => any) | undefined;
}>, {
  props: CascaderProps;
  height: number;
  itemSize: number;
  separator: string;
  disabled: boolean;
  fallbackPlacements: Placement[];
  placement: Placement;
  effect: PopperEffect;
  popperStyle: string | false | _$vue.CSSProperties | StyleValue[] | null;
  teleported: boolean;
  persistent: boolean;
  clearIcon: IconPropType;
  validateEvent: boolean;
  valueOnClear: string | number | boolean | Function | null;
  options: CascaderOption[];
  debounce: number;
  showPrefix: boolean;
  filterMethod: (node: Node, keyword: string) => boolean;
  showAllLevels: boolean;
  maxCollapseTags: number;
  beforeFilter: (value: string) => boolean | Promise<any>;
  tagType: "info" | "primary" | "success" | "warning" | "danger";
  tagEffect: "dark" | "light" | "plain";
  showCheckedStrategy: "parent" | "child";
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default as default };