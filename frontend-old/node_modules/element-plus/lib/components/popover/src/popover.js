Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_aria = require("../../../constants/aria.js");
const require_types = require("../../../utils/types.js");
const require_runtime = require("../../../utils/vue/props/runtime.js");
const require_content = require("../../tooltip/src/content.js");
const require_trigger = require("../../tooltip/src/trigger.js");
const require_dropdown = require("../../dropdown/src/dropdown.js");
//#region ../../packages/components/popover/src/popover.ts
/**
* @deprecated Removed after 3.0.0, Use `PopoverProps` instead.
*/
const popoverProps = require_runtime.buildProps({
	/**
	* @description how the popover is triggered, not valid in controlled mode
	*/
	trigger: require_trigger.useTooltipTriggerProps.trigger,
	/**
	* @description When you click the mouse to focus on the trigger element, you can define a set of keyboard codes to control the display of popover through the keyboard, not valid in controlled mode
	*/
	triggerKeys: require_trigger.useTooltipTriggerProps.triggerKeys,
	/**
	* @description popover placement
	*/
	placement: require_dropdown.dropdownProps.placement,
	/**
	* @description whether Popover is disabled
	*/
	disabled: require_trigger.useTooltipTriggerProps.disabled,
	/**
	* @description whether popover is visible
	*/
	visible: require_content.useTooltipContentProps.visible,
	/**
	* @description popover transition animation
	*/
	transition: require_content.useTooltipContentProps.transition,
	/**
	* @description parameters for [popper.js](https://popper.js.org/docs/v2/)
	*/
	popperOptions: require_dropdown.dropdownProps.popperOptions,
	/**
	* @description [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of Popover
	*/
	tabindex: require_dropdown.dropdownProps.tabindex,
	/**
	* @description popover content, can be replaced with a default `slot`
	*/
	content: require_content.useTooltipContentProps.content,
	/**
	* @description custom style for popover
	*/
	popperStyle: require_content.useTooltipContentProps.popperStyle,
	/**
	* @description custom class name for popover
	*/
	popperClass: require_content.useTooltipContentProps.popperClass,
	enterable: {
		...require_content.useTooltipContentProps.enterable,
		default: true
	},
	/**
	* @description Tooltip theme, built-in theme: `dark` / `light`
	*/
	effect: {
		...require_content.useTooltipContentProps.effect,
		default: "light"
	},
	/**
	* @description whether popover dropdown is teleported to the body
	*/
	teleported: require_content.useTooltipContentProps.teleported,
	/**
	* @description which select dropdown appends to
	*/
	appendTo: require_content.useTooltipContentProps.appendTo,
	/**
	* @description popover title
	*/
	title: String,
	/**
	* @description popover width
	*/
	width: {
		type: [String, Number],
		default: 150
	},
	/**
	* @description popover offset
	*/
	offset: {
		type: Number,
		default: void 0
	},
	/**
	* @description delay of appearance, in millisecond, not valid in controlled mode
	*/
	showAfter: {
		type: Number,
		default: 0
	},
	/**
	* @description delay of disappear, in millisecond, not valid in controlled mode
	*/
	hideAfter: {
		type: Number,
		default: 200
	},
	/**
	* @description timeout in milliseconds to hide tooltip, not valid in controlled mode
	*/
	autoClose: {
		type: Number,
		default: 0
	},
	/**
	* @description whether a tooltip arrow is displayed or not. For more info, please refer to [ElPopper](https://github.com/element-plus/element-plus/tree/dev/packages/components/popper)
	*/
	showArrow: {
		type: Boolean,
		default: true
	},
	/**
	* @description when popover inactive and `persistent` is `false` , popover will be destroyed
	*/
	persistent: {
		type: Boolean,
		default: true
	},
	"onUpdate:visible": { type: Function }
});
const popoverEmits = {
	"update:visible": (value) => require_types.isBoolean(value),
	"before-enter": () => true,
	"before-leave": () => true,
	"after-enter": () => true,
	"after-leave": () => true
};
/**
* @description default values for PopoverProps
*/
const popoverPropsDefaults = {
	trigger: "hover",
	triggerKeys: () => [
		require_aria.EVENT_CODE.enter,
		require_aria.EVENT_CODE.numpadEnter,
		require_aria.EVENT_CODE.space
	],
	placement: "bottom",
	visible: null,
	popperOptions: () => ({}),
	tabindex: 0,
	content: "",
	popperStyle: void 0,
	enterable: true,
	effect: "light",
	teleported: true,
	width: 150,
	offset: void 0,
	showAfter: 0,
	hideAfter: 200,
	autoClose: 0,
	showArrow: true,
	persistent: true
};
//#endregion
exports.popoverEmits = popoverEmits;
exports.popoverProps = popoverProps;
exports.popoverPropsDefaults = popoverPropsDefaults;

//# sourceMappingURL=popover.js.map