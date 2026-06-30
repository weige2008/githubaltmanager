Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
let _vue_shared = require("@vue/shared");
//#region ../../packages/components/menu/src/menu-item.ts
/**
* @deprecated Removed after 3.0.0, Use `MenuItemProps` instead.
*/
const menuItemProps = require_runtime$1.buildProps({
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
	route: { type: require_runtime$1.definePropType([String, Object]) },
	/**
	* @description whether disabled
	*/
	disabled: Boolean
});
const menuItemEmits = { click: (item) => (0, _vue_shared.isString)(item.index) && (0, _vue_shared.isArray)(item.indexPath) };
//#endregion
exports.menuItemEmits = menuItemEmits;
exports.menuItemProps = menuItemProps;

//# sourceMappingURL=menu-item.js.map