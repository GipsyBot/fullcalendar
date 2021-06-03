import { __assign, __extends } from "tslib";
import { createElement, createRef, DateComponent, } from '@fullcalendar/common';
import { Table } from './Table';
import { DayTableSlicer } from './DayTableSlicer';
var DayTable = /** @class */ (function (_super) {
    __extends(DayTable, _super);
    function DayTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.slicer = new DayTableSlicer();
        _this.tableRef = createRef();
        return _this;
    }
    DayTable.prototype.render = function () {
        var _a = this, props = _a.props, context = _a.context;
        return (createElement(Table, __assign({ ref: this.tableRef }, this.slicer.sliceProps(props, props.dateProfile, props.nextDayThreshold, context, props.dayTableModel), { dateProfile: props.dateProfile, cells: props.dayTableModel.cells, colGroupNode: props.colGroupNode, tableMinWidth: props.tableMinWidth, renderRowIntro: props.renderRowIntro, dayMaxEvents: props.dayMaxEvents, dayMaxEventRows: props.dayMaxEventRows, showWeekNumbers: props.showWeekNumbers, expandRows: props.expandRows, headerAlignElRef: props.headerAlignElRef, clientWidth: props.clientWidth, clientHeight: props.clientHeight, forPrint: props.forPrint })));
    };
    return DayTable;
}(DateComponent));
export { DayTable };
//# sourceMappingURL=DayTable.js.map