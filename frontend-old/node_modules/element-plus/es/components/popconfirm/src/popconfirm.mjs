import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { useTooltipContentProps } from "../../tooltip/src/content.mjs";
import { useTooltipTriggerProps } from "../../tooltip/src/trigger.mjs";
import { buttonTypes } from "../../button/src/button.mjs";
import { QuestionFilled } from "@element-plus/icons-vue";
//#region ../../packages/components/popconfirm/src/popconfirm.ts
/**
* @deprecated Removed after 3.0.0, Use `PopconfirmProps` instead.
*/
const popconfirmProps = buildProps({
	/**
	* @description Title
	*/
	title: String,
	/**
	* @description Confirm button text
	*/
	confirmButtonText: String,
	/**
	* @description Cancel button text
	*/
	cancelButtonText: String,
	/**
	* @description Confirm button type
	*/
	confirmButtonType: {
		type: String,
		values: buttonTypes,
		default: "primary"
	},
	/**
	* @description Cancel button type
	*/
	cancelButtonType: {
		type: String,
		values: buttonTypes,
		default: "text"
	},
	/**
	* @description Icon Component
	*/
	icon: {
		type: iconPropType,
		default: () => QuestionFilled
	},
	/**
	* @description Icon color
	*/
	iconColor: {
		type: String,
		default: "#f90"
	},
	/**
	* @description is hide Icon
	*/
	hideIcon: Boolean,
	/**
	* @description delay of disappear, in millisecond
	*/
	hideAfter: {
		type: Number,
		default: 200
	},
	/**
	* @description Tooltip theme, built-in theme: `dark` / `light`
	*/
	effect: {
		...useTooltipContentProps.effect,
		default: "light"
	},
	/**
	* @description whether popconfirm is teleported to the body
	*/
	teleported: useTooltipContentProps.teleported,
	/**
	* @description when popconfirm inactive and `persistent` is `false` , popconfirm will be destroyed
	*/
	persistent: useTooltipContentProps.persistent,
	/**
	* @description popconfirm width, min width 150px
	*/
	width: {
		type: [String, Number],
		default: 150
	},
	virtualTriggering: useTooltipTriggerProps.virtualTriggering,
	virtualRef: useTooltipTriggerProps.virtualRef
});
const popconfirmEmits = {
	/**
	* @description triggers when click confirm button
	*/
	confirm: (e) => e instanceof MouseEvent,
	/**
	* @description triggers when click cancel button
	*/
	cancel: (e) => e instanceof MouseEvent
};
//#endregion
export { popconfirmEmits, popconfirmProps };

//# sourceMappingURL=popconfirm.mjs.map