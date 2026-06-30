Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
require("../../../_virtual/_rolldown/runtime.js");
const require_size = require("../../../constants/size.js");
const require_types = require("../../../utils/types.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
const require_vnode = require("../../../utils/vue/vnode.js");
const require_item = require("./item.js");
const require_use_space = require("./use-space.js");
let vue = require("vue");
let _vue_shared = require("@vue/shared");
//#region ../../packages/components/space/src/space.ts
const spaceProps = require_runtime$1.buildProps({
	/**
	* @description Placement direction
	*/
	direction: {
		type: String,
		values: ["horizontal", "vertical"],
		default: "horizontal"
	},
	/**
	* @description Classname
	*/
	class: {
		type: require_runtime$1.definePropType([
			String,
			Object,
			Array
		]),
		default: ""
	},
	/**
	* @description Extra style rules
	*/
	style: {
		type: require_runtime$1.definePropType([
			String,
			Array,
			Object,
			Boolean
		]),
		default: ""
	},
	/**
	* @description Controls the alignment of items
	*/
	alignment: {
		type: require_runtime$1.definePropType(String),
		default: "center"
	},
	/**
	* @description Prefix for space-items
	*/
	prefixCls: { type: String },
	/**
	* @description Spacer
	*/
	spacer: {
		type: require_runtime$1.definePropType([
			Object,
			String,
			Number,
			Array
		]),
		default: null,
		validator: (val) => (0, vue.isVNode)(val) || require_types.isNumber(val) || (0, _vue_shared.isString)(val)
	},
	/**
	* @description Auto wrapping
	*/
	wrap: Boolean,
	/**
	* @description Whether to fill the container
	*/
	fill: Boolean,
	/**
	* @description Ratio of fill
	*/
	fillRatio: {
		type: Number,
		default: 100
	},
	/**
	* @description Spacing size
	*/
	size: {
		type: [
			String,
			Array,
			Number
		],
		values: require_size.componentSizes,
		validator: (val) => {
			return require_types.isNumber(val) || (0, _vue_shared.isArray)(val) && val.length === 2 && val.every(require_types.isNumber);
		}
	}
});
const Space = (0, vue.defineComponent)({
	name: "ElSpace",
	props: spaceProps,
	setup(props, { slots }) {
		const { classes, containerStyle, itemStyle } = require_use_space.useSpace(props);
		function extractChildren(children, parentKey = "", extractedChildren = []) {
			const { prefixCls } = props;
			children.forEach((child, loopKey) => {
				if (require_vnode.isFragment(child)) {
					if ((0, _vue_shared.isArray)(child.children)) child.children.forEach((nested, key) => {
						if (require_vnode.isFragment(nested) && (0, _vue_shared.isArray)(nested.children)) extractChildren(nested.children, `${parentKey + key}-`, extractedChildren);
						else if ((0, vue.isVNode)(nested) && nested?.type === vue.Comment) extractedChildren.push(nested);
						else extractedChildren.push((0, vue.createVNode)(require_item.default, {
							style: itemStyle.value,
							prefixCls,
							key: `nested-${parentKey + key}`
						}, { default: () => [nested] }, 12, ["style", "prefixCls"]));
					});
				} else if (require_vnode.isValidElementNode(child)) extractedChildren.push((0, vue.createVNode)(require_item.default, {
					style: itemStyle.value,
					prefixCls,
					key: `LoopKey${parentKey + loopKey}`
				}, { default: () => [child] }, 12, ["style", "prefixCls"]));
			});
			return extractedChildren;
		}
		return () => {
			const { spacer, direction } = props;
			const children = (0, vue.renderSlot)(slots, "default", { key: 0 }, () => []);
			if ((children.children ?? []).length === 0) return null;
			if ((0, _vue_shared.isArray)(children.children)) {
				let extractedChildren = extractChildren(children.children);
				if (spacer) {
					const len = extractedChildren.length - 1;
					extractedChildren = extractedChildren.reduce((acc, child, idx) => {
						const children = [...acc, child];
						if (idx !== len) children.push((0, vue.createVNode)("span", {
							style: [itemStyle.value, direction === "vertical" ? "width: 100%" : null],
							key: idx
						}, [(0, vue.isVNode)(spacer) ? spacer : (0, vue.createTextVNode)(spacer, 1)], 4));
						return children;
					}, []);
				}
				return (0, vue.createVNode)("div", {
					class: classes.value,
					style: containerStyle.value
				}, extractedChildren, 6);
			}
			return children.children;
		};
	}
});
//#endregion
exports.default = Space;
exports.spaceProps = spaceProps;

//# sourceMappingURL=space.js.map