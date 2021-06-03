import { __extends } from "tslib";
import { BaseComponent, createElement, DayCellContent, } from '@fullcalendar/common';
var TimeColMisc = /** @class */ (function (_super) {
    __extends(TimeColMisc, _super);
    function TimeColMisc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeColMisc.prototype.render = function () {
        var props = this.props;
        return (createElement(DayCellContent, { date: props.date, dateProfile: props.dateProfile, todayRange: props.todayRange, extraHookProps: props.extraHookProps }, function (innerElRef, innerContent) { return (innerContent &&
            createElement("div", { className: "fc-timegrid-col-misc", ref: innerElRef }, innerContent)); }));
    };
    return TimeColMisc;
}(BaseComponent));
export { TimeColMisc };
//# sourceMappingURL=TimeColMisc.js.map