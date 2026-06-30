require("../../../../_virtual/_rolldown/runtime.js");
const require_index = require("../../../icon/index.js");
require("../constants.js");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
//#region ../../packages/components/table-v2/src/components/sort-icon.tsx
const SortIcon = (props) => {
	const { sortOrder } = props;
	return (0, vue.createVNode)("button", {
		"type": "button",
		"aria-label": props.ariaLabel,
		"class": props.class
	}, [(0, vue.createVNode)(require_index.ElIcon, { "size": 14 }, { default: () => [sortOrder === "asc" ? (0, vue.createVNode)(_element_plus_icons_vue.SortUp, null, null) : (0, vue.createVNode)(_element_plus_icons_vue.SortDown, null, null)] })]);
};
//#endregion
exports.default = SortIcon;

//# sourceMappingURL=sort-icon.js.map