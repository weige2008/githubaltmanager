Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region ../../packages/components/empty/src/empty.ts
/**
* @deprecated Removed after 3.0.0, Use `EmptyProps` instead.
*/
const emptyProps = require("../../../utils/vue/props/runtime.js").buildProps({
	/**
	* @description image URL of empty
	*/
	image: {
		type: String,
		default: ""
	},
	/**
	* @description image size (width) of empty
	*/
	imageSize: Number,
	/**
	* @description description of empty
	*/
	description: {
		type: String,
		default: ""
	}
});
//#endregion
exports.emptyProps = emptyProps;

//# sourceMappingURL=empty.js.map