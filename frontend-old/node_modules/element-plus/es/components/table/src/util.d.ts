import { UseTooltipProps } from "../../tooltip/src/tooltip.js";
import { TableColumnCtx } from "./table-column/defaults.js";
import { DefaultRow, Table, TreeProps } from "./table/defaults.js";
import { CSSProperties, VNode, VNodeArrayChildren } from "vue";

//#region ../../packages/components/table/src/util.d.ts
declare const createTableId: (namespace: string) => string;
declare const createTableColumnId: (parentId: string) => string;
type TableOverflowTooltipOptions = Partial<Omit<UseTooltipProps, 'content' | 'rawContent' | 'persistent' | 'visible' | 'autoClose' | 'referenceEl' | 'triggerTargetEl' | 'virtualRef' | 'virtualTriggering'>>;
type TableOverflowTooltipFormatter<T extends DefaultRow> = (data: {
  row: T;
  column: TableColumnCtx<T>;
  cellValue: any;
}) => VNode | string;
type RemovePopperFn = (() => void) & {
  trigger?: HTMLElement;
  vm?: VNode;
};
declare const getCell: (event: Event) => HTMLTableCellElement | null;
declare const orderBy: <T extends DefaultRow>(array: T[], sortKey: string | null, reverse: string | number | null, sortMethod: TableColumnCtx<T>["sortMethod"] | null, sortBy: string | string[] | ((a: T, index: number, array?: T[]) => string)) => T[];
declare const getColumnById: <T extends DefaultRow>(table: {
  columns: TableColumnCtx<T>[];
}, columnId: string) => null | TableColumnCtx<T>;
declare const getColumnByKey: <T extends DefaultRow>(table: {
  columns: TableColumnCtx<T>[];
}, columnKey: string) => TableColumnCtx<T>;
declare const getColumnByCell: <T extends DefaultRow>(table: {
  columns: TableColumnCtx<T>[];
}, cell: HTMLElement, namespace: string) => null | TableColumnCtx<T>;
declare const getRowIdentity: <T extends DefaultRow>(row: T, rowKey: string | ((row: T) => string) | null) => string;
declare const getKeysMap: <T extends DefaultRow>(array: T[], rowKey: string | null, flatten?: boolean, childrenKey?: string) => Record<PropertyKey, {
  row: T;
  index: number;
}>;
declare function mergeOptions<T extends DefaultRow, K extends DefaultRow>(defaults: T, config: K): T & K;
declare function parseWidth(width?: number | string): number | string;
declare function parseMinWidth(minWidth: number | string): number | string;
declare function parseHeight(height: number | string | null): string | number | null;
declare function compose(...funcs: ((...args: any[]) => void)[]): (...args: any[]) => void;
declare function toggleRowStatus<T extends DefaultRow>(statusArr: T[], row: T, newVal?: boolean, tableTreeProps?: TreeProps, selectable?: ((row: T, index: number) => boolean) | null, rowIndex?: number, rowKey?: string | null): boolean;
declare function walkTreeNode<T extends DefaultRow>(root: T[], cb: (parent: any, children: T | T[] | null, level: number) => void, childrenKey?: string, lazyKey?: string, lazy?: boolean): void;
declare let removePopper: RemovePopperFn | null;
declare function createTablePopper<T extends DefaultRow>(props: TableOverflowTooltipOptions, popperContent: string, row: T, column: TableColumnCtx<T> | null, trigger: HTMLElement | null, table: Table<DefaultRow>): void;
declare const isFixedColumn: <T extends DefaultRow>(index: number, fixed: string | boolean | undefined, store: any, realColumns?: TableColumnCtx<T>[]) => {
  direction: string;
  start: number;
  after: number;
} | {
  direction?: undefined;
  start?: undefined;
  after?: undefined;
};
declare const getFixedColumnsClass: <T extends DefaultRow>(namespace: string, index: number, fixed: string | boolean | undefined, store: any, realColumns?: TableColumnCtx<T>[], offset?: number) => string[];
declare const getFixedColumnOffset: <T extends DefaultRow>(index: number, fixed: string | boolean | undefined, store: any, realColumns?: TableColumnCtx<T>[]) => CSSProperties | undefined;
declare const ensurePosition: <T extends CSSProperties>(style: T | undefined, key: keyof T) => void;
declare function ensureValidVNode(vnodes: VNodeArrayChildren): VNodeArrayChildren | null;
//#endregion
export { TableOverflowTooltipFormatter, TableOverflowTooltipOptions, compose, createTableColumnId, createTableId, createTablePopper, ensurePosition, ensureValidVNode, getCell, getColumnByCell, getColumnById, getColumnByKey, getFixedColumnOffset, getFixedColumnsClass, getKeysMap, getRowIdentity, isFixedColumn, mergeOptions, orderBy, parseHeight, parseMinWidth, parseWidth, removePopper, toggleRowStatus, walkTreeNode };