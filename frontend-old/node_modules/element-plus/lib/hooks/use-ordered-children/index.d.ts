import * as _$vue from "vue";
import { ComponentInternalInstance, VNode } from "vue";

//#region ../../packages/hooks/use-ordered-children/index.d.ts
type ChildEssential = {
  uid: number;
  getVnode: () => VNode;
};
declare const useOrderedChildren: <T extends ChildEssential>(vm: ComponentInternalInstance, childComponentName: string) => {
  children: _$vue.ShallowRef<T[], T[]>;
  addChild: (child: T) => void;
  removeChild: (child: T) => void;
  ChildrenSorter: _$vue.DefineComponent<{}, () => VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }> | null, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
};
//#endregion
export { useOrderedChildren };