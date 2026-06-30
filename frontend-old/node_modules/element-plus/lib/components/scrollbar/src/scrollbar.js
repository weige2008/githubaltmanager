Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_types = require("../../../utils/types.js");
const require_runtime = require("../../../utils/vue/props/runtime.js");
const require_index = require("../../../hooks/use-aria/index.js");
//#region ../../packages/components/scrollbar/src/scrollbar.ts
/**
* @deprecated Removed after 3.0.0, Use `ScrollbarProps` instead.
*/
const scrollbarProps = require_runtime.buildProps({
	/**
	* @description trigger distance(px)
	*/
	distance: {
		type: Number,
		default: 0
	},
	/**
	* @description height of scrollbar
	*/
	height: {
		type: [String, Number],
		default: ""
	},
	/**
	* @description max height of scrollbar
	*/
	maxHeight: {
		type: [String, Number],
		default: ""
	},
	/**
	* @description whether to use the native scrollbar
	*/
	native: Boolean,
	/**
	* @description style of wrap
	*/
	wrapStyle: {
		type: require_runtime.definePropType([
			String,
			Object,
			Array,
			Boolean
		]),
		default: ""
	},
	/**
	* @description class of wrap
	*/
	wrapClass: {
		type: [String, Array],
		default: ""
	},
	/**
	* @description class of view
	*/
	viewClass: {
		type: [String, Array],
		default: ""
	},
	/**
	* @description style of view
	*/
	viewStyle: {
		type: require_runtime.definePropType([
			String,
			Object,
			Array,
			Boolean
		]),
		default: ""
	},
	/**
	* @description do not respond to container size changes, if the container size does not change, it is better to set it to optimize performance
	*/
	noresize: Boolean,
	/**
	* @description element tag of the view
	*/
	tag: {
		type: String,
		default: "div"
	},
	/**
	* @description always show
	*/
	always: Boolean,
	/**
	* @description minimum size of scrollbar
	*/
	minSize: {
		type: Number,
		default: 20
	},
	/**
	* @description Wrap tabindex
	*/
	tabindex: {
		type: [String, Number],
		default: void 0
	},
	/**
	* @description id of view
	*/
	id: String,
	/**
	* @description role of view
	*/
	role: String,
	...require_index.useAriaProps(["ariaLabel", "ariaOrientation"])
});
const scrollbarEmits = {
	"end-reached": (direction) => [
		"left",
		"right",
		"top",
		"bottom"
	].includes(direction),
	scroll: ({ scrollTop, scrollLeft }) => [scrollTop, scrollLeft].every(require_types.isNumber)
};
//#endregion
exports.scrollbarEmits = scrollbarEmits;
exports.scrollbarProps = scrollbarProps;

//# sourceMappingURL=scrollbar.js.map