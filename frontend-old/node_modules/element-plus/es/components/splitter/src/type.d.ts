import { InjectionKey, UnwrapRef, VNode } from "vue";

//#region ../../packages/components/splitter/src/type.d.ts
type Layout = 'horizontal' | 'vertical';
type PanelItemState = UnwrapRef<{
  uid: number;
  getVnode: () => VNode;
  collapsible: {
    start?: boolean;
    end?: boolean;
  };
  max?: number | string;
  min?: number | string;
  resizable: boolean;
  size?: number | string;
  setIndex: (val: number) => void;
}>;
interface SplitterRootContext {
  panels: PanelItemState[];
  layout: Layout;
  lazy: boolean;
  containerSize: number;
  movingIndex: {
    index: number;
    confirmed: boolean;
  } | null;
  percentSizes: number[];
  pxSizes: number[];
  registerPanel: (pane: PanelItemState) => void;
  unregisterPanel: (pane: PanelItemState) => void;
  onCollapse: (index: number, type: 'start' | 'end') => void;
  onMoveEnd: (index: number) => Promise<void>;
  onMoveStart: (index: number) => void;
  onMoving: (index: number, offset: number) => void;
}
declare const splitterRootContextKey: InjectionKey<SplitterRootContext>;
//#endregion
export { Layout, PanelItemState, SplitterRootContext, splitterRootContextKey };