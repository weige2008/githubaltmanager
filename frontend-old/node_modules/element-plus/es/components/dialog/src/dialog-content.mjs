import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
//#region ../../packages/components/dialog/src/dialog-content.ts
/**
* @deprecated Removed after 3.0.0, Use `DialogContentProps` instead.
*/
const dialogContentProps = buildProps({
	/**
	* @description whether to align the header and footer in center
	*/
	center: Boolean,
	/**
	* @description whether to align the dialog both horizontally and vertically
	*/
	alignCenter: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description custom close icon, default is Close
	*/
	closeIcon: { type: iconPropType },
	/**
	* @description enable dragging feature for Dialog
	*/
	draggable: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description draggable Dialog can overflow the viewport
	*/
	overflow: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description whether the Dialog takes up full screen
	*/
	fullscreen: Boolean,
	/**
	* @description custom class names for header wrapper
	*/
	headerClass: String,
	/**
	* @description custom class names for body wrapper
	*/
	bodyClass: String,
	/**
	* @description custom class names for footer wrapper
	*/
	footerClass: String,
	/**
	* @description whether to show a close button
	*/
	showClose: {
		type: Boolean,
		default: true
	},
	/**
	* @description title of Dialog. Can also be passed with a named slot (see the following table)
	*/
	title: {
		type: String,
		default: ""
	},
	/**
	* @description header's aria-level attribute
	*/
	ariaLevel: {
		type: String,
		default: "2"
	}
});
const dialogContentEmits = { close: () => true };
const dialogContentPropsDefaults = {
	alignCenter: void 0,
	draggable: void 0,
	overflow: void 0,
	showClose: true,
	title: "",
	ariaLevel: "2"
};
//#endregion
export { dialogContentEmits, dialogContentProps, dialogContentPropsDefaults };

//# sourceMappingURL=dialog-content.mjs.map