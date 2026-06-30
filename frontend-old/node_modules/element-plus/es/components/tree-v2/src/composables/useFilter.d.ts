import { Tree, TreeKey, TreeNode, TreeProps } from "../types.js";
import { Ref } from "vue";

//#region ../../packages/components/tree-v2/src/composables/useFilter.d.ts
declare function useFilter(props: TreeProps, tree: Ref<Tree | undefined>): {
  hiddenExpandIconKeySet: Ref<Set<TreeKey> & Omit<Set<TreeKey>, keyof Set<any>>, Set<TreeKey> | (Set<TreeKey> & Omit<Set<TreeKey>, keyof Set<any>>)>;
  hiddenNodeKeySet: Ref<Set<TreeKey> & Omit<Set<TreeKey>, keyof Set<any>>, Set<TreeKey> | (Set<TreeKey> & Omit<Set<TreeKey>, keyof Set<any>>)>;
  doFilter: (query: string) => Set<TreeKey> | undefined;
  isForceHiddenExpandIcon: (node: TreeNode) => boolean;
};
//#endregion
export { useFilter };