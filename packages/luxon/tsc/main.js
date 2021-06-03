import { __assign, __extends } from "tslib";
import { DateTime as LuxonDateTime, Duration as LuxonDuration } from 'luxon';
import { NamedTimeZoneImpl, createPlugin, CalendarApi } from '@fullcalendar/common';
export function toLuxonDateTime(date, calendar) {
    if (!(calendar instanceof CalendarApi)) {
        throw new Error('must supply a CalendarApi instance');
    }
    var dateEnv = calendar.getCurrentData().dateEnv;
    return LuxonDateTime.fromJSDate(date, {
        zone: dateEnv.timeZone,
        locale: dateEnv.locale.codes[0],
    });
}
export function toLuxonDuration(duration, calendar) {
    if (!(calendar instanceof CalendarApi)) {
        throw new Error('must supply a CalendarApi instance');
    }
    var dateEnv = calendar.getCurrentData().dateEnv;
    return LuxonDuration.fromObject(__assign(__assign({}, duration), { locale: dateEnv.locale.codes[0] }));
}
var LuxonNamedTimeZone = /** @class */ (function (_super) {
    __extends(LuxonNamedTimeZone, _super);
    function LuxonNamedTimeZone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LuxonNamedTimeZone.prototype.offsetForArray = function (a) {
        return arrayToLuxon(a, this.timeZoneName).offset;
    };
    LuxonNamedTimeZone.prototype.timestampToArray = function (ms) {
        return luxonToArray(LuxonDateTime.fromMillis(ms, {
            zone: this.timeZoneName,
        }));
    };
    return LuxonNamedTimeZone;
}(NamedTimeZoneImpl));
function formatWithCmdStr(cmdStr, arg) {
    var cmd = parseCmdStr(cmdStr);
    if (arg.end) {
        var start = arrayToLuxon(arg.start.array, arg.timeZone, arg.localeCodes[0]);
        var end = arrayToLuxon(arg.end.array, arg.timeZone, arg.localeCodes[0]);
        return formatRange(cmd, start.toFormat.bind(start), end.toFormat.bind(end), arg.defaultSeparator);
    }
    return arrayToLuxon(arg.date.array, arg.timeZone, arg.localeCodes[0]).toFormat(cmd.whole);
}
export default createPlugin({
    cmdFormatter: formatWithCmdStr,
    namedTimeZonedImpl: LuxonNamedTimeZone,
});
function luxonToArray(datetime) {
    return [
        datetime.year,
        datetime.month - 1,
        datetime.day,
        datetime.hour,
        datetime.minute,
        datetime.second,
        datetime.millisecond,
    ];
}
function arrayToLuxon(arr, timeZone, locale) {
    return LuxonDateTime.fromObject({
        zone: timeZone,
        locale: locale,
        year: arr[0],
        month: arr[1] + 1,
        day: arr[2],
        hour: arr[3],
        minute: arr[4],
        second: arr[5],
        millisecond: arr[6],
    });
}
function parseCmdStr(cmdStr) {
    var parts = cmdStr.match(/^(.*?)\{(.*)\}(.*)$/); // TODO: lookbehinds for escape characters
    if (parts) {
        var middle = parseCmdStr(parts[2]);
        return {
            head: parts[1],
            middle: middle,
            tail: parts[3],
            whole: parts[1] + middle.whole + parts[3],
        };
    }
    return {
        head: null,
        middle: null,
        tail: null,
        whole: cmdStr,
    };
}
function formatRange(cmd, formatStart, formatEnd, separator) {
    if (cmd.middle) {
        var startHead = formatStart(cmd.head);
        var startMiddle = formatRange(cmd.middle, formatStart, formatEnd, separator);
        var startTail = formatStart(cmd.tail);
        var endHead = formatEnd(cmd.head);
        var endMiddle = formatRange(cmd.middle, formatStart, formatEnd, separator);
        var endTail = formatEnd(cmd.tail);
        if (startHead === endHead && startTail === endTail) {
            return startHead +
                (startMiddle === endMiddle ? startMiddle : startMiddle + separator + endMiddle) +
                startTail;
        }
    }
    var startWhole = formatStart(cmd.whole);
    var endWhole = formatEnd(cmd.whole);
    if (startWhole === endWhole) {
        return startWhole;
    }
    return startWhole + separator + endWhole;
}
//# sourceMappingURL=main.js.map