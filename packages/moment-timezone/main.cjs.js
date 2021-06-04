/*!
FullCalendar v5.7.0
Docs & License: https://fullcalendar.io/
(c) 2021 Adam Shaw
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var moment = require('moment');
require('moment-timezone');
var common = require('@fullcalendar/common');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

var MomentNamedTimeZone = /** @class */ (function (_super) {
    tslib.__extends(MomentNamedTimeZone, _super);
    function MomentNamedTimeZone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MomentNamedTimeZone.prototype.offsetForArray = function (a) {
        return moment__default['default'].tz(a, this.timeZoneName).utcOffset();
    };
    MomentNamedTimeZone.prototype.timestampToArray = function (ms) {
        return moment__default['default'].tz(ms, this.timeZoneName).toArray();
    };
    return MomentNamedTimeZone;
}(common.NamedTimeZoneImpl));
var main = common.createPlugin({
    namedTimeZonedImpl: MomentNamedTimeZone,
});

exports.default = main;
