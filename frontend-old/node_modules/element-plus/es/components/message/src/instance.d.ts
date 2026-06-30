import { Mutable } from "../../../utils/typescript.js";
import { MessageHandler, MessagePlacement, MessageProps } from "./message.js";
import * as _$vue from "vue";
import { ComponentInternalInstance, VNode } from "vue";

//#region ../../packages/components/message/src/instance.d.ts
type MessageContext = {
  id: string;
  vnode: VNode;
  handler: MessageHandler;
  vm: ComponentInternalInstance;
  props: Mutable<MessageProps>;
};
declare const placementInstances: _$vue.ShallowReactive<Record<"top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right", MessageContext[]>>;
declare const getOrCreatePlacementInstances: (placement: MessagePlacement) => MessageContext[];
declare const getInstance: (id: string, placement: MessagePlacement) => {
  current: MessageContext;
  prev: MessageContext | undefined;
};
declare const getLastOffset: (id: string, placement: MessagePlacement) => number;
declare const getOffsetOrSpace: (id: string, offset: number, placement: MessagePlacement) => number;
//#endregion
export { MessageContext, getInstance, getLastOffset, getOffsetOrSpace, getOrCreatePlacementInstances, placementInstances };