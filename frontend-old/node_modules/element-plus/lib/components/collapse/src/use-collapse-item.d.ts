import { CollapseItemProps } from "./collapse-item.js";
import * as _$vue from "vue";

//#region ../../packages/components/collapse/src/use-collapse-item.d.ts
declare const useCollapseItem: (props: CollapseItemProps) => {
  focusing: _$vue.Ref<boolean, boolean>;
  id: _$vue.ComputedRef<number>;
  isActive: _$vue.ComputedRef<boolean | undefined>;
  handleFocus: () => void;
  handleHeaderClick: (e: MouseEvent) => void;
  handleEnterClick: (e: KeyboardEvent) => void;
};
declare const useCollapseItemDOM: (props: CollapseItemProps, {
  focusing,
  isActive,
  id
}: Partial<ReturnType<typeof useCollapseItem>>) => {
  itemTitleKls: _$vue.ComputedRef<string[]>;
  arrowKls: _$vue.ComputedRef<string[]>;
  headKls: _$vue.ComputedRef<(string | {
    focusing: boolean | undefined;
  })[]>;
  rootKls: _$vue.ComputedRef<string[]>;
  itemWrapperKls: _$vue.ComputedRef<string>;
  itemContentKls: _$vue.ComputedRef<string>;
  scopedContentId: _$vue.ComputedRef<string>;
  scopedHeadId: _$vue.ComputedRef<string>;
};
//#endregion
export { useCollapseItem, useCollapseItemDOM };