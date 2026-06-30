Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_event = require("../../../constants/event.js");
const require_types = require("../../../utils/types.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
const require_index = require("../../../hooks/use-size/index.js");
const require_index$1 = require("../../../hooks/use-aria/index.js");
let _popperjs_core = require("@popperjs/core");
let _vue_shared = require("@vue/shared");
//#region ../../packages/components/slider/src/slider.ts
const sliderProps = require_runtime$1.buildProps({
	/**
	* @description binding value
	*/
	modelValue: {
		type: require_runtime$1.definePropType([Number, Array]),
		default: 0
	},
	id: {
		type: String,
		default: void 0
	},
	/**
	* @description minimum value
	*/
	min: {
		type: Number,
		default: 0
	},
	/**
	* @description maximum value
	*/
	max: {
		type: Number,
		default: 100
	},
	/**
	* @description step size, can be a number or `'mark'` to restrict values to marks. When set to `'mark'`, the `marks` attribute must be set
	*/
	step: {
		type: require_runtime$1.definePropType([Number, String]),
		default: 1
	},
	/**
	* @description whether to display an input box, works when `range` is false and `step` is not `'mark'`
	*/
	showInput: Boolean,
	/**
	* @description whether to display control buttons when `show-input` is true
	*/
	showInputControls: {
		type: Boolean,
		default: true
	},
	/**
	* @description size of the slider wrapper, will not work in vertical mode
	*/
	size: require_index.useSizeProp,
	/**
	* @description size of the input box, when set `size`, the default is the value of `size`
	*/
	inputSize: require_index.useSizeProp,
	/**
	* @description whether to display breakpoints
	*/
	showStops: Boolean,
	/**
	* @description whether to display tooltip value
	*/
	showTooltip: {
		type: Boolean,
		default: true
	},
	/**
	* @description format to display tooltip value
	*/
	formatTooltip: {
		type: require_runtime$1.definePropType(Function),
		default: void 0
	},
	/**
	* @description whether Slider is disabled
	*/
	disabled: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description whether to select a range
	*/
	range: Boolean,
	/**
	* @description vertical mode
	*/
	vertical: Boolean,
	/**
	* @description slider height, required in vertical mode
	*/
	height: String,
	/**
	* @description when `range` is true, screen reader label for the start of the range
	*/
	rangeStartLabel: {
		type: String,
		default: void 0
	},
	/**
	* @description when `range` is true, screen reader label for the end of the range
	*/
	rangeEndLabel: {
		type: String,
		default: void 0
	},
	/**
	* @description format to display the `aria-valuenow` attribute for screen readers
	*/
	formatValueText: {
		type: require_runtime$1.definePropType(Function),
		default: void 0
	},
	/**
	* @description custom class name for the tooltip
	*/
	tooltipClass: {
		type: String,
		default: void 0
	},
	/**
	* @description position of Tooltip
	*/
	placement: {
		type: String,
		values: _popperjs_core.placements,
		default: "top"
	},
	/**
	* @description marks, type of key must be `number` and must in closed interval `[min, max]`, each mark can custom style
	*/
	marks: { type: require_runtime$1.definePropType(Object) },
	/**
	* @description whether to trigger form validation
	*/
	validateEvent: {
		type: Boolean,
		default: true
	},
	/**
	* @description when slider tooltip inactive and `persistent` is `false` , popconfirm will be destroyed. `persistent` always be `false` when `show-tooltip ` is `false`
	*/
	persistent: {
		type: Boolean,
		default: true
	},
	...require_index$1.useAriaProps(["ariaLabel"])
});
const isValidValue = (value) => require_types.isNumber(value) || (0, _vue_shared.isArray)(value) && value.every(require_types.isNumber);
const sliderEmits = {
	[require_event.UPDATE_MODEL_EVENT]: isValidValue,
	[require_event.INPUT_EVENT]: isValidValue,
	[require_event.CHANGE_EVENT]: isValidValue
};
//#endregion
exports.sliderEmits = sliderEmits;
exports.sliderProps = sliderProps;

//# sourceMappingURL=slider.js.map