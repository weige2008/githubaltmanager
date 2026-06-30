import { UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isBoolean, isNumber, isString } from "../../../utils/types.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { useAriaProps } from "../../../hooks/use-aria/index.mjs";
//#region ../../packages/components/checkbox/src/checkbox.ts
/**
* @deprecated Removed after 3.0.0, Use `CheckboxProps` instead.
*/
const checkboxProps = {
	/**
	* @description binding value
	*/
	modelValue: {
		type: [
			Number,
			String,
			Boolean
		],
		default: void 0
	},
	/**
	* @description label of the Checkbox when used inside a `checkbox-group`
	*/
	label: {
		type: [
			String,
			Boolean,
			Number,
			Object
		],
		default: void 0
	},
	/**
	* @description value of the Checkbox when used inside a `checkbox-group`
	*/
	value: {
		type: [
			String,
			Boolean,
			Number,
			Object
		],
		default: void 0
	},
	/**
	* @description Set indeterminate state, only responsible for style control
	*/
	indeterminate: Boolean,
	/**
	* @description whether the Checkbox is disabled
	*/
	disabled: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description if the Checkbox is checked
	*/
	checked: Boolean,
	/**
	* @description native 'name' attribute
	*/
	name: {
		type: String,
		default: void 0
	},
	/**
	* @description value of the Checkbox if it's checked
	*/
	trueValue: {
		type: [String, Number],
		default: void 0
	},
	/**
	* @description value of the Checkbox if it's not checked
	*/
	falseValue: {
		type: [String, Number],
		default: void 0
	},
	/**
	* @deprecated use `trueValue` instead
	* @description value of the Checkbox if it's checked
	*/
	trueLabel: {
		type: [String, Number],
		default: void 0
	},
	/**
	* @deprecated use `falseValue` instead
	* @description value of the Checkbox if it's not checked
	*/
	falseLabel: {
		type: [String, Number],
		default: void 0
	},
	/**
	* @description input id
	*/
	id: {
		type: String,
		default: void 0
	},
	/**
	* @description whether to add a border around Checkbox
	*/
	border: Boolean,
	/**
	* @description size of the Checkbox
	*/
	size: useSizeProp,
	/**
	* @description input tabindex
	*/
	tabindex: [String, Number],
	/**
	* @description whether to trigger form validation
	*/
	validateEvent: {
		type: Boolean,
		default: true
	},
	ariaLabel: String,
	...useAriaProps(["ariaControls"])
};
const checkboxEmits = {
	[UPDATE_MODEL_EVENT]: (val) => isString(val) || isNumber(val) || isBoolean(val),
	change: (val) => isString(val) || isNumber(val) || isBoolean(val)
};
const checkboxPropsDefaults = {
	modelValue: void 0,
	label: void 0,
	value: void 0,
	disabled: void 0,
	name: void 0,
	trueValue: void 0,
	falseValue: void 0,
	trueLabel: void 0,
	falseLabel: void 0,
	id: void 0,
	validateEvent: true
};
//#endregion
export { checkboxEmits, checkboxProps, checkboxPropsDefaults };

//# sourceMappingURL=checkbox.mjs.map