import { ViewContextType } from '../ViewContext';
import { RenderHook } from './render-hook';
import { createElement } from '../vdom';
export var WeekNumberRoot = function (props) { return (createElement(ViewContextType.Consumer, null, function (context) {
    var dateEnv = context.dateEnv, options = context.options;
    var date = props.date;
    var format = options.weekNumberFormat || props.defaultFormat;
    var num = dateEnv.computeWeekNumber(date); // TODO: somehow use for formatting as well?
    var text = dateEnv.format(date, format);
    var hookProps = { num: num, text: text, date: date };
    return (createElement(RenderHook, { hookProps: hookProps, classNames: options.weekNumberClassNames, content: options.weekNumberContent, defaultContent: renderInner, didMount: options.weekNumberDidMount, willUnmount: options.weekNumberWillUnmount }, props.children));
})); };
function renderInner(innerProps) {
    return innerProps.text;
}
//# sourceMappingURL=WeekNumberRoot.js.map