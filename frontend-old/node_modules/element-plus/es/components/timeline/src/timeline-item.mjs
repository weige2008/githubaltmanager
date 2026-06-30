import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
//#region ../../packages/components/timeline/src/timeline-item.ts
/**
* @deprecated Removed after 3.0.0, Use `TimelineItemProps` instead.
*/
const timelineItemProps = buildProps({
	/**
	* @description timestamp content
	*/
	timestamp: {
		type: String,
		default: ""
	},
	/**
	* @description whether to show timestamp
	*/
	hideTimestamp: Boolean,
	/**
	* @description whether vertically centered
	*/
	center: Boolean,
	/**
	* @description position of timestamp
	*/
	placement: {
		type: String,
		values: ["top", "bottom"],
		default: "bottom"
	},
	/**
	* @description node type
	*/
	type: {
		type: String,
		values: [
			"primary",
			"success",
			"warning",
			"danger",
			"info"
		],
		default: ""
	},
	/**
	* @description background color of node
	*/
	color: {
		type: String,
		default: ""
	},
	/**
	* @description node size
	*/
	size: {
		type: String,
		values: ["normal", "large"],
		default: "normal"
	},
	/**
	* @description icon component
	*/
	icon: { type: iconPropType },
	/**
	* @description icon is hollow
	*/
	hollow: Boolean
});
//#endregion
export { timelineItemProps };

//# sourceMappingURL=timeline-item.mjs.map