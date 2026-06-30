import { UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isString } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { isNil } from "lodash-unified";
//#region ../../packages/components/color-picker-panel/src/color-picker-panel.ts
/**
* @deprecated Removed after 3.0.0, Use `ColorPickerPanelProps` instead.
*/
const colorPickerPanelProps = buildProps({
	/**
	* @description binding value
	*/
	modelValue: {
		type: definePropType(String),
		default: void 0
	},
	/**
	* @description whether the color picker is bordered
	*/
	border: {
		type: Boolean,
		default: true
	},
	/**
	* @description whether to display the alpha slider
	*/
	showAlpha: Boolean,
	/**
	* @description color format of v-model
	*/
	colorFormat: { type: definePropType(String) },
	/**
	* @description whether to disable the color picker
	*/
	disabled: Boolean,
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
	/**
	* @description class names will be passed to <hue-slider />
	*/
	hueSliderClass: { type: definePropType([
		String,
		Array,
		Object
	]) },
	/**
	* @description styles will be passed to <hue-slider />
	*/
	hueSliderStyle: {
		type: definePropType([
			String,
			Array,
			Object,
			Boolean
		]),
		default: void 0
	}
});
const colorPickerPanelEmits = { [UPDATE_MODEL_EVENT]: (val) => isString(val) || isNil(val) };
const ROOT_COMMON_COLOR_INJECTION_KEY = Symbol("colorCommonPickerKey");
const colorPickerPanelContextKey = Symbol("colorPickerPanelContextKey");
//#endregion
export { ROOT_COMMON_COLOR_INJECTION_KEY, colorPickerPanelContextKey, colorPickerPanelEmits, colorPickerPanelProps };

//# sourceMappingURL=color-picker-panel.mjs.map