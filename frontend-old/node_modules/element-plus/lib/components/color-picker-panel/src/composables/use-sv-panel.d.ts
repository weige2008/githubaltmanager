import { SvPanelProps } from "../props/sv-panel.js";
import * as _$vue from "vue";

//#region ../../packages/components/color-picker-panel/src/composables/use-sv-panel.d.ts
declare const useSvPanel: (props: SvPanelProps) => {
  cursorRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  cursorTop: _$vue.Ref<number, number>;
  cursorLeft: _$vue.Ref<number, number>;
  background: _$vue.Ref<string, string>;
  saturation: _$vue.ComputedRef<any>;
  brightness: _$vue.ComputedRef<any>;
  hue: _$vue.ComputedRef<any>;
  handleClick: (event: MouseEvent | TouchEvent) => void;
  handleDrag: (event: MouseEvent | TouchEvent) => void;
  handleKeydown: (event: KeyboardEvent) => void;
};
declare const useSvPanelDOM: (props: SvPanelProps, {
  cursorTop,
  cursorLeft,
  background,
  handleDrag
}: Pick<ReturnType<typeof useSvPanel>, "cursorTop" | "cursorLeft" | "background" | "handleDrag">) => {
  rootKls: _$vue.ComputedRef<string>;
  cursorKls: _$vue.ComputedRef<string>;
  rootStyle: _$vue.ComputedRef<{
    backgroundColor: string;
  }>;
  cursorStyle: _$vue.ComputedRef<{
    top: string | undefined;
    left: string | undefined;
  }>;
  update: () => void;
};
//#endregion
export { useSvPanel, useSvPanelDOM };