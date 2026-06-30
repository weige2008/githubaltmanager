//#region ../../packages/components/virtual-list/src/defaults.d.ts
declare const DEFAULT_DYNAMIC_LIST_ITEM_SIZE = 50;
declare const ITEM_RENDER_EVT = "itemRendered";
declare const SCROLL_EVT = "scroll";
declare const END_REACHED_EVT = "end-reached";
declare const FORWARD = "forward";
declare const BACKWARD = "backward";
declare const AUTO_ALIGNMENT = "auto";
declare const SMART_ALIGNMENT = "smart";
declare const START_ALIGNMENT = "start";
declare const CENTERED_ALIGNMENT = "center";
declare const END_ALIGNMENT = "end";
declare const HORIZONTAL = "horizontal";
declare const VERTICAL = "vertical";
declare const LTR = "ltr";
declare const RTL = "rtl";
declare const RTL_OFFSET_NAG = "negative";
declare const RTL_OFFSET_POS_ASC = "positive-ascending";
declare const RTL_OFFSET_POS_DESC = "positive-descending";
declare const ScrollbarSizeKey: {
  horizontal: string;
  vertical: string;
};
declare const ScrollbarDirKey: {
  horizontal: string;
  vertical: string;
};
declare const SCROLLBAR_MIN_SIZE = 20;
//#endregion
export { AUTO_ALIGNMENT, BACKWARD, CENTERED_ALIGNMENT, DEFAULT_DYNAMIC_LIST_ITEM_SIZE, END_ALIGNMENT, END_REACHED_EVT, FORWARD, HORIZONTAL, ITEM_RENDER_EVT, LTR, RTL, RTL_OFFSET_NAG, RTL_OFFSET_POS_ASC, RTL_OFFSET_POS_DESC, SCROLLBAR_MIN_SIZE, SCROLL_EVT, SMART_ALIGNMENT, START_ALIGNMENT, ScrollbarDirKey, ScrollbarSizeKey, VERTICAL };