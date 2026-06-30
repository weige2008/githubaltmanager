Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_event = require("../../../constants/event.js");
const require_types = require("../../../utils/types.js");
//#region ../../packages/components/steps/src/steps.ts
/**
* @deprecated Removed after 3.0.0, Use `StepsProps` instead.
*/
const stepsProps = require("../../../utils/vue/props/runtime.js").buildProps({
	/**
	* @description the spacing of each step, will be responsive if omitted. Supports percentage.
	*/
	space: {
		type: [Number, String],
		default: ""
	},
	/**
	* @description current activation step
	*/
	active: {
		type: Number,
		default: 0
	},
	/**
	* @description display direction
	*/
	direction: {
		type: String,
		default: "horizontal",
		values: ["horizontal", "vertical"]
	},
	/**
	* @description center title and description
	*/
	alignCenter: { type: Boolean },
	/**
	* @description whether to apply simple theme
	*/
	simple: { type: Boolean },
	/**
	* @description status of end step
	*/
	finishStatus: {
		type: String,
		values: [
			"wait",
			"process",
			"finish",
			"error",
			"success"
		],
		default: "finish"
	},
	/**
	* @description status of current step
	*/
	processStatus: {
		type: String,
		values: [
			"wait",
			"process",
			"finish",
			"error",
			"success"
		],
		default: "process"
	}
});
const stepsEmits = { [require_event.CHANGE_EVENT]: (newVal, oldVal) => [newVal, oldVal].every(require_types.isNumber) };
//#endregion
exports.stepsEmits = stepsEmits;
exports.stepsProps = stepsProps;

//# sourceMappingURL=steps.js.map