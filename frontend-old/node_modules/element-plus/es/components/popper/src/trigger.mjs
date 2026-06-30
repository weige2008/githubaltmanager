import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
//#region ../../packages/components/popper/src/trigger.ts
/**
* @deprecated Removed after 3.0.0, Use `PopperTriggerProps` instead.
*/
const popperTriggerProps = buildProps({
	/** @description Indicates the reference element to which the popper is attached */
	virtualRef: { type: definePropType(Object) },
	/** @description Indicates whether virtual triggering is enabled */
	virtualTriggering: Boolean,
	onMouseenter: { type: definePropType(Function) },
	onMouseleave: { type: definePropType(Function) },
	onClick: { type: definePropType(Function) },
	onKeydown: { type: definePropType(Function) },
	onFocus: { type: definePropType(Function) },
	onBlur: { type: definePropType(Function) },
	onContextmenu: { type: definePropType(Function) },
	id: String,
	open: Boolean
});
/** @deprecated use `popperTriggerProps` instead, and it will be deprecated in the next major version */
const usePopperTriggerProps = popperTriggerProps;
//#endregion
export { popperTriggerProps, usePopperTriggerProps };

//# sourceMappingURL=trigger.mjs.map