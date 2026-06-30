import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import { Alignment, GridConstructorProps, GridItemKeyGetter, GridScrollOptions, GridStates, ItemSize } from "../types.js";
import { useCache } from "../hooks/use-cache.js";
import { VirtualizedGridProps } from "../props.js";
import * as _$vue from "vue";
import { CSSProperties, Ref, StyleValue, UnwrapRef, VNode } from "vue";

//#region ../../packages/components/virtual-list/src/builders/build-grid.d.ts
declare const createGrid: ({
  name,
  clearCache,
  getColumnPosition,
  getColumnStartIndexForOffset,
  getColumnStopIndexForStartIndex,
  getEstimatedTotalHeight,
  getEstimatedTotalWidth,
  getColumnOffset,
  getRowOffset,
  getRowPosition,
  getRowStartIndexForOffset,
  getRowStopIndexForStartIndex,
  initCache,
  injectToInstance,
  validateProps
}: GridConstructorProps<VirtualizedGridProps>) => _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  readonly className: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly containerElement: EpPropFinalized<(new (...args: any[]) => string | Element) | (() => string | Element) | (((new (...args: any[]) => string | Element) | (() => string | Element)) | null)[], unknown, unknown, "div", boolean>;
  readonly data: EpPropFinalized<(new (...args: any[]) => any[]) | (() => any[]) | (((new (...args: any[]) => any[]) | (() => any[])) | null)[], unknown, unknown, () => [], boolean>;
  readonly direction: EpPropFinalized<StringConstructor, "ltr" | "rtl", never, "ltr", false>;
  readonly height: {
    readonly type: _$vue.PropType<EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly innerElement: EpPropFinalized<readonly [StringConstructor, ObjectConstructor], unknown, unknown, "div", boolean>;
  readonly innerProps: EpPropFinalized<(new (...args: any[]) => Record<string, unknown>) | (() => Record<string, unknown>) | (((new (...args: any[]) => Record<string, unknown>) | (() => Record<string, unknown>)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly style: EpPropFinalized<(new (...args: any[]) => string | false | CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown, undefined, boolean>;
  readonly useIsScrolling: BooleanConstructor;
  readonly width: {
    readonly type: _$vue.PropType<EpPropMergeType<readonly [NumberConstructor, StringConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly innerWidth: {
    readonly type: _$vue.PropType<EpPropMergeType<readonly [NumberConstructor, StringConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly perfMode: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly scrollbarAlwaysOn: BooleanConstructor;
  readonly columnCache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
  readonly columnWidth: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => number | ItemSize) | (() => number | ItemSize) | (((new (...args: any[]) => number | ItemSize) | (() => number | ItemSize)) | null)[], never, never>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly estimatedColumnWidth: {
    readonly type: _$vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly estimatedRowHeight: {
    readonly type: _$vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly initScrollLeft: EpPropFinalized<NumberConstructor, never, never, 0, false>;
  readonly initScrollTop: EpPropFinalized<NumberConstructor, never, never, 0, false>;
  readonly itemKey: EpPropFinalized<(new (...args: any[]) => GridItemKeyGetter) | (() => GridItemKeyGetter) | {
    (): GridItemKeyGetter;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => GridItemKeyGetter) | (() => GridItemKeyGetter) | {
    (): GridItemKeyGetter;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, ({
    columnIndex,
    rowIndex
  }: {
    columnIndex: number;
    rowIndex: number;
  }) => string, boolean>;
  readonly rowCache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
  readonly rowHeight: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => number | ItemSize) | (() => number | ItemSize) | (((new (...args: any[]) => number | ItemSize) | (() => number | ItemSize)) | null)[], never, never>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly totalColumn: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly totalRow: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly hScrollbarSize: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly vScrollbarSize: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly scrollbarStartGap: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly scrollbarEndGap: EpPropFinalized<NumberConstructor, unknown, unknown, 2, boolean>;
  readonly role: StringConstructor;
}>, () => VNode<_$vue.RendererNode, _$vue.RendererElement, {
  [key: string]: any;
}>, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, ("scroll" | "itemRendered")[], "scroll" | "itemRendered", _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  readonly className: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly containerElement: EpPropFinalized<(new (...args: any[]) => string | Element) | (() => string | Element) | (((new (...args: any[]) => string | Element) | (() => string | Element)) | null)[], unknown, unknown, "div", boolean>;
  readonly data: EpPropFinalized<(new (...args: any[]) => any[]) | (() => any[]) | (((new (...args: any[]) => any[]) | (() => any[])) | null)[], unknown, unknown, () => [], boolean>;
  readonly direction: EpPropFinalized<StringConstructor, "ltr" | "rtl", never, "ltr", false>;
  readonly height: {
    readonly type: _$vue.PropType<EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly innerElement: EpPropFinalized<readonly [StringConstructor, ObjectConstructor], unknown, unknown, "div", boolean>;
  readonly innerProps: EpPropFinalized<(new (...args: any[]) => Record<string, unknown>) | (() => Record<string, unknown>) | (((new (...args: any[]) => Record<string, unknown>) | (() => Record<string, unknown>)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly style: EpPropFinalized<(new (...args: any[]) => string | false | CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown, undefined, boolean>;
  readonly useIsScrolling: BooleanConstructor;
  readonly width: {
    readonly type: _$vue.PropType<EpPropMergeType<readonly [NumberConstructor, StringConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly innerWidth: {
    readonly type: _$vue.PropType<EpPropMergeType<readonly [NumberConstructor, StringConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly perfMode: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly scrollbarAlwaysOn: BooleanConstructor;
  readonly columnCache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
  readonly columnWidth: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => number | ItemSize) | (() => number | ItemSize) | (((new (...args: any[]) => number | ItemSize) | (() => number | ItemSize)) | null)[], never, never>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly estimatedColumnWidth: {
    readonly type: _$vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly estimatedRowHeight: {
    readonly type: _$vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly initScrollLeft: EpPropFinalized<NumberConstructor, never, never, 0, false>;
  readonly initScrollTop: EpPropFinalized<NumberConstructor, never, never, 0, false>;
  readonly itemKey: EpPropFinalized<(new (...args: any[]) => GridItemKeyGetter) | (() => GridItemKeyGetter) | {
    (): GridItemKeyGetter;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => GridItemKeyGetter) | (() => GridItemKeyGetter) | {
    (): GridItemKeyGetter;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, ({
    columnIndex,
    rowIndex
  }: {
    columnIndex: number;
    rowIndex: number;
  }) => string, boolean>;
  readonly rowCache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
  readonly rowHeight: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => number | ItemSize) | (() => number | ItemSize) | (((new (...args: any[]) => number | ItemSize) | (() => number | ItemSize)) | null)[], never, never>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly totalColumn: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly totalRow: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly hScrollbarSize: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly vScrollbarSize: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly scrollbarStartGap: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly scrollbarEndGap: EpPropFinalized<NumberConstructor, unknown, unknown, 2, boolean>;
  readonly role: StringConstructor;
}>> & Readonly<{
  onScroll?: ((...args: any[]) => any) | undefined;
  onItemRendered?: ((...args: any[]) => any) | undefined;
}>, {
  readonly style: StyleValue;
  readonly itemKey: GridItemKeyGetter;
  readonly className: string;
  readonly containerElement: EpPropMergeType<(new (...args: any[]) => string | Element) | (() => string | Element) | (((new (...args: any[]) => string | Element) | (() => string | Element)) | null)[], unknown, unknown>;
  readonly data: any[];
  readonly innerElement: EpPropMergeType<readonly [StringConstructor, ObjectConstructor], unknown, unknown>;
  readonly innerProps: Record<string, unknown>;
  readonly perfMode: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly direction: EpPropMergeType<StringConstructor, "ltr" | "rtl", never>;
  readonly useIsScrolling: boolean;
  readonly scrollbarAlwaysOn: boolean;
  readonly columnCache: number;
  readonly initScrollLeft: number;
  readonly initScrollTop: number;
  readonly rowCache: number;
  readonly hScrollbarSize: number;
  readonly vScrollbarSize: number;
  readonly scrollbarStartGap: number;
  readonly scrollbarEndGap: number;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
type GridInstance = InstanceType<ReturnType<typeof createGrid>> & UnwrapRef<{
  windowRef: Ref<HTMLElement>;
  innerRef: Ref<HTMLElement>;
  getItemStyleCache: ReturnType<typeof useCache>;
  scrollTo: (scrollOptions: GridScrollOptions) => void;
  scrollToItem: (rowIndex: number, columnIndex: number, alignment: Alignment) => void;
  states: Ref<GridStates>;
}>;
//#endregion
export { GridInstance, createGrid as default };