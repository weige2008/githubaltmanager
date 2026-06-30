require("../../../_virtual/_rolldown/runtime.js");
const require_aria = require("../../../constants/aria.js");
const require_event = require("../../../constants/event.js");
const require_event$1 = require("../../../utils/dom/event.js");
const require_raf = require("../../../utils/raf.js");
const require_index = require("../../../hooks/use-locale/index.js");
const require_index$1 = require("../../../hooks/use-namespace/index.js");
const require_use_form_common_props = require("../../form/src/hooks/use-form-common-props.js");
const require_use_form_item = require("../../form/src/hooks/use-form-item.js");
const require_input_otp = require("./input-otp.js");
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");
let _vue_shared = require("@vue/shared");
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
var input_otp_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
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
	emits: require_input_otp.inputOtpEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const initialValue = (0, vue.computed)(() => {
			const value = String(props.modelValue ?? "");
			return Array.from({ length: props.length }, (_, i) => value.charAt(i));
		});
		const separators = (0, vue.computed)(() => {
			const { separator } = props;
			const _separator = (0, _vue_shared.isFunction)(separator) ? separator : () => separator;
			return Array.from({ length: props.length - 1 }, (_, i) => _separator(i));
		});
		const innerValue = (0, vue.ref)(initialValue.value);
		const isFocused = (0, vue.ref)(false);
		const inputRefs = (0, vue.ref)([]);
		const ns = require_index$1.useNamespace("input-otp");
		const { t } = require_index.useLocale();
		const { formItem } = require_use_form_item.useFormItem();
		const { inputId, isLabeledByFormItem } = require_use_form_item.useFormItemInputId(props, { formItemContext: formItem });
		const disabled = require_use_form_common_props.useFormDisabled();
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
			if (props.validateEvent) formItem?.validate?.("blur").catch(_vue_shared.NOOP);
		};
		const updateModelValue = (emitFinish = true) => {
			const value = innerValue.value.join("").slice(0, props.length);
			if (value !== props.modelValue) {
				emit(require_event.UPDATE_MODEL_EVENT, value);
				if (emitFinish && value.length === props.length) emit("finish", value);
			}
		};
		const handleKeydown = (event, index) => {
			const code = require_event$1.getEventCode(event);
			let preventDefault = true;
			switch (code) {
				case require_aria.EVENT_CODE.backspace:
					if (props.readonly) break;
					innerValue.value[index] = "";
					focus(index - 1);
					updateModelValue();
					break;
				case require_aria.EVENT_CODE.delete:
					if (props.readonly) break;
					innerValue.value[index] = "";
					focus(index);
					updateModelValue();
					break;
				case require_aria.EVENT_CODE.up:
				case require_aria.EVENT_CODE.left:
					focus(index - 1);
					break;
				case require_aria.EVENT_CODE.down:
				case require_aria.EVENT_CODE.right:
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
			const focusIndex = (0, _vueuse_core.clamp)(index, 0, props.length - 1);
			const target = inputRefs.value?.[focusIndex];
			if (document.activeElement !== target) target?.focus();
			require_raf.rAF(() => {
				if (!props.readonly && document.activeElement === target) target?.select();
			});
		};
		const blur = () => {
			(inputRefs.value?.find((input) => document.activeElement === input))?.blur();
		};
		(0, vue.watch)(() => props.modelValue, () => {
			innerValue.value = initialValue.value;
			if (props.validateEvent) formItem?.validate?.("change").catch(_vue_shared.NOOP);
		});
		(0, vue.watch)(() => props.length, () => {
			innerValue.value = initialValue.value;
			updateModelValue(false);
		});
		(0, vue.watch)(isFocused, (value) => {
			if (value) {
				modelValueOnFocus = props.modelValue;
				return;
			}
			if (modelValueOnFocus !== props.modelValue) emit(require_event.CHANGE_EVENT, props.modelValue);
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
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				id: (0, vue.unref)(inputId),
				class: (0, vue.normalizeClass)([
					(0, vue.unref)(ns).b(),
					(0, vue.unref)(ns).m(__props.size),
					(0, vue.unref)(ns).m(__props.type),
					(0, vue.unref)(ns).is("disabled", (0, vue.unref)(disabled))
				]),
				role: "group",
				"aria-label": !(0, vue.unref)(isLabeledByFormItem) ? __props.ariaLabel || (0, vue.unref)(t)("el.inputOTP.groupLabel") : void 0,
				"aria-labelledby": (0, vue.unref)(isLabeledByFormItem) ? (0, vue.unref)(formItem)?.labelId : void 0
			}, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(__props.length, (_, index) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: index }, [(0, vue.createElementVNode)("label", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("input-field")) }, [(0, vue.createElementVNode)("input", {
					ref_for: true,
					ref_key: "inputRefs",
					ref: inputRefs,
					value: innerValue.value[index],
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("input")),
					type: __props.mask ? "password" : "text",
					disabled: (0, vue.unref)(disabled),
					readonly: __props.readonly,
					inputmode: __props.inputmode,
					autocomplete: "one-time-code",
					"aria-label": (0, vue.unref)(t)("el.inputOTP.defaultLabel", { index: index + 1 }),
					onFocus: handleFocus,
					onBlur: handleBlur,
					onClick: ($event) => focus(index),
					onKeydown: ($event) => handleKeydown($event, index),
					onInput: ($event) => handleInput($event, index)
				}, null, 42, _hoisted_2)], 2), (_ctx.$slots.separator || separators.value[index]) && index < __props.length - 1 ? (0, vue.renderSlot)(_ctx.$slots, "separator", {
					key: 0,
					index
				}, () => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(() => separators.value[index])))]) : (0, vue.createCommentVNode)("v-if", true)], 64);
			}), 128))], 10, _hoisted_1);
		};
	}
});
//#endregion
exports.default = input_otp_vue_vue_type_script_setup_true_lang_default;

//# sourceMappingURL=input-otp.vue_vue_type_script_setup_true_lang.js.map