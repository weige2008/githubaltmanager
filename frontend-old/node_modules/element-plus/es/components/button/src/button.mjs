import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { Loading } from "@element-plus/icons-vue";
//#region ../../packages/components/button/src/button.ts
const buttonTypes = [
	"default",
	"primary",
	"success",
	"warning",
	"info",
	"danger",
	"text",
	""
];
const buttonNativeTypes = [
	"button",
	"submit",
	"reset"
];
/**
* @deprecated Removed after 3.0.0, Use `ButtonProps` instead.
*/
const buttonProps = buildProps({
	/**
	* @description button size
	*/
	size: useSizeProp,
	/**
	* @description disable the button
	*/
	disabled: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description button type
	*/
	type: {
		type: String,
		values: buttonTypes,
		default: ""
	},
	/**
	* @description icon component
	*/
	icon: { type: iconPropType },
	/**
	* @description native button type
	*/
	nativeType: {
		type: String,
		values: buttonNativeTypes,
		default: "button"
	},
	/**
	* @description determine whether it's loading
	*/
	loading: Boolean,
	/**
	* @description customize loading icon component
	*/
	loadingIcon: {
		type: iconPropType,
		default: () => Loading
	},
	/**
	* @description determine whether it's a plain button
	*/
	plain: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description determine whether it's a text button
	*/
	text: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description determine whether it's a link button
	*/
	link: Boolean,
	/**
	* @description determine whether the text button background color is always on
	*/
	bg: Boolean,
	/**
	* @description native button autofocus
	*/
	autofocus: Boolean,
	/**
	* @description determine whether it's a round button
	*/
	round: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description determine whether it's a circle button
	*/
	circle: Boolean,
	/**
	* @description determine whether it's a dashed button
	*/
	dashed: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description custom button color, automatically calculate `hover` and `active` color
	*/
	color: String,
	/**
	* @description dark mode, which automatically converts `color` to dark mode colors
	*/
	dark: Boolean,
	/**
	* @description automatically insert a space between two chinese characters
	*/
	autoInsertSpace: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description custom element tag
	*/
	tag: {
		type: definePropType([String, Object]),
		default: "button"
	}
});
const buttonEmits = { click: (evt) => evt instanceof MouseEvent };
//#endregion
export { buttonEmits, buttonNativeTypes, buttonProps, buttonTypes };

//# sourceMappingURL=button.mjs.map