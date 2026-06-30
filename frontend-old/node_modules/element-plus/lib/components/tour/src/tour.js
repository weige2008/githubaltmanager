Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_event = require("../../../constants/event.js");
const require_types = require("../../../utils/types.js");
const require_runtime = require("../../../utils/vue/props/runtime.js");
const require_icon = require("../../../utils/vue/icon.js");
const require_content = require("./content.js");
//#region ../../packages/components/tour/src/tour.ts
/**
* @deprecated Removed after 3.0.0, Use `TourProps` instead.
*/
const tourProps = require_runtime.buildProps({
	/**
	* @description open tour
	*/
	modelValue: Boolean,
	/**
	* @description what is the current step
	*/
	current: { type: Number },
	/**
	* @description whether to show the arrow
	*/
	showArrow: {
		type: Boolean,
		default: true
	},
	/**
	* @description whether to show a close button
	*/
	showClose: {
		type: Boolean,
		default: true
	},
	/**
	* @description custom close icon
	*/
	closeIcon: { type: require_icon.iconPropType },
	/**
	* @description position of the guide card relative to the target element
	*/
	placement: require_content.tourContentProps.placement,
	/**
	* @description custom style for content
	*/
	contentStyle: { type: require_runtime.definePropType([Object]) },
	/**
	* @description whether to enable masking, change mask style and fill color by pass custom props
	*/
	mask: {
		type: require_runtime.definePropType([Boolean, Object]),
		default: true
	},
	/**
	* @description transparent gap between mask and target
	*/
	gap: {
		type: require_runtime.definePropType(Object),
		default: () => ({
			offset: 6,
			radius: 2
		})
	},
	/**
	* @description tour's zIndex
	*/
	zIndex: { type: Number },
	/**
	* @description support pass custom scrollIntoView options
	*/
	scrollIntoViewOptions: {
		type: require_runtime.definePropType([Boolean, Object]),
		default: () => ({ block: "center" })
	},
	/**
	* @description type, affects the background color and text color
	*/
	type: { type: require_runtime.definePropType(String) },
	/**
	* @description which element the TourContent appends to
	*/
	appendTo: {
		type: require_runtime.definePropType([String, Object]),
		default: "body"
	},
	/**
	* @description whether the Tour can be closed by pressing ESC
	*/
	closeOnPressEscape: {
		type: Boolean,
		default: true
	},
	/**
	* @description whether the target element can be clickable, when using mask
	*/
	targetAreaClickable: {
		type: Boolean,
		default: true
	}
});
const tourEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (value) => require_types.isBoolean(value),
	["update:current"]: (current) => require_types.isNumber(current),
	close: (current) => require_types.isNumber(current),
	finish: () => true,
	change: (current) => require_types.isNumber(current)
};
//#endregion
exports.tourEmits = tourEmits;
exports.tourProps = tourProps;

//# sourceMappingURL=tour.js.map