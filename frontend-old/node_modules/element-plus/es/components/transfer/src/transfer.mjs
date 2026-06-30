import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isArray } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { mutable } from "../../../utils/typescript.mjs";
import { isNil } from "lodash-unified";
//#region ../../packages/components/transfer/src/transfer.ts
const LEFT_CHECK_CHANGE_EVENT = "left-check-change";
const RIGHT_CHECK_CHANGE_EVENT = "right-check-change";
/**
* @deprecated Removed after 3.0.0, Use `TransferProps` instead.
*/
const transferProps = buildProps({
	/**
	* @description data source
	*/
	data: {
		type: definePropType(Array),
		default: () => []
	},
	/**
	* @description custom list titles
	*/
	titles: {
		type: definePropType(Array),
		default: () => []
	},
	/**
	* @description custom button texts
	*/
	buttonTexts: {
		type: definePropType(Array),
		default: () => []
	},
	/**
	* @description placeholder for the filter input
	*/
	filterPlaceholder: String,
	/**
	* @description custom filter method
	*/
	filterMethod: { type: definePropType(Function) },
	/**
	* @description key array of initially checked data items of the left list
	*/
	leftDefaultChecked: {
		type: definePropType(Array),
		default: () => []
	},
	/**
	* @description key array of initially checked data items of the right list
	*/
	rightDefaultChecked: {
		type: definePropType(Array),
		default: () => []
	},
	/**
	* @description custom render function for data items
	*/
	renderContent: { type: definePropType(Function) },
	/**
	* @description binding value
	*/
	modelValue: {
		type: definePropType(Array),
		default: () => []
	},
	/**
	* @description texts for checking status in list header
	*/
	format: {
		type: definePropType(Object),
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
		type: definePropType(Object),
		default: () => mutable({
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
const transferCheckedChangeFn = (value, movedKeys) => [value, movedKeys].every(isArray) || isArray(value) && isNil(movedKeys);
const transferEmits = {
	[CHANGE_EVENT]: (value, direction, movedKeys) => [value, movedKeys].every(isArray) && ["left", "right"].includes(direction),
	[UPDATE_MODEL_EVENT]: (value) => isArray(value),
	[LEFT_CHECK_CHANGE_EVENT]: transferCheckedChangeFn,
	[RIGHT_CHECK_CHANGE_EVENT]: transferCheckedChangeFn
};
//#endregion
export { LEFT_CHECK_CHANGE_EVENT, RIGHT_CHECK_CHANGE_EVENT, transferCheckedChangeFn, transferEmits, transferProps };

//# sourceMappingURL=transfer.mjs.map