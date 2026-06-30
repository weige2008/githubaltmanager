import { EVENT_CODE } from "../../../constants/aria.mjs";
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { getEventCode } from "../../../utils/dom/event.mjs";
import { isFunction } from "../../../utils/types.mjs";
import { rAF } from "../../../utils/raf.mjs";
import { NOOP } from "../../../utils/functions.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useFormDisabled } from "../../form/src/hooks/use-form-common-props.mjs";
import { useFormItem, useFormItemInputId } from "../../form/src/hooks/use-form-item.mjs";
import { inputOtpEmits } from "./input-otp.mjs";
import { clamp } from "@vueuse/core";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, defineComponent, normalizeClass, openBlock, ref, renderList, renderSlot, resolveDynamicComponent, unref, watch } from "vue";
//#region ../../packages/components/input-otp/src/input-otp.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"aria-label",
	"aria-labelledby"
];
const _hoisted_2 = [
	"value",
	"type",
	"disabled",
	"readonly",
	"inputmode",
	"aria-label",
	"onClick",
	"onKeydown",
	"onInput"
];
var input_otp_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElInputOtp",
	__name: "input-otp",
	props: {
		modelValue: {
			type: [String, Number],
			required: false
		},
		length: {
			type: Number,
			required: false,
			default: 6
		},
		validator: {
			type: Function,
			required: false,
			default: () => true
		},
		inputmode: {
			type: null,
			required: false
		},
		type: {
			type: String,
			required: false,
			default: "outlined"
		},
		size: {
			type: null,
			required: false,
			default: "default"
		},
		mask: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		readonly: {
			type: Boolean,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		validateEvent: {
			type: Boolean,
			required: false,
			default: true
		},
		separator: {
			type: [
				String,
				Object,
				Function
			],
			required: false
		},
		ariaLabel: {
			type: String,
			required: false
		}
	},
	emits: inputOtpEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const initialValue = computed(() => {
			const value = String(props.modelValue ?? "");
			return Array.from({ length: props.length }, (_, i) => value.charAt(i));
		});
		const separators = computed(() => {
			const { separator } = props;
			const _separator = isFunction(separator) ? separator : () => separator;
			return Array.from({ length: props.length - 1 }, (_, i) => _separator(i));
		});
		const innerValue = ref(initialValue.value);
		const isFocused = ref(false);
		const inputRefs = ref([]);
		const ns = useNamespace("input-otp");
		const { t } = useLocale();
		const { formItem } = useFormItem();
		const { inputId, isLabeledByFormItem } = useFormItemInputId(props, { formItemContext: formItem });
		const disabled = useFormDisabled();
		let modelValueOnFocus = props.modelValue;
		const getFirstIndex = (maxIndex) => {
			const index = innerValue.value.findIndex((char, i) => !char && i <= maxIndex);
			return index === -1 ? maxIndex : index;
		};
		const handleFocus = (event) => {
			if (inputRefs.value?.includes(event.relatedTarget)) return;
			isFocused.value = true;
			emit("focus", event);
		};
		const handleBlur = (event) => {
			if (inputRefs.value?.includes(event.relatedTarget)) return;
			isFocused.value = false;
			emit("blur", event);
			if (props.validateEvent) formItem?.validate?.("blur").catch(NOOP);
		};
		const updateModelValue = (emitFinish = true) => {
			const value = innerValue.value.join("").slice(0, props.length);
			if (value !== props.modelValue) {
				emit(UPDATE_MODEL_EVENT, value);
				if (emitFinish && value.length === props.length) emit("finish", value);
			}
		};
		const handleKeydown = (event, index) => {
			const code = getEventCode(event);
			let preventDefault = true;
			switch (code) {
				case EVENT_CODE.backspace:
					if (props.readonly) break;
					innerValue.value[index] = "";
					focus(index - 1);
					updateModelValue();
					break;
				case EVENT_CODE.delete:
					if (props.readonly) break;
					innerValue.value[index] = "";
					focus(index);
					updateModelValue();
					break;
				case EVENT_CODE.up:
				case EVENT_CODE.left:
					focus(index - 1);
					break;
				case EVENT_CODE.down:
				case EVENT_CODE.right:
					focus(index + 1);
					break;
				default: preventDefault = false;
			}
			if (preventDefault) event.preventDefault();
		};
		const handleInput = (event, index) => {
			const target = event.target;
			const targetIndex = getFirstIndex(index);
			let focusIndex = targetIndex + 1;
			let value = target.value;
			if (value.length > 1) {
				const chars = castValues(value, targetIndex);
				target.value = innerValue.value[index] ?? "";
				chars.forEach((char, i) => innerValue.value[targetIndex + i] = char);
				focus(targetIndex + chars.length);
				updateModelValue();
				return;
			}
			if (!props.validator(value, targetIndex)) {
				target.value = innerValue.value[index] ?? "";
				value = target.value;
				focusIndex = targetIndex;
			}
			innerValue.value[targetIndex] = value;
			if (targetIndex !== index) target.value = innerValue.value[index] ?? "";
			focus(focusIndex);
			updateModelValue();
		};
		const castValues = (value, startIndex = 0) => {
			const chars = `${value ?? ""}`.split("");
			const result = [];
			for (const char of chars) {
				if (result.length + startIndex >= props.length) break;
				if (props.validator(char, result.length + startIndex)) result.push(char);
			}
			return result;
		};
		const focus = (index = 0) => {
			const focusIndex = clamp(index, 0, props.length - 1);
			const target = inputRefs.value?.[focusIndex];
			if (document.activeElement !== target) target?.focus();
			rAF(() => {
				if (!props.readonly && document.activeElement === target) target?.select();
			});
		};
		const blur = () => {
			(inputRefs.value?.find((input) => document.activeElement === input))?.blur();
		};
		watch(() => props.modelValue, () => {
			innerValue.value = initialValue.value;
			if (props.validateEvent) formItem?.validate?.("change").catch(NOOP);
		});
		watch(() => props.length, () => {
			innerValue.value = initialValue.value;
			updateModelValue(false);
		});
		watch(isFocused, (value) => {
			if (value) {
				modelValueOnFocus = props.modelValue;
				return;
			}
			if (modelValueOnFocus !== props.modelValue) emit(CHANGE_EVENT, props.modelValue);
		});
		__expose({
			/**
			* @description HTML input elements array
			*/
			inputRefs,
			/**
			* @description Focus an OTP input field
			*/
			focus,
			/**
			* @description Blur the focused OTP input field
			*/
			blur
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				id: unref(inputId),
				class: normalizeClass([
					unref(ns).b(),
					unref(ns).m(__props.size),
					unref(ns).m(__props.type),
					unref(ns).is("disabled", unref(disabled))
				]),
				role: "group",
				"aria-label": !unref(isLabeledByFormItem) ? __props.ariaLabel || unref(t)("el.inputOTP.groupLabel") : void 0,
				"aria-labelledby": unref(isLabeledByFormItem) ? unref(formItem)?.labelId : void 0
			}, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.length, (_, index) => {
				return openBlock(), createElementBlock(Fragment, { key: index }, [createElementVNode("label", { class: normalizeClass(unref(ns).e("input-field")) }, [createElementVNode("input", {
					ref_for: true,
					ref_key: "inputRefs",
					ref: inputRefs,
					value: innerValue.value[index],
					class: normalizeClass(unref(ns).e("input")),
					type: __props.mask ? "password" : "text",
					disabled: unref(disabled),
					readonly: __props.readonly,
					inputmode: __props.inputmode,
					autocomplete: "one-time-code",
					"aria-label": unref(t)("el.inputOTP.defaultLabel", { index: index + 1 }),
					onFocus: handleFocus,
					onBlur: handleBlur,
					onClick: ($event) => focus(index),
					onKeydown: ($event) => handleKeydown($event, index),
					onInput: ($event) => handleInput($event, index)
				}, null, 42, _hoisted_2)], 2), (_ctx.$slots.separator || separators.value[index]) && index < __props.length - 1 ? renderSlot(_ctx.$slots, "separator", {
					key: 0,
					index
				}, () => [(openBlock(), createBlock(resolveDynamicComponent(() => separators.value[index])))]) : createCommentVNode("v-if", true)], 64);
			}), 128))], 10, _hoisted_1);
		};
	}
});
//#endregion
export { input_otp_vue_vue_type_script_setup_true_lang_default as default };

//# sourceMappingURL=input-otp.vue_vue_type_script_setup_true_lang.mjs.map