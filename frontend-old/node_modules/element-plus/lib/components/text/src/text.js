Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_size = require("../../../constants/size.js");
//#region ../../packages/components/text/src/text.ts
/**
* @deprecated Removed after 3.0.0, Use `TextProps` instead.
*/
const textProps = require("../../../utils/vue/props/runtime.js").buildProps({
	/**
	* @description text type
	*/
	type: {
		type: String,
		values: [
			"primary",
			"success",
			"info",
			"warning",
			"danger",
			""
		],
		default: ""
	},
	/**
	* @description text size
	*/
	size: {
		type: String,
		values: require_size.componentSizes,
		default: ""
	},
	/**
	* @description render ellipsis
	*/
	truncated: Boolean,
	/**
	* @description maximum lines
	*/
	lineClamp: { type: [String, Number] },
	/**
	* @description custom element tag
	*/
	tag: {
		type: String,
		default: "span"
	}
});
//#endregion
exports.textProps = textProps;

//# sourceMappingURL=text.js.map