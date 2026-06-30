Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
const require_icon = require("../../../utils/vue/icon.js");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
//#region ../../packages/components/notification/src/notification.ts
const notificationTypes = [
	"primary",
	"success",
	"info",
	"warning",
	"error"
];
/**
* @deprecated Removed after 3.0.0, Use `NotificationProps` instead.
*/
const notificationProps = require_runtime$1.buildProps({
	/**
	* @description custom class name for Notification
	*/
	customClass: {
		type: String,
		default: ""
	},
	/**
	* @description whether `message` is treated as HTML string
	*/
	dangerouslyUseHTMLString: Boolean,
	/**
	* @description duration before close. It will not automatically close if set 0
	*/
	duration: {
		type: Number,
		default: 4500
	},
	/**
	* @description custom icon component. It will be overridden by `type`
	*/
	icon: { type: require_icon.iconPropType },
	/**
	* @description notification dom id
	*/
	id: {
		type: String,
		default: ""
	},
	/**
	* @description description text
	*/
	message: {
		type: require_runtime$1.definePropType([
			String,
			Object,
			Function
		]),
		default: ""
	},
	/**
	* @description offset from the top edge of the screen. Every Notification instance of the same moment should have the same offset
	*/
	offset: {
		type: Number,
		default: 0
	},
	/**
	* @description callback function when notification clicked
	*/
	onClick: {
		type: require_runtime$1.definePropType(Function),
		default: () => void 0
	},
	/**
	* @description callback function when closed
	*/
	onClose: {
		type: require_runtime$1.definePropType(Function),
		required: true
	},
	/**
	* @description custom position
	*/
	position: {
		type: String,
		values: [
			"top-right",
			"top-left",
			"bottom-right",
			"bottom-left"
		],
		default: "top-right"
	},
	/**
	* @description whether to show a close button
	*/
	showClose: {
		type: Boolean,
		default: true
	},
	/**
	* @description title
	*/
	title: {
		type: String,
		default: ""
	},
	/**
	* @description notification type
	*/
	type: {
		type: String,
		values: [...notificationTypes, ""],
		default: ""
	},
	/**
	* @description initial zIndex
	*/
	zIndex: Number,
	/**
	* @description custom close icon, default is Close
	*/
	closeIcon: {
		type: require_icon.iconPropType,
		default: _element_plus_icons_vue.Close
	}
});
const notificationEmits = { destroy: () => true };
//#endregion
exports.notificationEmits = notificationEmits;
exports.notificationProps = notificationProps;
exports.notificationTypes = notificationTypes;

//# sourceMappingURL=notification.js.map