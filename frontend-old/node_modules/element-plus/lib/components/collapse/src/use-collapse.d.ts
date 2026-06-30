import { CollapseActiveName, CollapseEmits, CollapseProps } from "./collapse.js";
import * as _$vue from "vue";
import { SetupContext } from "vue";

//#region ../../packages/components/collapse/src/use-collapse.d.ts
declare const useCollapse: (props: CollapseProps, emit: SetupContext<CollapseEmits>["emit"]) => {
  activeNames: _$vue.Ref<(string | number)[], (string | number)[]>;
  setActiveNames: (_activeNames: CollapseActiveName[]) => void;
};
declare const useCollapseDOM: (props: CollapseProps) => {
  rootKls: _$vue.ComputedRef<string[]>;
};
//#endregion
export { useCollapse, useCollapseDOM };