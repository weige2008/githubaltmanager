import { UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { PICKER_POPPER_OPTIONS_INJECTION_KEY } from "./constants.mjs";
import { timePickerDefaultProps } from "./common/props.mjs";
import picker_default from "./common/picker.mjs";
import panel_time_pick_default from "./time-picker-com/panel-time-pick.mjs";
import panel_time_range_default from "./time-picker-com/panel-time-range.mjs";
import { createVNode, defineComponent, mergeProps, provide, ref } from "vue";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
//#region ../../packages/components/time-picker/src/time-picker.tsx
dayjs.extend(customParseFormat);
var time_picker_default = /* @__PURE__ */ defineComponent({
	name: "ElTimePicker",
	install: null,
	props: {
		...timePickerDefaultProps,
		/**
		* @description whether to pick a time range
		*/
		isRange: Boolean
	},
	emits: [UPDATE_MODEL_EVENT],
	setup(props, ctx) {
		const commonPicker = ref();
		const [type, Panel] = props.isRange ? ["timerange", panel_time_range_default] : ["time", panel_time_pick_default];
		const modelUpdater = (value) => ctx.emit(UPDATE_MODEL_EVENT, value);
		provide(PICKER_POPPER_OPTIONS_INJECTION_KEY, props.popperOptions);
		ctx.expose({
			/**
			* @description focus the Input component
			*/
			focus: () => {
				commonPicker.value?.focus();
			},
			/**
			* @description blur the Input component
			*/
			blur: () => {
				commonPicker.value?.blur();
			},
			/**
			* @description open the TimePicker popper
			*/
			handleOpen: () => {
				commonPicker.value?.handleOpen();
			},
			/**
			* @description close the TimePicker popper
			*/
			handleClose: () => {
				commonPicker.value?.handleClose();
			}
		});
		return () => {
			return createVNode(picker_default, mergeProps(props, {
				"ref": commonPicker,
				"type": type,
				"format": props.format ?? "HH:mm:ss",
				"onUpdate:modelValue": modelUpdater
			}), { default: (props) => createVNode(Panel, props, null) });
		};
	}
});
//#endregion
export { time_picker_default as default };

//# sourceMappingURL=time-picker.mjs.map