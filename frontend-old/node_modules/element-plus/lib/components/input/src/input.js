Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_event = require("../../../constants/event.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
const require_icon = require("../../../utils/vue/icon.js");
const require_typescript = require("../../../utils/typescript.js");
const require_index = require("../../../hooks/use-size/index.js");
const require_index$1 = require("../../../hooks/use-aria/index.js");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let _vue_shared = require("@vue/shared");
//#region ../../packages/components/input/src/input.ts
/**
* @deprecated Removed after 3.0.0, Use `InputProps` instead.
*/
const inputProps = require_runtime$1.buildProps({
	/**
	* @description native input id
	*/
	id: {
		type: String,
		default: void 0
	},
	/**
	* @description input box size
	*/
	size: require_index.useSizeProp,
	/**
	* @description whether to disable
	*/
	disabled: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description binding value
	*/
	modelValue: {
		type: require_runtime$1.definePropType([
			String,
			Number,
			Object
		]),
		default: ""
	},
	/**
	* @description v-model modifiers, reference [Vue modifiers](https://vuejs.org/guide/essentials/forms.html#modifiers)
	*/
	modelModifiers: {
		type: require_runtime$1.definePropType(Object),
		default: () => ({})
	},
	/**
	* @description same as `maxlength` in native input
	*/
	maxlength: { type: [String, Number] },
	/**
	* @description same as `minlength` in native input
	*/
	minlength: { type: [String, Number] },
	/**
	* @description type of input, see more in [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)
	*/
	type: {
		type: require_runtime$1.definePropType(String),
		default: "text"
	},
	/**
	* @description control the resizability
	*/
	resize: {
		type: String,
		values: [
			"none",
			"both",
			"horizontal",
			"vertical"
		]
	},
	/**
	* @description whether textarea has an adaptive height
	*/
	autosize: {
		type: require_runtime$1.definePropType([Boolean, Object]),
		default: false
	},
	/**
	* @description native input autocomplete
	*/
	autocomplete: {
		type: require_runtime$1.definePropType(String),
		default: "off"
	},
	/**
	* @description format content
	*/
	formatter: { type: Function },
	/**
	* @description parse content
	*/
	parser: { type: Function },
	/**
	* @description placeholder
	*/
	placeholder: { type: String },
	/**
	* @description native input form
	*/
	form: { type: String },
	/**
	* @description native input readonly
	*/
	readonly: Boolean,
	/**
	* @description whether to show clear button
	*/
	clearable: Boolean,
	/**
	* @description custom clear icon component
	*/
	clearIcon: {
		type: require_icon.iconPropType,
		default: _element_plus_icons_vue.CircleClose
	},
	/**
	* @description toggleable password input
	*/
	showPassword: Boolean,
	/**
	* @description word count
	*/
	showWordLimit: Boolean,
	/**
	* @description word count position, valid when `show-word-limit` is true
	*/
	wordLimitPosition: {
		type: String,
		values: ["inside", "outside"],
		default: "inside"
	},
	/**
	* @description suffix icon
	*/
	suffixIcon: { type: require_icon.iconPropType },
	/**
	* @description prefix icon
	*/
	prefixIcon: { type: require_icon.iconPropType },
	/**
	* @description container role, internal properties provided for use by the picker component
	*/
	containerRole: {
		type: String,
		default: void 0
	},
	/**
	* @description input tabindex
	*/
	tabindex: {
		type: [String, Number],
		default: 0
	},
	/**
	* @description whether to trigger form validation
	*/
	validateEvent: {
		type: Boolean,
		default: true
	},
	/**
	* @description input or textarea element style
	*/
	inputStyle: {
		type: require_runtime$1.definePropType([
			Object,
			Array,
			String,
			Boolean
		]),
		default: () => require_typescript.mutable({})
	},
	/**
	* @description Count graphemes of input value. If it's set, native maxlength and minlength won't be used.
	*/
	countGraphemes: { type: require_runtime$1.definePropType(Function) },
	/**
	* @description native input autofocus
	*/
	autofocus: Boolean,
	rows: {
		type: Number,
		default: 2
	},
	...require_index$1.useAriaProps(["ariaLabel"]),
	/**
	* @description native input mode for virtual keyboards
	*/
	inputmode: {
		type: require_runtime$1.definePropType(String),
		default: void 0
	},
	/**
	* @description same as `name` in native input
	*/
	name: String
});
const inputEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (value) => (0, _vue_shared.isString)(value),
	input: (value) => (0, _vue_shared.isString)(value),
	change: (value, evt) => (0, _vue_shared.isString)(value) && (evt instanceof Event || evt === void 0),
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent,
	clear: (evt) => evt === void 0 || evt instanceof MouseEvent,
	mouseleave: (evt) => evt instanceof MouseEvent,
	mouseenter: (evt) => evt instanceof MouseEvent,
	keydown: (evt) => evt instanceof Event,
	compositionstart: (evt) => evt instanceof CompositionEvent,
	compositionupdate: (evt) => evt instanceof CompositionEvent,
	compositionend: (evt) => evt instanceof CompositionEvent
};
/**
* @description default values for InputProps, used in components that extend InputProps like Autocomplete
*/
const inputPropsDefaults = {
	disabled: void 0,
	modelValue: "",
	modelModifiers: () => ({}),
	type: "text",
	autocomplete: "off",
	clearIcon: (0, vue.markRaw)(_element_plus_icons_vue.CircleClose),
	wordLimitPosition: "inside",
	tabindex: 0,
	validateEvent: true,
	inputStyle: () => ({}),
	rows: 2
};
//#endregion
exports.inputEmits = inputEmits;
exports.inputProps = inputProps;
exports.inputPropsDefaults = inputPropsDefaults;

//# sourceMappingURL=input.js.map