import { SFCWithInstall } from "../../../utils/vue/typescript.js";
import { CheckboxProps, CheckboxValueType } from "../../checkbox/src/checkbox.js";
import _default$1 from "../../checkbox/src/checkbox-button.vue.js";
import _default$2 from "../../checkbox/src/checkbox-group.vue.js";
import { IconProps } from "../../icon/src/icon.js";
import Node from "./model/node.js";
import { RootTreeType, TreeNodeData, TreeOptionProps } from "./tree.type.js";
import * as _$vue from "vue";
import { ComponentInternalInstance, PropType } from "vue";

//#region ../../packages/components/tree/src/tree-node.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  node: {
    type: typeof Node;
    default: () => {};
  };
  props: {
    type: PropType<TreeOptionProps>;
    default: () => {};
  };
  accordion: BooleanConstructor;
  renderContent: FunctionConstructor;
  renderAfterExpand: BooleanConstructor;
  showCheckbox: BooleanConstructor;
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
  node$: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  tree: RootTreeType;
  expanded: _$vue.Ref<boolean, boolean>;
  childNodeRendered: _$vue.Ref<boolean, boolean>;
  oldChecked: _$vue.Ref<boolean | undefined, boolean | undefined>;
  oldIndeterminate: _$vue.Ref<boolean | undefined, boolean | undefined>;
  getNodeKey: (node: Node) => any;
  getNodeClass: (node: Node) => {
    [key: string]: boolean;
  };
  handleSelectChange: (checked: boolean, indeterminate: boolean) => void;
  handleClick: (e: MouseEvent) => void;
  handleContextMenu: (event: Event) => void;
  handleExpandIconClick: () => void;
  handleCheckChange: (value: CheckboxValueType) => void;
  handleChildNodeExpand: (nodeData: TreeNodeData, node: Node, instance: ComponentInternalInstance) => void;
  handleDragStart: (event: DragEvent) => void;
  handleDragOver: (event: DragEvent) => void;
  handleDrop: (event: DragEvent) => void;
  handleDragEnd: (event: DragEvent) => void;
  CaretRight: _$vue.DefineComponent<{}, void, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, "node-expand"[], "node-expand", _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  node: {
    type: typeof Node;
    default: () => {};
  };
  props: {
    type: PropType<TreeOptionProps>;
    default: () => {};
  };
  accordion: BooleanConstructor;
  renderContent: FunctionConstructor;
  renderAfterExpand: BooleanConstructor;
  showCheckbox: BooleanConstructor;
}>> & Readonly<{
  "onNode-expand"?: ((...args: any[]) => any) | undefined;
}>, {
  props: TreeOptionProps;
  accordion: boolean;
  node: Node;
  renderAfterExpand: boolean;
  showCheckbox: boolean;
}, {}, {
  ElCollapseTransition: SFCWithInstall<{
    new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, _$vue.PublicProps, {}, true, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & _$vue.ComponentOptionsBase<Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, {}, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    };
  })>;
  ElCheckbox: {
    new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<CheckboxProps> & Readonly<{
      "onUpdate:modelValue"?: ((val: CheckboxValueType) => any) | undefined;
      onChange?: ((val: CheckboxValueType) => any) | undefined;
    }>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
      "update:modelValue": (val: CheckboxValueType) => void;
      change: (val: CheckboxValueType) => void;
    }, _$vue.PublicProps, {
      name: string;
      id: string;
      disabled: boolean;
      modelValue: number | string | boolean;
      validateEvent: boolean;
      value: string | boolean | number | object;
      label: string | boolean | number | object;
      trueValue: string | number;
      falseValue: string | number;
      trueLabel: string | number;
      falseLabel: string | number;
    }, false, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<CheckboxProps> & Readonly<{
      "onUpdate:modelValue"?: ((val: CheckboxValueType) => any) | undefined;
      onChange?: ((val: CheckboxValueType) => any) | undefined;
    }>, {}, {}, {}, {}, {
      name: string;
      id: string;
      disabled: boolean;
      modelValue: number | string | boolean;
      validateEvent: boolean;
      value: string | boolean | number | object;
      label: string | boolean | number | object;
      trueValue: string | number;
      falseValue: string | number;
      trueLabel: string | number;
      falseLabel: string | number;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & _$vue.ComponentOptionsBase<Readonly<CheckboxProps> & Readonly<{
    "onUpdate:modelValue"?: ((val: CheckboxValueType) => any) | undefined;
    onChange?: ((val: CheckboxValueType) => any) | undefined;
  }>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
    "update:modelValue": (val: CheckboxValueType) => void;
    change: (val: CheckboxValueType) => void;
  }, string, {
    name: string;
    id: string;
    disabled: boolean;
    modelValue: number | string | boolean;
    validateEvent: boolean;
    value: string | boolean | number | object;
    label: string | boolean | number | object;
    trueValue: string | number;
    falseValue: string | number;
    trueLabel: string | number;
    falseLabel: string | number;
  }, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    };
  }) & _$vue.ObjectPlugin & {
    setPropsDefaults: (defaults: {
      readonly modelValue?: string | number | boolean | (() => string | number | boolean) | undefined;
      readonly label?: string | number | boolean | (() => string | number | boolean | object) | undefined;
      readonly value?: string | number | boolean | (() => string | number | boolean | object) | undefined;
      readonly indeterminate?: boolean | (() => boolean) | undefined;
      readonly disabled?: boolean | (() => boolean) | undefined;
      readonly checked?: boolean | (() => boolean) | undefined;
      readonly name?: string | (() => string) | undefined;
      readonly trueValue?: string | number | (() => string | number) | undefined;
      readonly falseValue?: string | number | (() => string | number) | undefined;
      readonly trueLabel?: string | number | (() => string | number) | undefined;
      readonly falseLabel?: string | number | (() => string | number) | undefined;
      readonly id?: string | (() => string) | undefined;
      readonly border?: boolean | (() => boolean) | undefined;
      readonly size?: "" | "default" | "large" | "small" | (() => "" | "default" | "large" | "small") | undefined;
      readonly tabindex?: string | number | (() => string | number) | undefined;
      readonly validateEvent?: boolean | (() => boolean) | undefined;
      readonly ariaLabel?: string | (() => string) | undefined;
      readonly ariaControls?: string | (() => string) | undefined;
    }) => void;
  } & {
    CheckboxButton: typeof _default$1;
    CheckboxGroup: typeof _default$2;
  };
  NodeContent: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
    node: {
      type: ObjectConstructor;
      required: true;
    };
    renderContent: FunctionConstructor;
  }>, () => any, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
    node: {
      type: ObjectConstructor;
      required: true;
    };
    renderContent: FunctionConstructor;
  }>> & Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
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
  Loading: _$vue.DefineComponent<{}, void, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default as default };