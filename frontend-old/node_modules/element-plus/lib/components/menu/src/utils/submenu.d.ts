import MenuItem from "./menu-item.js";

//#region ../../packages/components/menu/src/utils/submenu.d.ts
declare class SubMenu {
  parent: MenuItem;
  domNode: ParentNode;
  subMenuItems: NodeListOf<HTMLLIElement>;
  subIndex: number;
  constructor(parent: MenuItem, domNode: ParentNode);
  gotoSubIndex(idx: number): void;
  addListeners(): void;
}
//#endregion
export { SubMenu as default };