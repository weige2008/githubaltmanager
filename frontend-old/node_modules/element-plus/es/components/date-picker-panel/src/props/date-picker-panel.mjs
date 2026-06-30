import { buildProps, definePropType } from "../../../../utils/vue/props/runtime.mjs";
import { disabledTimeListsProps } from "../../../time-picker/src/props/shared.mjs";
//#region ../../packages/components/date-picker-panel/src/props/date-picker-panel.ts
const datePickerPanelProps = buildProps({
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
	* @description whether picker is disabled
	*/
	disabled: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description binding value, if it is an array, the length should be 2
	*/
	modelValue: {
		type: definePropType([
			Date,
			Array,
			String,
			Number
		]),
		default: ""
	},
	/**
	* @description optional, default date of the calendar
	*/
	defaultValue: { type: definePropType([Date, Array]) },
	/**
	* @description optional, the time value to use when selecting date range
	*/
	defaultTime: { type: definePropType([Date, Array]) },
	/**
	* @description whether to pick a time range
	*/
	isRange: Boolean,
	...disabledTimeListsProps,
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
	* @description unlink two date-panels in range-picker
	*/
	unlinkPanels: Boolean,
	/**
	* @description whether to show the now button
	*/
	showNow: {
		type: Boolean,
		default: true
	},
	/**
	* @description whether to show the confirm button
	*/
	showConfirm: Boolean,
	/**
	* @description whether to show footer
	*/
	showFooter: Boolean,
	/**
	* @description whether to show the number of the calendar week
	*/
	showWeekNumber: Boolean,
	/**
	* @description type of the picker
	*/
	type: {
		type: definePropType(String),
		default: "date"
	},
	/**
	* @description whether to show clear button in range mode
	*/
	clearable: {
		type: Boolean,
		default: true
	},
	/**
	* @description whether the date picker is bordered
	*/
	border: {
		type: Boolean,
		default: true
	},
	/**
	* @description whether the input is editable
	*/
	editable: {
		type: Boolean,
		default: true
	}
});
//#endregion
export { datePickerPanelProps };

//# sourceMappingURL=date-picker-panel.mjs.map