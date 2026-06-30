Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_event = require("../../../constants/event.js");
const require_types = require("../../../utils/types.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
const require_content = require("../../tooltip/src/content.js");
const require_input = require("../../input/src/input.js");
let _vue_shared = require("@vue/shared");
//#region ../../packages/components/autocomplete/src/autocomplete.ts
/**
* @deprecated Removed after 3.0.0, Use `AutocompleteProps` instead.
*/
const autocompleteProps = require_runtime$1.buildProps({
	...require_input.inputProps,
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
		type: require_runtime$1.definePropType(String),
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
		type: require_runtime$1.definePropType([Function, Array]),
		default: _vue_shared.NOOP
	},
	/**
	* @description custom class name for autocomplete's dropdown
	*/
	popperClass: require_content.useTooltipContentProps.popperClass,
	/**
	* @description custom style for autocomplete's dropdown
	*/
	popperStyle: require_content.useTooltipContentProps.popperStyle,
	/**
	* @description [popper.js](https://popper.js.org/docs/v2/) parameters
	*/
	popperOptions: require_content.useTooltipContentProps.popperOptions,
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
	teleported: require_content.useTooltipContentProps.teleported,
	/**
	* @description which select dropdown appends to
	*/
	appendTo: require_content.useTooltipContentProps.appendTo,
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
	[require_event.UPDATE_MODEL_EVENT]: (value) => (0, _vue_shared.isString)(value) || require_types.isNumber(value),
	[require_event.INPUT_EVENT]: (value) => (0, _vue_shared.isString)(value) || require_types.isNumber(value),
	[require_event.CHANGE_EVENT]: (value) => (0, _vue_shared.isString)(value) || require_types.isNumber(value),
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent,
	clear: () => true,
	select: (item) => (0, _vue_shared.isObject)(item)
};
//#endregion
exports.autocompleteEmits = autocompleteEmits;
exports.autocompleteProps = autocompleteProps;

//# sourceMappingURL=autocomplete.js.map