import { AutoResizerProps } from "../auto-resizer.js";
import * as _$vue from "vue";

//#region ../../packages/components/table-v2/src/composables/use-auto-resize.d.ts
declare const useAutoResize: (props: AutoResizerProps) => {
  sizer: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  width: _$vue.Ref<number, number>;
  height: _$vue.Ref<number, number>;
};
//#endregion
export { useAutoResize };