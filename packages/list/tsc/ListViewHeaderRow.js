import { __assign, __extends } from "tslib";
import { BaseComponent, createElement, getDateMeta, RenderHook, buildNavLinkData, getDayClassNames, formatDayString, Fragment, } from '@fullcalendar/common';
var ListViewHeaderRow = /** @class */ (function (_super) {
    __extends(ListViewHeaderRow, _super);
    function ListViewHeaderRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListViewHeaderRow.prototype.render = function () {
        var _a = this.props, dayDate = _a.dayDate, todayRange = _a.todayRange;
        var _b = this.context, theme = _b.theme, dateEnv = _b.dateEnv, options = _b.options, viewApi = _b.viewApi;
        var dayMeta = getDateMeta(dayDate, todayRange);
        // will ever be falsy?
        var text = options.listDayFormat ? dateEnv.format(dayDate, options.listDayFormat) : '';
        // will ever be falsy? also, BAD NAME "alt"
        var sideText = options.listDaySideFormat ? dateEnv.format(dayDate, options.listDaySideFormat) : '';
        var navLinkData = options.navLinks
            ? buildNavLinkData(dayDate)
            : null;
        var hookProps = __assign({ date: dateEnv.toDate(dayDate), view: viewApi, text: text,
            sideText: sideText,
            navLinkData: navLinkData }, dayMeta);
        var classNames = ['fc-list-day'].concat(getDayClassNames(dayMeta, theme));
        // TODO: make a reusable HOC for dayHeader (used in daygrid/timegrid too)
        return (createElement(RenderHook, { hookProps: hookProps, classNames: options.dayHeaderClassNames, content: options.dayHeaderContent, defaultContent: renderInnerContent, didMount: options.dayHeaderDidMount, willUnmount: options.dayHeaderWillUnmount }, function (rootElRef, customClassNames, innerElRef, innerContent) { return (createElement("tr", { ref: rootElRef, className: classNames.concat(customClassNames).join(' '), "data-date": formatDayString(dayDate) },
            createElement("th", { colSpan: 3 },
                createElement("div", { className: 'fc-list-day-cushion ' + theme.getClass('tableCellShaded'), ref: innerElRef }, innerContent)))); }));
    };
    return ListViewHeaderRow;
}(BaseComponent));
export { ListViewHeaderRow };
function renderInnerContent(props) {
    var navLinkAttrs = props.navLinkData // is there a type for this?
        ? { 'data-navlink': props.navLinkData, tabIndex: 0 }
        : {};
    return (createElement(Fragment, null,
        props.text && (createElement("a", __assign({ className: "fc-list-day-text" }, navLinkAttrs), props.text)),
        props.sideText && (createElement("a", __assign({ className: "fc-list-day-side-text" }, navLinkAttrs), props.sideText))));
}
//# sourceMappingURL=ListViewHeaderRow.js.map