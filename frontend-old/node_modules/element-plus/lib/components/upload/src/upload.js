Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
const require_typescript = require("../../../utils/typescript.js");
const require_ajax = require("./ajax.js");
let _vue_shared = require("@vue/shared");
//#region ../../packages/components/upload/src/upload.ts
/**
* @deprecated Removed after 3.0.0, Use `UploadProps` instead.
*/
const uploadListTypes = [
	"text",
	"picture",
	"picture-card"
];
let fileId = 1;
const genFileId = () => Date.now() + fileId++;
/**
* @deprecated Removed after 3.0.0, Use `UploadBaseProps` instead.
*/
const uploadBaseProps = require_runtime$1.buildProps({
	/**
	* @description request URL
	*/
	action: {
		type: String,
		default: "#"
	},
	/**
	* @description request headers
	*/
	headers: { type: require_runtime$1.definePropType(Object) },
	/**
	* @description set upload request method
	*/
	method: {
		type: String,
		default: "post"
	},
	/**
	* @description additions options of request
	*/
	data: {
		type: require_runtime$1.definePropType([
			Object,
			Function,
			Promise
		]),
		default: () => require_typescript.mutable({})
	},
	/**
	* @description whether uploading multiple files is permitted
	*/
	multiple: Boolean,
	/**
	* @description key name for uploaded file
	*/
	name: {
		type: String,
		default: "file"
	},
	/**
	* @description whether to activate drag and drop mode
	*/
	drag: Boolean,
	/**
	* @description whether cookies are sent
	*/
	withCredentials: Boolean,
	/**
	* @description whether to show the uploaded file list
	*/
	showFileList: {
		type: Boolean,
		default: true
	},
	/**
	* @description accepted [file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept), will not work when `thumbnail-mode === true`
	*/
	accept: {
		type: String,
		default: ""
	},
	/**
	* @description default uploaded files
	*/
	fileList: {
		type: require_runtime$1.definePropType(Array),
		default: () => require_typescript.mutable([])
	},
	/**
	* @description whether to auto upload file
	*/
	autoUpload: {
		type: Boolean,
		default: true
	},
	/**
	* @description type of file list
	*/
	listType: {
		type: String,
		values: uploadListTypes,
		default: "text"
	},
	/**
	* @description override default xhr behavior, allowing you to implement your own upload-file's request
	*/
	httpRequest: {
		type: require_runtime$1.definePropType(Function),
		default: require_ajax.ajaxUpload
	},
	/**
	* @description whether to disable upload
	*/
	disabled: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description maximum number of uploads allowed
	*/
	limit: Number,
	/**
	* @description whether to support uploading directory
	*/
	directory: Boolean
});
/**
* @deprecated Removed after 3.0.0, Use `UploadProps` instead.
*/
const uploadProps = require_runtime$1.buildProps({
	...uploadBaseProps,
	/**
	* @description hook function before uploading with the file to be uploaded as its parameter. If `false` is returned or a `Promise` is returned and then is rejected, uploading will be aborted
	*/
	beforeUpload: {
		type: require_runtime$1.definePropType(Function),
		default: _vue_shared.NOOP
	},
	/**
	* @description hook function before removing a file with the file and file list as its parameters. If `false` is returned or a `Promise` is returned and then is rejected, removing will be aborted
	*/
	beforeRemove: { type: require_runtime$1.definePropType(Function) },
	/**
	* @description hook function when files are removed
	*/
	onRemove: {
		type: require_runtime$1.definePropType(Function),
		default: _vue_shared.NOOP
	},
	/**
	* @description hook function when select file or upload file success or upload file fail
	*/
	onChange: {
		type: require_runtime$1.definePropType(Function),
		default: _vue_shared.NOOP
	},
	/**
	* @description hook function when clicking the uploaded files
	*/
	onPreview: {
		type: require_runtime$1.definePropType(Function),
		default: _vue_shared.NOOP
	},
	/**
	* @description hook function when uploaded successfully
	*/
	onSuccess: {
		type: require_runtime$1.definePropType(Function),
		default: _vue_shared.NOOP
	},
	/**
	* @description hook function when some progress occurs
	*/
	onProgress: {
		type: require_runtime$1.definePropType(Function),
		default: _vue_shared.NOOP
	},
	/**
	* @description hook function when some errors occurs
	*/
	onError: {
		type: require_runtime$1.definePropType(Function),
		default: _vue_shared.NOOP
	},
	/**
	* @description hook function when limit is exceeded
	*/
	onExceed: {
		type: require_runtime$1.definePropType(Function),
		default: _vue_shared.NOOP
	},
	/**
	* @description set HTML attribute: crossorigin.
	*/
	crossorigin: { type: require_runtime$1.definePropType(String) }
});
const uploadBasePropsDefaults = {
	action: "#",
	method: "post",
	data: () => require_typescript.mutable({}),
	name: "file",
	showFileList: true,
	accept: "",
	fileList: () => require_typescript.mutable([]),
	autoUpload: true,
	listType: "text",
	httpRequest: require_ajax.ajaxUpload,
	disabled: void 0
};
const uploadPropsDefaults = {
	...uploadBasePropsDefaults,
	beforeUpload: _vue_shared.NOOP,
	onRemove: _vue_shared.NOOP,
	onChange: _vue_shared.NOOP,
	onPreview: _vue_shared.NOOP,
	onSuccess: _vue_shared.NOOP,
	onProgress: _vue_shared.NOOP,
	onError: _vue_shared.NOOP,
	onExceed: _vue_shared.NOOP
};
//#endregion
exports.genFileId = genFileId;
exports.uploadBaseProps = uploadBaseProps;
exports.uploadBasePropsDefaults = uploadBasePropsDefaults;
exports.uploadListTypes = uploadListTypes;
exports.uploadProps = uploadProps;
exports.uploadPropsDefaults = uploadPropsDefaults;

//# sourceMappingURL=upload.js.map