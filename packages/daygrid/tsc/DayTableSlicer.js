import { __extends } from "tslib";
import { Slicer } from '@fullcalendar/common';
var DayTableSlicer = /** @class */ (function (_super) {
    __extends(DayTableSlicer, _super);
    function DayTableSlicer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.forceDayIfListItem = true;
        return _this;
    }
    DayTableSlicer.prototype.sliceRange = function (dateRange, dayTableModel) {
        return dayTableModel.sliceRange(dateRange);
    };
    return DayTableSlicer;
}(Slicer));
export { DayTableSlicer };
//# sourceMappingURL=DayTableSlicer.js.map