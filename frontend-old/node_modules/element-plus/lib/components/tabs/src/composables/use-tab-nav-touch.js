Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../../_virtual/_rolldown/runtime.js");
const require_position = require("../../../../utils/dom/position.js");
let lodash_unified = require("lodash-unified");
let vue = require("vue");
//#region ../../packages/components/tabs/src/composables/use-tab-nav-touch.ts
const TOUCH_SCROLL_THRESHOLD = 5;
const useTabNavTouch = ({ scrollable, navOffset, navSize, navContainerSize, isHorizontal }) => {
	const isTouchScrolling = (0, vue.ref)(false);
	const maxOffset = (0, vue.computed)(() => Math.max(navSize.value - navContainerSize.value, 0));
	let touchState;
	let isMainAxisTouch;
	const handleTouchStart = (event) => {
		if (!scrollable.value || event.touches.length !== 1) return;
		const { clientX, clientY } = require_position.getClientXY(event);
		touchState = {
			startX: clientX,
			startY: clientY,
			startOffset: navOffset.value
		};
		isMainAxisTouch = void 0;
	};
	const handleTouchMove = (event) => {
		if (!touchState || !scrollable.value) return;
		if (event.touches.length !== 1) {
			handleTouchEnd();
			return;
		}
		const { clientX, clientY } = require_position.getClientXY(event);
		const deltaX = touchState.startX - clientX;
		const deltaY = touchState.startY - clientY;
		const mainAxisDelta = isHorizontal.value ? deltaX : deltaY;
		const crossAxisDelta = isHorizontal.value ? deltaY : deltaX;
		const mainAxisDistance = Math.abs(mainAxisDelta);
		const crossAxisDistance = Math.abs(crossAxisDelta);
		if ((0, lodash_unified.isUndefined)(isMainAxisTouch)) {
			if (Math.max(mainAxisDistance, crossAxisDistance) <= TOUCH_SCROLL_THRESHOLD) return;
			isMainAxisTouch = mainAxisDistance > crossAxisDistance;
		}
		if (!isMainAxisTouch) return;
		const nextOffset = (0, lodash_unified.clamp)(touchState.startOffset + mainAxisDelta, 0, maxOffset.value);
		if (maxOffset.value <= 0 || nextOffset === navOffset.value || !event.cancelable) return;
		event.preventDefault();
		isTouchScrolling.value = true;
		navOffset.value = nextOffset;
	};
	const handleTouchEnd = () => {
		touchState = void 0;
		isMainAxisTouch = void 0;
		isTouchScrolling.value = false;
	};
	return {
		isTouchScrolling,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd
	};
};
//#endregion
exports.useTabNavTouch = useTabNavTouch;

//# sourceMappingURL=use-tab-nav-touch.js.map