import { UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isArray } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { useAriaProps } from "../../../hooks/use-aria/index.mjs";
//#region ../../packages/components/checkbox/src/checkbox-group.ts
/**
* @deprecated Removed after 3.0.0, Use `CheckboxGroupProps` instead.
*/
const checkboxGroupProps = buildProps({
	/**
	* @description binding value
	*/
	modelValue: {
		type: definePropType(Array),
		default: () => []
	},
	/**
	* @description whether the nesting checkboxes are disabled
	*/
	disabled: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description minimum number of checkbox checked
	*/
	min: Number,
	/**
	* @description maximum number of checkbox checked
	*/
	max: Number,
	/**
	* @description size of checkbox
	*/
	size: useSizeProp,
	/**
	* @description border and background color when button is active
	*/
	fill: String,
	/**
	* @description font color when button is active
	*/
	textColor: String,
	/**
	* @description element tag of the checkbox group
	*/
	tag: {
		type: String,
		default: "div"
	},
	/**
	* @description whether to trigger form validation
	*/
	validateEvent: {
		type: Boolean,
		default: true
	},
	options: { type: definePropType(Array) },
	props: {
		type: definePropType(Object),
		default: () => checkboxDefaultProps
	},
	type: {
		type: String,
		values: ["checkbox", "button"],
		default: "checkbox"
	},
	...useAriaProps(["ariaLabel"])
});
const checkboxGroupEmits = {
	[UPDATE_MODEL_EVENT]: (val) => isArray(val),
	change: (val) => isArray(val)
};
const checkboxDefaultProps = {
	label: "label",
	value: "value",
	disabled: "disabled"
};
//#endregion
export { checkboxDefaultProps, checkboxGroupEmits, checkboxGroupProps };

//# sourceMappingURL=checkbox-group.mjs.map