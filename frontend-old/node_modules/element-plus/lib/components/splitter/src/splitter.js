Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region ../../packages/components/splitter/src/splitter.ts
/**
* @deprecated Removed after 3.0.0, Use `SplitterProps` instead.
*/
const splitterProps = require("../../../utils/vue/props/runtime.js").buildProps({
	layout: {
		type: String,
		default: "horizontal",
		values: ["horizontal", "vertical"]
	},
	lazy: Boolean
});
const splitterEmits = {
	resizeStart: (index, sizes) => true,
	resize: (index, sizes) => true,
	resizeEnd: (index, sizes) => true,
	collapse: (index, type, sizes) => true
};
//#endregion
exports.splitterEmits = splitterEmits;
exports.splitterProps = splitterProps;

//# sourceMappingURL=splitter.js.map