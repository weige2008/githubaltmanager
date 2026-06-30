import { NotificationPosition, Notify } from "./notification.js";
import { VNode } from "vue";

//#region ../../packages/components/notification/src/notify.d.ts
/**
 * This function gets called when user click `x` button or press `esc` or the time reached its limitation.
 * Emitted by transition@before-leave event so that we can fetch the current notification.offsetHeight, if this was called
 * by @after-leave the DOM element will be removed from the page thus we can no longer fetch the offsetHeight.
 * @param {String} id notification id to be closed
 * @param {Position} position the positioning strategy
 * @param {Function} userOnClose the callback called when close passed by user
 */
declare function close(id: string, position: NotificationPosition, userOnClose?: (vm: VNode) => void): void;
declare function closeAll(): void;
declare function updateOffsets(position?: NotificationPosition): void;
declare const _default: Notify;
//#endregion
export { close, closeAll, _default as default, updateOffsets };