Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_event = require("../../../constants/event.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
const require_typescript = require("../../../utils/typescript.js");
let lodash_unified = require("lodash-unified");
let _vue_shared = require("@vue/shared");
//#region ../../packages/components/transfer/src/transfer.ts
const LEFT_CHECK_CHANGE_EVENT = "left-check-change";
const RIGHT_CHECK_CHANGE_EVENT = "right-check-change";
/**
* @deprecated Removed after 3.0.0, Use `TransferProps` instead.
*/
const transferProps = require_runtime$1.buildProps({
	/**
	* @description data source
	*/
	data: {
		type: require_runtime$1.definePropType(Array),
		default: () => []
	},
	/**
	* @description custom list titles
	*/
	titles: {
		type: require_runtime$1.definePropType(Array),
		default: () => []
	},
	/**
	* @description custom button texts
	*/
	buttonTexts: {
		type: require_runtime$1.definePropType(Array),
		default: () => []
	},
	/**
	* @description placeholder for the filter input
	*/
	filterPlaceholder: String,
	/**
	* @description custom filter method
	*/
	filterMethod: { type: require_runtime$1.definePropType(Function) },
	/**
	* @description key array of initially checked data items of the left list
	*/
	leftDefaultChecked: {
		type: require_runtime$1.definePropType(Array),
		default: () => []
	},
	/**
	* @description key array of initially checked data items of the right list
	*/
	rightDefaultChecked: {
		type: require_runtime$1.definePropType(Array),
		default: () => []
	},
	/**
	* @description custom render function for data items
	*/
	renderContent: { type: require_runtime$1.definePropType(Function) },
	/**
	* @description binding value
	*/
	modelValue: {
		type: require_runtime$1.definePropType(Array),
		default: () => []
	},
	/**
	* @description texts for checking status in list header
	*/
	format: {
		type: require_runtime$1.definePropType(Object),
		default: () => ({})
	},
	/**
	* @description whether Transfer is filterable
	*/
	filterable: Boolean,
	/**
	* @description prop aliases for data source
	*/
	props: {
		type: require_runtime$1.definePropType(Object),
		default: () => require_typescript.mutable({
			label: "label",
			key: "key",
			disabled: "disabled"
		})
	},
	/**
	* @description order strategy for elements in the target list. If set to `original`, the elements will keep the same order as the data source. If set to `push`, the newly added elements will be pushed to the bottom. If set to `unshift`, the newly added elements will be inserted on the top
	*/
	targetOrder: {
		type: String,
		values: [
			"original",
			"push",
			"unshift"
		],
		default: "original"
	},
	/**
	* @description whether to trigger form validation
	*/
	validateEvent: {
		type: Boolean,
		default: true
	}
});
const transferCheckedChangeFn = (value, movedKeys) => [value, movedKeys].every(_vue_shared.isArray) || (0, _vue_shared.isArray)(value) && (0, lodash_unified.isNil)(movedKeys);
const transferEmits = {
	[require_event.CHANGE_EVENT]: (value, direction, movedKeys) => [value, movedKeys].every(_vue_shared.isArray) && ["left", "right"].includes(direction),
	[require_event.UPDATE_MODEL_EVENT]: (value) => (0, _vue_shared.isArray)(value),
	[LEFT_CHECK_CHANGE_EVENT]: transferCheckedChangeFn,
	[RIGHT_CHECK_CHANGE_EVENT]: transferCheckedChangeFn
};
//#endregion
exports.LEFT_CHECK_CHANGE_EVENT = LEFT_CHECK_CHANGE_EVENT;
exports.RIGHT_CHECK_CHANGE_EVENT = RIGHT_CHECK_CHANGE_EVENT;
exports.transferCheckedChangeFn = transferCheckedChangeFn;
exports.transferEmits = transferEmits;
exports.transferProps = transferProps;

//# sourceMappingURL=transfer.js.map