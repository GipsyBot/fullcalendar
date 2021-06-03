import { __assign, __extends } from "tslib";
import { getDayClassNames } from '../component/date-rendering';
import { addDays } from '../datelib/marker';
import { createElement } from '../vdom';
import { BaseComponent } from '../vdom-util';
import { RenderHook } from './render-hook';
import { CLASS_NAME, renderInner } from './table-cell-util';
var TableDowCell = /** @class */ (function (_super) {
    __extends(TableDowCell, _super);
    function TableDowCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableDowCell.prototype.render = function () {
        var props = this.props;
        var _a = this.context, dateEnv = _a.dateEnv, theme = _a.theme, viewApi = _a.viewApi, options = _a.options;
        var date = addDays(new Date(259200000), props.dow); // start with Sun, 04 Jan 1970 00:00:00 GMT
        var dateMeta = {
            dow: props.dow,
            isDisabled: false,
            isFuture: false,
            isPast: false,
            isToday: false,
            isOther: false,
        };
        var classNames = [CLASS_NAME].concat(getDayClassNames(dateMeta, theme), props.extraClassNames || []);
        var text = dateEnv.format(date, props.dayHeaderFormat);
        var hookProps = __assign(__assign(__assign(__assign({ // TODO: make this public?
            date: date }, dateMeta), { view: viewApi }), props.extraHookProps), { text: text });
        return (createElement(RenderHook, { hookProps: hookProps, classNames: options.dayHeaderClassNames, content: options.dayHeaderContent, defaultContent: renderInner, didMount: options.dayHeaderDidMount, willUnmount: options.dayHeaderWillUnmount }, function (rootElRef, customClassNames, innerElRef, innerContent) { return (createElement("th", __assign({ ref: rootElRef, className: classNames.concat(customClassNames).join(' '), colSpan: props.colSpan }, props.extraDataAttrs),
            createElement("div", { className: "fc-scrollgrid-sync-inner" },
                createElement("a", { className: [
                        'fc-col-header-cell-cushion',
                        props.isSticky ? 'fc-sticky' : '',
                    ].join(' '), ref: innerElRef }, innerContent)))); }));
    };
    return TableDowCell;
}(BaseComponent));
export { TableDowCell };
//# sourceMappingURL=TableDowCell.js.map