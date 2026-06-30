Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_aria = require("../../../../utils/dom/aria.js");
const require_aria$1 = require("../../../../constants/aria.js");
const require_event = require("../../../../utils/dom/event.js");
const require_submenu = require("./submenu.js");
//#region ../../packages/components/menu/src/utils/menu-item.ts
var MenuItem = class {
	constructor(domNode, namespace) {
		this.domNode = domNode;
		this.submenu = null;
		this.init(namespace);
	}
	init(namespace) {
		this.domNode.setAttribute("tabindex", "0");
		const menuChild = this.domNode.querySelector(`.${namespace}-menu`);
		if (menuChild) this.submenu = new require_submenu.default(this, menuChild);
		this.addListeners();
	}
	addListeners() {
		this.domNode.addEventListener("keydown", (event) => {
			const code = require_event.getEventCode(event);
			let prevDef = false;
			switch (code) {
				case require_aria$1.EVENT_CODE.down:
					require_aria.triggerEvent(event.currentTarget, "mouseenter");
					this.submenu?.gotoSubIndex(0);
					prevDef = true;
					break;
				case require_aria$1.EVENT_CODE.up:
					require_aria.triggerEvent(event.currentTarget, "mouseenter");
					this.submenu?.gotoSubIndex(this.submenu.subMenuItems.length - 1);
					prevDef = true;
					break;
				case require_aria$1.EVENT_CODE.tab:
					require_aria.triggerEvent(event.currentTarget, "mouseleave");
					break;
				case require_aria$1.EVENT_CODE.enter:
				case require_aria$1.EVENT_CODE.numpadEnter:
				case require_aria$1.EVENT_CODE.space:
					prevDef = true;
					event.currentTarget.click();
					break;
			}
			if (prevDef) event.preventDefault();
		});
	}
};
//#endregion
exports.default = MenuItem;

//# sourceMappingURL=menu-item.js.map