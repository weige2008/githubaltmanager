Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_objects = require("../../../utils/objects.js");
const require_runtime = require("../../../utils/vue/props/runtime.js");
const require_icon = require("../../../utils/vue/icon.js");
//#region ../../packages/components/alert/src/alert.ts
const alertEffects = ["light", "dark"];
/**
* @deprecated Removed after 3.0.0, Use `AlertProps` instead.
*/
const alertProps = require_runtime.buildProps({
	/**
	* @description alert title.
	*/
	title: {
		type: String,
		default: ""
	},
	description: {
		type: String,
		default: ""
	},
	/**
	* @description alert type.
	*/
	type: {
		type: String,
		values: require_objects.keysOf(require_icon.TypeComponentsMap),
		default: "info"
	},
	/**
	* @description whether alert can be dismissed.
	*/
	closable: {
		type: Boolean,
		default: true
	},
	/**
	* @description text for replacing x button
	*/
	closeText: {
		type: String,
		default: ""
	},
	/**
	* @description whether show icon
	*/
	showIcon: Boolean,
	/**
	* @description should content be placed in center.
	*/
	center: Boolean,
	effect: {
		type: String,
		values: alertEffects,
		default: "light"
	}
});
const alertEmits = { close: (evt) => evt instanceof MouseEvent };
//#endregion
exports.alertEffects = alertEffects;
exports.alertEmits = alertEmits;
exports.alertProps = alertProps;

//# sourceMappingURL=alert.js.map