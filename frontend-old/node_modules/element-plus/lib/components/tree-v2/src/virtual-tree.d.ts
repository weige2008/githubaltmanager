import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { Mutable } from "../../../utils/typescript.js";
import { CheckboxValueType } from "../../checkbox/src/checkbox.js";
import { TreeNodeData } from "../../tree/src/tree.type.js";
import { CheckedInfo, FilterMethod, TreeContext, TreeData, TreeKey, TreeNode, TreeOptionProps } from "./types.js";
import * as _$vue from "vue";
import { InjectionKey } from "vue";

//#region ../../packages/components/tree-v2/src/virtual-tree.d.ts
declare const ROOT_TREE_INJECTION_KEY: InjectionKey<TreeContext>;
declare const EMPTY_NODE: {
  readonly key: -1;
  readonly level: -1;
  readonly data: {};
};
declare enum TreeOptionsEnum {
  KEY = "id",
  LABEL = "label",
  CHILDREN = "children",
  DISABLED = "disabled",
  CLASS = ""
}
declare const enum SetOperationEnum {
  ADD = "add",
  DELETE = "delete"
}
/**
 * @deprecated Removed after 3.0.0, Use `TreeProps` instead.
 */
declare const treeProps: {
  readonly data: EpPropFinalized<(new (...args: any[]) => TreeData) | (() => TreeData) | (((new (...args: any[]) => TreeData) | (() => TreeData)) | null)[], unknown, unknown, () => [], boolean>;
  readonly emptyText: {
    readonly type: _$vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly height: EpPropFinalized<NumberConstructor, unknown, unknown, 200, boolean>;
  readonly props: EpPropFinalized<(new (...args: any[]) => TreeOptionProps) | (() => TreeOptionProps) | (((new (...args: any[]) => TreeOptionProps) | (() => TreeOptionProps)) | null)[], unknown, unknown, () => Mutable<{
    readonly children: TreeOptionsEnum.CHILDREN;
    readonly label: TreeOptionsEnum.LABEL;
    readonly disabled: TreeOptionsEnum.DISABLED;
    readonly value: TreeOptionsEnum.KEY;
    readonly class: TreeOptionsEnum.CLASS;
  }>, boolean>;
  readonly highlightCurrent: BooleanConstructor;
  readonly showCheckbox: BooleanConstructor;
  readonly defaultCheckedKeys: EpPropFinalized<(new (...args: any[]) => TreeKey[]) | (() => TreeKey[]) | (((new (...args: any[]) => TreeKey[]) | (() => TreeKey[])) | null)[], unknown, unknown, () => [], boolean>;
  readonly checkStrictly: BooleanConstructor;
  readonly defaultExpandedKeys: EpPropFinalized<(new (...args: any[]) => TreeKey[]) | (() => TreeKey[]) | (((new (...args: any[]) => TreeKey[]) | (() => TreeKey[])) | null)[], unknown, unknown, () => [], boolean>;
  readonly indent: EpPropFinalized<NumberConstructor, unknown, unknown, 16, boolean>;
  readonly itemSize: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  readonly icon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly expandOnClickNode: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly checkOnClickNode: BooleanConstructor;
  readonly checkOnClickLeaf: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly currentNodeKey: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | number) | (() => TreeKey) | (((new (...args: any[]) => string | number) | (() => TreeKey)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly accordion: BooleanConstructor;
  readonly filterMethod: {
    readonly type: _$vue.PropType<FilterMethod>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly perfMode: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly scrollbarAlwaysOn: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `TreeNodeProps` instead.
 */
declare const treeNodeProps: {
  readonly node: EpPropFinalized<(new (...args: any[]) => TreeNode) | (() => TreeNode) | (((new (...args: any[]) => TreeNode) | (() => TreeNode)) | null)[], unknown, unknown, () => Mutable<{
    readonly key: -1;
    readonly level: -1;
    readonly data: {};
  }>, boolean>;
  readonly expanded: BooleanConstructor;
  readonly checked: BooleanConstructor;
  readonly indeterminate: BooleanConstructor;
  readonly showCheckbox: BooleanConstructor;
  readonly disabled: BooleanConstructor;
  readonly current: BooleanConstructor;
  readonly hiddenExpandIcon: BooleanConstructor;
  readonly itemSize: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
};
declare const treeNodeContentProps: {
  readonly node: {
    readonly type: _$vue.PropType<TreeNode>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
declare const NODE_CLICK = "node-click";
declare const NODE_DROP = "node-drop";
declare const NODE_EXPAND = "node-expand";
declare const NODE_COLLAPSE = "node-collapse";
declare const CURRENT_CHANGE = "current-change";
declare const NODE_CHECK = "check";
declare const NODE_CHECK_CHANGE = "check-change";
declare const NODE_CONTEXTMENU = "node-contextmenu";
declare const treeEmits: {
  "node-click": (data: TreeNodeData, node: TreeNode, e: MouseEvent) => MouseEvent;
  "node-drop": (data: TreeNodeData, node: TreeNode, e: DragEvent) => DragEvent;
  "node-expand": (data: TreeNodeData, node: TreeNode) => TreeNode;
  "node-collapse": (data: TreeNodeData, node: TreeNode) => TreeNode;
  "current-change": (data: TreeNodeData, node: TreeNode) => TreeNode;
  check: (data: TreeNodeData, checkedInfo: CheckedInfo) => CheckedInfo;
  "check-change": (data: TreeNodeData, checked: boolean) => boolean;
  "node-contextmenu": (evt: Event, data: TreeNodeData, node: TreeNode) => TreeNode;
};
declare const treeNodeEmits: {
  click: (node: TreeNode, e: MouseEvent) => boolean;
  drop: (node: TreeNode, e: DragEvent) => boolean;
  toggle: (node: TreeNode) => boolean;
  check: (node: TreeNode, checked: CheckboxValueType) => boolean;
};
//#endregion
export { CURRENT_CHANGE, EMPTY_NODE, NODE_CHECK, NODE_CHECK_CHANGE, NODE_CLICK, NODE_COLLAPSE, NODE_CONTEXTMENU, NODE_DROP, NODE_EXPAND, ROOT_TREE_INJECTION_KEY, SetOperationEnum, TreeOptionsEnum, treeEmits, treeNodeContentProps, treeNodeEmits, treeNodeProps, treeProps };