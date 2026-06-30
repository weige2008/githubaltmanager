Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_event = require("../../../constants/event.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
let lodash_unified = require("lodash-unified");
let _vue_shared = require("@vue/shared");
//#region ../../packages/components/color-picker-panel/src/color-picker-panel.ts
/**
* @deprecated Removed after 3.0.0, Use `ColorPickerPanelProps` instead.
*/
const colorPickerPanelProps = require_runtime$1.buildProps({
	/**
	* @description binding value
	*/
	modelValue: {
		type: require_runtime$1.definePropType(String),
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
	colorFormat: { type: require_runtime$1.definePropType(String) },
	/**
	* @description whether to disable the color picker
	*/
	disabled: Boolean,
	/**
	* @description predefined color options
	*/
	predefine: { type: require_runtime$1.definePropType(Array) },
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
	hueSliderClass: { type: require_runtime$1.definePropType([
		String,
		Array,
		Object
	]) },
	/**
	* @description styles will be passed to <hue-slider />
	*/
	hueSliderStyle: {
		type: require_runtime$1.definePropType([
			String,
			Array,
			Object,
			Boolean
		]),
		default: void 0
	}
});
const colorPickerPanelEmits = { [require_event.UPDATE_MODEL_EVENT]: (val) => (0, _vue_shared.isString)(val) || (0, lodash_unified.isNil)(val) };
const ROOT_COMMON_COLOR_INJECTION_KEY = Symbol("colorCommonPickerKey");
const colorPickerPanelContextKey = Symbol("colorPickerPanelContextKey");
//#endregion
exports.ROOT_COMMON_COLOR_INJECTION_KEY = ROOT_COMMON_COLOR_INJECTION_KEY;
exports.colorPickerPanelContextKey = colorPickerPanelContextKey;
exports.colorPickerPanelEmits = colorPickerPanelEmits;
exports.colorPickerPanelProps = colorPickerPanelProps;

//# sourceMappingURL=color-picker-panel.js.map