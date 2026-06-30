import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import { Alignment, ItemSize, ScrollDirection } from "../../../virtual-list/src/types.js";
import { CheckboxValueType } from "../../../checkbox/src/checkbox.js";
import { treeEmits } from "../virtual-tree.js";
import { Tree, TreeData, TreeKey, TreeNode, TreeNodeData, TreeProps } from "../types.js";
import * as _$vue from "vue";
import { SetupContext } from "vue";

//#region ../../packages/components/tree-v2/src/composables/useTree.d.ts
declare function useTree(props: TreeProps, emit: SetupContext<typeof treeEmits>['emit']): {
  tree: _$vue.ShallowRef<Tree | undefined, Tree | undefined>;
  flattenTree: _$vue.ComputedRef<TreeNode[]>;
  isNotEmpty: _$vue.ComputedRef<boolean>;
  listRef: _$vue.Ref<_$vue.DefineComponent<_$vue.ExtractPropTypes<{
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
    readonly cache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
    readonly estimatedItemSize: {
      readonly type: _$vue.PropType<number>;
      readonly required: false;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    readonly layout: EpPropFinalized<StringConstructor, "horizontal" | "vertical", never, "vertical", false>;
    readonly initScrollOffset: EpPropFinalized<NumberConstructor, never, never, 0, false>;
    readonly total: {
      readonly type: _$vue.PropType<number>;
      readonly required: true;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    readonly itemSize: {
      readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => number | ItemSize) | (() => number | ItemSize) | (((new (...args: any[]) => number | ItemSize) | (() => number | ItemSize)) | null)[], never, never>>;
      readonly required: true;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
  }>, {
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
    clientSize: _$vue.ComputedRef<string | number | undefined>;
    estimatedTotalSize: _$vue.ComputedRef<number>;
    windowStyle: _$vue.ComputedRef<(string | false | _$vue.CSSProperties | _$vue.StyleValue[] | {
      [x: string]: string;
      position: string;
      WebkitOverflowScrolling: string;
      willChange: string;
    } | null | undefined)[]>;
    windowRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
    innerRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
    innerStyle: _$vue.ComputedRef<{
      height: string;
      pointerEvents: string | undefined;
      width: string;
      margin: number;
      boxSizing: string;
    }>;
    itemsToRender: _$vue.ComputedRef<number[]>;
    scrollbarRef: _$vue.Ref<any, any>;
    states: _$vue.Ref<{
      isScrolling: boolean;
      scrollDir: ScrollDirection;
      scrollOffset: number;
      updateRequested: boolean;
      isScrollbarDragging: boolean;
    }, {
      isScrolling: boolean;
      scrollDir: ScrollDirection;
      scrollOffset: number;
      updateRequested: boolean;
      isScrollbarDragging: boolean;
    } | {
      isScrolling: boolean;
      scrollDir: ScrollDirection;
      scrollOffset: number;
      updateRequested: boolean;
      isScrollbarDragging: boolean;
    }>;
    getItemStyle: (idx: number) => _$vue.CSSProperties;
    onScroll: (e: Event) => void;
    onScrollbarScroll: (distanceToGo: number, totalSteps: number) => void;
    onWheel: (e: WheelEvent) => void;
    scrollTo: (offset: number) => void;
    scrollToItem: (idx: number, alignment?: Alignment) => void;
    resetScrollTop: () => void;
  }, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, ("scroll" | "itemRendered" | "end-reached")[], "scroll" | "itemRendered" | "end-reached", _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
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
    readonly cache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
    readonly estimatedItemSize: {
      readonly type: _$vue.PropType<number>;
      readonly required: false;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    readonly layout: EpPropFinalized<StringConstructor, "horizontal" | "vertical", never, "vertical", false>;
    readonly initScrollOffset: EpPropFinalized<NumberConstructor, never, never, 0, false>;
    readonly total: {
      readonly type: _$vue.PropType<number>;
      readonly required: true;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    readonly itemSize: {
      readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => number | ItemSize) | (() => number | ItemSize) | (((new (...args: any[]) => number | ItemSize) | (() => number | ItemSize)) | null)[], never, never>>;
      readonly required: true;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
  }>> & Readonly<{
    onScroll?: ((...args: any[]) => any) | undefined;
    onItemRendered?: ((...args: any[]) => any) | undefined;
    "onEnd-reached"?: ((...args: any[]) => any) | undefined;
  }>, {
    readonly layout: EpPropMergeType<StringConstructor, "horizontal" | "vertical", never>;
    readonly style: _$vue.StyleValue;
    readonly className: string;
    readonly containerElement: EpPropMergeType<(new (...args: any[]) => string | Element) | (() => string | Element) | (((new (...args: any[]) => string | Element) | (() => string | Element)) | null)[], unknown, unknown>;
    readonly data: any[];
    readonly innerElement: EpPropMergeType<readonly [StringConstructor, ObjectConstructor], unknown, unknown>;
    readonly innerProps: Record<string, unknown>;
    readonly perfMode: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly direction: EpPropMergeType<StringConstructor, "ltr" | "rtl", never>;
    readonly useIsScrolling: boolean;
    readonly scrollbarAlwaysOn: boolean;
    readonly cache: number;
    readonly initScrollOffset: number;
  }, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any> | undefined, _$vue.DefineComponent<_$vue.ExtractPropTypes<{
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
    readonly cache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
    readonly estimatedItemSize: {
      readonly type: _$vue.PropType<number>;
      readonly required: false;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    readonly layout: EpPropFinalized<StringConstructor, "horizontal" | "vertical", never, "vertical", false>;
    readonly initScrollOffset: EpPropFinalized<NumberConstructor, never, never, 0, false>;
    readonly total: {
      readonly type: _$vue.PropType<number>;
      readonly required: true;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    readonly itemSize: {
      readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => number | ItemSize) | (() => number | ItemSize) | (((new (...args: any[]) => number | ItemSize) | (() => number | ItemSize)) | null)[], never, never>>;
      readonly required: true;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
  }>, {
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
    clientSize: _$vue.ComputedRef<string | number | undefined>;
    estimatedTotalSize: _$vue.ComputedRef<number>;
    windowStyle: _$vue.ComputedRef<(string | false | _$vue.CSSProperties | _$vue.StyleValue[] | {
      [x: string]: string;
      position: string;
      WebkitOverflowScrolling: string;
      willChange: string;
    } | null | undefined)[]>;
    windowRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
    innerRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
    innerStyle: _$vue.ComputedRef<{
      height: string;
      pointerEvents: string | undefined;
      width: string;
      margin: number;
      boxSizing: string;
    }>;
    itemsToRender: _$vue.ComputedRef<number[]>;
    scrollbarRef: _$vue.Ref<any, any>;
    states: _$vue.Ref<{
      isScrolling: boolean;
      scrollDir: ScrollDirection;
      scrollOffset: number;
      updateRequested: boolean;
      isScrollbarDragging: boolean;
    }, {
      isScrolling: boolean;
      scrollDir: ScrollDirection;
      scrollOffset: number;
      updateRequested: boolean;
      isScrollbarDragging: boolean;
    } | {
      isScrolling: boolean;
      scrollDir: ScrollDirection;
      scrollOffset: number;
      updateRequested: boolean;
      isScrollbarDragging: boolean;
    }>;
    getItemStyle: (idx: number) => _$vue.CSSProperties;
    onScroll: (e: Event) => void;
    onScrollbarScroll: (distanceToGo: number, totalSteps: number) => void;
    onWheel: (e: WheelEvent) => void;
    scrollTo: (offset: number) => void;
    scrollToItem: (idx: number, alignment?: Alignment) => void;
    resetScrollTop: () => void;
  }, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, ("scroll" | "itemRendered" | "end-reached")[], "scroll" | "itemRendered" | "end-reached", _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
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
    readonly cache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
    readonly estimatedItemSize: {
      readonly type: _$vue.PropType<number>;
      readonly required: false;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    readonly layout: EpPropFinalized<StringConstructor, "horizontal" | "vertical", never, "vertical", false>;
    readonly initScrollOffset: EpPropFinalized<NumberConstructor, never, never, 0, false>;
    readonly total: {
      readonly type: _$vue.PropType<number>;
      readonly required: true;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    readonly itemSize: {
      readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => number | ItemSize) | (() => number | ItemSize) | (((new (...args: any[]) => number | ItemSize) | (() => number | ItemSize)) | null)[], never, never>>;
      readonly required: true;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
  }>> & Readonly<{
    onScroll?: ((...args: any[]) => any) | undefined;
    onItemRendered?: ((...args: any[]) => any) | undefined;
    "onEnd-reached"?: ((...args: any[]) => any) | undefined;
  }>, {
    readonly layout: EpPropMergeType<StringConstructor, "horizontal" | "vertical", never>;
    readonly style: _$vue.StyleValue;
    readonly className: string;
    readonly containerElement: EpPropMergeType<(new (...args: any[]) => string | Element) | (() => string | Element) | (((new (...args: any[]) => string | Element) | (() => string | Element)) | null)[], unknown, unknown>;
    readonly data: any[];
    readonly innerElement: EpPropMergeType<readonly [StringConstructor, ObjectConstructor], unknown, unknown>;
    readonly innerProps: Record<string, unknown>;
    readonly perfMode: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly direction: EpPropMergeType<StringConstructor, "ltr" | "rtl", never>;
    readonly useIsScrolling: boolean;
    readonly scrollbarAlwaysOn: boolean;
    readonly cache: number;
    readonly initScrollOffset: number;
  }, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any> | undefined>;
  getKey: (node: TreeNodeData) => TreeKey;
  getChildren: (node: TreeNodeData) => TreeNodeData[];
  toggleExpand: (node: TreeNode) => void;
  toggleCheckbox: (node: TreeNode, isChecked: CheckboxValueType, nodeClick?: boolean, immediateUpdate?: boolean, deep?: boolean) => void;
  isChecked: (node: TreeNode) => boolean;
  isIndeterminate: (node: TreeNode) => boolean;
  isDisabled: (node: TreeNode) => boolean;
  isCurrent: (node: TreeNode) => boolean;
  isForceHiddenExpandIcon: (node: TreeNode) => boolean;
  handleNodeClick: (node: TreeNode, e: MouseEvent) => void;
  handleNodeDrop: (node: TreeNode, e: DragEvent) => void;
  handleNodeCheck: (node: TreeNode, checked: CheckboxValueType) => void;
  getCurrentNode: () => TreeNodeData | undefined;
  getCurrentKey: () => TreeKey | undefined;
  setCurrentKey: (key: TreeKey) => void;
  getCheckedKeys: (leafOnly?: boolean) => TreeKey[];
  getCheckedNodes: (leafOnly?: boolean) => TreeNodeData[];
  getHalfCheckedKeys: () => TreeKey[];
  getHalfCheckedNodes: () => TreeNodeData[];
  setChecked: (key: TreeKey, isChecked: boolean, deep?: boolean) => void;
  setCheckedKeys: (keys: TreeKey[]) => void;
  filter: (query: string) => void;
  setData: (data: TreeData) => void;
  getNode: (data: TreeKey | TreeNodeData) => TreeNode | undefined;
  expandNode: (node: TreeNode) => void;
  collapseNode: (node: TreeNode) => void;
  setExpandedKeys: (keys: TreeKey[]) => void;
  scrollToNode: (key: TreeKey, strategy?: Alignment) => void;
  scrollTo: (offset: number) => void;
};
//#endregion
export { useTree };