import TableLayout from "../table-layout.js";
import { DefaultRow, Table } from "../table/defaults.js";
import { TableBodyProps } from "./defaults.js";
import * as _$vue from "vue";
import { VNode } from "vue";

//#region ../../packages/components/table/src/table-body/index.d.ts
declare const _default: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  store: {
    required: boolean;
    type: _$vue.PropType<TableBodyProps<any>["store"]>;
  };
  stripe: BooleanConstructor;
  tooltipEffect: StringConstructor;
  tooltipOptions: {
    type: _$vue.PropType<TableBodyProps<any>["tooltipOptions"]>;
  };
  context: {
    default: () => {};
    type: _$vue.PropType<TableBodyProps<any>["context"]>;
  };
  rowClassName: _$vue.PropType<TableBodyProps<any>["rowClassName"]>;
  rowStyle: _$vue.PropType<TableBodyProps<any>["rowStyle"]>;
  fixed: {
    type: StringConstructor;
    default: string;
  };
  highlight: BooleanConstructor;
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
  onColumnsChange: (layout: TableLayout<DefaultRow>) => void;
  onScrollableChange: (layout: TableLayout<DefaultRow>) => void;
  wrappedRowRender: (row: any, $index: number) => VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }> | VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }>[] | VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }>[][];
  tooltipContent: _$vue.Ref<string, string>;
  tooltipTrigger: _$vue.Ref<VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }>, VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }>>;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  store: {
    required: boolean;
    type: _$vue.PropType<TableBodyProps<any>["store"]>;
  };
  stripe: BooleanConstructor;
  tooltipEffect: StringConstructor;
  tooltipOptions: {
    type: _$vue.PropType<TableBodyProps<any>["tooltipOptions"]>;
  };
  context: {
    default: () => {};
    type: _$vue.PropType<TableBodyProps<any>["context"]>;
  };
  rowClassName: _$vue.PropType<TableBodyProps<any>["rowClassName"]>;
  rowStyle: _$vue.PropType<TableBodyProps<any>["rowStyle"]>;
  fixed: {
    type: StringConstructor;
    default: string;
  };
  highlight: BooleanConstructor;
}>> & Readonly<{}>, {
  fixed: string;
  stripe: boolean;
  context: Table<any>;
  highlight: boolean;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default as default };