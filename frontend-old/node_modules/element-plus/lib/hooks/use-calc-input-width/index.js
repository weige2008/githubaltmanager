Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../_virtual/_rolldown/runtime.js");
require("../../constants/form.js");
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");
//#region ../../packages/hooks/use-calc-input-width/index.ts
function useCalcInputWidth() {
	const calculatorRef = (0, vue.shallowRef)();
	const calculatorWidth = (0, vue.ref)(0);
	const inputStyle = (0, vue.computed)(() => ({ minWidth: `${Math.max(calculatorWidth.value, 11)}px` }));
	const resetCalculatorWidth = () => {
		calculatorWidth.value = calculatorRef.value?.getBoundingClientRect().width ?? 0;
	};
	(0, _vueuse_core.useResizeObserver)(calculatorRef, resetCalculatorWidth);
	return {
		calculatorRef,
		calculatorWidth,
		inputStyle
	};
}
//#endregion
exports.useCalcInputWidth = useCalcInputWidth;

//# sourceMappingURL=index.js.map