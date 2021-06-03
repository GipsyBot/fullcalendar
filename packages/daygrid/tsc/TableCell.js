import { __assign, __extends } from "tslib";
import { createElement, DateComponent, buildNavLinkData, WeekNumberRoot, DayCellRoot, setRef, createFormatter, createRef, } from '@fullcalendar/common';
import { TableCellTop } from './TableCellTop';
import { TableCellMoreLink } from './TableCellMoreLink';
var DEFAULT_WEEK_NUM_FORMAT = createFormatter({ week: 'narrow' });
var TableCell = /** @class */ (function (_super) {
    __extends(TableCell, _super);
    function TableCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rootElRef = createRef();
        _this.handleRootEl = function (el) {
            setRef(_this.rootElRef, el);
            setRef(_this.props.elRef, el);
        };
        return _this;
    }
    TableCell.prototype.render = function () {
        var _a = this, props = _a.props, context = _a.context, rootElRef = _a.rootElRef;
        var options = context.options;
        var date = props.date, dateProfile = props.dateProfile;
        var navLinkAttrs = options.navLinks
            ? { 'data-navlink': buildNavLinkData(date, 'week'), tabIndex: 0 }
            : {};
        return (createElement(DayCellRoot, { date: date, dateProfile: dateProfile, todayRange: props.todayRange, showDayNumber: props.showDayNumber, extraHookProps: props.extraHookProps, elRef: this.handleRootEl }, function (dayElRef, dayClassNames, rootDataAttrs, isDisabled) { return (createElement("td", __assign({ ref: dayElRef, className: ['fc-daygrid-day'].concat(dayClassNames, props.extraClassNames || []).join(' ') }, rootDataAttrs, props.extraDataAttrs),
            createElement("div", { className: "fc-daygrid-day-frame fc-scrollgrid-sync-inner", ref: props.innerElRef /* different from hook system! RENAME */ },
                props.showWeekNumber && (createElement(WeekNumberRoot, { date: date, defaultFormat: DEFAULT_WEEK_NUM_FORMAT }, function (weekElRef, weekClassNames, innerElRef, innerContent) { return (createElement("a", __assign({ ref: weekElRef, className: ['fc-daygrid-week-number'].concat(weekClassNames).join(' ') }, navLinkAttrs), innerContent)); })),
                !isDisabled && (createElement(TableCellTop, { date: date, dateProfile: dateProfile, showDayNumber: props.showDayNumber, forceDayTop: props.forceDayTop, todayRange: props.todayRange, extraHookProps: props.extraHookProps })),
                createElement("div", { className: "fc-daygrid-day-events", ref: props.fgContentElRef },
                    props.fgContent,
                    createElement("div", { className: "fc-daygrid-day-bottom", style: { marginTop: props.moreMarginTop } },
                        createElement(TableCellMoreLink, { allDayDate: date, singlePlacements: props.singlePlacements, moreCnt: props.moreCnt, alignmentElRef: rootElRef, alignGridTop: !props.showDayNumber, extraDateSpan: props.extraDateSpan, dateProfile: props.dateProfile, eventSelection: props.eventSelection, eventDrag: props.eventDrag, eventResize: props.eventResize, todayRange: props.todayRange }))),
                createElement("div", { className: "fc-daygrid-day-bg" }, props.bgContent)))); }));
    };
    return TableCell;
}(DateComponent));
export { TableCell };
//# sourceMappingURL=TableCell.js.map