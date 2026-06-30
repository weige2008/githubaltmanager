import { Message, MessagePlacement, MessageType } from "./message.js";

//#region ../../packages/components/message/src/method.d.ts
declare function closeAll(type?: MessageType): void;
declare function closeAllByPlacement(placement: MessagePlacement): void;
declare const _default: Message;
//#endregion
export { closeAll, closeAllByPlacement, _default as default };