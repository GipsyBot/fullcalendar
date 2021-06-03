import { __assign, __extends } from "tslib";
import { createElement, buildNavLinkData, DayCellContent, BaseComponent, Fragment, } from '@fullcalendar/common';
var TableCellTop = /** @class */ (function (_super) {
    __extends(TableCellTop, _super);
    function TableCellTop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableCellTop.prototype.render = function () {
        var props = this.props;
        var navLinkAttrs = this.context.options.navLinks
            ? { 'data-navlink': buildNavLinkData(props.date), tabIndex: 0 }
            : {};
        return (createElement(DayCellContent, { date: props.date, dateProfile: props.dateProfile, todayRange: props.todayRange, showDayNumber: props.showDayNumber, extraHookProps: props.extraHookProps, defaultContent: renderTopInner }, function (innerElRef, innerContent) { return ((innerContent || props.forceDayTop) && (createElement("div", { className: "fc-daygrid-day-top", ref: innerElRef },
            createElement("a", __assign({ className: "fc-daygrid-day-number" }, navLinkAttrs), innerContent || createElement(Fragment, null, "\u00A0"))))); }));
    };
    return TableCellTop;
}(BaseComponent));
export { TableCellTop };
function renderTopInner(props) {
    return props.dayNumberText;
}
//# sourceMappingURL=TableCellTop.js.map