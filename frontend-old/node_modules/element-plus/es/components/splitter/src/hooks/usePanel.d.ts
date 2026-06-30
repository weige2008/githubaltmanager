import { PanelItemState } from "../type.js";

//#region ../../packages/components/splitter/src/hooks/usePanel.d.ts
declare function getCollapsible(collapsible: boolean | {
  start?: boolean;
  end?: boolean;
}): {
  start?: boolean;
  end?: boolean;
};
declare function isCollapsible(panel: PanelItemState | null | undefined, size: number, nextPanel: PanelItemState | null | undefined, nextSize: number): boolean;
//#endregion
export { getCollapsible, isCollapsible };