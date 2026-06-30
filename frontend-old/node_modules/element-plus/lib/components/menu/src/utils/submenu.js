Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_aria = require("../../../../utils/dom/aria.js");
const require_aria$1 = require("../../../../constants/aria.js");
const require_event = require("../../../../utils/dom/event.js");
//#region ../../packages/components/menu/src/utils/submenu.ts
var SubMenu = class {
	constructor(parent, domNode) {
		this.parent = parent;
		this.domNode = domNode;
		this.subIndex = 0;
		this.subMenuItems = this.domNode.querySelectorAll("li");
		this.addListeners();
	}
	gotoSubIndex(idx) {
		if (idx === this.subMenuItems.length) idx = 0;
		else if (idx < 0) idx = this.subMenuItems.length - 1;
		this.subMenuItems[idx].focus();
		this.subIndex = idx;
	}
	addListeners() {
		const parentNode = this.parent.domNode;
		this.subMenuItems.forEach((el) => {
			el.addEventListener("keydown", (event) => {
				const code = require_event.getEventCode(event);
				let prevDef = false;
				switch (code) {
					case require_aria$1.EVENT_CODE.down:
						this.gotoSubIndex(this.subIndex + 1);
						prevDef = true;
						break;
					case require_aria$1.EVENT_CODE.up:
						this.gotoSubIndex(this.subIndex - 1);
						prevDef = true;
						break;
					case require_aria$1.EVENT_CODE.tab:
						require_aria.triggerEvent(parentNode, "mouseleave");
						break;
					case require_aria$1.EVENT_CODE.enter:
					case require_aria$1.EVENT_CODE.numpadEnter:
					case require_aria$1.EVENT_CODE.space:
						prevDef = true;
						event.currentTarget.click();
						break;
				}
				if (prevDef) {
					event.preventDefault();
					event.stopPropagation();
				}
				return false;
			});
		});
	}
};
//#endregion
exports.default = SubMenu;

//# sourceMappingURL=submenu.js.map