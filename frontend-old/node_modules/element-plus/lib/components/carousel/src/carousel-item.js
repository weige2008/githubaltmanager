Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region ../../packages/components/carousel/src/carousel-item.ts
/**
* @deprecated Removed after 3.0.0, Use `CarouselItemProps` instead.
*/
const carouselItemProps = require("../../../utils/vue/props/runtime.js").buildProps({
	/**
	* @description name of the item, can be used in `setActiveItem`
	*/
	name: {
		type: String,
		default: ""
	},
	/**
	* @description text content for the corresponding indicator
	*/
	label: {
		type: [String, Number],
		default: ""
	}
});
//#endregion
exports.carouselItemProps = carouselItemProps;

//# sourceMappingURL=carousel-item.js.map