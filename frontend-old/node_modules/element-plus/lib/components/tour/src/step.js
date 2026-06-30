Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_runtime = require("../../../utils/vue/props/runtime.js");
const require_icon = require("../../../utils/vue/icon.js");
const require_content = require("./content.js");
//#region ../../packages/components/tour/src/step.ts
/**
* @deprecated Removed after 3.0.0, Use `TourStepProps` instead.
*/
const tourStepProps = require_runtime.buildProps({
	/**
	* @description get the element the guide card points to. empty makes it show in center of screen
	*/
	target: { type: require_runtime.definePropType([
		String,
		Object,
		Function
	]) },
	/**
	* @description the title of the tour content
	*/
	title: String,
	/**
	* @description description
	*/
	description: String,
	/**
	* @description whether to show a close button
	*/
	showClose: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description custom close icon, default is Close
	*/
	closeIcon: { type: require_icon.iconPropType },
	/**
	* @description whether to show the arrow
	*/
	showArrow: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description position of the guide card relative to the target element
	*/
	placement: require_content.tourContentProps.placement,
	/**
	* @description whether to enable masking, change mask style and fill color by pass custom props
	*/
	mask: {
		type: require_runtime.definePropType([Boolean, Object]),
		default: void 0
	},
	/**
	* @description custom style for content
	*/
	contentStyle: { type: require_runtime.definePropType([Object]) },
	/**
	* @description properties of the previous button
	*/
	prevButtonProps: { type: require_runtime.definePropType(Object) },
	/**
	* @description properties of the Next button
	*/
	nextButtonProps: { type: require_runtime.definePropType(Object) },
	/**
	* @description support pass custom scrollIntoView options
	*/
	scrollIntoViewOptions: {
		type: require_runtime.definePropType([Boolean, Object]),
		default: void 0
	},
	/**
	* @description type, affects the background color and text color
	*/
	type: { type: require_runtime.definePropType(String) }
});
const tourStepEmits = { close: () => true };
//#endregion
exports.tourStepEmits = tourStepEmits;
exports.tourStepProps = tourStepProps;

//# sourceMappingURL=step.js.map