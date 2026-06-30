import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { tourContentProps } from "./content.mjs";
//#region ../../packages/components/tour/src/step.ts
/**
* @deprecated Removed after 3.0.0, Use `TourStepProps` instead.
*/
const tourStepProps = buildProps({
	/**
	* @description get the element the guide card points to. empty makes it show in center of screen
	*/
	target: { type: definePropType([
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
	closeIcon: { type: iconPropType },
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
	placement: tourContentProps.placement,
	/**
	* @description whether to enable masking, change mask style and fill color by pass custom props
	*/
	mask: {
		type: definePropType([Boolean, Object]),
		default: void 0
	},
	/**
	* @description custom style for content
	*/
	contentStyle: { type: definePropType([Object]) },
	/**
	* @description properties of the previous button
	*/
	prevButtonProps: { type: definePropType(Object) },
	/**
	* @description properties of the Next button
	*/
	nextButtonProps: { type: definePropType(Object) },
	/**
	* @description support pass custom scrollIntoView options
	*/
	scrollIntoViewOptions: {
		type: definePropType([Boolean, Object]),
		default: void 0
	},
	/**
	* @description type, affects the background color and text color
	*/
	type: { type: definePropType(String) }
});
const tourStepEmits = { close: () => true };
//#endregion
export { tourStepEmits, tourStepProps };

//# sourceMappingURL=step.mjs.map