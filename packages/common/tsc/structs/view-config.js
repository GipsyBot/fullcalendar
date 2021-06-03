import { __assign } from "tslib";
import { mapHash } from '../util/object';
import { createElement } from '../vdom';
import { ViewRoot } from '../common/ViewRoot';
import { RenderHook } from '../common/render-hook';
import { ViewContextType } from '../ViewContext';
export function parseViewConfigs(inputs) {
    return mapHash(inputs, parseViewConfig);
}
function parseViewConfig(input) {
    var rawOptions = typeof input === 'function' ?
        { component: input } :
        input;
    var component = rawOptions.component;
    if (rawOptions.content) {
        component = createViewHookComponent(rawOptions);
        // TODO: remove content/classNames/didMount/etc from options?
    }
    return {
        superType: rawOptions.type,
        component: component,
        rawOptions: rawOptions,
    };
}
function createViewHookComponent(options) {
    return function (viewProps) { return (createElement(ViewContextType.Consumer, null, function (context) { return (createElement(ViewRoot, { viewSpec: context.viewSpec }, function (viewElRef, viewClassNames) {
        var hookProps = __assign(__assign({}, viewProps), { nextDayThreshold: context.options.nextDayThreshold });
        return (createElement(RenderHook, { hookProps: hookProps, classNames: options.classNames, content: options.content, didMount: options.didMount, willUnmount: options.willUnmount, elRef: viewElRef }, function (rootElRef, customClassNames, innerElRef, innerContent) { return (createElement("div", { className: viewClassNames.concat(customClassNames).join(' '), ref: rootElRef }, innerContent)); }));
    })); })); };
}
//# sourceMappingURL=view-config.js.map