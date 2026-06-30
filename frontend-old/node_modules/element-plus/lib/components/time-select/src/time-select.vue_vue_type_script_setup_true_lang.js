const require_runtime = require("../../../_virtual/_rolldown/runtime.js");
const require_event = require("../../../constants/event.js");
const require_error = require("../../../utils/error.js");
const require_index = require("../../../hooks/use-locale/index.js");
const require_index$1 = require("../../../hooks/use-namespace/index.js");
const require_index$2 = require("../../icon/index.js");
const require_use_form_common_props = require("../../form/src/hooks/use-form-common-props.js");
const require_index$3 = require("../../select/index.js");
const require_time_select = require("./time-select.js");
const require_utils = require("./utils.js");
let vue = require("vue");
let dayjs = require("dayjs");
dayjs = require_runtime.__toESM(dayjs);
let dayjs_plugin_customParseFormat_js = require("dayjs/plugin/customParseFormat.js");
dayjs_plugin_customParseFormat_js = require_runtime.__toESM(dayjs_plugin_customParseFormat_js);
//#region ../../packages/components/time-select/src/time-select.vue?vue&type=script&setup=true&lang.ts
var time_select_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTimeSelect",
	__name: "time-select",
	props: require_time_select.timeSelectProps,
	emits: [
		require_event.CHANGE_EVENT,
		"blur",
		"focus",
		"clear",
		require_event.UPDATE_MODEL_EVENT
	],
	setup(__props, { expose: __expose }) {
		dayjs.default.extend(dayjs_plugin_customParseFormat_js.default);
		const { Option: ElOption } = require_index$3.ElSelect;
		const props = __props;
		const nsInput = require_index$1.useNamespace("input");
		const select = (0, vue.ref)();
		const _disabled = require_use_form_common_props.useFormDisabled();
		const { lang } = require_index.useLocale();
		const getValidTimeOrDefault = (value, propName, defaultValue, allowZero = true) => {
			const time = require_utils.parseTime(value);
			if (!require_utils.isValidTime(time) || !allowZero && time.hours === 0 && time.minutes === 0) {
				require_error.debugWarn("ElTimeSelect", `invalid ${propName}, fallback to default ${propName} (${defaultValue}).`);
				return defaultValue;
			}
			return require_utils.formatTime(time);
		};
		const value = (0, vue.computed)(() => props.modelValue);
		const start = (0, vue.computed)(() => getValidTimeOrDefault(props.start, "start", require_time_select.DEFAULT_START));
		const end = (0, vue.computed)(() => getValidTimeOrDefault(props.end, "end", require_time_select.DEFAULT_END));
		const minTime = (0, vue.computed)(() => {
			const time = require_utils.parseTime(props.minTime || "");
			return time ? require_utils.formatTime(time) : null;
		});
		const maxTime = (0, vue.computed)(() => {
			const time = require_utils.parseTime(props.maxTime || "");
			return time ? require_utils.formatTime(time) : null;
		});
		const step = (0, vue.computed)(() => getValidTimeOrDefault(props.step, "step", require_time_select.DEFAULT_STEP, false));
		const items = (0, vue.computed)(() => {
			const result = [];
			const push = (formattedValue, rawValue) => {
				result.push({
					value: formattedValue,
					rawValue,
					disabled: require_utils.compareTime(rawValue, minTime.value || "-1:-1") <= 0 || require_utils.compareTime(rawValue, maxTime.value || "100:100") >= 0
				});
			};
			let current = start.value;
			while (require_utils.compareTime(current, end.value) <= 0) {
				push((0, dayjs.default)(current, "HH:mm").locale(lang.value).format(props.format), current);
				current = require_utils.nextTime(current, step.value);
			}
			if (props.includeEndTime && result[result.length - 1]?.rawValue !== end.value) push((0, dayjs.default)(end.value, "HH:mm").locale(lang.value).format(props.format), end.value);
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
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$3.ElSelect), {
				ref_key: "select",
				ref: select,
				name: __props.name,
				"model-value": value.value,
				disabled: (0, vue.unref)(_disabled),
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
				"onUpdate:modelValue": _cache[0] || (_cache[0] = (event) => _ctx.$emit((0, vue.unref)("update:modelValue"), event)),
				onChange: _cache[1] || (_cache[1] = (event) => _ctx.$emit((0, vue.unref)("change"), event)),
				onBlur: _cache[2] || (_cache[2] = (event) => _ctx.$emit("blur", event)),
				onFocus: _cache[3] || (_cache[3] = (event) => _ctx.$emit("focus", event)),
				onClear: _cache[4] || (_cache[4] = () => _ctx.$emit("clear"))
			}, {
				prefix: (0, vue.withCtx)(() => [__props.prefixIcon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$2.ElIcon), {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(nsInput).e("prefix-icon"))
				}, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.prefixIcon)))]),
					_: 1
				}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true)]),
				default: (0, vue.withCtx)(() => [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(items.value, (item) => {
					return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(ElOption), {
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
exports.default = time_select_vue_vue_type_script_setup_true_lang_default;

//# sourceMappingURL=time-select.vue_vue_type_script_setup_true_lang.js.map