//#region ../../packages/components/mention/src/types.d.ts
type MentionOption = {
  value?: string;
  label?: string;
  disabled?: boolean;
  [key: string]: any;
};
interface MentionCtx {
  pattern: string;
  start: number;
  end: number;
  prefix: string;
  prefixIndex: number;
  splitIndex: number;
  selectionEnd: number;
}
//#endregion
export { MentionCtx, MentionOption };