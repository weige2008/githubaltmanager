Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_runtime = require("../../../utils/vue/props/runtime.js");
//#region ../../packages/components/card/src/card.ts
/**
* @deprecated Removed after 3.0.0, Use `CardProps` instead.
*/
const cardProps = require_runtime.buildProps({
	/**
	* @description title of the card. Also accepts a DOM passed by `slot#header`
	*/
	header: {
		type: String,
		default: ""
	},
	/**
	* @description content of footer. Also accepts a DOM passed by `slot#footer`
	*/
	footer: {
		type: String,
		default: ""
	},
	/**
	* @description CSS style of card body
	*/
	bodyStyle: {
		type: require_runtime.definePropType([
			String,
			Object,
			Array,
			Boolean
		]),
		default: ""
	},
	/**
	* @description custom class name of card footer
	*/
	headerClass: String,
	/**
	* @description custom class name of card body
	*/
	bodyClass: String,
	/**
	* @description custom class name of card footer
	*/
	footerClass: String,
	/**
	* @description when to show card shadows
	*/
	shadow: {
		type: String,
		values: [
			"always",
			"hover",
			"never"
		],
		default: void 0
	}
});
const cardContextKey = Symbol("cardContextKey");
//#endregion
exports.cardContextKey = cardContextKey;
exports.cardProps = cardProps;

//# sourceMappingURL=card.js.map