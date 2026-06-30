Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_event = require("../../../constants/event.js");
const require_types = require("../../../utils/types.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
const require_index = require("../../../hooks/use-size/index.js");
const require_index$1 = require("../../../hooks/use-aria/index.js");
let lodash_unified = require("lodash-unified");
//#region ../../packages/components/input-number/src/input-number.ts
/**
* @deprecated Removed after 3.0.0, Use `InputNumberProps` instead.
*/
const inputNumberProps = require_runtime$1.buildProps({
	/**
	* @description same as `id` in native input
	*/
	id: {
		type: String,
		default: void 0
	},
	/**
	* @description incremental step
	*/
	step: {
		type: Number,
		default: 1
	},
	/**
	* @description whether input value can only be multiple of step
	*/
	stepStrictly: Boolean,
	/**
	* @description the maximum allowed value
	*/
	max: {
		type: Number,
		default: Number.MAX_SAFE_INTEGER
	},
	/**
	* @description the minimum allowed value
	*/
	min: {
		type: Number,
		default: Number.MIN_SAFE_INTEGER
	},
	/**
	* @description binding value
	*/
	modelValue: { type: [Number, null] },
	/**
	* @description same as `readonly` in native input
	*/
	readonly: Boolean,
	/**
	* @description whether the component is disabled
	*/
	disabled: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description size of the component
	*/
	size: require_index.useSizeProp,
	/**
	* @description whether to enable the control buttons
	*/
	controls: {
		type: Boolean,
		default: true
	},
	/**
	* @description position of the control buttons
	*/
	controlsPosition: {
		type: String,
		default: "",
		values: ["", "right"]
	},
	/**
	* @description value should be set when input box is cleared
	*/
	valueOnClear: {
		type: require_runtime$1.definePropType([
			String,
			Number,
			null
		]),
		validator: (val) => val === null || require_types.isNumber(val) || ["min", "max"].includes(val),
		default: null
	},
	/**
	* @description same as `name` in native input
	*/
	name: String,
	/**
	* @description same as `placeholder` in native input
	*/
	placeholder: String,
	/**
	* @description precision of input value
	*/
	precision: {
		type: Number,
		validator: (val) => val >= 0 && val === Number.parseInt(`${val}`, 10)
	},
	/**
	* @description whether to trigger form validation
	*/
	validateEvent: {
		type: Boolean,
		default: true
	},
	...require_index$1.useAriaProps(["ariaLabel"]),
	/**
	* @description native input mode for virtual keyboards
	*/
	inputmode: {
		type: require_runtime$1.definePropType(String),
		default: void 0
	},
	/**
	* @description alignment for the inner input text
	*/
	align: {
		type: require_runtime$1.definePropType(String),
		default: "center"
	},
	/**
	* @description whether to disable scientific notation input (e.g. 'e', 'E')
	*/
	disabledScientific: Boolean,
	/**
	* @description specifies the format of the value presented in the input
	*/
	formatter: { type: Function },
	/**
	* @description specifies the value extracted from the formatted input
	*/
	parser: { type: Function },
	/**
	* @description same as `tabindex` in native input
	*/
	tabindex: {
		type: [String, Number],
		default: 0
	}
});
const inputNumberEmits = {
	[require_event.CHANGE_EVENT]: (cur, prev) => prev !== cur,
	blur: (e) => e instanceof FocusEvent,
	focus: (e) => e instanceof FocusEvent,
	[require_event.INPUT_EVENT]: (val) => require_types.isNumber(val) || (0, lodash_unified.isNil)(val),
	[require_event.UPDATE_MODEL_EVENT]: (val) => require_types.isNumber(val) || (0, lodash_unified.isNil)(val)
};
//#endregion
exports.inputNumberEmits = inputNumberEmits;
exports.inputNumberProps = inputNumberProps;

//# sourceMappingURL=input-number.js.map