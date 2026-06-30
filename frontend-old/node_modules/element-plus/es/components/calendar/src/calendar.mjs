import { INPUT_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isArray, isDate } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
//#region ../../packages/components/calendar/src/calendar.ts
const isValidRange = (range) => isArray(range) && range.length === 2 && range.every((item) => isDate(item));
/**
* @deprecated Removed after 3.0.0, Use `CalendarProps` instead.
*/
const calendarProps = buildProps({
	/**
	* @description binding value
	*/
	modelValue: { type: Date },
	/**
	* @description time range, including start time and end time.
	*   Start time must be start day of week, end time must be end day of week, the time span cannot exceed two months.
	*/
	range: {
		type: definePropType(Array),
		validator: isValidRange
	},
	/**
	* @description type of the controller for the Calendar header
	*/
	controllerType: {
		type: String,
		values: ["button", "select"],
		default: "button"
	},
	/**
	* @description format label when `controller-type` is 'select'
	*/
	formatter: { type: definePropType(Function) }
});
const calendarEmits = {
	[UPDATE_MODEL_EVENT]: (value) => isDate(value),
	[INPUT_EVENT]: (value) => isDate(value)
};
//#endregion
export { calendarEmits, calendarProps };

//# sourceMappingURL=calendar.mjs.map