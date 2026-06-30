Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_aria = require("../../../constants/aria.js");
const require_runtime = require("../../../utils/vue/props/runtime.js");
const require_icon = require("../../../utils/vue/icon.js");
const require_popper = require("../../popper/src/popper.js");
const require_content = require("../../tooltip/src/content.js");
const require_trigger = require("../../tooltip/src/trigger.js");
//#region ../../packages/components/dropdown/src/dropdown.ts
const dropdownProps = require_runtime.buildProps({
	/**
	* @description how to trigger
	*/
	trigger: {
		...require_trigger.useTooltipTriggerProps.trigger,
		type: require_runtime.definePropType([String, Array])
	},
	triggerKeys: {
		type: require_runtime.definePropType(Array),
		default: () => [
			require_aria.EVENT_CODE.enter,
			require_aria.EVENT_CODE.numpadEnter,
			require_aria.EVENT_CODE.space,
			require_aria.EVENT_CODE.down
		]
	},
	/**
	* @description Indicates whether virtual triggering is enabled
	*/
	virtualTriggering: require_trigger.useTooltipTriggerProps.virtualTriggering,
	/**
	* @description Indicates the reference element to which the dropdown is attached
	*/
	virtualRef: require_trigger.useTooltipTriggerProps.virtualRef,
	/**
	* @description Tooltip theme, built-in theme: `dark` / `light`
	*/
	effect: {
		...require_content.useTooltipContentProps.effect,
		default: "light"
	},
	/**
	* @description menu button type, refer to `Button` Component, only works when `split-button` is true
	*/
	type: { type: require_runtime.definePropType(String) },
	/**
	* @description placement of pop menu
	*/
	placement: {
		type: require_runtime.definePropType(String),
		default: "bottom"
	},
	/**
	* @description [popper.js](https://popper.js.org/docs/v2/) parameters
	*/
	popperOptions: {
		type: require_runtime.definePropType(Object),
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
		type: require_runtime.definePropType([Number, String]),
		default: 0
	},
	/**
	* @description the max height of menu
	*/
	maxHeight: {
		type: require_runtime.definePropType([Number, String]),
		default: ""
	},
	/**
	* @description custom class name for Dropdown's dropdown
	*/
	popperClass: require_content.useTooltipContentProps.popperClass,
	/**
	* @description custom style for Dropdown's dropdown
	*/
	popperStyle: require_content.useTooltipContentProps.popperStyle,
	/**
	* @description whether to disable
	*/
	disabled: Boolean,
	/**
	* @description the ARIA role attribute for the dropdown menu. Depending on the use case, you may want to change this to 'navigation'
	*/
	role: {
		type: String,
		values: require_popper.roleTypes,
		default: "menu"
	},
	buttonProps: { type: require_runtime.definePropType(Object) },
	/**
	* @description whether the dropdown popup is teleported to the body
	*/
	teleported: require_content.useTooltipContentProps.teleported,
	/**
	* @description which element the dropdown CONTENT appends to
	*/
	appendTo: require_content.useTooltipContentProps.appendTo,
	/**
	* @description when dropdown inactive and `persistent` is `false` , dropdown menu will be destroyed
	*/
	persistent: {
		type: Boolean,
		default: true
	}
});
const dropdownItemProps = require_runtime.buildProps({
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
	icon: { type: require_icon.iconPropType }
});
const dropdownMenuProps = require_runtime.buildProps({ onKeydown: { type: require_runtime.definePropType(Function) } });
const FIRST_KEYS = [
	require_aria.EVENT_CODE.down,
	require_aria.EVENT_CODE.pageDown,
	require_aria.EVENT_CODE.home
];
const LAST_KEYS = [
	require_aria.EVENT_CODE.up,
	require_aria.EVENT_CODE.pageUp,
	require_aria.EVENT_CODE.end
];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
//#endregion
exports.FIRST_KEYS = FIRST_KEYS;
exports.FIRST_LAST_KEYS = FIRST_LAST_KEYS;
exports.LAST_KEYS = LAST_KEYS;
exports.dropdownItemProps = dropdownItemProps;
exports.dropdownMenuProps = dropdownMenuProps;
exports.dropdownProps = dropdownProps;

//# sourceMappingURL=dropdown.js.map