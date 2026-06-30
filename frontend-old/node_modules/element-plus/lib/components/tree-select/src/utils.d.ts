import { TreeNodeData } from "../../tree/src/tree.type.js";

//#region ../../packages/components/tree-select/src/utils.d.ts
declare function isValidValue(val: any): any;
declare function isValidArray(val: any): number | false;
declare function toValidArray(val: any): any[];
type TreeCallback<T extends TreeNodeData, R> = (data: T, index: number, array: T[], parent?: T) => R;
type TreeFindCallback<T extends TreeNodeData> = TreeCallback<T, boolean>;
declare function treeFind<T extends TreeNodeData>(treeData: T[], findCallback: TreeFindCallback<T>, getChildren: (data: T) => T[]): T | undefined;
declare function treeFind<T extends TreeNodeData, R>(treeData: T[], findCallback: TreeFindCallback<T>, getChildren: (data: T) => T[], resultCallback?: TreeCallback<T, R>, parent?: T): R | undefined;
declare function treeEach<T extends TreeNodeData>(treeData: T[], callback: TreeCallback<T, void>, getChildren: (data: T) => T[], parent?: T): void;
//#endregion
export { isValidArray, isValidValue, toValidArray, treeEach, treeFind };