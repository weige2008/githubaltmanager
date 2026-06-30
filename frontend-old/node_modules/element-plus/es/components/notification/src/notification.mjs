import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { Close } from "@element-plus/icons-vue";
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
const notificationProps = buildProps({
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
	icon: { type: iconPropType },
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
		type: definePropType([
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
		type: definePropType(Function),
		default: () => void 0
	},
	/**
	* @description callback function when closed
	*/
	onClose: {
		type: definePropType(Function),
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
		type: iconPropType,
		default: Close
	}
});
const notificationEmits = { destroy: () => true };
//#endregion
export { notificationEmits, notificationProps, notificationTypes };

//# sourceMappingURL=notification.mjs.map