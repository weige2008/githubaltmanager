Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_event = require("../../../constants/event.js");
const require_types = require("../../../utils/types.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
const require_typescript = require("../../../utils/typescript.js");
let _vue_shared = require("@vue/shared");
//#region ../../packages/components/collapse/src/collapse.ts
const emitChangeFn = (value) => require_types.isNumber(value) || (0, _vue_shared.isString)(value) || (0, _vue_shared.isArray)(value);
/**
* @deprecated Removed after 3.0.0, Use `CollapseProps` instead.
*/
const collapseProps = require_runtime$1.buildProps({
	/**
	* @description whether to activate accordion mode
	*/
	accordion: Boolean,
	/**
	* @description currently active panel, the type is `string` in accordion mode, otherwise it is `array`
	*/
	modelValue: {
		type: require_runtime$1.definePropType([
			Array,
			String,
			Number
		]),
		default: () => require_typescript.mutable([])
	},
	/**
	* @description set expand icon position
	*/
	expandIconPosition: {
		type: require_runtime$1.definePropType([String]),
		default: "right"
	},
	/**
	* @description before-collapse hook before the collapse state changes. If `false` is returned or a `Promise` is returned and then is rejected, will stop collapsing
	*/
	beforeCollapse: { type: require_runtime$1.definePropType(Function) }
});
const collapseEmits = {
	[require_event.UPDATE_MODEL_EVENT]: emitChangeFn,
	[require_event.CHANGE_EVENT]: emitChangeFn
};
//#endregion
exports.collapseEmits = collapseEmits;
exports.collapseProps = collapseProps;
exports.emitChangeFn = emitChangeFn;

//# sourceMappingURL=collapse.js.map