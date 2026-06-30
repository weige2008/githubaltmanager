import { UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isBoolean, isNumber } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { tourContentProps } from "./content.mjs";
//#region ../../packages/components/tour/src/tour.ts
/**
* @deprecated Removed after 3.0.0, Use `TourProps` instead.
*/
const tourProps = buildProps({
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
	closeIcon: { type: iconPropType },
	/**
	* @description position of the guide card relative to the target element
	*/
	placement: tourContentProps.placement,
	/**
	* @description custom style for content
	*/
	contentStyle: { type: definePropType([Object]) },
	/**
	* @description whether to enable masking, change mask style and fill color by pass custom props
	*/
	mask: {
		type: definePropType([Boolean, Object]),
		default: true
	},
	/**
	* @description transparent gap between mask and target
	*/
	gap: {
		type: definePropType(Object),
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
		type: definePropType([Boolean, Object]),
		default: () => ({ block: "center" })
	},
	/**
	* @description type, affects the background color and text color
	*/
	type: { type: definePropType(String) },
	/**
	* @description which element the TourContent appends to
	*/
	appendTo: {
		type: definePropType([String, Object]),
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
	[UPDATE_MODEL_EVENT]: (value) => isBoolean(value),
	["update:current"]: (current) => isNumber(current),
	close: (current) => isNumber(current),
	finish: () => true,
	change: (current) => isNumber(current)
};
//#endregion
export { tourEmits, tourProps };

//# sourceMappingURL=tour.mjs.map