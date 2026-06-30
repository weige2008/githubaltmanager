Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_runtime = require("../../../utils/vue/props/runtime.js");
const require_index = require("../../../hooks/use-delayed-toggle/index.js");
const require_index$1 = require("../../../hooks/use-aria/index.js");
const require_content = require("../../popper/src/content.js");
//#region ../../packages/components/tooltip/src/content.ts
const useTooltipContentPropsDefaults = {
	...require_index.useDelayedTogglePropsDefaults,
	...require_content.popperContentPropsDefaults,
	content: "",
	visible: null,
	teleported: true
};
/**
* @deprecated Removed after 3.0.0, Use `ElTooltipContentProps` instead.
*/
const useTooltipContentProps = require_runtime.buildProps({
	...require_index.useDelayedToggleProps,
	...require_content.popperContentProps,
	/**
	* @description which element the tooltip CONTENT appends to
	*/
	appendTo: { type: require_runtime.definePropType([String, Object]) },
	/**
	* @description display content, can be overridden by `slot#content`
	*/
	content: {
		type: String,
		default: ""
	},
	/**
	* @description whether `content` is treated as HTML string
	*/
	rawContent: Boolean,
	/**
	* @description when tooltip inactive and `persistent` is `false` , popconfirm will be destroyed
	*/
	persistent: Boolean,
	/**
	* @description visibility of Tooltip
	*/
	visible: {
		type: require_runtime.definePropType(Boolean),
		default: null
	},
	/**
	* @description animation name
	*/
	transition: String,
	/**
	* @description whether tooltip content is teleported, if `true` it will be teleported to where `append-to` sets
	*/
	teleported: {
		type: Boolean,
		default: true
	},
	/**
	* @description whether Tooltip is disabled
	*/
	disabled: Boolean,
	...require_index$1.useAriaProps(["ariaLabel"])
});
//#endregion
exports.useTooltipContentProps = useTooltipContentProps;
exports.useTooltipContentPropsDefaults = useTooltipContentPropsDefaults;

//# sourceMappingURL=content.js.map