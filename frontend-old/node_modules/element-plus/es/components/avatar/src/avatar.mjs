import { componentSizes } from "../../../constants/size.mjs";
import { isNumber } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
//#region ../../packages/components/avatar/src/avatar.ts
/**
* @deprecated Removed after 3.0.0, Use `AvatarProps` instead.
*/
const avatarProps = buildProps({
	/**
	* @description avatar size.
	*/
	size: {
		type: [Number, String],
		values: componentSizes,
		validator: (val) => isNumber(val)
	},
	/**
	* @description avatar shape.
	*/
	shape: {
		type: String,
		values: ["circle", "square"]
	},
	/**
	* @description representation type to icon, more info on icon component.
	*/
	icon: { type: iconPropType },
	/**
	* @description the source of the image for an image avatar.
	*/
	src: {
		type: String,
		default: ""
	},
	/**
	* @description native attribute `alt` of image avatar.
	*/
	alt: String,
	/**
	* @description native attribute srcset of image avatar.
	*/
	srcSet: String,
	/**
	* @description set how the image fit its container for an image avatar.
	*/
	fit: {
		type: definePropType(String),
		default: "cover"
	}
});
const avatarEmits = { error: (evt) => evt instanceof Event };
//#endregion
export { avatarEmits, avatarProps };

//# sourceMappingURL=avatar.mjs.map