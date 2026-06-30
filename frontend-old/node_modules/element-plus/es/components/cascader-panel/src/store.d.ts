import { Nullable } from "../../../utils/typescript.js";
import { CascaderConfig, CascaderNodePathValue, CascaderNodeValue, CascaderOption } from "./types.js";
import Node from "./node.js";

//#region ../../packages/components/cascader-panel/src/store.d.ts
declare class Store {
  readonly config: CascaderConfig;
  readonly nodes: Node[];
  readonly allNodes: Node[];
  readonly leafNodes: Node[];
  constructor(data: CascaderOption[], config: CascaderConfig);
  getNodes(): Node[];
  getFlattedNodes(leafOnly: boolean): Node[];
  appendNode(nodeData: CascaderOption, parentNode?: Node): void;
  appendNodes(nodeDataList: CascaderOption[], parentNode: Node): void;
  appendAllNodesAndLeafNodes(node: Node): void;
  getNodeByValue(value: CascaderNodeValue | CascaderNodePathValue, leafOnly?: boolean): Nullable<Node>;
  getSameNode(node: Node): Nullable<Node>;
}
//#endregion
export { Store as default };