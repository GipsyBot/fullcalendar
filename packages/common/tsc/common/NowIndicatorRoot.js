import { RenderHook } from './render-hook';
import { ViewContextType } from '../ViewContext';
import { createElement } from '../vdom';
export var NowIndicatorRoot = function (props) { return (createElement(ViewContextType.Consumer, null, function (context) {
    var options = context.options;
    var hookProps = {
        isAxis: props.isAxis,
        date: context.dateEnv.toDate(props.date),
        view: context.viewApi,
    };
    return (createElement(RenderHook, { hookProps: hookProps, classNames: options.nowIndicatorClassNames, content: options.nowIndicatorContent, didMount: options.nowIndicatorDidMount, willUnmount: options.nowIndicatorWillUnmount }, props.children));
})); };
//# sourceMappingURL=NowIndicatorRoot.js.map