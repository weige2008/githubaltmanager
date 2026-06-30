import { EVENT_CODE } from "../../../constants/aria.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { roleTypes } from "../../popper/src/popper.mjs";
import { useTooltipContentProps } from "../../tooltip/src/content.mjs";
import { useTooltipTriggerProps } from "../../tooltip/src/trigger.mjs";
//#region ../../packages/components/dropdown/src/dropdown.ts
const dropdownProps = buildProps({
	/**
	* @description how to trigger
	*/
	trigger: {
		...useTooltipTriggerProps.trigger,
		type: definePropType([String, Array])
	},
	triggerKeys: {
		type: definePropType(Array),
		default: () => [
			EVENT_CODE.enter,
			EVENT_CODE.numpadEnter,
			EVENT_CODE.space,
			EVENT_CODE.down
		]
	},
	/**
	* @description Indicates whether virtual triggering is enabled
	*/
	virtualTriggering: useTooltipTriggerProps.virtualTriggering,
	/**
	* @description Indicates the reference element to which the dropdown is attached
	*/
	virtualRef: useTooltipTriggerProps.virtualRef,
	/**
	* @description Tooltip theme, built-in theme: `dark` / `light`
	*/
	effect: {
		...useTooltipContentProps.effect,
		default: "light"
	},
	/**
	* @description menu button type, refer to `Button` Component, only works when `split-button` is true
	*/
	type: { type: definePropType(String) },
	/**
	* @description placement of pop menu
	*/
	placement: {
		type: definePropType(String),
		default: "bottom"
	},
	/**
	* @description [popper.js](https://popper.js.org/docs/v2/) parameters
	*/
	popperOptions: {
		type: definePropType(Object),
		default: () => ({})
	},
	id: String,
	/**
	* @description menu size, also works on the split button
	*/
	size: {
		type: String,
		default: ""
	},
	/**
	* @description whether a button group is displayed
	*/
	splitButton: Boolean,
	/**
	* @description whether to hide menu after clicking menu-item
	*/
	hideOnClick: {
		type: Boolean,
		default: true
	},
	loop: {
		type: Boolean,
		default: true
	},
	/**
	* @description whether the tooltip content has an arrow
	*/
	showArrow: {
		type: Boolean,
		default: true
	},
	/**
	* @description delay time before show a dropdown (only works when trigger is `hover`)
	*/
	showTimeout: {
		type: Number,
		default: 150
	},
	/**
	* @description delay time before hide a dropdown (only works when trigger is `hover`)
	*/
	hideTimeout: {
		type: Number,
		default: 150
	},
	/**
	* @description [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of Dropdown
	*/
	tabindex: {
		type: definePropType([Number, String]),
		default: 0
	},
	/**
	* @description the max height of menu
	*/
	maxHeight: {
		type: definePropType([Number, String]),
		default: ""
	},
	/**
	* @description custom class name for Dropdown's dropdown
	*/
	popperClass: useTooltipContentProps.popperClass,
	/**
	* @description custom style for Dropdown's dropdown
	*/
	popperStyle: useTooltipContentProps.popperStyle,
	/**
	* @description whether to disable
	*/
	disabled: Boolean,
	/**
	* @description the ARIA role attribute for the dropdown menu. Depending on the use case, you may want to change this to 'navigation'
	*/
	role: {
		type: String,
		values: roleTypes,
		default: "menu"
	},
	buttonProps: { type: definePropType(Object) },
	/**
	* @description whether the dropdown popup is teleported to the body
	*/
	teleported: useTooltipContentProps.teleported,
	/**
	* @description which element the dropdown CONTENT appends to
	*/
	appendTo: useTooltipContentProps.appendTo,
	/**
	* @description when dropdown inactive and `persistent` is `false` , dropdown menu will be destroyed
	*/
	persistent: {
		type: Boolean,
		default: true
	}
});
const dropdownItemProps = buildProps({
	/**
	* @description a command to be dispatched to Dropdown's `command` callback
	*/
	command: {
		type: [
			Object,
			String,
			Number
		],
		default: () => ({})
	},
	/**
	* @description whether the item is disabled
	*/
	disabled: Boolean,
	/**
	* @description whether a divider is displayed
	*/
	divided: Boolean,
	textValue: String,
	/**
	* @description custom icon
	*/
	icon: { type: iconPropType }
});
const dropdownMenuProps = buildProps({ onKeydown: { type: definePropType(Function) } });
const FIRST_KEYS = [
	EVENT_CODE.down,
	EVENT_CODE.pageDown,
	EVENT_CODE.home
];
const LAST_KEYS = [
	EVENT_CODE.up,
	EVENT_CODE.pageUp,
	EVENT_CODE.end
];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
//#endregion
export { FIRST_KEYS, FIRST_LAST_KEYS, LAST_KEYS, dropdownItemProps, dropdownMenuProps, dropdownProps };

//# sourceMappingURL=dropdown.mjs.map