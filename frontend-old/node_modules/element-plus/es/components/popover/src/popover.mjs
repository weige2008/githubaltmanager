import { EVENT_CODE } from "../../../constants/aria.mjs";
import { isBoolean } from "../../../utils/types.mjs";
import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { useTooltipContentProps } from "../../tooltip/src/content.mjs";
import { useTooltipTriggerProps } from "../../tooltip/src/trigger.mjs";
import { dropdownProps } from "../../dropdown/src/dropdown.mjs";
//#region ../../packages/components/popover/src/popover.ts
/**
* @deprecated Removed after 3.0.0, Use `PopoverProps` instead.
*/
const popoverProps = buildProps({
	/**
	* @description how the popover is triggered, not valid in controlled mode
	*/
	trigger: useTooltipTriggerProps.trigger,
	/**
	* @description When you click the mouse to focus on the trigger element, you can define a set of keyboard codes to control the display of popover through the keyboard, not valid in controlled mode
	*/
	triggerKeys: useTooltipTriggerProps.triggerKeys,
	/**
	* @description popover placement
	*/
	placement: dropdownProps.placement,
	/**
	* @description whether Popover is disabled
	*/
	disabled: useTooltipTriggerProps.disabled,
	/**
	* @description whether popover is visible
	*/
	visible: useTooltipContentProps.visible,
	/**
	* @description popover transition animation
	*/
	transition: useTooltipContentProps.transition,
	/**
	* @description parameters for [popper.js](https://popper.js.org/docs/v2/)
	*/
	popperOptions: dropdownProps.popperOptions,
	/**
	* @description [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of Popover
	*/
	tabindex: dropdownProps.tabindex,
	/**
	* @description popover content, can be replaced with a default `slot`
	*/
	content: useTooltipContentProps.content,
	/**
	* @description custom style for popover
	*/
	popperStyle: useTooltipContentProps.popperStyle,
	/**
	* @description custom class name for popover
	*/
	popperClass: useTooltipContentProps.popperClass,
	enterable: {
		...useTooltipContentProps.enterable,
		default: true
	},
	/**
	* @description Tooltip theme, built-in theme: `dark` / `light`
	*/
	effect: {
		...useTooltipContentProps.effect,
		default: "light"
	},
	/**
	* @description whether popover dropdown is teleported to the body
	*/
	teleported: useTooltipContentProps.teleported,
	/**
	* @description which select dropdown appends to
	*/
	appendTo: useTooltipContentProps.appendTo,
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
	"update:visible": (value) => isBoolean(value),
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
		EVENT_CODE.enter,
		EVENT_CODE.numpadEnter,
		EVENT_CODE.space
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
export { popoverEmits, popoverProps, popoverPropsDefaults };

//# sourceMappingURL=popover.mjs.map