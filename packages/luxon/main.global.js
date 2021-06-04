/*!
FullCalendar v5.7.0
Docs & License: https://fullcalendar.io/
(c) 2021 Adam Shaw
*/
var FullCalendarLuxon = (function (exports, common, luxon) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function toLuxonDateTime(date, calendar) {
        if (!(calendar instanceof common.CalendarApi)) {
            throw new Error('must supply a CalendarApi instance');
        }
        var dateEnv = calendar.getCurrentData().dateEnv;
        return luxon.DateTime.fromJSDate(date, {
            zone: dateEnv.timeZone,
            locale: dateEnv.locale.codes[0],
        });
    }
    function toLuxonDuration(duration, calendar) {
        if (!(calendar instanceof common.CalendarApi)) {
            throw new Error('must supply a CalendarApi instance');
        }
        var dateEnv = calendar.getCurrentData().dateEnv;
        return luxon.Duration.fromObject(__assign(__assign({}, duration), { locale: dateEnv.locale.codes[0] }));
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
            return luxonToArray(luxon.DateTime.fromMillis(ms, {
                zone: this.timeZoneName,
            }));
        };
        return LuxonNamedTimeZone;
    }(common.NamedTimeZoneImpl));
    function formatWithCmdStr(cmdStr, arg) {
        var cmd = parseCmdStr(cmdStr);
        if (arg.end) {
            var start = arrayToLuxon(arg.start.array, arg.timeZone, arg.localeCodes[0]);
            var end = arrayToLuxon(arg.end.array, arg.timeZone, arg.localeCodes[0]);
            return formatRange(cmd, start.toFormat.bind(start), end.toFormat.bind(end), arg.defaultSeparator);
        }
        return arrayToLuxon(arg.date.array, arg.timeZone, arg.localeCodes[0]).toFormat(cmd.whole);
    }
    var plugin = common.createPlugin({
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
        return luxon.DateTime.fromObject({
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

    common.globalPlugins.push(plugin);

    exports.default = plugin;
    exports.toLuxonDateTime = toLuxonDateTime;
    exports.toLuxonDuration = toLuxonDuration;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}, FullCalendar, luxon));
