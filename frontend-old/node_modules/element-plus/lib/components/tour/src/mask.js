Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_runtime = require("../../../utils/vue/props/runtime.js");
//#region ../../packages/components/tour/src/mask.ts
/**
* @deprecated Removed after 3.0.0, Use `MaskProps` instead.
*/
const maskProps = require_runtime.buildProps({
	/**
	* @description mask's zIndex
	*/
	zIndex: {
		type: Number,
		default: 1001
	},
	/**
	* @description whether to show the mask
	*/
	visible: Boolean,
	/**
	* @description mask's fill
	*/
	fill: {
		type: String,
		default: "rgba(0,0,0,0.5)"
	},
	/***
	* @description mask's transparent space position
	*/
	pos: { type: require_runtime.definePropType(Object) },
	/**
	* @description whether the target element can be clickable, when using mask
	*/
	targetAreaClickable: {
		type: Boolean,
		default: true
	}
});
//#endregion
exports.maskProps = maskProps;

//# sourceMappingURL=mask.js.map