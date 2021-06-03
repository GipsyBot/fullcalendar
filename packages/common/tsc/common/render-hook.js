/* eslint max-classes-per-file: off */
import { __assign, __extends } from "tslib";
import { createRef, createElement, createContext } from '../vdom';
import { setRef, BaseComponent } from '../vdom-util';
import { isPropsEqual } from '../util/object';
import { parseClassNames } from '../util/html';
// NOTE: in JSX, you should always use this class with <HookProps> arg. otherwise, will default to any???
var RenderHook = /** @class */ (function (_super) {
    __extends(RenderHook, _super);
    function RenderHook() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rootElRef = createRef();
        _this.handleRootEl = function (el) {
            setRef(_this.rootElRef, el);
            if (_this.props.elRef) {
                setRef(_this.props.elRef, el);
            }
        };
        return _this;
    }
    RenderHook.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var hookProps = props.hookProps;
        return (createElement(MountHook, { hookProps: hookProps, didMount: props.didMount, willUnmount: props.willUnmount, elRef: this.handleRootEl }, function (rootElRef) { return (createElement(ContentHook, { hookProps: hookProps, content: props.content, defaultContent: props.defaultContent, backupElRef: _this.rootElRef }, function (innerElRef, innerContent) { return props.children(rootElRef, normalizeClassNames(props.classNames, hookProps), innerElRef, innerContent); })); }));
    };
    return RenderHook;
}(BaseComponent));
export { RenderHook };
// TODO: rename to be about function, not default. use in above type
// for forcing rerender of components that use the ContentHook
export var CustomContentRenderContext = createContext(0);
export function ContentHook(props) {
    return (createElement(CustomContentRenderContext.Consumer, null, function (renderId) { return (createElement(ContentHookInner, __assign({ renderId: renderId }, props))); }));
}
var ContentHookInner = /** @class */ (function (_super) {
    __extends(ContentHookInner, _super);
    function ContentHookInner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.innerElRef = createRef();
        return _this;
    }
    ContentHookInner.prototype.render = function () {
        return this.props.children(this.innerElRef, this.renderInnerContent());
    };
    ContentHookInner.prototype.componentDidMount = function () {
        this.updateCustomContent();
    };
    ContentHookInner.prototype.componentDidUpdate = function () {
        this.updateCustomContent();
    };
    ContentHookInner.prototype.componentWillUnmount = function () {
        if (this.customContentInfo && this.customContentInfo.destroy) {
            this.customContentInfo.destroy();
        }
    };
    ContentHookInner.prototype.renderInnerContent = function () {
        var contentTypeHandlers = this.context.pluginHooks.contentTypeHandlers;
        var _a = this, props = _a.props, customContentInfo = _a.customContentInfo;
        var rawVal = props.content;
        var innerContent = normalizeContent(rawVal, props.hookProps);
        var innerContentVDom = null;
        if (innerContent === undefined) { // use the default
            innerContent = normalizeContent(props.defaultContent, props.hookProps);
        }
        if (innerContent !== undefined) { // we allow custom content handlers to return nothing
            if (customContentInfo) {
                customContentInfo.contentVal = innerContent[customContentInfo.contentKey];
            }
            else if (typeof innerContent === 'object') {
                // look for a prop that would indicate a custom content handler is needed
                for (var contentKey in contentTypeHandlers) {
                    if (innerContent[contentKey] !== undefined) {
                        var stuff = contentTypeHandlers[contentKey]();
                        customContentInfo = this.customContentInfo = __assign({ contentKey: contentKey, contentVal: innerContent[contentKey] }, stuff);
                        break;
                    }
                }
            }
            if (customContentInfo) {
                innerContentVDom = []; // signal that something was specified
            }
            else {
                innerContentVDom = innerContent; // assume a [p]react vdom node. use it
            }
        }
        return innerContentVDom;
    };
    ContentHookInner.prototype.updateCustomContent = function () {
        if (this.customContentInfo) {
            this.customContentInfo.render(this.innerElRef.current || this.props.backupElRef.current, // the element to render into
            this.customContentInfo.contentVal);
        }
    };
    return ContentHookInner;
}(BaseComponent));
var MountHook = /** @class */ (function (_super) {
    __extends(MountHook, _super);
    function MountHook() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleRootEl = function (rootEl) {
            _this.rootEl = rootEl;
            if (_this.props.elRef) {
                setRef(_this.props.elRef, rootEl);
            }
        };
        return _this;
    }
    MountHook.prototype.render = function () {
        return this.props.children(this.handleRootEl);
    };
    MountHook.prototype.componentDidMount = function () {
        var callback = this.props.didMount;
        if (callback) {
            callback(__assign(__assign({}, this.props.hookProps), { el: this.rootEl }));
        }
    };
    MountHook.prototype.componentWillUnmount = function () {
        var callback = this.props.willUnmount;
        if (callback) {
            callback(__assign(__assign({}, this.props.hookProps), { el: this.rootEl }));
        }
    };
    return MountHook;
}(BaseComponent));
export { MountHook };
export function buildClassNameNormalizer() {
    var currentGenerator;
    var currentHookProps;
    var currentClassNames = [];
    return function (generator, hookProps) {
        if (!currentHookProps || !isPropsEqual(currentHookProps, hookProps) || generator !== currentGenerator) {
            currentGenerator = generator;
            currentHookProps = hookProps;
            currentClassNames = normalizeClassNames(generator, hookProps);
        }
        return currentClassNames;
    };
}
function normalizeClassNames(classNames, hookProps) {
    if (typeof classNames === 'function') {
        classNames = classNames(hookProps);
    }
    return parseClassNames(classNames);
}
function normalizeContent(input, hookProps) {
    if (typeof input === 'function') {
        return input(hookProps, createElement); // give the function the vdom-creation func
    }
    return input;
}
//# sourceMappingURL=render-hook.js.map