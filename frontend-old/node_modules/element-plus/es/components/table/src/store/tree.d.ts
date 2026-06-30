import { WatcherPropsData } from "./index.js";
import { DefaultRow, TreeNode } from "../table/defaults.js";
import * as _$vue from "vue";

//#region ../../packages/components/table/src/store/tree.d.ts
interface TreeData extends TreeNode {
  children?: string[];
  lazy?: boolean;
  loaded?: boolean;
}
declare function useTree<T extends DefaultRow>(watcherData: WatcherPropsData<T>): {
  loadData: (row: T, key: string, treeNode: TreeNode) => void;
  loadOrToggle: (row: T) => void;
  toggleTreeExpansion: (row: T, expanded?: boolean) => void;
  updateTreeExpandKeys: (value: string[]) => void;
  updateTreeData: (ifChangeExpandRowKeys?: boolean, ifExpandAll?: boolean) => void;
  updateKeyChildren: (key: string, data: T[]) => void;
  normalize: (data: T[]) => Record<string, TreeData>;
  states: {
    expandRowKeys: _$vue.Ref<string[], string[]>;
    treeData: _$vue.Ref<Record<string, TreeData>, Record<string, TreeData>>;
    indent: _$vue.Ref<number, number>;
    lazy: _$vue.Ref<boolean, boolean>;
    lazyTreeNodeMap: _$vue.Ref<Record<string, T[]>, Record<string, T[]>>;
    lazyColumnIdentifier: _$vue.Ref<string, string>;
    childrenColumnName: _$vue.Ref<string, string>;
    checkStrictly: _$vue.Ref<boolean, boolean>;
  };
};
//#endregion
export { TreeData, useTree as default };