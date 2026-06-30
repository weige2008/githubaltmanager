import { DrawerEmits, DrawerProps } from "../drawer.js";
import * as _$vue from "vue";
import { Ref, SetupContext } from "vue";

//#region ../../packages/components/drawer/src/composables/useResizable.d.ts
declare function useResizable(props: DrawerProps & Required<Pick<DrawerProps, 'direction'>>, target: Ref<HTMLElement | undefined>, emit: SetupContext<DrawerEmits>['emit']): {
  size: _$vue.ComputedRef<string | undefined>;
  isResizing: Ref<boolean, boolean>;
  isHorizontal: _$vue.ComputedRef<boolean>;
};
//#endregion
export { useResizable };