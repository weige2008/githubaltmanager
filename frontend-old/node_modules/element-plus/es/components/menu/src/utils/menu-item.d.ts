import SubMenu from "./submenu.js";

//#region ../../packages/components/menu/src/utils/menu-item.d.ts
declare class MenuItem {
  domNode: HTMLElement;
  submenu: SubMenu | null;
  constructor(domNode: HTMLElement, namespace: string);
  init(namespace: string): void;
  addListeners(): void;
}
//#endregion
export { MenuItem as default };