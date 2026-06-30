import { componentSizes } from "../../../constants/size.mjs";
import { isArray, isNumber, isString } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { isFragment, isValidElementNode } from "../../../utils/vue/vnode.mjs";
import SpaceItem from "./item.mjs";
import { useSpace } from "./use-space.mjs";
import { Comment, createTextVNode, createVNode, defineComponent, isVNode, renderSlot } from "vue";
//#region ../../packages/components/space/src/space.ts
const spaceProps = buildProps({
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
		type: definePropType([
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
		type: definePropType([
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
		type: definePropType(String),
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
		type: definePropType([
			Object,
			String,
			Number,
			Array
		]),
		default: null,
		validator: (val) => isVNode(val) || isNumber(val) || isString(val)
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
		values: componentSizes,
		validator: (val) => {
			return isNumber(val) || isArray(val) && val.length === 2 && val.every(isNumber);
		}
	}
});
const Space = defineComponent({
	name: "ElSpace",
	props: spaceProps,
	setup(props, { slots }) {
		const { classes, containerStyle, itemStyle } = useSpace(props);
		function extractChildren(children, parentKey = "", extractedChildren = []) {
			const { prefixCls } = props;
			children.forEach((child, loopKey) => {
				if (isFragment(child)) {
					if (isArray(child.children)) child.children.forEach((nested, key) => {
						if (isFragment(nested) && isArray(nested.children)) extractChildren(nested.children, `${parentKey + key}-`, extractedChildren);
						else if (isVNode(nested) && nested?.type === Comment) extractedChildren.push(nested);
						else extractedChildren.push(createVNode(SpaceItem, {
							style: itemStyle.value,
							prefixCls,
							key: `nested-${parentKey + key}`
						}, { default: () => [nested] }, 12, ["style", "prefixCls"]));
					});
				} else if (isValidElementNode(child)) extractedChildren.push(createVNode(SpaceItem, {
					style: itemStyle.value,
					prefixCls,
					key: `LoopKey${parentKey + loopKey}`
				}, { default: () => [child] }, 12, ["style", "prefixCls"]));
			});
			return extractedChildren;
		}
		return () => {
			const { spacer, direction } = props;
			const children = renderSlot(slots, "default", { key: 0 }, () => []);
			if ((children.children ?? []).length === 0) return null;
			if (isArray(children.children)) {
				let extractedChildren = extractChildren(children.children);
				if (spacer) {
					const len = extractedChildren.length - 1;
					extractedChildren = extractedChildren.reduce((acc, child, idx) => {
						const children = [...acc, child];
						if (idx !== len) children.push(createVNode("span", {
							style: [itemStyle.value, direction === "vertical" ? "width: 100%" : null],
							key: idx
						}, [isVNode(spacer) ? spacer : createTextVNode(spacer, 1)], 4));
						return children;
					}, []);
				}
				return createVNode("div", {
					class: classes.value,
					style: containerStyle.value
				}, extractedChildren, 6);
			}
			return children.children;
		};
	}
});
//#endregion
export { Space as default, spaceProps };

//# sourceMappingURL=space.mjs.map