import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import { MentionOption } from "./types.js";

//#region ../../packages/components/mention/src/mention-dropdown.d.ts
interface MentionDropdownProps {
  options?: MentionOption[];
  loading?: boolean;
  disabled?: boolean;
  contentId?: string;
  ariaLabel?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `MentionDropdownProps` instead.
 */
declare const mentionDropdownProps: {
  options: EpPropFinalized<(new (...args: any[]) => MentionOption[]) | (() => MentionOption[]) | (((new (...args: any[]) => MentionOption[]) | (() => MentionOption[])) | null)[], unknown, unknown, () => never[], boolean>;
  loading: BooleanConstructor;
  disabled: BooleanConstructor;
  contentId: StringConstructor;
  ariaLabel: StringConstructor;
};
declare const mentionDropdownEmits: {
  select: (option: MentionOption) => boolean;
};
//#endregion
export { MentionDropdownProps, mentionDropdownEmits, mentionDropdownProps };