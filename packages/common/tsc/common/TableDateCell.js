import { __assign, __extends } from "tslib";
import { getDayClassNames, getDateMeta } from '../component/date-rendering';
import { createElement } from '../vdom';
import { formatDayString } from '../datelib/formatting-utils';
import { BaseComponent } from '../vdom-util';
import { RenderHook } from './render-hook';
import { buildNavLinkData } from './nav-link';
import { CLASS_NAME, renderInner } from './table-cell-util';
var TableDateCell = /** @class */ (function (_super) {
    __extends(TableDateCell, _super);
    function TableDateCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableDateCell.prototype.render = function () {
        var _a = this.context, dateEnv = _a.dateEnv, options = _a.options, theme = _a.theme, viewApi = _a.viewApi;
        var props = this.props;
        var date = props.date, dateProfile = props.dateProfile;
        var dayMeta = getDateMeta(date, props.todayRange, null, dateProfile);
        var classNames = [CLASS_NAME].concat(getDayClassNames(dayMeta, theme));
        var text = dateEnv.format(date, props.dayHeaderFormat);
        // if colCnt is 1, we are already in a day-view and don't need a navlink
        var navLinkAttrs = (options.navLinks && !dayMeta.isDisabled && props.colCnt > 1)
            ? { 'data-navlink': buildNavLinkData(date), tabIndex: 0 }
            : {};
        var hookProps = __assign(__assign(__assign({ date: dateEnv.toDate(date), view: viewApi }, props.extraHookProps), { text: text }), dayMeta);
        return (createElement(RenderHook, { hookProps: hookProps, classNames: options.dayHeaderClassNames, content: options.dayHeaderContent, defaultContent: renderInner, didMount: options.dayHeaderDidMount, willUnmount: options.dayHeaderWillUnmount }, function (rootElRef, customClassNames, innerElRef, innerContent) { return (createElement("th", __assign({ ref: rootElRef, className: classNames.concat(customClassNames).join(' '), "data-date": !dayMeta.isDisabled ? formatDayString(date) : undefined, colSpan: props.colSpan }, props.extraDataAttrs),
            createElement("div", { className: "fc-scrollgrid-sync-inner" }, !dayMeta.isDisabled && (createElement("a", __assign({ ref: innerElRef, className: [
                    'fc-col-header-cell-cushion',
                    props.isSticky ? 'fc-sticky' : '',
                ].join(' ') }, navLinkAttrs), innerContent))))); }));
    };
    return TableDateCell;
}(BaseComponent));
export { TableDateCell };
//# sourceMappingURL=TableDateCell.js.map