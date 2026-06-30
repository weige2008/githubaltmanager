import { isArray, isString } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
//#region ../../packages/components/menu/src/menu-item.ts
/**
* @deprecated Removed after 3.0.0, Use `MenuItemProps` instead.
*/
const menuItemProps = buildProps({
	/**
	* @description unique identification
	*/
	index: {
		type: String,
		required: true
	},
	/**
	* @description Vue Router object
	*/
	route: { type: definePropType([String, Object]) },
	/**
	* @description whether disabled
	*/
	disabled: Boolean
});
const menuItemEmits = { click: (item) => isString(item.index) && isArray(item.indexPath) };
//#endregion
export { menuItemEmits, menuItemProps };

//# sourceMappingURL=menu-item.mjs.map