Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_size = require("../../../constants/size.js");
//#region ../../packages/components/tag/src/tag.ts
/**
* @deprecated Removed after 3.0.0, Use `TagProps` instead.
*/
const tagProps = require("../../../utils/vue/props/runtime.js").buildProps({
	/**
	* @description type of Tag
	*/
	type: {
		type: String,
		values: [
			"primary",
			"success",
			"info",
			"warning",
			"danger"
		],
		default: "primary"
	},
	/**
	* @description whether Tag can be removed
	*/
	closable: Boolean,
	/**
	* @description whether to disable animations
	*/
	disableTransitions: Boolean,
	/**
	* @description whether Tag has a highlighted border
	*/
	hit: Boolean,
	/**
	* @description background color of the Tag
	*/
	color: String,
	/**
	* @description size of Tag
	*/
	size: {
		type: String,
		values: require_size.componentSizes
	},
	/**
	* @description theme of Tag
	*/
	effect: {
		type: String,
		values: [
			"dark",
			"light",
			"plain"
		],
		default: "light"
	},
	/**
	* @description whether Tag is rounded
	*/
	round: Boolean
});
const tagEmits = {
	close: (evt) => evt instanceof MouseEvent,
	click: (evt) => evt instanceof MouseEvent
};
//#endregion
exports.tagEmits = tagEmits;
exports.tagProps = tagProps;

//# sourceMappingURL=tag.js.map