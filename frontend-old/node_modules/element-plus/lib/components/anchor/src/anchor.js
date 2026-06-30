Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_types = require("../../../utils/types.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
let _vue_shared = require("@vue/shared");
//#region ../../packages/components/anchor/src/anchor.ts
/**
* @deprecated Removed after 3.0.0, Use `AnchorProps` instead.
*/
const anchorProps = require_runtime$1.buildProps({
	/**
	* @description scroll container
	*/
	container: { type: require_runtime$1.definePropType([String, Object]) },
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
		type: require_runtime$1.definePropType(String),
		default: "default"
	},
	/**
	* @description Set Anchor direction
	*/
	direction: {
		type: require_runtime$1.definePropType(String),
		default: "vertical"
	},
	/**
	* @description Scroll whether link is selected at the top
	*/
	selectScrollTop: Boolean
});
const anchorEmits = {
	change: (href) => (0, _vue_shared.isString)(href),
	click: (e, href) => e instanceof MouseEvent && ((0, _vue_shared.isString)(href) || require_types.isUndefined(href))
};
//#endregion
exports.anchorEmits = anchorEmits;
exports.anchorProps = anchorProps;

//# sourceMappingURL=anchor.js.map