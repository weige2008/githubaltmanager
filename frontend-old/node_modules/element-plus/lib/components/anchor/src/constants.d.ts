import { UseNamespaceReturn } from "../../../hooks/use-namespace/index.js";
import { InjectionKey, Ref } from "vue";

//#region ../../packages/components/anchor/src/constants.d.ts
interface AnchorLinkState {
  el: HTMLElement;
  href: string;
}
interface AnchorContext {
  ns: UseNamespaceReturn;
  direction: string;
  currentAnchor: Ref<string>;
  addLink(state: AnchorLinkState): void;
  removeLink(href: string): void;
  handleClick(e: MouseEvent, href?: string): void;
}
declare const anchorKey: InjectionKey<AnchorContext>;
//#endregion
export { AnchorContext, AnchorLinkState, anchorKey };