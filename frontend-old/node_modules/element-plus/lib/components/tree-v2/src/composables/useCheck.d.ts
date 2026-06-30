import { CheckboxValueType } from "../../../checkbox/src/checkbox.js";
import { Tree, TreeKey, TreeNode, TreeNodeData, TreeProps } from "../types.js";
import { Ref } from "vue";

//#region ../../packages/components/tree-v2/src/composables/useCheck.d.ts
declare function useCheck(props: TreeProps, tree: Ref<Tree | undefined>): {
  updateCheckedKeys: (deep?: boolean) => void;
  toggleCheckbox: (node: TreeNode, isChecked: CheckboxValueType, nodeClick?: boolean, immediateUpdate?: boolean, deep?: boolean) => void;
  isChecked: (node: TreeNode) => boolean;
  isIndeterminate: (node: TreeNode) => boolean;
  getCheckedKeys: (leafOnly?: boolean) => TreeKey[];
  getCheckedNodes: (leafOnly?: boolean) => TreeNodeData[];
  getHalfCheckedKeys: () => TreeKey[];
  getHalfCheckedNodes: () => TreeNodeData[];
  setChecked: (key: TreeKey, isChecked: boolean, deep?: boolean) => void;
  setCheckedKeys: (keys: TreeKey[]) => void;
};
//#endregion
export { useCheck };