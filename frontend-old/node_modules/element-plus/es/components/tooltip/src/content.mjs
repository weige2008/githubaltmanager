import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { useDelayedToggleProps, useDelayedTogglePropsDefaults } from "../../../hooks/use-delayed-toggle/index.mjs";
import { useAriaProps } from "../../../hooks/use-aria/index.mjs";
import { popperContentProps, popperContentPropsDefaults } from "../../popper/src/content.mjs";
//#region ../../packages/components/tooltip/src/content.ts
const useTooltipContentPropsDefaults = {
	...useDelayedTogglePropsDefaults,
	...popperContentPropsDefaults,
	content: "",
	visible: null,
	teleported: true
};
/**
* @deprecated Removed after 3.0.0, Use `ElTooltipContentProps` instead.
*/
const useTooltipContentProps = buildProps({
	...useDelayedToggleProps,
	...popperContentProps,
	/**
	* @description which element the tooltip CONTENT appends to
	*/
	appendTo: { type: definePropType([String, Object]) },
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
		type: definePropType(Boolean),
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
	...useAriaProps(["ariaLabel"])
});
//#endregion
export { useTooltipContentProps, useTooltipContentPropsDefaults };

//# sourceMappingURL=content.mjs.map