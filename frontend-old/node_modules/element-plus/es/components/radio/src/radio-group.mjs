import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { useAriaProps } from "../../../hooks/use-aria/index.mjs";
import { radioEmits } from "./radio.mjs";
//#region ../../packages/components/radio/src/radio-group.ts
const radioDefaultProps = {
	label: "label",
	value: "value",
	disabled: "disabled"
};
/**
* @deprecated Removed after 3.0.0, Use `RadioGroupProps` instead.
*/
const radioGroupProps = buildProps({
	/**
	* @description native `id` attribute
	*/
	id: {
		type: String,
		default: void 0
	},
	/**
	* @description the size of radio buttons or bordered radios
	*/
	size: useSizeProp,
	/**
	* @description whether the nesting radios are disabled
	*/
	disabled: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description binding value
	*/
	modelValue: {
		type: [
			String,
			Number,
			Boolean
		],
		default: void 0
	},
	/**
	* @description border and background color when button is active
	*/
	fill: {
		type: String,
		default: ""
	},
	/**
	* @description font color when button is active
	*/
	textColor: {
		type: String,
		default: ""
	},
	/**
	* @description native `name` attribute
	*/
	name: {
		type: String,
		default: void 0
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
		default: () => radioDefaultProps
	},
	type: {
		type: String,
		values: ["radio", "button"],
		default: "radio"
	},
	...useAriaProps(["ariaLabel"])
});
const radioGroupEmits = radioEmits;
/**
* @description default values for RadioGroupProps
*/
const radioGroupPropsDefaults = {
	id: void 0,
	disabled: void 0,
	modelValue: void 0,
	fill: "",
	textColor: "",
	name: void 0,
	validateEvent: true,
	props: () => radioDefaultProps,
	type: "radio"
};
//#endregion
export { radioDefaultProps, radioGroupEmits, radioGroupProps, radioGroupPropsDefaults };

//# sourceMappingURL=radio-group.mjs.map