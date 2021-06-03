import { __extends } from "tslib";
import { ViewWrapper } from './ViewWrapper';
import { TimeGridWrapper } from './TimeGridWrapper';
import { DayGridWrapper } from './DayGridWrapper';
import { DayHeaderWrapper } from './DayHeaderWrapper';
var TimeGridViewWrapper = /** @class */ (function (_super) {
    __extends(TimeGridViewWrapper, _super);
    function TimeGridViewWrapper(calendar) {
        return _super.call(this, calendar, 'fc-timegrid') || this;
    }
    Object.defineProperty(TimeGridViewWrapper.prototype, "header", {
        get: function () {
            var headerEl = this.el.querySelector('.fc-col-header');
            return headerEl ? new DayHeaderWrapper(headerEl) : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeGridViewWrapper.prototype, "timeGrid", {
        get: function () {
            return new TimeGridWrapper(this.el.querySelector('.fc-timegrid-body'));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeGridViewWrapper.prototype, "dayGrid", {
        get: function () {
            var dayGridEl = this.el.querySelector('.fc-daygrid-body');
            return dayGridEl ? new DayGridWrapper(dayGridEl) : null;
        },
        enumerable: false,
        configurable: true
    });
    TimeGridViewWrapper.prototype.getScrollerEl = function () {
        return this.el.querySelector('.fc-timegrid-body').parentElement; // TODO: use closest
    };
    TimeGridViewWrapper.prototype.getHeaderAxisEl = function () {
        return this.el.querySelector('.fc-col-header .fc-timegrid-axis');
    };
    TimeGridViewWrapper.prototype.getHeaderWeekNumberLink = function () {
        return this.getHeaderAxisEl().querySelector('a');
    };
    TimeGridViewWrapper.prototype.getHeaderWeekText = function () {
        return $(this.getHeaderWeekNumberLink()).text();
    };
    TimeGridViewWrapper.prototype.getAllDayAxisEl = function () {
        return this.el.querySelector('.fc-daygrid-body .fc-timegrid-axis');
    };
    TimeGridViewWrapper.prototype.getAllDayAxisElText = function () {
        return $(this.getAllDayAxisEl()).text();
    };
    return TimeGridViewWrapper;
}(ViewWrapper));
export { TimeGridViewWrapper };
//# sourceMappingURL=TimeGridViewWrapper.js.map