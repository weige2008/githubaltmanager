import { IconPropType } from "../../../utils/vue/icon.js";
import { treeEmits, treeProps } from "./virtual-tree.js";
import { ComponentInternalInstance, ExtractPublicPropTypes, SetupContext } from "vue";

//#region ../../packages/components/tree-v2/src/types.d.ts
type TreeNodeData = Record<string, any>;
type TreeData = TreeNodeData[];
type TreeKey = string | number;
interface TreeOptionProps {
  children?: string;
  label?: string;
  value?: string;
  disabled?: string;
  class?: ((data: TreeNodeData, node: TreeNode) => string | {
    [key: string]: boolean;
  }) | string;
}
interface TreeProps {
  data?: TreeData;
  emptyText?: string;
  height?: number;
  props?: TreeOptionProps;
  highlightCurrent?: boolean;
  showCheckbox?: boolean;
  defaultCheckedKeys?: TreeKey[];
  checkStrictly?: boolean;
  defaultExpandedKeys?: TreeKey[];
  indent?: number;
  itemSize?: number;
  icon?: IconPropType;
  expandOnClickNode?: boolean;
  checkOnClickNode?: boolean;
  checkOnClickLeaf?: boolean;
  currentNodeKey?: string | number;
  accordion?: boolean;
  filterMethod?: FilterMethod;
  perfMode?: boolean;
  /**
   * @description always show scrollbar
   */
  scrollbarAlwaysOn?: boolean;
}
interface TreeNodeProps {
  node?: TreeNode;
  expanded?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  showCheckbox?: boolean;
  disabled?: boolean;
  current?: boolean;
  hiddenExpandIcon?: boolean;
  itemSize?: number;
}
/**
 * @deprecated Removed after 3.0.0, Use `TreeProps` instead.
 */
type TreePropsPublic = ExtractPublicPropTypes<typeof treeProps>;
interface TreeNode {
  key: TreeKey;
  level: number;
  parent?: TreeNode;
  children?: TreeNode[];
  data: TreeNodeData;
  disabled?: boolean;
  label?: string;
  isLeaf?: boolean;
  expanded?: boolean;
  /**
   * Determines whether the current tree node is effectively checked.
   *
   * Rules:
   * 1. A disabled leaf node is always considered checked.
   * 2. A non-disabled leaf node reflects its actual checked state.
   * 3. A non-leaf node is considered checked only when:
   *    - All of its child nodes are effectively checked, and
   *    - Each child follows the same evaluation rules:
   *      - Disabled leaf nodes follow rule #1.
   *      - Non-leaf child nodes are recursively evaluated under this rule (#3).
   */
  isEffectivelyChecked?: boolean;
}
interface TreeContext {
  ctx: Omit<SetupContext<typeof treeEmits>, 'expose' | 'attrs'>;
  instance: ComponentInternalInstance;
  props: TreeProps;
}
interface Tree {
  treeNodeMap: Map<TreeKey, TreeNode>;
  levelTreeNodeMap: Map<number, TreeNode[]>;
  treeNodes: TreeNode[];
  maxLevel: number;
}
type FilterMethod = (query: string, data: TreeNodeData, node: TreeNode) => boolean;
interface CheckedInfo {
  checkedKeys: TreeKey[];
  checkedNodes: TreeData;
  halfCheckedKeys: TreeKey[];
  halfCheckedNodes: TreeData;
}
//#endregion
export { CheckedInfo, FilterMethod, Tree, TreeContext, TreeData, TreeKey, TreeNode, TreeNodeData, TreeNodeProps, TreeOptionProps, TreeProps, TreePropsPublic };