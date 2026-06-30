Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
const require_icon = require("../../../utils/vue/icon.js");
const require_content = require("../../tooltip/src/content.js");
const require_trigger = require("../../tooltip/src/trigger.js");
const require_button = require("../../button/src/button.js");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
//#region ../../packages/components/popconfirm/src/popconfirm.ts
/**
* @deprecated Removed after 3.0.0, Use `PopconfirmProps` instead.
*/
const popconfirmProps = require_runtime$1.buildProps({
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
		values: require_button.buttonTypes,
		default: "primary"
	},
	/**
	* @description Cancel button type
	*/
	cancelButtonType: {
		type: String,
		values: require_button.buttonTypes,
		default: "text"
	},
	/**
	* @description Icon Component
	*/
	icon: {
		type: require_icon.iconPropType,
		default: () => _element_plus_icons_vue.QuestionFilled
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
		...require_content.useTooltipContentProps.effect,
		default: "light"
	},
	/**
	* @description whether popconfirm is teleported to the body
	*/
	teleported: require_content.useTooltipContentProps.teleported,
	/**
	* @description when popconfirm inactive and `persistent` is `false` , popconfirm will be destroyed
	*/
	persistent: require_content.useTooltipContentProps.persistent,
	/**
	* @description popconfirm width, min width 150px
	*/
	width: {
		type: [String, Number],
		default: 150
	},
	virtualTriggering: require_trigger.useTooltipTriggerProps.virtualTriggering,
	virtualRef: require_trigger.useTooltipTriggerProps.virtualRef
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
exports.popconfirmEmits = popconfirmEmits;
exports.popconfirmProps = popconfirmProps;

//# sourceMappingURL=popconfirm.js.map