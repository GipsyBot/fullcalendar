import { __extends } from "tslib";
import { ViewWrapper } from './ViewWrapper';
import { DayGridWrapper } from './DayGridWrapper';
import { DayHeaderWrapper } from './DayHeaderWrapper';
var DayGridViewWrapper = /** @class */ (function (_super) {
    __extends(DayGridViewWrapper, _super);
    function DayGridViewWrapper(calendar) {
        return _super.call(this, calendar, 'fc-daygrid') || this;
    }
    Object.defineProperty(DayGridViewWrapper.prototype, "header", {
        get: function () {
            var headerEl = this.el.querySelector('.fc-col-header');
            return headerEl ? new DayHeaderWrapper(headerEl) : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayGridViewWrapper.prototype, "dayGrid", {
        get: function () {
            return new DayGridWrapper(this.el.querySelector('.fc-daygrid-body'));
        },
        enumerable: false,
        configurable: true
    });
    DayGridViewWrapper.prototype.getScrollerEl = function () {
        return this.el.querySelector('.fc-daygrid-body').parentElement; // TODO: use closest
    };
    return DayGridViewWrapper;
}(ViewWrapper));
export { DayGridViewWrapper };
//# sourceMappingURL=DayGridViewWrapper.js.map