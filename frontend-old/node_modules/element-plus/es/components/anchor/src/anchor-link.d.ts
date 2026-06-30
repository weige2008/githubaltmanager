import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/anchor/src/anchor-link.d.ts
interface AnchorLinkProps {
  /**
   * @description the text content of the anchor link
   */
  title?: string;
  /**
   * @description The address of the anchor link
   */
  href?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `AnchorLinkProps` instead.
 */
declare const anchorLinkProps: {
  title: StringConstructor;
  href: StringConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `AnchorLinkProps` instead.
 */
type AnchorLinkPropsPublic = ExtractPublicPropTypes<typeof anchorLinkProps>;
//#endregion
export { AnchorLinkProps, AnchorLinkPropsPublic, anchorLinkProps };