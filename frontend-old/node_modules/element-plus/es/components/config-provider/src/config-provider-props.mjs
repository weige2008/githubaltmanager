import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { useEmptyValuesProps } from "../../../hooks/use-empty-values/index.mjs";
//#region ../../packages/components/config-provider/src/config-provider-props.ts
const configProviderProps = buildProps({
	/**
	* @description Controlling if the users want a11y features
	*/
	a11y: {
		type: Boolean,
		default: true
	},
	/**
	* @description Locale Object
	*/
	locale: { type: definePropType(Object) },
	/**
	* @description global component size
	*/
	size: useSizeProp,
	/**
	* @description button related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#button-attribute)
	*/
	button: { type: definePropType(Object) },
	/**
	* @description card related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#card-attribute)
	*/
	card: { type: definePropType(Object) },
	/**
	* @description dialog related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#dialog-attribute)
	*/
	dialog: { type: definePropType(Object) },
	/**
	* @description link related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#link-attribute)
	*/
	link: { type: definePropType(Object) },
	/**
	* @description features at experimental stage to be added, all features are default to be set to false, [see the following table](https://element-plus.org/en-US/component/config-provider.html#experimental-features)                                                                            | ^[object]
	*/
	experimentalFeatures: { type: definePropType(Object) },
	/**
	* @description Controls if we should handle keyboard navigation
	*/
	keyboardNavigation: {
		type: Boolean,
		default: true
	},
	/**
	* @description message related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#message-attribute)
	*/
	message: { type: definePropType(Object) },
	/**
	* @description global Initial zIndex
	*/
	zIndex: Number,
	/**
	* @description global component className prefix (cooperated with [$namespace](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/mixins/config.scss#L1)) | ^[string]
	*/
	namespace: {
		type: String,
		default: "el"
	},
	/**
	* @description table related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#table-attribute)
	*/
	table: { type: definePropType(Object) },
	...useEmptyValuesProps
});
//#endregion
export { configProviderProps };

//# sourceMappingURL=config-provider-props.mjs.map