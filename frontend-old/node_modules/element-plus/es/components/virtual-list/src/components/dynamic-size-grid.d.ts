import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import { GridItemKeyGetter, ItemSize } from "../types.js";
import { GridInstance } from "../builders/build-grid.js";
import * as _$vue from "vue";

//#region ../../packages/components/virtual-list/src/components/dynamic-size-grid.d.ts
type Indices = {
  columnIndex?: number;
  rowIndex?: number;
};
declare const DynamicSizeGrid: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
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
  readonly style: EpPropFinalized<(new (...args: any[]) => string | false | _$vue.CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue) | (((new (...args: any[]) => string | false | _$vue.CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue)) | null)[], unknown, unknown, undefined, boolean>;
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
}>, () => _$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
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
  readonly style: EpPropFinalized<(new (...args: any[]) => string | false | _$vue.CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue) | (((new (...args: any[]) => string | false | _$vue.CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue)) | null)[], unknown, unknown, undefined, boolean>;
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
  readonly style: _$vue.StyleValue;
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
type ResetAfterIndex = (idx: number, forceUpdate: boolean) => void;
type ResetAfterIndices = (indices: Indices, forceUpdate: boolean) => void;
type DynamicSizeGridInstance = GridInstance & {
  resetAfterColumnIndex: ResetAfterIndex;
  resetAfterRowIndex: ResetAfterIndex;
  resetAfter: ResetAfterIndices;
};
//#endregion
export { DynamicSizeGridInstance, ResetAfterIndex, ResetAfterIndices, DynamicSizeGrid as default };