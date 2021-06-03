import { __extends } from "tslib";
import { createElement, createRef, DayHeader, memoize, DaySeriesModel, DayTableModel, } from '@fullcalendar/common';
import { TableView } from './TableView';
import { DayTable } from './DayTable';
var DayTableView = /** @class */ (function (_super) {
    __extends(DayTableView, _super);
    function DayTableView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buildDayTableModel = memoize(buildDayTableModel);
        _this.headerRef = createRef();
        _this.tableRef = createRef();
        return _this;
    }
    DayTableView.prototype.render = function () {
        var _this = this;
        var _a = this.context, options = _a.options, dateProfileGenerator = _a.dateProfileGenerator;
        var props = this.props;
        var dayTableModel = this.buildDayTableModel(props.dateProfile, dateProfileGenerator);
        var headerContent = options.dayHeaders && (createElement(DayHeader, { ref: this.headerRef, dateProfile: props.dateProfile, dates: dayTableModel.headerDates, datesRepDistinctDays: dayTableModel.rowCnt === 1 }));
        var bodyContent = function (contentArg) { return (createElement(DayTable, { ref: _this.tableRef, dateProfile: props.dateProfile, dayTableModel: dayTableModel, businessHours: props.businessHours, dateSelection: props.dateSelection, eventStore: props.eventStore, eventUiBases: props.eventUiBases, eventSelection: props.eventSelection, eventDrag: props.eventDrag, eventResize: props.eventResize, nextDayThreshold: options.nextDayThreshold, colGroupNode: contentArg.tableColGroupNode, tableMinWidth: contentArg.tableMinWidth, dayMaxEvents: options.dayMaxEvents, dayMaxEventRows: options.dayMaxEventRows, showWeekNumbers: options.weekNumbers, expandRows: !props.isHeightAuto, headerAlignElRef: _this.headerElRef, clientWidth: contentArg.clientWidth, clientHeight: contentArg.clientHeight, forPrint: props.forPrint })); };
        return options.dayMinWidth
            ? this.renderHScrollLayout(headerContent, bodyContent, dayTableModel.colCnt, options.dayMinWidth)
            : this.renderSimpleLayout(headerContent, bodyContent);
    };
    return DayTableView;
}(TableView));
export { DayTableView };
export function buildDayTableModel(dateProfile, dateProfileGenerator) {
    var daySeries = new DaySeriesModel(dateProfile.renderRange, dateProfileGenerator);
    return new DayTableModel(daySeries, /year|month|week/.test(dateProfile.currentRangeUnit));
}
//# sourceMappingURL=DayTableView.js.map