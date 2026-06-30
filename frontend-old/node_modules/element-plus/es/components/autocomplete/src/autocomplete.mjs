import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isNumber, isObject, isString } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { NOOP } from "../../../utils/functions.mjs";
import { useTooltipContentProps } from "../../tooltip/src/content.mjs";
import { inputProps } from "../../input/src/input.mjs";
//#region ../../packages/components/autocomplete/src/autocomplete.ts
/**
* @deprecated Removed after 3.0.0, Use `AutocompleteProps` instead.
*/
const autocompleteProps = buildProps({
	...inputProps,
	/**
	* @description key name of the input suggestion object for display
	*/
	valueKey: {
		type: String,
		default: "value"
	},
	/**
	* @description binding value
	*/
	modelValue: {
		type: [String, Number],
		default: ""
	},
	/**
	* @description debounce delay when typing, in milliseconds
	*/
	debounce: {
		type: Number,
		default: 300
	},
	/**
	* @description placement of the popup menu
	*/
	placement: {
		type: definePropType(String),
		values: [
			"top",
			"top-start",
			"top-end",
			"bottom",
			"bottom-start",
			"bottom-end"
		],
		default: "bottom-start"
	},
	/**
	* @description a method to fetch input suggestions. When suggestions are ready, invoke `callback(data:[])` to return them to Autocomplete
	*/
	fetchSuggestions: {
		type: definePropType([Function, Array]),
		default: NOOP
	},
	/**
	* @description custom class name for autocomplete's dropdown
	*/
	popperClass: useTooltipContentProps.popperClass,
	/**
	* @description custom style for autocomplete's dropdown
	*/
	popperStyle: useTooltipContentProps.popperStyle,
	/**
	* @description [popper.js](https://popper.js.org/docs/v2/) parameters
	*/
	popperOptions: useTooltipContentProps.popperOptions,
	/**
	* @description determines whether the arrow is displayed
	*/
	showArrow: {
		type: Boolean,
		default: true
	},
	/**
	* @description whether show suggestions when input focus
	*/
	triggerOnFocus: {
		type: Boolean,
		default: true
	},
	/**
	* @description whether to emit a `select` event on enter when there is no autocomplete match
	*/
	selectWhenUnmatched: Boolean,
	/**
	* @description whether to hide the loading icon in remote search
	*/
	hideLoading: Boolean,
	/**
	* @description whether select dropdown is teleported to the body
	*/
	teleported: useTooltipContentProps.teleported,
	/**
	* @description which select dropdown appends to
	*/
	appendTo: useTooltipContentProps.appendTo,
	/**
	* @description whether to highlight first item in remote search suggestions by default
	*/
	highlightFirstItem: Boolean,
	/**
	* @description whether the width of the dropdown is the same as the input
	*/
	fitInputWidth: Boolean,
	/**
	* @description whether keyboard navigation loops from end to start
	*/
	loopNavigation: {
		type: Boolean,
		default: true
	}
});
const autocompleteEmits = {
	[UPDATE_MODEL_EVENT]: (value) => isString(value) || isNumber(value),
	[INPUT_EVENT]: (value) => isString(value) || isNumber(value),
	[CHANGE_EVENT]: (value) => isString(value) || isNumber(value),
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent,
	clear: () => true,
	select: (item) => isObject(item)
};
//#endregion
export { autocompleteEmits, autocompleteProps };

//# sourceMappingURL=autocomplete.mjs.map