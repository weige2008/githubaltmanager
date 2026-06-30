Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_runtime = require("../../../utils/vue/props/runtime.js");
//#region ../../packages/components/progress/src/progress.ts
/**
* @deprecated Removed after 3.0.0, Use `ProgressProps` instead.
*/
const progressProps = require_runtime.buildProps({
	/**
	* @description type of progress bar
	*/
	type: {
		type: String,
		default: "line",
		values: [
			"line",
			"circle",
			"dashboard"
		]
	},
	/**
	* @description percentage, required
	*/
	percentage: {
		type: Number,
		default: 0,
		validator: (val) => val >= 0 && val <= 100
	},
	/**
	* @description the current status of progress bar
	*/
	status: {
		type: String,
		default: "",
		values: [
			"",
			"success",
			"exception",
			"warning"
		]
	},
	/**
	* @description set indeterminate progress
	*/
	indeterminate: Boolean,
	/**
	* @description control the animation duration of indeterminate progress or striped flow progress
	*/
	duration: {
		type: Number,
		default: 3
	},
	/**
	* @description the width of progress bar
	*/
	strokeWidth: {
		type: Number,
		default: 6
	},
	/**
	* @description butt/circle/dashboard type shape at the end path
	*/
	strokeLinecap: {
		type: require_runtime.definePropType(String),
		default: "round"
	},
	/**
	* @description whether to place the percentage inside progress bar, only works when `type` is 'line'
	*/
	textInside: Boolean,
	/**
	* @description the canvas width of circle progress bar
	*/
	width: {
		type: Number,
		default: 126
	},
	/**
	* @description whether to show percentage
	*/
	showText: {
		type: Boolean,
		default: true
	},
	/**
	* @description background color of progress bar. Overrides `status` prop
	*/
	color: {
		type: require_runtime.definePropType([
			String,
			Array,
			Function
		]),
		default: ""
	},
	/**
	* @description stripe over the progress bar's color
	*/
	striped: Boolean,
	/**
	* @description get the stripes to flow
	*/
	stripedFlow: Boolean,
	/**
	* @description custom text format
	*/
	format: {
		type: require_runtime.definePropType(Function),
		default: (percentage) => `${percentage}%`
	}
});
//#endregion
exports.progressProps = progressProps;

//# sourceMappingURL=progress.js.map