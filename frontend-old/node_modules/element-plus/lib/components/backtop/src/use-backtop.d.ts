import { BacktopEmits, BacktopProps } from "./backtop.js";
import * as _$vue from "vue";
import { SetupContext } from "vue";

//#region ../../packages/components/backtop/src/use-backtop.d.ts
declare const useBackTop: (props: Required<BacktopProps>, emit: SetupContext<BacktopEmits>["emit"], componentName: string) => {
  visible: _$vue.Ref<boolean, boolean>;
  handleClick: (event: MouseEvent) => void;
};
//#endregion
export { useBackTop };