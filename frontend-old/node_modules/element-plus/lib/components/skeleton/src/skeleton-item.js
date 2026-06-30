Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region ../../packages/components/skeleton/src/skeleton-item.ts
/**
* @deprecated Removed after 3.0.0, Use `SkeletonItemProps` instead.
*/
const skeletonItemProps = require("../../../utils/vue/props/runtime.js").buildProps({ 
/**
* @description the current rendering skeleton type
*/
variant: {
	type: String,
	values: [
		"circle",
		"rect",
		"h1",
		"h3",
		"text",
		"caption",
		"p",
		"image",
		"button"
	],
	default: "text"
} });
//#endregion
exports.skeletonItemProps = skeletonItemProps;

//# sourceMappingURL=skeleton-item.js.map