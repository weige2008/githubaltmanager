Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_types = require("../../../utils/types.js");
//#region ../../packages/components/carousel/src/carousel.ts
/**
* @deprecated Removed after 3.0.0, Use `CarouselProps` instead.
*/
const carouselProps = require("../../../utils/vue/props/runtime.js").buildProps({
	/**
	* @description index of the initially active slide (starting from 0)
	*/
	initialIndex: {
		type: Number,
		default: 0
	},
	/**
	* @description height of the carousel
	*/
	height: {
		type: String,
		default: ""
	},
	/**
	* @description how indicators are triggered
	*/
	trigger: {
		type: String,
		values: ["hover", "click"],
		default: "hover"
	},
	/**
	* @description whether automatically loop the slides
	*/
	autoplay: {
		type: Boolean,
		default: true
	},
	/**
	* @description interval of the auto loop, in milliseconds
	*/
	interval: {
		type: Number,
		default: 3e3
	},
	/**
	* @description position of the indicators
	*/
	indicatorPosition: {
		type: String,
		values: [
			"",
			"none",
			"outside"
		],
		default: ""
	},
	/**
	* @description when arrows are shown
	*/
	arrow: {
		type: String,
		values: [
			"always",
			"hover",
			"never"
		],
		default: "hover"
	},
	/**
	* @description type of the Carousel
	*/
	type: {
		type: String,
		values: ["", "card"],
		default: ""
	},
	/**
	* @description when type is card, scaled size of secondary cards
	*/
	cardScale: {
		type: Number,
		default: .83
	},
	/**
	* @description display the items in loop
	*/
	loop: {
		type: Boolean,
		default: true
	},
	/**
	* @description display direction
	*/
	direction: {
		type: String,
		values: ["horizontal", "vertical"],
		default: "horizontal"
	},
	/**
	* @description pause autoplay when hover
	*/
	pauseOnHover: {
		type: Boolean,
		default: true
	},
	/**
	* @description infuse dynamism and smoothness into the carousel
	*/
	motionBlur: Boolean
});
const carouselEmits = { 
/**
* @description triggers when the active slide switches
* @param current index of the new active slide
* @param prev index of the old active slide
*/
change: (current, prev) => [current, prev].every(require_types.isNumber) };
//#endregion
exports.carouselEmits = carouselEmits;
exports.carouselProps = carouselProps;

//# sourceMappingURL=carousel.js.map