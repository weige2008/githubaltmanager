import * as _$vue from "vue";
import { ComponentInternalInstance, Ref } from "vue";

//#region ../../packages/components/menu/src/use-menu.d.ts
declare function useMenu(instance: ComponentInternalInstance, currentIndex: Ref<string>): {
  parentMenu: _$vue.ComputedRef<ComponentInternalInstance>;
  indexPath: _$vue.ComputedRef<string[]>;
};
//#endregion
export { useMenu as default };