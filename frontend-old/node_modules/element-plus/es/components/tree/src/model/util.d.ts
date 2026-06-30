import Node from "./node.js";
import { TreeEmits } from "../tree.js";
import { RootTreeType, TreeKey, TreeNodeData } from "../tree.type.js";

//#region ../../packages/components/tree/src/model/util.d.ts
declare const NODE_KEY = "$treeNodeId";
declare const markNodeData: (node: Node, data: TreeNodeData | null) => void;
declare const getNodeKey: (key: TreeKey | undefined, data: TreeNodeData) => any;
declare const handleCurrentChange: (store: RootTreeType["store"], emit: TreeEmits, setCurrent: () => void) => void;
//#endregion
export { NODE_KEY, getNodeKey, handleCurrentChange, markNodeData };