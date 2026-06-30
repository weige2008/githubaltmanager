import { Store } from "../store/index.js";
import TableLayout from "../table-layout.js";
import { DefaultRow, RenderExpanded, Table, TableProps } from "./defaults.js";
import * as _$vue from "vue";

//#region ../../packages/components/table/src/table/style-helper.d.ts
declare function useStyle<T extends DefaultRow>(props: TableProps<T>, layout: TableLayout<T>, store: Store<T>, table: Table<T>): {
  isHidden: _$vue.Ref<boolean, boolean>;
  renderExpanded: _$vue.Ref<RenderExpanded<T> | null, RenderExpanded<T> | null>;
  setDragVisible: (visible: boolean) => void;
  isGroup: _$vue.Ref<boolean, boolean>;
  handleMouseLeave: () => void;
  handleHeaderFooterMousewheel: (_event: WheelEvent, data: any) => void;
  tableSize: _$vue.ComputedRef<"" | "default" | "large" | "small">;
  emptyBlockStyle: _$vue.ComputedRef<{
    width: string;
    height: string;
  } | undefined>;
  resizeProxyVisible: _$vue.Ref<boolean, boolean>;
  bodyWidth: _$vue.ComputedRef<string>;
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
  doLayout: () => void;
  tableBodyStyles: _$vue.ComputedRef<{
    width: string;
  }>;
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
};
//#endregion
export { useStyle as default };