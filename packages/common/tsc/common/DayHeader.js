import { __extends } from "tslib";
import { BaseComponent } from '../vdom-util';
import { computeFallbackHeaderFormat } from './table-utils';
import { createElement } from '../vdom';
import { TableDateCell } from './TableDateCell';
import { TableDowCell } from './TableDowCell';
import { NowTimer } from '../NowTimer';
import { memoize } from '../util/memoize';
var DayHeader = /** @class */ (function (_super) {
    __extends(DayHeader, _super);
    function DayHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.createDayHeaderFormatter = memoize(createDayHeaderFormatter);
        return _this;
    }
    DayHeader.prototype.render = function () {
        var context = this.context;
        var _a = this.props, dates = _a.dates, dateProfile = _a.dateProfile, datesRepDistinctDays = _a.datesRepDistinctDays, renderIntro = _a.renderIntro;
        var dayHeaderFormat = this.createDayHeaderFormatter(context.options.dayHeaderFormat, datesRepDistinctDays, dates.length);
        return (createElement(NowTimer, { unit: "day" }, function (nowDate, todayRange) { return (createElement("tr", null,
            renderIntro && renderIntro('day'),
            dates.map(function (date) { return (datesRepDistinctDays ? (createElement(TableDateCell, { key: date.toISOString(), date: date, dateProfile: dateProfile, todayRange: todayRange, colCnt: dates.length, dayHeaderFormat: dayHeaderFormat })) : (createElement(TableDowCell, { key: date.getUTCDay(), dow: date.getUTCDay(), dayHeaderFormat: dayHeaderFormat }))); }))); }));
    };
    return DayHeader;
}(BaseComponent));
export { DayHeader };
function createDayHeaderFormatter(explicitFormat, datesRepDistinctDays, dateCnt) {
    return explicitFormat || computeFallbackHeaderFormat(datesRepDistinctDays, dateCnt);
}
//# sourceMappingURL=DayHeader.js.map