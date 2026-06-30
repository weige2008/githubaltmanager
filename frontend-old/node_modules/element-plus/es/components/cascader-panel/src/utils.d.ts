import Node from "./node.js";

//#region ../../packages/components/cascader-panel/src/utils.d.ts
declare const getMenuIndex: (el: HTMLElement) => number;
declare const checkNode: (el: HTMLElement) => void;
declare const sortByOriginalOrder: (oldNodes: Node[], newNodes: Node[]) => Node[];
//#endregion
export { checkNode, getMenuIndex, sortByOriginalOrder };