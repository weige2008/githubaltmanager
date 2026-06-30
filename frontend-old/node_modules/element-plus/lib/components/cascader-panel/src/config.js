Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_event = require("../../../constants/event.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
let vue = require("vue");
let _vue_shared = require("@vue/shared");
//#region ../../packages/components/cascader-panel/src/config.ts
/**
* @description node height for virtual scrolling
*/
const CASCADER_PANEL_ITEM_SIZE = 34;
/**
* @description menu height for virtual scrolling
*/
const CASCADER_PANEL_HEIGHT = 204;
const CommonProps = require_runtime$1.buildProps({
	/**
	* @description specify which key of node object is used as the node's value
	*/
	modelValue: { type: require_runtime$1.definePropType([
		Number,
		String,
		Array,
		Object
	]) },
	/**
	* @description data of the options, the key of `value` and `label` can be customize by `CascaderProps`.
	*/
	options: {
		type: require_runtime$1.definePropType(Array),
		default: () => []
	},
	/**
	* @description configuration options, see the following `CascaderProps` table.
	*/
	props: {
		type: require_runtime$1.definePropType(Object),
		default: () => ({})
	},
	/**
	* @description whether to enable virtual scrolling
	*/
	virtualScroll: Boolean,
	/**
	* @description node height for virtual scrolling
	*/
	itemSize: {
		type: Number,
		default: 34
	},
	/**
	* @description menu height for virtual scrolling
	*/
	height: {
		type: Number,
		default: 204
	}
});
const DefaultProps = {
	/**
	* @description trigger mode of expanding options
	*/
	expandTrigger: "click",
	/**
	* @description whether multiple selection is enabled
	*/
	multiple: false,
	/**
	* @description whether checked state of a node not affects its parent and child nodes
	*/
	checkStrictly: false,
	/**
	* @description when checked nodes change, whether to emit an array of node's path, if false, only emit the value of node.
	*/
	emitPath: true,
	/**
	* @description whether to dynamic load child nodes, use with `lazyload` attribute
	*/
	lazy: false,
	/**
	* @description method for loading child nodes data, only works when `lazy` is true
	*/
	lazyLoad: _vue_shared.NOOP,
	/**
	* @description specify which key of node object is used as the node's value
	*/
	value: "value",
	/**
	* @description specify which key of node object is used as the node's label
	*/
	label: "label",
	/**
	* @description specify which key of node object is used as the node's children
	*/
	children: "children",
	/**
	* @description specify which key of node object is used as the node's leaf
	*/
	leaf: "leaf",
	/**
	* @description specify which key of node object is used as the node's disabled
	*/
	disabled: "disabled",
	/**
	* @description hover threshold of expanding options
	*/
	hoverThreshold: 500,
	/**
	* @description whether to check or uncheck node when clicking on the node
	*/
	checkOnClickNode: false,
	/**
	* @description whether to check or uncheck node when clicking on leaf node (last children).
	*/
	checkOnClickLeaf: true,
	/**
	* @description whether to show the radio or checkbox prefix
	*/
	showPrefix: true
};
/**
* @deprecated Removed after 3.0.0, Use `CascaderPanelProps` instead.
*/
const cascaderPanelProps = require_runtime$1.buildProps({
	...CommonProps,
	border: {
		type: Boolean,
		default: true
	},
	renderLabel: { type: Function }
});
const emitChangeFn = (value) => true;
const cascaderPanelEmits = {
	[require_event.UPDATE_MODEL_EVENT]: emitChangeFn,
	[require_event.CHANGE_EVENT]: emitChangeFn,
	close: () => true,
	"expand-change": (value) => value
};
const useCascaderConfig = (props) => {
	return (0, vue.computed)(() => ({
		...DefaultProps,
		...props.props
	}));
};
//#endregion
exports.CASCADER_PANEL_HEIGHT = CASCADER_PANEL_HEIGHT;
exports.CASCADER_PANEL_ITEM_SIZE = CASCADER_PANEL_ITEM_SIZE;
exports.CommonProps = CommonProps;
exports.DefaultProps = DefaultProps;
exports.cascaderPanelEmits = cascaderPanelEmits;
exports.cascaderPanelProps = cascaderPanelProps;
exports.useCascaderConfig = useCascaderConfig;

//# sourceMappingURL=config.js.map