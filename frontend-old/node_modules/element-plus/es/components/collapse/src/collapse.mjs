import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isArray, isNumber, isString } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { mutable } from "../../../utils/typescript.mjs";
//#region ../../packages/components/collapse/src/collapse.ts
const emitChangeFn = (value) => isNumber(value) || isString(value) || isArray(value);
/**
* @deprecated Removed after 3.0.0, Use `CollapseProps` instead.
*/
const collapseProps = buildProps({
	/**
	* @description whether to activate accordion mode
	*/
	accordion: Boolean,
	/**
	* @description currently active panel, the type is `string` in accordion mode, otherwise it is `array`
	*/
	modelValue: {
		type: definePropType([
			Array,
			String,
			Number
		]),
		default: () => mutable([])
	},
	/**
	* @description set expand icon position
	*/
	expandIconPosition: {
		type: definePropType([String]),
		default: "right"
	},
	/**
	* @description before-collapse hook before the collapse state changes. If `false` is returned or a `Promise` is returned and then is rejected, will stop collapsing
	*/
	beforeCollapse: { type: definePropType(Function) }
});
const collapseEmits = {
	[UPDATE_MODEL_EVENT]: emitChangeFn,
	[CHANGE_EVENT]: emitChangeFn
};
//#endregion
export { collapseEmits, collapseProps, emitChangeFn };

//# sourceMappingURL=collapse.mjs.map