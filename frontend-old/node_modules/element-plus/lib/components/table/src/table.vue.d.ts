import { Translator } from "../../../hooks/use-locale/index.js";
import { UseTooltipProps } from "../../tooltip/src/tooltip.js";
import { TreeData } from "./store/tree.js";
import { TableColumnCtx } from "./table-column/defaults.js";
import { StoreFilter } from "./store/index.js";
import TableLayout from "./table-layout.js";
import { DefaultRow, Filter, RenderExpanded, Sort, Table, TableEmits, TableProps, TableSortOrder } from "./table/defaults.js";
import * as _$vue from "vue";
import * as _$lodash_unified0 from "lodash-unified";

//#region ../../packages/components/table/src/table.vue.d.ts
declare const __VLS_export: <T extends DefaultRow = DefaultRow>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: _$vue.PublicProps & __VLS_PrettifyLocal<TableProps<T> & {
    onScroll?: ((data: {
      scrollLeft: number;
      scrollTop: number;
    }) => any) | undefined;
    "onSelect-all"?: ((selection: T[]) => any) | undefined;
    onSelect?: ((selection: T[], row: T) => any) | undefined;
    "onExpand-change"?: ((row: T, expanded: boolean) => any) | undefined;
    "onCurrent-change"?: ((currentRow: T | null, oldCurrentRow: T | null) => any) | undefined;
    "onSelection-change"?: ((newSelection: T[]) => any) | undefined;
    "onCell-mouse-enter"?: ((row: T, column: TableColumnCtx<T>, cell: HTMLTableCellElement, event: MouseEvent) => any) | undefined;
    "onCell-mouse-leave"?: ((row: T, column: TableColumnCtx<T>, cell: HTMLTableCellElement, event: MouseEvent) => any) | undefined;
    "onCell-dblclick"?: ((row: T, column: TableColumnCtx<T>, cell: HTMLTableCellElement, event: MouseEvent) => any) | undefined;
    "onCell-contextmenu"?: ((row: T, column: TableColumnCtx<T>, cell: HTMLTableCellElement, event: PointerEvent) => any) | undefined;
    "onCell-click"?: ((row: T, column: TableColumnCtx<T>, cell: HTMLTableCellElement, event: PointerEvent) => any) | undefined;
    "onRow-dblclick"?: ((row: T, column: TableColumnCtx<T> | null, event: MouseEvent) => any) | undefined;
    "onRow-click"?: ((row: T, column: TableColumnCtx<T> | null, event: PointerEvent) => any) | undefined;
    "onRow-contextmenu"?: ((row: T, column: TableColumnCtx<T> | null, event: PointerEvent) => any) | undefined;
    "onHeader-click"?: ((column: TableColumnCtx<T>, event: PointerEvent) => any) | undefined;
    "onHeader-contextmenu"?: ((column: TableColumnCtx<T>, event: PointerEvent) => any) | undefined;
    "onSort-change"?: ((data: {
      column: TableColumnCtx<T>;
      prop: string | null;
      order: TableSortOrder | null;
    }) => any) | undefined;
    "onFilter-change"?: ((newFilters: Record<string, string[]>) => any) | undefined;
    "onHeader-dragend"?: ((newWidth: number, oldWidth: number, column: TableColumnCtx<T>, event: MouseEvent) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: _$vue.ShallowUnwrapRef<{
    ns: {
      namespace: _$vue.ComputedRef<string>;
      b: (blockSuffix?: string) => string;
      e: (element?: string) => string;
      m: (modifier?: string) => string;
      be: (blockSuffix?: string, element?: string) => string;
      em: (element?: string, modifier?: string) => string;
      bm: (blockSuffix?: string, modifier?: string) => string;
      bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
      is: {
        (name: string, state: boolean | undefined): string;
        (name: string): string;
      };
      cssVar: (object: Record<string, string>) => Record<string, string>;
      cssVarName: (name: string) => string;
      cssVarBlock: (object: Record<string, string>) => Record<string, string>;
      cssVarBlockName: (name: string) => string;
    };
    layout: TableLayout<T>;
    store: {
      mutations: {
        setData(states: {
          _currentRowKey: _$vue.Ref<string | null, string | null>;
          currentRow: _$vue.Ref<T | null, T | null>;
          expandRowKeys: _$vue.Ref<string[], string[]>;
          treeData: _$vue.Ref<Record<string, TreeData>, Record<string, TreeData>>;
          indent: _$vue.Ref<number, number>;
          lazy: _$vue.Ref<boolean, boolean>;
          lazyTreeNodeMap: _$vue.Ref<Record<string, T[]>, Record<string, T[]>>;
          lazyColumnIdentifier: _$vue.Ref<string, string>;
          childrenColumnName: _$vue.Ref<string, string>;
          checkStrictly: _$vue.Ref<boolean, boolean>;
          expandRows: _$vue.Ref<T[], T[]>;
          defaultExpandAll: _$vue.Ref<boolean, boolean>;
          tableSize: _$vue.Ref<any, any>;
          rowKey: _$vue.Ref<string | null, string | null>;
          data: _$vue.Ref<T[], T[]>;
          _data: _$vue.Ref<T[], T[]>;
          isComplex: _$vue.Ref<boolean, boolean>;
          _columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          originColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          leafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          updateOrderFns: (() => void)[];
          leafColumnsLength: _$vue.Ref<number, number>;
          fixedLeafColumnsLength: _$vue.Ref<number, number>;
          rightFixedLeafColumnsLength: _$vue.Ref<number, number>;
          isAllSelected: _$vue.Ref<boolean, boolean>;
          selection: _$vue.Ref<T[], T[]>;
          selectionIndeterminate: _$vue.Ref<Record<string, boolean>, Record<string, boolean>>;
          reserveSelection: _$vue.Ref<boolean, boolean>;
          selectOnIndeterminate: _$vue.Ref<boolean, boolean>;
          selectable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          rowExpandable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          filters: _$vue.Ref<StoreFilter, StoreFilter>;
          filteredData: _$vue.Ref<T[] | null, T[] | null>;
          sortingColumn: _$vue.Ref<TableColumnCtx<T> | null, TableColumnCtx<T> | null>;
          sortProp: _$vue.Ref<string | null, string | null>;
          sortOrder: _$vue.Ref<TableSortOrder | null, TableSortOrder | null>;
          hoverRow: _$vue.Ref<T | null, T | null>;
        }, data: T[]): void;
        insertColumn(states: {
          _currentRowKey: _$vue.Ref<string | null, string | null>;
          currentRow: _$vue.Ref<T | null, T | null>;
          expandRowKeys: _$vue.Ref<string[], string[]>;
          treeData: _$vue.Ref<Record<string, TreeData>, Record<string, TreeData>>;
          indent: _$vue.Ref<number, number>;
          lazy: _$vue.Ref<boolean, boolean>;
          lazyTreeNodeMap: _$vue.Ref<Record<string, T[]>, Record<string, T[]>>;
          lazyColumnIdentifier: _$vue.Ref<string, string>;
          childrenColumnName: _$vue.Ref<string, string>;
          checkStrictly: _$vue.Ref<boolean, boolean>;
          expandRows: _$vue.Ref<T[], T[]>;
          defaultExpandAll: _$vue.Ref<boolean, boolean>;
          tableSize: _$vue.Ref<any, any>;
          rowKey: _$vue.Ref<string | null, string | null>;
          data: _$vue.Ref<T[], T[]>;
          _data: _$vue.Ref<T[], T[]>;
          isComplex: _$vue.Ref<boolean, boolean>;
          _columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          originColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          leafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          updateOrderFns: (() => void)[];
          leafColumnsLength: _$vue.Ref<number, number>;
          fixedLeafColumnsLength: _$vue.Ref<number, number>;
          rightFixedLeafColumnsLength: _$vue.Ref<number, number>;
          isAllSelected: _$vue.Ref<boolean, boolean>;
          selection: _$vue.Ref<T[], T[]>;
          selectionIndeterminate: _$vue.Ref<Record<string, boolean>, Record<string, boolean>>;
          reserveSelection: _$vue.Ref<boolean, boolean>;
          selectOnIndeterminate: _$vue.Ref<boolean, boolean>;
          selectable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          rowExpandable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          filters: _$vue.Ref<StoreFilter, StoreFilter>;
          filteredData: _$vue.Ref<T[] | null, T[] | null>;
          sortingColumn: _$vue.Ref<TableColumnCtx<T> | null, TableColumnCtx<T> | null>;
          sortProp: _$vue.Ref<string | null, string | null>;
          sortOrder: _$vue.Ref<TableSortOrder | null, TableSortOrder | null>;
          hoverRow: _$vue.Ref<T | null, T | null>;
        }, column: TableColumnCtx<T>, parent: TableColumnCtx<T>, updateColumnOrder: () => void): void;
        updateColumnOrder(states: {
          _currentRowKey: _$vue.Ref<string | null, string | null>;
          currentRow: _$vue.Ref<T | null, T | null>;
          expandRowKeys: _$vue.Ref<string[], string[]>;
          treeData: _$vue.Ref<Record<string, TreeData>, Record<string, TreeData>>;
          indent: _$vue.Ref<number, number>;
          lazy: _$vue.Ref<boolean, boolean>;
          lazyTreeNodeMap: _$vue.Ref<Record<string, T[]>, Record<string, T[]>>;
          lazyColumnIdentifier: _$vue.Ref<string, string>;
          childrenColumnName: _$vue.Ref<string, string>;
          checkStrictly: _$vue.Ref<boolean, boolean>;
          expandRows: _$vue.Ref<T[], T[]>;
          defaultExpandAll: _$vue.Ref<boolean, boolean>;
          tableSize: _$vue.Ref<any, any>;
          rowKey: _$vue.Ref<string | null, string | null>;
          data: _$vue.Ref<T[], T[]>;
          _data: _$vue.Ref<T[], T[]>;
          isComplex: _$vue.Ref<boolean, boolean>;
          _columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          originColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          leafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          updateOrderFns: (() => void)[];
          leafColumnsLength: _$vue.Ref<number, number>;
          fixedLeafColumnsLength: _$vue.Ref<number, number>;
          rightFixedLeafColumnsLength: _$vue.Ref<number, number>;
          isAllSelected: _$vue.Ref<boolean, boolean>;
          selection: _$vue.Ref<T[], T[]>;
          selectionIndeterminate: _$vue.Ref<Record<string, boolean>, Record<string, boolean>>;
          reserveSelection: _$vue.Ref<boolean, boolean>;
          selectOnIndeterminate: _$vue.Ref<boolean, boolean>;
          selectable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          rowExpandable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          filters: _$vue.Ref<StoreFilter, StoreFilter>;
          filteredData: _$vue.Ref<T[] | null, T[] | null>;
          sortingColumn: _$vue.Ref<TableColumnCtx<T> | null, TableColumnCtx<T> | null>;
          sortProp: _$vue.Ref<string | null, string | null>;
          sortOrder: _$vue.Ref<TableSortOrder | null, TableSortOrder | null>;
          hoverRow: _$vue.Ref<T | null, T | null>;
        }, column: TableColumnCtx<T>): void;
        removeColumn(states: {
          _currentRowKey: _$vue.Ref<string | null, string | null>;
          currentRow: _$vue.Ref<T | null, T | null>;
          expandRowKeys: _$vue.Ref<string[], string[]>;
          treeData: _$vue.Ref<Record<string, TreeData>, Record<string, TreeData>>;
          indent: _$vue.Ref<number, number>;
          lazy: _$vue.Ref<boolean, boolean>;
          lazyTreeNodeMap: _$vue.Ref<Record<string, T[]>, Record<string, T[]>>;
          lazyColumnIdentifier: _$vue.Ref<string, string>;
          childrenColumnName: _$vue.Ref<string, string>;
          checkStrictly: _$vue.Ref<boolean, boolean>;
          expandRows: _$vue.Ref<T[], T[]>;
          defaultExpandAll: _$vue.Ref<boolean, boolean>;
          tableSize: _$vue.Ref<any, any>;
          rowKey: _$vue.Ref<string | null, string | null>;
          data: _$vue.Ref<T[], T[]>;
          _data: _$vue.Ref<T[], T[]>;
          isComplex: _$vue.Ref<boolean, boolean>;
          _columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          originColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          leafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          updateOrderFns: (() => void)[];
          leafColumnsLength: _$vue.Ref<number, number>;
          fixedLeafColumnsLength: _$vue.Ref<number, number>;
          rightFixedLeafColumnsLength: _$vue.Ref<number, number>;
          isAllSelected: _$vue.Ref<boolean, boolean>;
          selection: _$vue.Ref<T[], T[]>;
          selectionIndeterminate: _$vue.Ref<Record<string, boolean>, Record<string, boolean>>;
          reserveSelection: _$vue.Ref<boolean, boolean>;
          selectOnIndeterminate: _$vue.Ref<boolean, boolean>;
          selectable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          rowExpandable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          filters: _$vue.Ref<StoreFilter, StoreFilter>;
          filteredData: _$vue.Ref<T[] | null, T[] | null>;
          sortingColumn: _$vue.Ref<TableColumnCtx<T> | null, TableColumnCtx<T> | null>;
          sortProp: _$vue.Ref<string | null, string | null>;
          sortOrder: _$vue.Ref<TableSortOrder | null, TableSortOrder | null>;
          hoverRow: _$vue.Ref<T | null, T | null>;
        }, column: TableColumnCtx<T>, parent: TableColumnCtx<T>, updateColumnOrder: () => void): void;
        sort(states: {
          _currentRowKey: _$vue.Ref<string | null, string | null>;
          currentRow: _$vue.Ref<T | null, T | null>;
          expandRowKeys: _$vue.Ref<string[], string[]>;
          treeData: _$vue.Ref<Record<string, TreeData>, Record<string, TreeData>>;
          indent: _$vue.Ref<number, number>;
          lazy: _$vue.Ref<boolean, boolean>;
          lazyTreeNodeMap: _$vue.Ref<Record<string, T[]>, Record<string, T[]>>;
          lazyColumnIdentifier: _$vue.Ref<string, string>;
          childrenColumnName: _$vue.Ref<string, string>;
          checkStrictly: _$vue.Ref<boolean, boolean>;
          expandRows: _$vue.Ref<T[], T[]>;
          defaultExpandAll: _$vue.Ref<boolean, boolean>;
          tableSize: _$vue.Ref<any, any>;
          rowKey: _$vue.Ref<string | null, string | null>;
          data: _$vue.Ref<T[], T[]>;
          _data: _$vue.Ref<T[], T[]>;
          isComplex: _$vue.Ref<boolean, boolean>;
          _columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          originColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          leafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          updateOrderFns: (() => void)[];
          leafColumnsLength: _$vue.Ref<number, number>;
          fixedLeafColumnsLength: _$vue.Ref<number, number>;
          rightFixedLeafColumnsLength: _$vue.Ref<number, number>;
          isAllSelected: _$vue.Ref<boolean, boolean>;
          selection: _$vue.Ref<T[], T[]>;
          selectionIndeterminate: _$vue.Ref<Record<string, boolean>, Record<string, boolean>>;
          reserveSelection: _$vue.Ref<boolean, boolean>;
          selectOnIndeterminate: _$vue.Ref<boolean, boolean>;
          selectable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          rowExpandable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          filters: _$vue.Ref<StoreFilter, StoreFilter>;
          filteredData: _$vue.Ref<T[] | null, T[] | null>;
          sortingColumn: _$vue.Ref<TableColumnCtx<T> | null, TableColumnCtx<T> | null>;
          sortProp: _$vue.Ref<string | null, string | null>;
          sortOrder: _$vue.Ref<TableSortOrder | null, TableSortOrder | null>;
          hoverRow: _$vue.Ref<T | null, T | null>;
        }, options: Sort): void;
        changeSortCondition(states: {
          _currentRowKey: _$vue.Ref<string | null, string | null>;
          currentRow: _$vue.Ref<T | null, T | null>;
          expandRowKeys: _$vue.Ref<string[], string[]>;
          treeData: _$vue.Ref<Record<string, TreeData>, Record<string, TreeData>>;
          indent: _$vue.Ref<number, number>;
          lazy: _$vue.Ref<boolean, boolean>;
          lazyTreeNodeMap: _$vue.Ref<Record<string, T[]>, Record<string, T[]>>;
          lazyColumnIdentifier: _$vue.Ref<string, string>;
          childrenColumnName: _$vue.Ref<string, string>;
          checkStrictly: _$vue.Ref<boolean, boolean>;
          expandRows: _$vue.Ref<T[], T[]>;
          defaultExpandAll: _$vue.Ref<boolean, boolean>;
          tableSize: _$vue.Ref<any, any>;
          rowKey: _$vue.Ref<string | null, string | null>;
          data: _$vue.Ref<T[], T[]>;
          _data: _$vue.Ref<T[], T[]>;
          isComplex: _$vue.Ref<boolean, boolean>;
          _columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          originColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          leafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          updateOrderFns: (() => void)[];
          leafColumnsLength: _$vue.Ref<number, number>;
          fixedLeafColumnsLength: _$vue.Ref<number, number>;
          rightFixedLeafColumnsLength: _$vue.Ref<number, number>;
          isAllSelected: _$vue.Ref<boolean, boolean>;
          selection: _$vue.Ref<T[], T[]>;
          selectionIndeterminate: _$vue.Ref<Record<string, boolean>, Record<string, boolean>>;
          reserveSelection: _$vue.Ref<boolean, boolean>;
          selectOnIndeterminate: _$vue.Ref<boolean, boolean>;
          selectable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          rowExpandable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          filters: _$vue.Ref<StoreFilter, StoreFilter>;
          filteredData: _$vue.Ref<T[] | null, T[] | null>;
          sortingColumn: _$vue.Ref<TableColumnCtx<T> | null, TableColumnCtx<T> | null>;
          sortProp: _$vue.Ref<string | null, string | null>;
          sortOrder: _$vue.Ref<TableSortOrder | null, TableSortOrder | null>;
          hoverRow: _$vue.Ref<T | null, T | null>;
        }, options: Sort): void;
        filterChange(_states: {
          _currentRowKey: _$vue.Ref<string | null, string | null>;
          currentRow: _$vue.Ref<T | null, T | null>;
          expandRowKeys: _$vue.Ref<string[], string[]>;
          treeData: _$vue.Ref<Record<string, TreeData>, Record<string, TreeData>>;
          indent: _$vue.Ref<number, number>;
          lazy: _$vue.Ref<boolean, boolean>;
          lazyTreeNodeMap: _$vue.Ref<Record<string, T[]>, Record<string, T[]>>;
          lazyColumnIdentifier: _$vue.Ref<string, string>;
          childrenColumnName: _$vue.Ref<string, string>;
          checkStrictly: _$vue.Ref<boolean, boolean>;
          expandRows: _$vue.Ref<T[], T[]>;
          defaultExpandAll: _$vue.Ref<boolean, boolean>;
          tableSize: _$vue.Ref<any, any>;
          rowKey: _$vue.Ref<string | null, string | null>;
          data: _$vue.Ref<T[], T[]>;
          _data: _$vue.Ref<T[], T[]>;
          isComplex: _$vue.Ref<boolean, boolean>;
          _columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          originColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          leafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          updateOrderFns: (() => void)[];
          leafColumnsLength: _$vue.Ref<number, number>;
          fixedLeafColumnsLength: _$vue.Ref<number, number>;
          rightFixedLeafColumnsLength: _$vue.Ref<number, number>;
          isAllSelected: _$vue.Ref<boolean, boolean>;
          selection: _$vue.Ref<T[], T[]>;
          selectionIndeterminate: _$vue.Ref<Record<string, boolean>, Record<string, boolean>>;
          reserveSelection: _$vue.Ref<boolean, boolean>;
          selectOnIndeterminate: _$vue.Ref<boolean, boolean>;
          selectable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          rowExpandable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          filters: _$vue.Ref<StoreFilter, StoreFilter>;
          filteredData: _$vue.Ref<T[] | null, T[] | null>;
          sortingColumn: _$vue.Ref<TableColumnCtx<T> | null, TableColumnCtx<T> | null>;
          sortProp: _$vue.Ref<string | null, string | null>;
          sortOrder: _$vue.Ref<TableSortOrder | null, TableSortOrder | null>;
          hoverRow: _$vue.Ref<T | null, T | null>;
        }, options: Filter<T>): void;
        toggleAllSelection(): void;
        rowSelectedChanged(_states: {
          _currentRowKey: _$vue.Ref<string | null, string | null>;
          currentRow: _$vue.Ref<T | null, T | null>;
          expandRowKeys: _$vue.Ref<string[], string[]>;
          treeData: _$vue.Ref<Record<string, TreeData>, Record<string, TreeData>>;
          indent: _$vue.Ref<number, number>;
          lazy: _$vue.Ref<boolean, boolean>;
          lazyTreeNodeMap: _$vue.Ref<Record<string, T[]>, Record<string, T[]>>;
          lazyColumnIdentifier: _$vue.Ref<string, string>;
          childrenColumnName: _$vue.Ref<string, string>;
          checkStrictly: _$vue.Ref<boolean, boolean>;
          expandRows: _$vue.Ref<T[], T[]>;
          defaultExpandAll: _$vue.Ref<boolean, boolean>;
          tableSize: _$vue.Ref<any, any>;
          rowKey: _$vue.Ref<string | null, string | null>;
          data: _$vue.Ref<T[], T[]>;
          _data: _$vue.Ref<T[], T[]>;
          isComplex: _$vue.Ref<boolean, boolean>;
          _columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          originColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          leafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          updateOrderFns: (() => void)[];
          leafColumnsLength: _$vue.Ref<number, number>;
          fixedLeafColumnsLength: _$vue.Ref<number, number>;
          rightFixedLeafColumnsLength: _$vue.Ref<number, number>;
          isAllSelected: _$vue.Ref<boolean, boolean>;
          selection: _$vue.Ref<T[], T[]>;
          selectionIndeterminate: _$vue.Ref<Record<string, boolean>, Record<string, boolean>>;
          reserveSelection: _$vue.Ref<boolean, boolean>;
          selectOnIndeterminate: _$vue.Ref<boolean, boolean>;
          selectable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          rowExpandable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          filters: _$vue.Ref<StoreFilter, StoreFilter>;
          filteredData: _$vue.Ref<T[] | null, T[] | null>;
          sortingColumn: _$vue.Ref<TableColumnCtx<T> | null, TableColumnCtx<T> | null>;
          sortProp: _$vue.Ref<string | null, string | null>;
          sortOrder: _$vue.Ref<TableSortOrder | null, TableSortOrder | null>;
          hoverRow: _$vue.Ref<T | null, T | null>;
        }, row: T): void;
        setHoverRow(states: {
          _currentRowKey: _$vue.Ref<string | null, string | null>;
          currentRow: _$vue.Ref<T | null, T | null>;
          expandRowKeys: _$vue.Ref<string[], string[]>;
          treeData: _$vue.Ref<Record<string, TreeData>, Record<string, TreeData>>;
          indent: _$vue.Ref<number, number>;
          lazy: _$vue.Ref<boolean, boolean>;
          lazyTreeNodeMap: _$vue.Ref<Record<string, T[]>, Record<string, T[]>>;
          lazyColumnIdentifier: _$vue.Ref<string, string>;
          childrenColumnName: _$vue.Ref<string, string>;
          checkStrictly: _$vue.Ref<boolean, boolean>;
          expandRows: _$vue.Ref<T[], T[]>;
          defaultExpandAll: _$vue.Ref<boolean, boolean>;
          tableSize: _$vue.Ref<any, any>;
          rowKey: _$vue.Ref<string | null, string | null>;
          data: _$vue.Ref<T[], T[]>;
          _data: _$vue.Ref<T[], T[]>;
          isComplex: _$vue.Ref<boolean, boolean>;
          _columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          originColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          leafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          updateOrderFns: (() => void)[];
          leafColumnsLength: _$vue.Ref<number, number>;
          fixedLeafColumnsLength: _$vue.Ref<number, number>;
          rightFixedLeafColumnsLength: _$vue.Ref<number, number>;
          isAllSelected: _$vue.Ref<boolean, boolean>;
          selection: _$vue.Ref<T[], T[]>;
          selectionIndeterminate: _$vue.Ref<Record<string, boolean>, Record<string, boolean>>;
          reserveSelection: _$vue.Ref<boolean, boolean>;
          selectOnIndeterminate: _$vue.Ref<boolean, boolean>;
          selectable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          rowExpandable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          filters: _$vue.Ref<StoreFilter, StoreFilter>;
          filteredData: _$vue.Ref<T[] | null, T[] | null>;
          sortingColumn: _$vue.Ref<TableColumnCtx<T> | null, TableColumnCtx<T> | null>;
          sortProp: _$vue.Ref<string | null, string | null>;
          sortOrder: _$vue.Ref<TableSortOrder | null, TableSortOrder | null>;
          hoverRow: _$vue.Ref<T | null, T | null>;
        }, row: T): void;
        setCurrentRow(_states: {
          _currentRowKey: _$vue.Ref<string | null, string | null>;
          currentRow: _$vue.Ref<T | null, T | null>;
          expandRowKeys: _$vue.Ref<string[], string[]>;
          treeData: _$vue.Ref<Record<string, TreeData>, Record<string, TreeData>>;
          indent: _$vue.Ref<number, number>;
          lazy: _$vue.Ref<boolean, boolean>;
          lazyTreeNodeMap: _$vue.Ref<Record<string, T[]>, Record<string, T[]>>;
          lazyColumnIdentifier: _$vue.Ref<string, string>;
          childrenColumnName: _$vue.Ref<string, string>;
          checkStrictly: _$vue.Ref<boolean, boolean>;
          expandRows: _$vue.Ref<T[], T[]>;
          defaultExpandAll: _$vue.Ref<boolean, boolean>;
          tableSize: _$vue.Ref<any, any>;
          rowKey: _$vue.Ref<string | null, string | null>;
          data: _$vue.Ref<T[], T[]>;
          _data: _$vue.Ref<T[], T[]>;
          isComplex: _$vue.Ref<boolean, boolean>;
          _columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          originColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          leafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          fixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          rightFixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
          updateOrderFns: (() => void)[];
          leafColumnsLength: _$vue.Ref<number, number>;
          fixedLeafColumnsLength: _$vue.Ref<number, number>;
          rightFixedLeafColumnsLength: _$vue.Ref<number, number>;
          isAllSelected: _$vue.Ref<boolean, boolean>;
          selection: _$vue.Ref<T[], T[]>;
          selectionIndeterminate: _$vue.Ref<Record<string, boolean>, Record<string, boolean>>;
          reserveSelection: _$vue.Ref<boolean, boolean>;
          selectOnIndeterminate: _$vue.Ref<boolean, boolean>;
          selectable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          rowExpandable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
          filters: _$vue.Ref<StoreFilter, StoreFilter>;
          filteredData: _$vue.Ref<T[] | null, T[] | null>;
          sortingColumn: _$vue.Ref<TableColumnCtx<T> | null, TableColumnCtx<T> | null>;
          sortProp: _$vue.Ref<string | null, string | null>;
          sortOrder: _$vue.Ref<TableSortOrder | null, TableSortOrder | null>;
          hoverRow: _$vue.Ref<T | null, T | null>;
        }, row: T): void;
      };
      commit: (name: "sort" | "setData" | "insertColumn" | "updateColumnOrder" | "removeColumn" | "changeSortCondition" | "filterChange" | "toggleAllSelection" | "rowSelectedChanged" | "setHoverRow" | "setCurrentRow", ...args: any[]) => void;
      updateTableScrollY: () => void;
      assertRowKey: () => void;
      updateColumns: () => void;
      scheduleLayout: (needUpdateColumns?: boolean, immediate?: boolean) => void;
      isSelected: (row: T) => boolean;
      clearSelection: () => void;
      cleanSelection: () => void;
      getSelectionRows: () => T[];
      getHalfSelectionRows: () => T[];
      toggleRowSelection: (row: T, selected?: boolean, emitChange?: boolean, ignoreSelectable?: boolean) => void;
      _toggleAllSelection: () => void;
      toggleAllSelection: (() => void) | null;
      updateAllSelected: () => void;
      updateSelectionByChildren: (options?: {
        emitChange?: boolean;
        rowIndexMap?: Map<string, number>;
      }) => void;
      getRowIndeterminate: (row: T) => boolean;
      updateFilters: (column: TableColumnCtx<T>, values: string[]) => Record<string, string[]>;
      updateCurrentRow: (_currentRow: T) => void;
      updateSort: (column: TableColumnCtx<T> | null, prop: string | null, order: TableSortOrder | null) => void;
      execFilter: () => void;
      execSort: () => void;
      execQuery: (ignore?: {
        filter: boolean;
      } | undefined) => void;
      clearFilter: (columnKeys?: string[] | string) => void;
      clearSort: () => void;
      toggleRowExpansion: (row: T, expanded?: boolean) => void;
      setExpandRowKeysAdapter: (val: string[]) => void;
      setCurrentRowKey: (key: string) => void;
      toggleRowExpansionAdapter: (row: T, expanded?: boolean) => void;
      isRowExpanded: (row: T) => boolean;
      updateExpandRows: () => void;
      updateCurrentRowData: () => void;
      loadOrToggle: (row: T) => void;
      updateTreeData: (ifChangeExpandRowKeys?: boolean, ifExpandAll?: boolean) => void;
      updateKeyChildren: (key: string, data: T[]) => void;
      states: {
        _currentRowKey: _$vue.Ref<string | null, string | null>;
        currentRow: _$vue.Ref<T | null, T | null>;
        expandRowKeys: _$vue.Ref<string[], string[]>;
        treeData: _$vue.Ref<Record<string, TreeData>, Record<string, TreeData>>;
        indent: _$vue.Ref<number, number>;
        lazy: _$vue.Ref<boolean, boolean>;
        lazyTreeNodeMap: _$vue.Ref<Record<string, T[]>, Record<string, T[]>>;
        lazyColumnIdentifier: _$vue.Ref<string, string>;
        childrenColumnName: _$vue.Ref<string, string>;
        checkStrictly: _$vue.Ref<boolean, boolean>;
        expandRows: _$vue.Ref<T[], T[]>;
        defaultExpandAll: _$vue.Ref<boolean, boolean>;
        tableSize: _$vue.Ref<any, any>;
        rowKey: _$vue.Ref<string | null, string | null>;
        data: _$vue.Ref<T[], T[]>;
        _data: _$vue.Ref<T[], T[]>;
        isComplex: _$vue.Ref<boolean, boolean>;
        _columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
        originColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
        columns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
        fixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
        rightFixedColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
        leafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
        fixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
        rightFixedLeafColumns: _$vue.Ref<TableColumnCtx<T>[], TableColumnCtx<T>[]>;
        updateOrderFns: (() => void)[];
        leafColumnsLength: _$vue.Ref<number, number>;
        fixedLeafColumnsLength: _$vue.Ref<number, number>;
        rightFixedLeafColumnsLength: _$vue.Ref<number, number>;
        isAllSelected: _$vue.Ref<boolean, boolean>;
        selection: _$vue.Ref<T[], T[]>;
        selectionIndeterminate: _$vue.Ref<Record<string, boolean>, Record<string, boolean>>;
        reserveSelection: _$vue.Ref<boolean, boolean>;
        selectOnIndeterminate: _$vue.Ref<boolean, boolean>;
        selectable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
        rowExpandable: _$vue.Ref<((row: T, index: number) => boolean) | null, ((row: T, index: number) => boolean) | null>;
        filters: _$vue.Ref<StoreFilter, StoreFilter>;
        filteredData: _$vue.Ref<T[] | null, T[] | null>;
        sortingColumn: _$vue.Ref<TableColumnCtx<T> | null, TableColumnCtx<T> | null>;
        sortProp: _$vue.Ref<string | null, string | null>;
        sortOrder: _$vue.Ref<TableSortOrder | null, TableSortOrder | null>;
        hoverRow: _$vue.Ref<T | null, T | null>;
      };
      ns: {
        namespace: _$vue.ComputedRef<string>;
        b: (blockSuffix?: string) => string;
        e: (element?: string) => string;
        m: (modifier?: string) => string;
        be: (blockSuffix?: string, element?: string) => string;
        em: (element?: string, modifier?: string) => string;
        bm: (blockSuffix?: string, modifier?: string) => string;
        bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
        is: {
          (name: string, state: boolean | undefined): string;
          (name: string): string;
        };
        cssVar: (object: Record<string, string>) => Record<string, string>;
        cssVarName: (name: string) => string;
        cssVarBlock: (object: Record<string, string>) => Record<string, string>;
        cssVarBlockName: (name: string) => string;
      };
      t: Translator;
    };
    columns: _$vue.ComputedRef<TableColumnCtx<T>[]>;
    handleHeaderFooterMousewheel: (_event: WheelEvent, data: any) => void;
    handleMouseLeave: () => void;
    tableId: string;
    tableSize: _$vue.ComputedRef<"" | "default" | "large" | "small">;
    isHidden: _$vue.Ref<boolean, boolean>;
    isEmpty: _$vue.ComputedRef<boolean>;
    renderExpanded: _$vue.Ref<RenderExpanded<T> | null, RenderExpanded<T> | null>;
    resizeProxyVisible: _$vue.Ref<boolean, boolean>;
    resizeState: _$vue.Ref<{
      width: null | number;
      height: null | number;
      headerHeight: null | number;
    }, {
      width: null | number;
      height: null | number;
      headerHeight: null | number;
    } | {
      width: null | number;
      height: null | number;
      headerHeight: null | number;
    }>;
    isGroup: _$vue.Ref<boolean, boolean>;
    bodyWidth: _$vue.ComputedRef<string>;
    tableBodyStyles: _$vue.ComputedRef<{
      width: string;
    }>;
    emptyBlockStyle: _$vue.ComputedRef<{
      width: string;
      height: string;
    } | undefined>;
    debouncedUpdateLayout: _$lodash_unified0.DebouncedFunc<() => void>;
    /**
     * @description used in single selection Table, set a certain row selected. If called without any parameter, it will clear selection
     */
    setCurrentRow: (row?: T | undefined) => void;
    /**
     * @description returns the currently selected rows
     */
    getSelectionRows: () => T[];
    /**
     * @description returns the currently half-selected rows
     */
    getHalfSelectionRows: () => T[];
    /**
     * @description used in multiple selection Table, toggle if a certain row is selected. With the second parameter, you can directly set if this row is selected
     */
    toggleRowSelection: (row: T, selected?: boolean, ignoreSelectable?: boolean) => void;
    /**
     * @description used in multiple selection Table, clear user selection
     */
    clearSelection: () => void;
    /**
     * @description clear filters of the columns whose `columnKey` are passed in. If no params, clear all filters
     */
    clearFilter: (columnKeys?: string[] | string) => void;
    /**
     * @description used in multiple selection Table, toggle select all and deselect all
     */
    toggleAllSelection: () => void;
    /**
     * @description used in expandable Table or tree Table, toggle if a certain row is expanded. With the second parameter, you can directly set if this row is expanded or collapsed
     */
    toggleRowExpansion: (row: T, expanded?: boolean) => void;
    /**
     * @description clear sorting, restore data to the original order
     */
    clearSort: () => void;
    /**
     * @description refresh the layout of Table. When the visibility of Table changes, you may need to call this method to get a correct layout
     */
    doLayout: () => void;
    /**
     * @description sort Table manually. Property `prop` is used to set sort column, property `order` is used to set sort order
     */
    sort: (prop: string, order: string) => void;
    /**
     * @description used in lazy Table, must set `rowKey`, update key children
     */
    updateKeyChildren: (key: string, data: T[]) => void;
    t: Translator;
    setDragVisible: (visible: boolean) => void;
    context: Table<T>;
    computedSumText: _$vue.ComputedRef<string>;
    computedEmptyText: _$vue.ComputedRef<string>;
    computedTooltipEffect: _$vue.ComputedRef<string | undefined>;
    computedTooltipOptions: _$vue.ComputedRef<Partial<Omit<UseTooltipProps, "visible" | "content" | "autoClose" | "referenceEl" | "triggerTargetEl" | "virtualTriggering" | "rawContent" | "persistent" | "virtualRef">> | undefined>;
    tableLayout: _$vue.ComputedRef<"fixed" | "auto">;
    scrollbarViewStyle: {
      display: string;
      verticalAlign: string;
    };
    scrollbarStyle: _$vue.ComputedRef<{
      height: string;
      maxHeight?: undefined;
    } | {
      maxHeight: string;
      height?: undefined;
    } | {
      height?: undefined;
      maxHeight?: undefined;
    }>;
    scrollBarRef: _$vue.Ref<any, any>;
    /**
     * @description scrolls to a particular set of coordinates
     */
    scrollTo: (options: ScrollToOptions | number, yCoord?: number) => void;
    /**
     * @description set horizontal scroll position
     */
    setScrollLeft: (left?: number) => void;
    /**
     * @description set vertical scroll position
     */
    setScrollTop: (top?: number) => void;
    /**
     * @description whether to allow drag the last column
     */
    allowDragLastColumn: boolean;
  }>) => void;
  attrs: any;
  slots: {
    default?: (props: {}) => any;
  } & {
    empty?: (props: {}) => any;
  } & {
    append?: (props: {}) => any;
  };
  emit: TableEmits<T>;
}>) => _$vue.VNode & {
  __ctx?: Awaited<typeof __VLS_setup>;
};
declare const _default: typeof __VLS_export;
type __VLS_PrettifyLocal<T> = (T extends any ? { [K in keyof T]: T[K] } : { [K in keyof T as K]: T[K] }) & {};
//#endregion
export { _default as default };