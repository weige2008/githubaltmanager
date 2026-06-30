import TreeStore from "./tree-store.js";
import Node from "./node.js";
import { treeEmits } from "../tree.js";
import { AllowDragFunction, AllowDropFunction, FakeNode, FilterNodeMethodFunction, FilterValue, LoadFunction, NodeDropType, TreeData, TreeKey, TreeNodeData, TreeNodeLoadedDefaultProps, TreeStoreNodesMap } from "../tree.type.js";
import { InjectionKey, Ref, SetupContext } from "vue";

//#region ../../packages/components/tree/src/model/useDragNode.d.ts
interface TreeNode {
  node: Node;
  $el?: HTMLElement;
}
interface DragOptions {
  event: DragEvent;
  treeNode: TreeNode;
}
interface Props {
  props: {
    allowDrag?: AllowDragFunction;
    allowDrop?: AllowDropFunction;
  };
  ctx: SetupContext<typeof treeEmits>;
  el$: Ref<HTMLElement | null>;
  dropIndicator$: Ref<HTMLElement | null>;
  store: Ref<TreeStore>;
}
interface DragEvents {
  treeNodeDragStart: (options: DragOptions) => void;
  treeNodeDragOver: (options: DragOptions) => void;
  treeNodeDragEnd: (event: DragEvent) => void;
}
declare const dragEventsKey: InjectionKey<DragEvents>;
declare function useDragNodeHandler({
  props,
  ctx,
  el$,
  dropIndicator$,
  store
}: Props): {
  dragState: Ref<{
    allowDrop: boolean;
    dropType: NodeDropType | null;
    draggingNode: {
      node: {
        id: number;
        text: string | null;
        checked: boolean;
        indeterminate: boolean;
        data: TreeNodeData;
        expanded: boolean;
        parent: /*elided*/any | null;
        visible: boolean;
        isCurrent: boolean;
        store: {
          currentNode: /*elided*/any | null;
          currentNodeKey: TreeKey | null;
          nodesMap: TreeStoreNodesMap;
          root: /*elided*/any;
          data: TreeNodeData[];
          lazy: boolean;
          load?: LoadFunction | undefined;
          filterNodeMethod?: FilterNodeMethodFunction | undefined;
          key: TreeKey;
          defaultCheckedKeys?: TreeKey[] | undefined;
          checkStrictly: boolean;
          defaultExpandedKeys?: TreeKey[] | undefined;
          autoExpandParent: boolean;
          defaultExpandAll: boolean;
          checkDescendants: boolean;
          props: {
            children?: string | undefined;
            label?: string | ((data: TreeNodeData, node: Node) => string) | undefined;
            disabled?: string | ((data: TreeNodeData, node: Node) => boolean) | undefined;
            isLeaf?: string | ((data: TreeNodeData, node: Node) => boolean) | undefined;
            class?: ((data: TreeNodeData, node: Node) => string | {
              [key: string]: boolean;
            }) | undefined;
          };
          initialize: () => void;
          filter: (value: FilterValue) => void;
          setData: (newVal: TreeData) => void;
          getNode: (data: TreeKey | TreeNodeData | Node) => Node;
          insertBefore: (data: TreeNodeData, refData: TreeKey | TreeNodeData | Node) => void;
          insertAfter: (data: TreeNodeData, refData: TreeKey | TreeNodeData | Node) => void;
          remove: (data: TreeNodeData | Node) => void;
          append: (data: TreeNodeData, parentData: TreeNodeData | TreeKey | Node) => void;
          _initDefaultCheckedNodes: () => void;
          _initDefaultCheckedNode: (node: Node) => void;
          setDefaultCheckedKey: (newVal: TreeKey[]) => void;
          registerNode: (node: Node) => void;
          deregisterNode: (node: Node) => void;
          getCheckedNodes: (leafOnly?: boolean, includeHalfChecked?: boolean) => TreeNodeData[];
          getCheckedKeys: (leafOnly?: boolean) => TreeKey[];
          getHalfCheckedNodes: () => TreeNodeData[];
          getHalfCheckedKeys: () => TreeKey[];
          _getAllNodes: () => Node[];
          updateChildren: (key: TreeKey, data: TreeData) => void;
          _setCheckedKeys: (key: TreeKey, leafOnly: boolean | undefined, checkedKeys: {
            [key: string]: boolean;
          }) => void;
          setCheckedNodes: (array: Node[], leafOnly?: boolean) => void;
          setCheckedKeys: (keys: TreeKey[], leafOnly?: boolean) => void;
          setDefaultExpandedKeys: (keys: TreeKey[]) => void;
          setChecked: (data: TreeKey | TreeNodeData, checked: boolean, deep: boolean) => void;
          getCurrentNode: () => Node | null;
          setCurrentNode: (currentNode: Node) => void;
          setUserCurrentNode: (node: Node, shouldAutoExpandParent?: boolean) => void;
          setCurrentNodeKey: (key: TreeKey | null, shouldAutoExpandParent?: boolean) => void;
        };
        isLeafByUser: boolean | undefined;
        isLeaf: boolean | undefined;
        canFocus: boolean;
        level: number;
        loaded: boolean;
        childNodes: /*elided*/any[];
        loading: boolean;
        isEffectivelyChecked: boolean;
        initialize: () => void;
        setData: (data: TreeNodeData) => void;
        readonly label: string;
        readonly key: TreeKey | null | undefined;
        readonly disabled: boolean;
        readonly nextSibling: /*elided*/any | null;
        readonly previousSibling: /*elided*/any | null;
        contains: (target: Node, deep?: boolean) => boolean;
        remove: () => void;
        insertChild: (child?: FakeNode | Node, index?: number, batch?: boolean) => void;
        insertBefore: (child: FakeNode | Node, ref: Node) => void;
        insertAfter: (child: FakeNode | Node, ref: Node) => void;
        removeChild: (child: Node) => void;
        removeChildByData: (data: TreeNodeData | null) => void;
        expand: (callback?: (() => void) | null, expandParent?: boolean) => void;
        doCreateChildren: (array: TreeNodeData[], defaultProps?: TreeNodeLoadedDefaultProps) => void;
        collapse: () => void;
        shouldLoadData: () => boolean;
        updateLeafState: () => void;
        setChecked: (value?: boolean | string, deep?: boolean, recursion?: boolean, passValue?: boolean) => void;
        getChildren: (forceInit?: boolean) => TreeNodeData | TreeNodeData[] | null;
        updateChildren: () => void;
        loadData: (callback: (data?: TreeNodeData[]) => void, defaultProps?: TreeNodeLoadedDefaultProps) => void;
        eachNode: (callback: (node: Node) => void) => void;
        reInitChecked: () => void;
      };
      $el?: HTMLElement | undefined;
    } | null;
    showDropIndicator: boolean;
    dropNode: {
      node: {
        id: number;
        text: string | null;
        checked: boolean;
        indeterminate: boolean;
        data: TreeNodeData;
        expanded: boolean;
        parent: /*elided*/any | null;
        visible: boolean;
        isCurrent: boolean;
        store: {
          currentNode: /*elided*/any | null;
          currentNodeKey: TreeKey | null;
          nodesMap: TreeStoreNodesMap;
          root: /*elided*/any;
          data: TreeNodeData[];
          lazy: boolean;
          load?: LoadFunction | undefined;
          filterNodeMethod?: FilterNodeMethodFunction | undefined;
          key: TreeKey;
          defaultCheckedKeys?: TreeKey[] | undefined;
          checkStrictly: boolean;
          defaultExpandedKeys?: TreeKey[] | undefined;
          autoExpandParent: boolean;
          defaultExpandAll: boolean;
          checkDescendants: boolean;
          props: {
            children?: string | undefined;
            label?: string | ((data: TreeNodeData, node: Node) => string) | undefined;
            disabled?: string | ((data: TreeNodeData, node: Node) => boolean) | undefined;
            isLeaf?: string | ((data: TreeNodeData, node: Node) => boolean) | undefined;
            class?: ((data: TreeNodeData, node: Node) => string | {
              [key: string]: boolean;
            }) | undefined;
          };
          initialize: () => void;
          filter: (value: FilterValue) => void;
          setData: (newVal: TreeData) => void;
          getNode: (data: TreeKey | TreeNodeData | Node) => Node;
          insertBefore: (data: TreeNodeData, refData: TreeKey | TreeNodeData | Node) => void;
          insertAfter: (data: TreeNodeData, refData: TreeKey | TreeNodeData | Node) => void;
          remove: (data: TreeNodeData | Node) => void;
          append: (data: TreeNodeData, parentData: TreeNodeData | TreeKey | Node) => void;
          _initDefaultCheckedNodes: () => void;
          _initDefaultCheckedNode: (node: Node) => void;
          setDefaultCheckedKey: (newVal: TreeKey[]) => void;
          registerNode: (node: Node) => void;
          deregisterNode: (node: Node) => void;
          getCheckedNodes: (leafOnly?: boolean, includeHalfChecked?: boolean) => TreeNodeData[];
          getCheckedKeys: (leafOnly?: boolean) => TreeKey[];
          getHalfCheckedNodes: () => TreeNodeData[];
          getHalfCheckedKeys: () => TreeKey[];
          _getAllNodes: () => Node[];
          updateChildren: (key: TreeKey, data: TreeData) => void;
          _setCheckedKeys: (key: TreeKey, leafOnly: boolean | undefined, checkedKeys: {
            [key: string]: boolean;
          }) => void;
          setCheckedNodes: (array: Node[], leafOnly?: boolean) => void;
          setCheckedKeys: (keys: TreeKey[], leafOnly?: boolean) => void;
          setDefaultExpandedKeys: (keys: TreeKey[]) => void;
          setChecked: (data: TreeKey | TreeNodeData, checked: boolean, deep: boolean) => void;
          getCurrentNode: () => Node | null;
          setCurrentNode: (currentNode: Node) => void;
          setUserCurrentNode: (node: Node, shouldAutoExpandParent?: boolean) => void;
          setCurrentNodeKey: (key: TreeKey | null, shouldAutoExpandParent?: boolean) => void;
        };
        isLeafByUser: boolean | undefined;
        isLeaf: boolean | undefined;
        canFocus: boolean;
        level: number;
        loaded: boolean;
        childNodes: /*elided*/any[];
        loading: boolean;
        isEffectivelyChecked: boolean;
        initialize: () => void;
        setData: (data: TreeNodeData) => void;
        readonly label: string;
        readonly key: TreeKey | null | undefined;
        readonly disabled: boolean;
        readonly nextSibling: /*elided*/any | null;
        readonly previousSibling: /*elided*/any | null;
        contains: (target: Node, deep?: boolean) => boolean;
        remove: () => void;
        insertChild: (child?: FakeNode | Node, index?: number, batch?: boolean) => void;
        insertBefore: (child: FakeNode | Node, ref: Node) => void;
        insertAfter: (child: FakeNode | Node, ref: Node) => void;
        removeChild: (child: Node) => void;
        removeChildByData: (data: TreeNodeData | null) => void;
        expand: (callback?: (() => void) | null, expandParent?: boolean) => void;
        doCreateChildren: (array: TreeNodeData[], defaultProps?: TreeNodeLoadedDefaultProps) => void;
        collapse: () => void;
        shouldLoadData: () => boolean;
        updateLeafState: () => void;
        setChecked: (value?: boolean | string, deep?: boolean, recursion?: boolean, passValue?: boolean) => void;
        getChildren: (forceInit?: boolean) => TreeNodeData | TreeNodeData[] | null;
        updateChildren: () => void;
        loadData: (callback: (data?: TreeNodeData[]) => void, defaultProps?: TreeNodeLoadedDefaultProps) => void;
        eachNode: (callback: (node: Node) => void) => void;
        reInitChecked: () => void;
      };
      $el?: HTMLElement | undefined;
    } | null;
  }, {
    allowDrop: boolean;
    dropType: NodeDropType | null;
    draggingNode: TreeNode | null;
    showDropIndicator: boolean;
    dropNode: TreeNode | null;
  } | {
    allowDrop: boolean;
    dropType: NodeDropType | null;
    draggingNode: {
      node: {
        id: number;
        text: string | null;
        checked: boolean;
        indeterminate: boolean;
        data: TreeNodeData;
        expanded: boolean;
        parent: /*elided*/any | null;
        visible: boolean;
        isCurrent: boolean;
        store: {
          currentNode: /*elided*/any | null;
          currentNodeKey: TreeKey | null;
          nodesMap: TreeStoreNodesMap;
          root: /*elided*/any;
          data: TreeNodeData[];
          lazy: boolean;
          load?: LoadFunction | undefined;
          filterNodeMethod?: FilterNodeMethodFunction | undefined;
          key: TreeKey;
          defaultCheckedKeys?: TreeKey[] | undefined;
          checkStrictly: boolean;
          defaultExpandedKeys?: TreeKey[] | undefined;
          autoExpandParent: boolean;
          defaultExpandAll: boolean;
          checkDescendants: boolean;
          props: {
            children?: string | undefined;
            label?: string | ((data: TreeNodeData, node: Node) => string) | undefined;
            disabled?: string | ((data: TreeNodeData, node: Node) => boolean) | undefined;
            isLeaf?: string | ((data: TreeNodeData, node: Node) => boolean) | undefined;
            class?: ((data: TreeNodeData, node: Node) => string | {
              [key: string]: boolean;
            }) | undefined;
          };
          initialize: () => void;
          filter: (value: FilterValue) => void;
          setData: (newVal: TreeData) => void;
          getNode: (data: TreeKey | TreeNodeData | Node) => Node;
          insertBefore: (data: TreeNodeData, refData: TreeKey | TreeNodeData | Node) => void;
          insertAfter: (data: TreeNodeData, refData: TreeKey | TreeNodeData | Node) => void;
          remove: (data: TreeNodeData | Node) => void;
          append: (data: TreeNodeData, parentData: TreeNodeData | TreeKey | Node) => void;
          _initDefaultCheckedNodes: () => void;
          _initDefaultCheckedNode: (node: Node) => void;
          setDefaultCheckedKey: (newVal: TreeKey[]) => void;
          registerNode: (node: Node) => void;
          deregisterNode: (node: Node) => void;
          getCheckedNodes: (leafOnly?: boolean, includeHalfChecked?: boolean) => TreeNodeData[];
          getCheckedKeys: (leafOnly?: boolean) => TreeKey[];
          getHalfCheckedNodes: () => TreeNodeData[];
          getHalfCheckedKeys: () => TreeKey[];
          _getAllNodes: () => Node[];
          updateChildren: (key: TreeKey, data: TreeData) => void;
          _setCheckedKeys: (key: TreeKey, leafOnly: boolean | undefined, checkedKeys: {
            [key: string]: boolean;
          }) => void;
          setCheckedNodes: (array: Node[], leafOnly?: boolean) => void;
          setCheckedKeys: (keys: TreeKey[], leafOnly?: boolean) => void;
          setDefaultExpandedKeys: (keys: TreeKey[]) => void;
          setChecked: (data: TreeKey | TreeNodeData, checked: boolean, deep: boolean) => void;
          getCurrentNode: () => Node | null;
          setCurrentNode: (currentNode: Node) => void;
          setUserCurrentNode: (node: Node, shouldAutoExpandParent?: boolean) => void;
          setCurrentNodeKey: (key: TreeKey | null, shouldAutoExpandParent?: boolean) => void;
        };
        isLeafByUser: boolean | undefined;
        isLeaf: boolean | undefined;
        canFocus: boolean;
        level: number;
        loaded: boolean;
        childNodes: /*elided*/any[];
        loading: boolean;
        isEffectivelyChecked: boolean;
        initialize: () => void;
        setData: (data: TreeNodeData) => void;
        readonly label: string;
        readonly key: TreeKey | null | undefined;
        readonly disabled: boolean;
        readonly nextSibling: /*elided*/any | null;
        readonly previousSibling: /*elided*/any | null;
        contains: (target: Node, deep?: boolean) => boolean;
        remove: () => void;
        insertChild: (child?: FakeNode | Node, index?: number, batch?: boolean) => void;
        insertBefore: (child: FakeNode | Node, ref: Node) => void;
        insertAfter: (child: FakeNode | Node, ref: Node) => void;
        removeChild: (child: Node) => void;
        removeChildByData: (data: TreeNodeData | null) => void;
        expand: (callback?: (() => void) | null, expandParent?: boolean) => void;
        doCreateChildren: (array: TreeNodeData[], defaultProps?: TreeNodeLoadedDefaultProps) => void;
        collapse: () => void;
        shouldLoadData: () => boolean;
        updateLeafState: () => void;
        setChecked: (value?: boolean | string, deep?: boolean, recursion?: boolean, passValue?: boolean) => void;
        getChildren: (forceInit?: boolean) => TreeNodeData | TreeNodeData[] | null;
        updateChildren: () => void;
        loadData: (callback: (data?: TreeNodeData[]) => void, defaultProps?: TreeNodeLoadedDefaultProps) => void;
        eachNode: (callback: (node: Node) => void) => void;
        reInitChecked: () => void;
      };
      $el?: HTMLElement | undefined;
    } | null;
    showDropIndicator: boolean;
    dropNode: {
      node: {
        id: number;
        text: string | null;
        checked: boolean;
        indeterminate: boolean;
        data: TreeNodeData;
        expanded: boolean;
        parent: /*elided*/any | null;
        visible: boolean;
        isCurrent: boolean;
        store: {
          currentNode: /*elided*/any | null;
          currentNodeKey: TreeKey | null;
          nodesMap: TreeStoreNodesMap;
          root: /*elided*/any;
          data: TreeNodeData[];
          lazy: boolean;
          load?: LoadFunction | undefined;
          filterNodeMethod?: FilterNodeMethodFunction | undefined;
          key: TreeKey;
          defaultCheckedKeys?: TreeKey[] | undefined;
          checkStrictly: boolean;
          defaultExpandedKeys?: TreeKey[] | undefined;
          autoExpandParent: boolean;
          defaultExpandAll: boolean;
          checkDescendants: boolean;
          props: {
            children?: string | undefined;
            label?: string | ((data: TreeNodeData, node: Node) => string) | undefined;
            disabled?: string | ((data: TreeNodeData, node: Node) => boolean) | undefined;
            isLeaf?: string | ((data: TreeNodeData, node: Node) => boolean) | undefined;
            class?: ((data: TreeNodeData, node: Node) => string | {
              [key: string]: boolean;
            }) | undefined;
          };
          initialize: () => void;
          filter: (value: FilterValue) => void;
          setData: (newVal: TreeData) => void;
          getNode: (data: TreeKey | TreeNodeData | Node) => Node;
          insertBefore: (data: TreeNodeData, refData: TreeKey | TreeNodeData | Node) => void;
          insertAfter: (data: TreeNodeData, refData: TreeKey | TreeNodeData | Node) => void;
          remove: (data: TreeNodeData | Node) => void;
          append: (data: TreeNodeData, parentData: TreeNodeData | TreeKey | Node) => void;
          _initDefaultCheckedNodes: () => void;
          _initDefaultCheckedNode: (node: Node) => void;
          setDefaultCheckedKey: (newVal: TreeKey[]) => void;
          registerNode: (node: Node) => void;
          deregisterNode: (node: Node) => void;
          getCheckedNodes: (leafOnly?: boolean, includeHalfChecked?: boolean) => TreeNodeData[];
          getCheckedKeys: (leafOnly?: boolean) => TreeKey[];
          getHalfCheckedNodes: () => TreeNodeData[];
          getHalfCheckedKeys: () => TreeKey[];
          _getAllNodes: () => Node[];
          updateChildren: (key: TreeKey, data: TreeData) => void;
          _setCheckedKeys: (key: TreeKey, leafOnly: boolean | undefined, checkedKeys: {
            [key: string]: boolean;
          }) => void;
          setCheckedNodes: (array: Node[], leafOnly?: boolean) => void;
          setCheckedKeys: (keys: TreeKey[], leafOnly?: boolean) => void;
          setDefaultExpandedKeys: (keys: TreeKey[]) => void;
          setChecked: (data: TreeKey | TreeNodeData, checked: boolean, deep: boolean) => void;
          getCurrentNode: () => Node | null;
          setCurrentNode: (currentNode: Node) => void;
          setUserCurrentNode: (node: Node, shouldAutoExpandParent?: boolean) => void;
          setCurrentNodeKey: (key: TreeKey | null, shouldAutoExpandParent?: boolean) => void;
        };
        isLeafByUser: boolean | undefined;
        isLeaf: boolean | undefined;
        canFocus: boolean;
        level: number;
        loaded: boolean;
        childNodes: /*elided*/any[];
        loading: boolean;
        isEffectivelyChecked: boolean;
        initialize: () => void;
        setData: (data: TreeNodeData) => void;
        readonly label: string;
        readonly key: TreeKey | null | undefined;
        readonly disabled: boolean;
        readonly nextSibling: /*elided*/any | null;
        readonly previousSibling: /*elided*/any | null;
        contains: (target: Node, deep?: boolean) => boolean;
        remove: () => void;
        insertChild: (child?: FakeNode | Node, index?: number, batch?: boolean) => void;
        insertBefore: (child: FakeNode | Node, ref: Node) => void;
        insertAfter: (child: FakeNode | Node, ref: Node) => void;
        removeChild: (child: Node) => void;
        removeChildByData: (data: TreeNodeData | null) => void;
        expand: (callback?: (() => void) | null, expandParent?: boolean) => void;
        doCreateChildren: (array: TreeNodeData[], defaultProps?: TreeNodeLoadedDefaultProps) => void;
        collapse: () => void;
        shouldLoadData: () => boolean;
        updateLeafState: () => void;
        setChecked: (value?: boolean | string, deep?: boolean, recursion?: boolean, passValue?: boolean) => void;
        getChildren: (forceInit?: boolean) => TreeNodeData | TreeNodeData[] | null;
        updateChildren: () => void;
        loadData: (callback: (data?: TreeNodeData[]) => void, defaultProps?: TreeNodeLoadedDefaultProps) => void;
        eachNode: (callback: (node: Node) => void) => void;
        reInitChecked: () => void;
      };
      $el?: HTMLElement | undefined;
    } | null;
  }>;
};
//#endregion
export { DragEvents, TreeNode, dragEventsKey, useDragNodeHandler };