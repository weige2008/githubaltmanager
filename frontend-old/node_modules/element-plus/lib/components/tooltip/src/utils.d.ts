import { Arrayable } from "../../../utils/typescript.js";
import { TooltipTriggerType } from "./trigger.js";
import { Ref } from "vue";

//#region ../../packages/components/tooltip/src/utils.d.ts
declare const isTriggerType: (trigger: Arrayable<TooltipTriggerType>, type: TooltipTriggerType) => boolean;
declare const whenTrigger: (trigger: Ref<Arrayable<TooltipTriggerType>>, type: TooltipTriggerType, handler: (e: Event) => void) => (e: Event) => void;
//#endregion
export { isTriggerType, whenTrigger };