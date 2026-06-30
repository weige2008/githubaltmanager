import { TableColumnCtx } from "./table-column/defaults.js";
import { Store } from "./store/index.js";
import { DefaultRow, TreeNode } from "./table/defaults.js";
import * as _$vue from "vue";
import { VNode } from "vue";

//#region ../../packages/components/table/src/config.d.ts
declare const cellStarts: {
  default: {
    order: string;
  };
  selection: {
    width: number;
    minWidth: number;
    realWidth: number;
    order: string;
  };
  expand: {
    width: number;
    minWidth: number;
    realWidth: number;
    order: string;
  };
  index: {
    width: number;
    minWidth: number;
    realWidth: number;
    order: string;
  };
};
declare const getDefaultClassName: (type: string) => "table-column--selection" | "table__expand-column";
declare const cellForced: {
  selection: {
    renderHeader<T extends DefaultRow>({
      store
    }: {
      store: Store<T>;
    }): VNode<_$vue.RendererNode, _$vue.RendererElement, {
      [key: string]: any;
    }>;
    renderCell<T extends DefaultRow>({
      row,
      column,
      store,
      $index
    }: {
      row: T;
      column: TableColumnCtx<T>;
      store: Store<T>;
      $index: number;
    }): VNode<_$vue.RendererNode, _$vue.RendererElement, {
      [key: string]: any;
    }>;
    sortable: boolean;
    resizable: boolean;
  };
  index: {
    renderHeader<T extends DefaultRow>({
      column
    }: {
      column: TableColumnCtx<T>;
    }): string;
    renderCell<T extends DefaultRow>({
      column,
      $index
    }: {
      column: TableColumnCtx<T>;
      $index: number;
    }): VNode<_$vue.RendererNode, _$vue.RendererElement, {
      [key: string]: any;
    }>;
    sortable: boolean;
  };
  expand: {
    renderHeader<T extends DefaultRow>({
      column
    }: {
      column: TableColumnCtx<T>;
    }): string;
    renderCell<T extends DefaultRow>({
      column,
      row,
      store,
      expanded,
      $index
    }: {
      column: TableColumnCtx<T>;
      row: T;
      store: Store<T>;
      expanded: boolean;
      $index: number;
    }): VNode<_$vue.RendererNode, _$vue.RendererElement, {
      [key: string]: any;
    }>;
    sortable: boolean;
    resizable: boolean;
  };
};
declare function defaultRenderCell<T extends DefaultRow>({
  row,
  column,
  $index
}: {
  row: T;
  column: TableColumnCtx<T>;
  $index: number;
}): any;
declare function treeCellPrefix<T extends DefaultRow>({
  row,
  treeNode,
  store
}: {
  row: T;
  treeNode: TreeNode;
  store: Store<T>;
}, createPlaceholder?: boolean): VNode<_$vue.RendererNode, _$vue.RendererElement, {
  [key: string]: any;
}>[] | null;
//#endregion
export { cellForced, cellStarts, defaultRenderCell, getDefaultClassName, treeCellPrefix };