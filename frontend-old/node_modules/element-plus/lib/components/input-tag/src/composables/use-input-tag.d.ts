import { EmitFn } from "../../../../utils/vue/typescript.js";
import { TooltipInstance } from "../../../tooltip/src/tooltip.js";
import { FormItemContext } from "../../../form/src/types.js";
import { InputTagEmits, InputTagProps } from "../input-tag.js";
import * as _$vue from "vue";

//#region ../../packages/components/input-tag/src/composables/use-input-tag.d.ts
interface UseInputTagOptions {
  props: InputTagProps;
  emit: EmitFn<InputTagEmits>;
  formItem?: FormItemContext;
}
declare function useInputTag({
  props,
  emit,
  formItem
}: UseInputTagOptions): {
  inputRef: _$vue.ShallowRef<HTMLInputElement | undefined, HTMLInputElement | undefined>;
  wrapperRef: _$vue.ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
  tagTooltipRef: _$vue.Ref<TooltipInstance | undefined, TooltipInstance | undefined>;
  isFocused: _$vue.Ref<boolean, boolean>;
  isComposing: _$vue.Ref<boolean, boolean>;
  inputValue: _$vue.Ref<string | undefined, string | undefined>;
  size: _$vue.ComputedRef<"" | "default" | "large" | "small">;
  tagSize: _$vue.ComputedRef<"default" | "small">;
  placeholder: _$vue.ComputedRef<string | undefined>;
  closable: _$vue.ComputedRef<boolean>;
  disabled: _$vue.ComputedRef<boolean>;
  inputLimit: _$vue.ComputedRef<boolean>;
  showTagList: _$vue.ComputedRef<string[] | undefined>;
  collapseTagList: _$vue.ComputedRef<string[] | undefined>;
  handleDragged: (draggingIndex: number, dropIndex: number, type: "before" | "after") => void;
  handlePaste: (event: ClipboardEvent) => void;
  handleInput: (event: Event) => void;
  handleKeydown: (event: KeyboardEvent) => void;
  handleKeyup: (event: KeyboardEvent) => void;
  handleAddTag: () => void;
  handleRemoveTag: (index: number) => void;
  handleClear: () => void;
  handleCompositionStart: (event: CompositionEvent) => void;
  handleCompositionUpdate: (event: CompositionEvent) => void;
  handleCompositionEnd: (event: CompositionEvent) => void;
  focus: () => void;
  blur: () => void;
};
//#endregion
export { useInputTag };