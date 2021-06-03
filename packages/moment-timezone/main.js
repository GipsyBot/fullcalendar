/*!
FullCalendar v5.7.1
Docs & License: https://fullcalendar.io/
(c) 2021 Adam Shaw
*/
import { __extends } from 'tslib';
import moment from 'moment';
import 'moment-timezone';
import { createPlugin, NamedTimeZoneImpl } from '@fullcalendar/common';

var MomentNamedTimeZone = /** @class */ (function (_super) {
    __extends(MomentNamedTimeZone, _super);
    function MomentNamedTimeZone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MomentNamedTimeZone.prototype.offsetForArray = function (a) {
        return moment.tz(a, this.timeZoneName).utcOffset();
    };
    MomentNamedTimeZone.prototype.timestampToArray = function (ms) {
        return moment.tz(ms, this.timeZoneName).toArray();
    };
    return MomentNamedTimeZone;
}(NamedTimeZoneImpl));
var main = createPlugin({
    namedTimeZonedImpl: MomentNamedTimeZone,
});

export default main;
//# sourceMappingURL=main.js.map
