import { __extends } from "tslib";
import { Splitter, hasBgRendering, } from '@fullcalendar/common';
var AllDaySplitter = /** @class */ (function (_super) {
    __extends(AllDaySplitter, _super);
    function AllDaySplitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AllDaySplitter.prototype.getKeyInfo = function () {
        return {
            allDay: {},
            timed: {},
        };
    };
    AllDaySplitter.prototype.getKeysForDateSpan = function (dateSpan) {
        if (dateSpan.allDay) {
            return ['allDay'];
        }
        return ['timed'];
    };
    AllDaySplitter.prototype.getKeysForEventDef = function (eventDef) {
        if (!eventDef.allDay) {
            return ['timed'];
        }
        if (hasBgRendering(eventDef)) {
            return ['timed', 'allDay'];
        }
        return ['allDay'];
    };
    return AllDaySplitter;
}(Splitter));
export { AllDaySplitter };
//# sourceMappingURL=AllDaySplitter.js.map