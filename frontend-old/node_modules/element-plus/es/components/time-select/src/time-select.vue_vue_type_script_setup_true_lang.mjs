import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { debugWarn } from "../../../utils/error.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { useFormDisabled } from "../../form/src/hooks/use-form-common-props.mjs";
import { ElSelect } from "../../select/index.mjs";
import { DEFAULT_END, DEFAULT_START, DEFAULT_STEP, timeSelectProps } from "./time-select.mjs";
import { compareTime, formatTime, isValidTime, nextTime, parseTime } from "./utils.mjs";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, defineComponent, normalizeClass, openBlock, ref, renderList, resolveDynamicComponent, unref, withCtx } from "vue";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
//#region ../../packages/components/time-select/src/time-select.vue?vue&type=script&setup=true&lang.ts
var time_select_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElTimeSelect",
	__name: "time-select",
	props: timeSelectProps,
	emits: [
		CHANGE_EVENT,
		"blur",
		"focus",
		"clear",
		UPDATE_MODEL_EVENT
	],
	setup(__props, { expose: __expose }) {
		dayjs.extend(customParseFormat);
		const { Option: ElOption } = ElSelect;
		const props = __props;
		const nsInput = useNamespace("input");
		const select = ref();
		const _disabled = useFormDisabled();
		const { lang } = useLocale();
		const getValidTimeOrDefault = (value, propName, defaultValue, allowZero = true) => {
			const time = parseTime(value);
			if (!isValidTime(time) || !allowZero && time.hours === 0 && time.minutes === 0) {
				debugWarn("ElTimeSelect", `invalid ${propName}, fallback to default ${propName} (${defaultValue}).`);
				return defaultValue;
			}
			return formatTime(time);
		};
		const value = computed(() => props.modelValue);
		const start = computed(() => getValidTimeOrDefault(props.start, "start", DEFAULT_START));
		const end = computed(() => getValidTimeOrDefault(props.end, "end", DEFAULT_END));
		const minTime = computed(() => {
			const time = parseTime(props.minTime || "");
			return time ? formatTime(time) : null;
		});
		const maxTime = computed(() => {
			const time = parseTime(props.maxTime || "");
			return time ? formatTime(time) : null;
		});
		const step = computed(() => getValidTimeOrDefault(props.step, "step", DEFAULT_STEP, false));
		const items = computed(() => {
			const result = [];
			const push = (formattedValue, rawValue) => {
				result.push({
					value: formattedValue,
					rawValue,
					disabled: compareTime(rawValue, minTime.value || "-1:-1") <= 0 || compareTime(rawValue, maxTime.value || "100:100") >= 0
				});
			};
			let current = start.value;
			while (compareTime(current, end.value) <= 0) {
				push(dayjs(current, "HH:mm").locale(lang.value).format(props.format), current);
				current = nextTime(current, step.value);
			}
			if (props.includeEndTime && result[result.length - 1]?.rawValue !== end.value) push(dayjs(end.value, "HH:mm").locale(lang.value).format(props.format), end.value);
			return result;
		});
		const blur = () => {
			select.value?.blur?.();
		};
		const focus = () => {
			select.value?.focus?.();
		};
		__expose({
			/**
			* @description blur the Input component
			*/
			blur,
			/**
			* @description focus the Input component
			*/
			focus
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ElSelect), {
				ref_key: "select",
				ref: select,
				name: __props.name,
				"model-value": value.value,
				disabled: unref(_disabled),
				clearable: __props.clearable,
				"clear-icon": __props.clearIcon,
				size: __props.size,
				effect: __props.effect,
				placeholder: __props.placeholder,
				"default-first-option": "",
				filterable: __props.editable,
				"empty-values": __props.emptyValues,
				"value-on-clear": __props.valueOnClear,
				"popper-class": __props.popperClass,
				"popper-style": __props.popperStyle,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = (event) => _ctx.$emit(unref("update:modelValue"), event)),
				onChange: _cache[1] || (_cache[1] = (event) => _ctx.$emit(unref("change"), event)),
				onBlur: _cache[2] || (_cache[2] = (event) => _ctx.$emit("blur", event)),
				onFocus: _cache[3] || (_cache[3] = (event) => _ctx.$emit("focus", event)),
				onClear: _cache[4] || (_cache[4] = () => _ctx.$emit("clear"))
			}, {
				prefix: withCtx(() => [__props.prefixIcon ? (openBlock(), createBlock(unref(ElIcon), {
					key: 0,
					class: normalizeClass(unref(nsInput).e("prefix-icon"))
				}, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.prefixIcon)))]),
					_: 1
				}, 8, ["class"])) : createCommentVNode("v-if", true)]),
				default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(items.value, (item) => {
					return openBlock(), createBlock(unref(ElOption), {
						key: item.value,
						label: item.value,
						value: item.value,
						disabled: item.disabled
					}, null, 8, [
						"label",
						"value",
						"disabled"
					]);
				}), 128))]),
				_: 1
			}, 8, [
				"name",
				"model-value",
				"disabled",
				"clearable",
				"clear-icon",
				"size",
				"effect",
				"placeholder",
				"filterable",
				"empty-values",
				"value-on-clear",
				"popper-class",
				"popper-style"
			]);
		};
	}
});
//#endregion
export { time_select_vue_vue_type_script_setup_true_lang_default as default };

//# sourceMappingURL=time-select.vue_vue_type_script_setup_true_lang.mjs.map