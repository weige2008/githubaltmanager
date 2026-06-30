import { isString, isUndefined } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
//#region ../../packages/components/anchor/src/anchor.ts
/**
* @deprecated Removed after 3.0.0, Use `AnchorProps` instead.
*/
const anchorProps = buildProps({
	/**
	* @description scroll container
	*/
	container: { type: definePropType([String, Object]) },
	/**
	* @description Set the offset of the anchor scroll
	*/
	offset: {
		type: Number,
		default: 0
	},
	/**
	* @description The offset of the element starting to trigger the anchor
	*/
	bound: {
		type: Number,
		default: 15
	},
	/**
	* @description Set the scroll duration of the container when the anchor is clicked, in milliseconds
	*/
	duration: {
		type: Number,
		default: 300
	},
	/**
	* @description Whether to show the marker
	*/
	marker: {
		type: Boolean,
		default: true
	},
	/**
	* @description Set Anchor type
	*/
	type: {
		type: definePropType(String),
		default: "default"
	},
	/**
	* @description Set Anchor direction
	*/
	direction: {
		type: definePropType(String),
		default: "vertical"
	},
	/**
	* @description Scroll whether link is selected at the top
	*/
	selectScrollTop: Boolean
});
const anchorEmits = {
	change: (href) => isString(href),
	click: (e, href) => e instanceof MouseEvent && (isString(href) || isUndefined(href))
};
//#endregion
export { anchorEmits, anchorProps };

//# sourceMappingURL=anchor.mjs.map