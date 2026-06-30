import { RendererNode } from "vue";

//#region ../../packages/components/menu/src/utils/menu-bar.d.ts
declare class Menu {
  domNode: RendererNode;
  constructor(domNode: RendererNode, namespace: string);
  init(namespace: string): void;
}
//#endregion
export { Menu as default };