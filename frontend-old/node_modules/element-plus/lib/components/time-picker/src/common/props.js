Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../../_virtual/_rolldown/runtime.js");
const require_runtime$1 = require("../../../../utils/vue/props/runtime.js");
const require_index = require("../../../../hooks/use-size/index.js");
const require_index$1 = require("../../../../hooks/use-empty-values/index.js");
const require_index$2 = require("../../../../hooks/use-aria/index.js");
const require_content = require("../../../tooltip/src/content.js");
const require_shared = require("../props/shared.js");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let _popperjs_core = require("@popperjs/core");
//#region ../../packages/components/time-picker/src/common/props.ts
const timePickerDefaultProps = require_runtime$1.buildProps({
	/**
	* @description this prop decides if the date picker panel pops up when the input is focused
	*/
	automaticDropdown: {
		type: Boolean,
		default: true
	},
	/**
	* @description same as `id` in native input
	*/
	id: { type: require_runtime$1.definePropType([Array, String]) },
	/**
	* @description same as `name` in native input
	*/
	name: { type: require_runtime$1.definePropType([Array, String]) },
	/**
	* @description custom class name for TimePicker's dropdown
	*/
	popperClass: require_content.useTooltipContentProps.popperClass,
	/**
	* @description custom style for TimePicker's dropdown
	*/
	popperStyle: require_content.useTooltipContentProps.popperStyle,
	/**
	* @description format of the displayed value in the input box
	*/
	format: String,
	/**
	* @description optional, format of binding value. If not specified, the binding value will be a Date object
	*/
	valueFormat: String,
	/**
	* @description optional, format of the date displayed in input's inner panel
	*/
	dateFormat: String,
	/**
	* @description optional, format of the time displayed in input's inner panel
	*/
	timeFormat: String,
	/**
	* @description type of the picker
	*/
	type: {
		type: String,
		default: ""
	},
	/**
	* @description whether to show clear button
	*/
	clearable: {
		type: Boolean,
		default: true
	},
	/**
	* @description Custom clear icon component
	*/
	clearIcon: {
		type: require_runtime$1.definePropType([String, Object]),
		default: _element_plus_icons_vue.CircleClose
	},
	/**
	* @description whether the input is editable
	*/
	editable: {
		type: Boolean,
		default: true
	},
	/**
	* @description Whether to auto-fill the input with the current time on focus when no value is selected.
	*/
	saveOnBlur: {
		type: Boolean,
		default: true
	},
	/**
	* @description Custom prefix icon component
	*/
	prefixIcon: {
		type: require_runtime$1.definePropType([String, Object]),
		default: ""
	},
	/**
	* @description size of Input
	*/
	size: require_index.useSizeProp,
	/**
	* @description whether TimePicker is read only
	*/
	readonly: Boolean,
	/**
	* @description whether TimePicker is disabled
	*/
	disabled: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description placeholder in non-range mode
	*/
	placeholder: {
		type: String,
		default: ""
	},
	/**
	* @description [popper.js](https://popper.js.org/docs/v2/) parameters
	*/
	popperOptions: {
		type: require_runtime$1.definePropType(Object),
		default: () => ({})
	},
	/**
	* @description binding value, if it is an array, the length should be 2
	*/
	modelValue: {
		type: require_runtime$1.definePropType([
			Date,
			Array,
			String,
			Number
		]),
		default: ""
	},
	/**
	* @description range separator
	*/
	rangeSeparator: {
		type: String,
		default: "-"
	},
	/**
	* @description placeholder for the start date in range mode
	*/
	startPlaceholder: String,
	/**
	* @description placeholder for the end date in range mode
	*/
	endPlaceholder: String,
	/**
	* @description optional, default date of the calendar
	*/
	defaultValue: { type: require_runtime$1.definePropType([Date, Array]) },
	/**
	* @description optional, the time value to use when selecting date range
	*/
	defaultTime: { type: require_runtime$1.definePropType([Date, Array]) },
	/**
	* @description whether to pick a time range
	*/
	isRange: Boolean,
	...require_shared.disabledTimeListsProps,
	/**
	* @description a function determining if a date is disabled with that date as its parameter. Should return a Boolean
	*/
	disabledDate: { type: Function },
	/**
	* @description set custom className
	*/
	cellClassName: { type: Function },
	/**
	* @description an object array to set shortcut options
	*/
	shortcuts: {
		type: Array,
		default: () => []
	},
	/**
	* @description whether to pick time using arrow buttons
	*/
	arrowControl: Boolean,
	/**
	* @description input tabindex
	*/
	tabindex: {
		type: require_runtime$1.definePropType([String, Number]),
		default: 0
	},
	/**
	* @description whether to trigger form validation
	*/
	validateEvent: {
		type: Boolean,
		default: true
	},
	/**
	* @description unlink two date-panels in range-picker
	*/
	unlinkPanels: Boolean,
	/**
	* @description show only one panel in range-picker
	*/
	singlePanel: Boolean,
	/**
	* @description position of dropdown
	*/
	placement: {
		type: require_runtime$1.definePropType(String),
		values: _popperjs_core.placements,
		default: "bottom"
	},
	/**
	* @description list of possible positions for dropdown
	*/
	fallbackPlacements: {
		type: require_runtime$1.definePropType(Array),
		default: [
			"bottom",
			"top",
			"right",
			"left"
		]
	},
	...require_index$1.useEmptyValuesProps,
	...require_index$2.useAriaProps(["ariaLabel"]),
	/**
	* @description whether to show the now button
	*/
	showNow: {
		type: Boolean,
		default: true
	},
	/**
	* @description whether to show footer
	*/
	showConfirm: {
		type: Boolean,
		default: true
	},
	/**
	* @description whether to show footer
	*/
	showFooter: {
		type: Boolean,
		default: true
	},
	/**
	* @description whether to show the number of the calendar week
	*/
	showWeekNumber: Boolean
});
const timePickerRangeTriggerProps = require_runtime$1.buildProps({
	id: { type: require_runtime$1.definePropType(Array) },
	name: { type: require_runtime$1.definePropType(Array) },
	modelValue: { type: require_runtime$1.definePropType([Array, String]) },
	startPlaceholder: String,
	endPlaceholder: String,
	disabled: Boolean
});
/**
* @deprecated Use `timePickerRangeTriggerProps` instead. This will be removed in future versions.
*/
const timePickerRngeTriggerProps = timePickerRangeTriggerProps;
//#endregion
exports.timePickerDefaultProps = timePickerDefaultProps;
exports.timePickerRangeTriggerProps = timePickerRangeTriggerProps;
exports.timePickerRngeTriggerProps = timePickerRngeTriggerProps;

//# sourceMappingURL=props.js.map