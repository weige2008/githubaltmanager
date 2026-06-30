Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../_virtual/_rolldown/runtime.js");
const require_types = require("../../utils/types.js");
const require_runtime$1 = require("../../utils/vue/props/runtime.js");
const require_index = require("../use-timeout/index.js");
let vue = require("vue");
//#region ../../packages/hooks/use-delayed-toggle/index.ts
/**
* @deprecated Removed after 3.0.0, Use `UseDelayedToggleProps` instead.
*/
const useDelayedToggleProps = require_runtime$1.buildProps({
	/**
	* @description delay of appearance, in millisecond, not valid in controlled mode
	*/
	showAfter: {
		type: Number,
		default: 0
	},
	/**
	* @description delay of disappear, in millisecond, not valid in controlled mode
	*/
	hideAfter: {
		type: Number,
		default: 200
	},
	/**
	* @description disappear automatically, in millisecond, not valid in controlled mode
	*/
	autoClose: {
		type: Number,
		default: 0
	}
});
const useDelayedTogglePropsDefaults = {
	showAfter: 0,
	hideAfter: 200,
	autoClose: 0
};
const useDelayedToggle = ({ showAfter, hideAfter, autoClose, open, close }) => {
	const { registerTimeout } = require_index.useTimeout();
	const { registerTimeout: registerTimeoutForAutoClose, cancelTimeout: cancelTimeoutForAutoClose } = require_index.useTimeout();
	const onOpen = (event, delay = (0, vue.unref)(showAfter)) => {
		registerTimeout(() => {
			open(event);
			const _autoClose = (0, vue.unref)(autoClose);
			if (require_types.isNumber(_autoClose) && _autoClose > 0) registerTimeoutForAutoClose(() => {
				close(event);
			}, _autoClose);
		}, delay);
	};
	const onClose = (event, delay = (0, vue.unref)(hideAfter)) => {
		cancelTimeoutForAutoClose();
		registerTimeout(() => {
			close(event);
		}, delay);
	};
	return {
		onOpen,
		onClose
	};
};
//#endregion
exports.useDelayedToggle = useDelayedToggle;
exports.useDelayedToggleProps = useDelayedToggleProps;
exports.useDelayedTogglePropsDefaults = useDelayedTogglePropsDefaults;

//# sourceMappingURL=index.js.map