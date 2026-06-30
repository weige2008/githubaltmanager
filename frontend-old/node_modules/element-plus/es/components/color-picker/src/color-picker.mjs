import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isString } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { useEmptyValuesProps } from "../../../hooks/use-empty-values/index.mjs";
import { useAriaProps } from "../../../hooks/use-aria/index.mjs";
import { useTooltipContentProps } from "../../tooltip/src/content.mjs";
import { isNil } from "lodash-unified";
//#region ../../packages/components/color-picker/src/color-picker.ts
/**
* @deprecated Removed after 3.0.0, Use `ColorPickerProps` instead.
*/
const colorPickerProps = buildProps({
	/**
	* @description when color-picker inactive and persistent is false, the color panel will be destroyed
	*/
	persistent: {
		type: Boolean,
		default: true
	},
	/**
	* @description binding value
	*/
	modelValue: {
		type: definePropType(String),
		default: void 0
	},
	/**
	* @description ColorPicker id
	*/
	id: String,
	/**
	* @description whether to display the alpha slider
	*/
	showAlpha: Boolean,
	/**
	* @description color format of v-model
	*/
	colorFormat: { type: definePropType(String) },
	/**
	* @description whether to disable the ColorPicker
	*/
	disabled: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description whether to show clear button
	*/
	clearable: {
		type: Boolean,
		default: true
	},
	/**
	* @description size of ColorPicker
	*/
	size: useSizeProp,
	/**
	* @description custom class name for ColorPicker's dropdown
	*/
	popperClass: useTooltipContentProps.popperClass,
	/**
	* @description custom style for ColorPicker's dropdown
	*/
	popperStyle: useTooltipContentProps.popperStyle,
	/**
	* @description ColorPicker tabindex
	*/
	tabindex: {
		type: [String, Number],
		default: 0
	},
	/**
	* @description whether color-picker popper is teleported to the body
	*/
	teleported: useTooltipContentProps.teleported,
	/**
	* @description which color-picker panel appends to
	*/
	appendTo: useTooltipContentProps.appendTo,
	/**
	* @description predefined color options
	*/
	predefine: { type: definePropType(Array) },
	/**
	* @description whether to trigger form validation
	*/
	validateEvent: {
		type: Boolean,
		default: true
	},
	...useEmptyValuesProps,
	...useAriaProps(["ariaLabel"])
});
const colorPickerEmits = {
	[UPDATE_MODEL_EVENT]: (val) => isString(val) || isNil(val),
	[CHANGE_EVENT]: (val) => isString(val) || isNil(val),
	activeChange: (val) => isString(val) || isNil(val),
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent,
	clear: () => true
};
/**
* @description default values for ColorPickerProps, used in components that extend ColorPickerProps
*/
const colorPickerPropsDefaults = {
	persistent: true,
	modelValue: void 0,
	disabled: void 0,
	clearable: true,
	popperStyle: void 0,
	tabindex: 0,
	teleported: true,
	validateEvent: true,
	valueOnClear: void 0
};
//#endregion
export { colorPickerEmits, colorPickerProps, colorPickerPropsDefaults };

//# sourceMappingURL=color-picker.mjs.map