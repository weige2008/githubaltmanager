import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isArray, isNumber } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { useAriaProps } from "../../../hooks/use-aria/index.mjs";
import { placements } from "@popperjs/core";
//#region ../../packages/components/slider/src/slider.ts
const sliderProps = buildProps({
	/**
	* @description binding value
	*/
	modelValue: {
		type: definePropType([Number, Array]),
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
		type: definePropType([Number, String]),
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
	size: useSizeProp,
	/**
	* @description size of the input box, when set `size`, the default is the value of `size`
	*/
	inputSize: useSizeProp,
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
		type: definePropType(Function),
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
		type: definePropType(Function),
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
		values: placements,
		default: "top"
	},
	/**
	* @description marks, type of key must be `number` and must in closed interval `[min, max]`, each mark can custom style
	*/
	marks: { type: definePropType(Object) },
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
	...useAriaProps(["ariaLabel"])
});
const isValidValue = (value) => isNumber(value) || isArray(value) && value.every(isNumber);
const sliderEmits = {
	[UPDATE_MODEL_EVENT]: isValidValue,
	[INPUT_EVENT]: isValidValue,
	[CHANGE_EVENT]: isValidValue
};
//#endregion
export { sliderEmits, sliderProps };

//# sourceMappingURL=slider.mjs.map