Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_aria = require("../../../constants/aria.js");
const require_runtime = require("../../../utils/vue/props/runtime.js");
const require_trigger = require("../../popper/src/trigger.js");
//#region ../../packages/components/tooltip/src/trigger.ts
const useTooltipTriggerPropsDefaults = {
	trigger: "hover",
	triggerKeys: () => [
		require_aria.EVENT_CODE.enter,
		require_aria.EVENT_CODE.numpadEnter,
		require_aria.EVENT_CODE.space
	]
};
/**
* @deprecated Removed after 3.0.0, Use `UseTooltipTriggerProps` instead.
*/
const useTooltipTriggerProps = require_runtime.buildProps({
	...require_trigger.popperTriggerProps,
	/**
	* @description whether Tooltip is disabled
	*/
	disabled: Boolean,
	/**
	* @description How should the tooltip be triggered (to show), not valid in controlled mode
	*/
	trigger: {
		type: require_runtime.definePropType([String, Array]),
		default: "hover"
	},
	/**
	* @description When you click the mouse to focus on the trigger element, you can define a set of keyboard codes to control the display of tooltip through the keyboard, not valid in controlled mode
	*/
	triggerKeys: {
		type: require_runtime.definePropType(Array),
		default: () => [
			require_aria.EVENT_CODE.enter,
			require_aria.EVENT_CODE.numpadEnter,
			require_aria.EVENT_CODE.space
		]
	},
	/**
	* @description when triggering tooltips through hover, whether to focus the trigger element, which improves accessibility
	*/
	focusOnTarget: Boolean
});
//#endregion
exports.useTooltipTriggerProps = useTooltipTriggerProps;
exports.useTooltipTriggerPropsDefaults = useTooltipTriggerPropsDefaults;

//# sourceMappingURL=trigger.js.map