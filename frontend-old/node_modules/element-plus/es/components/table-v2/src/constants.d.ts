//#region ../../packages/components/table-v2/src/constants.d.ts
declare enum SortOrder {
  ASC = "asc",
  DESC = "desc"
}
declare enum Alignment {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right"
}
declare enum FixedDir {
  LEFT = "left",
  RIGHT = "right"
}
declare const oppositeOrderMap: {
  asc: SortOrder;
  desc: SortOrder;
};
declare const sortOrders: readonly [SortOrder.ASC, SortOrder.DESC];
//#endregion
export { Alignment, FixedDir, SortOrder, oppositeOrderMap, sortOrders };