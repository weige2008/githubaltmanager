Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region ../../packages/components/splitter/src/split-panel.ts
/**
* @deprecated Removed after 3.0.0, Use `SplitterPanelProps` instead.
*/
const splitterPanelProps = require("../../../utils/vue/props/runtime.js").buildProps({
	min: { type: [String, Number] },
	max: { type: [String, Number] },
	size: { type: [String, Number] },
	resizable: {
		type: Boolean,
		default: true
	},
	collapsible: Boolean
});
const splitterPanelEmits = { "update:size": (value) => typeof value === "number" || typeof value === "string" };
//#endregion
exports.splitterPanelEmits = splitterPanelEmits;
exports.splitterPanelProps = splitterPanelProps;

//# sourceMappingURL=split-panel.js.map