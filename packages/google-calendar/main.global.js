/*!
FullCalendar v5.7.0
Docs & License: https://fullcalendar.io/
(c) 2021 Adam Shaw
*/
var FullCalendarGoogleCalendar = (function (exports, common) {
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

    // rename this file to options.ts like other packages?
    var OPTION_REFINERS = {
        googleCalendarApiKey: String,
    };

    var EVENT_SOURCE_REFINERS = {
        googleCalendarApiKey: String,
        googleCalendarId: String,
        googleCalendarApiBase: String,
        extraParams: common.identity,
    };

    // TODO: expose somehow
    var API_BASE = 'https://www.googleapis.com/calendar/v3/calendars';
    var eventSourceDef = {
        parseMeta: function (refined) {
            var googleCalendarId = refined.googleCalendarId;
            if (!googleCalendarId && refined.url) {
                googleCalendarId = parseGoogleCalendarId(refined.url);
            }
            if (googleCalendarId) {
                return {
                    googleCalendarId: googleCalendarId,
                    googleCalendarApiKey: refined.googleCalendarApiKey,
                    googleCalendarApiBase: refined.googleCalendarApiBase,
                    extraParams: refined.extraParams,
                };
            }
            return null;
        },
        fetch: function (arg, onSuccess, onFailure) {
            var _a = arg.context, dateEnv = _a.dateEnv, options = _a.options;
            var meta = arg.eventSource.meta;
            var apiKey = meta.googleCalendarApiKey || options.googleCalendarApiKey;
            if (!apiKey) {
                onFailure({
                    message: 'Specify a googleCalendarApiKey. See http://fullcalendar.io/docs/google_calendar/',
                });
            }
            else {
                var url = buildUrl(meta);
                // TODO: make DRY with json-feed-event-source
                var extraParams = meta.extraParams;
                var extraParamsObj = typeof extraParams === 'function' ? extraParams() : extraParams;
                var requestParams_1 = buildRequestParams(arg.range, apiKey, extraParamsObj, dateEnv);
                common.requestJson('GET', url, requestParams_1, function (body, xhr) {
                    if (body.error) {
                        onFailure({
                            message: 'Google Calendar API: ' + body.error.message,
                            errors: body.error.errors,
                            xhr: xhr,
                        });
                    }
                    else {
                        onSuccess({
                            rawEvents: gcalItemsToRawEventDefs(body.items, requestParams_1.timeZone),
                            xhr: xhr,
                        });
                    }
                }, function (message, xhr) {
                    onFailure({ message: message, xhr: xhr });
                });
            }
        },
    };
    function parseGoogleCalendarId(url) {
        var match;
        // detect if the ID was specified as a single string.
        // will match calendars like "asdf1234@calendar.google.com" in addition to person email calendars.
        if (/^[^/]+@([^/.]+\.)*(google|googlemail|gmail)\.com$/.test(url)) {
            return url;
        }
        if ((match = /^https:\/\/www.googleapis.com\/calendar\/v3\/calendars\/([^/]*)/.exec(url)) ||
            (match = /^https?:\/\/www.google.com\/calendar\/feeds\/([^/]*)/.exec(url))) {
            return decodeURIComponent(match[1]);
        }
        return null;
    }
    function buildUrl(meta) {
        var apiBase = meta.googleCalendarApiBase;
        if (!apiBase) {
            apiBase = API_BASE;
        }
        return apiBase + '/' + encodeURIComponent(meta.googleCalendarId) + '/events';
    }
    function buildRequestParams(range, apiKey, extraParams, dateEnv) {
        var params;
        var startStr;
        var endStr;
        if (dateEnv.canComputeOffset) {
            // strings will naturally have offsets, which GCal needs
            startStr = dateEnv.formatIso(range.start);
            endStr = dateEnv.formatIso(range.end);
        }
        else {
            // when timezone isn't known, we don't know what the UTC offset should be, so ask for +/- 1 day
            // from the UTC day-start to guarantee we're getting all the events
            // (start/end will be UTC-coerced dates, so toISOString is okay)
            startStr = common.addDays(range.start, -1).toISOString();
            endStr = common.addDays(range.end, 1).toISOString();
        }
        params = __assign(__assign({}, (extraParams || {})), { key: apiKey, timeMin: startStr, timeMax: endStr, singleEvents: true, maxResults: 9999 });
        if (dateEnv.timeZone !== 'local') {
            params.timeZone = dateEnv.timeZone;
        }
        return params;
    }
    function gcalItemsToRawEventDefs(items, gcalTimezone) {
        return items.map(function (item) { return gcalItemToRawEventDef(item, gcalTimezone); });
    }
    function gcalItemToRawEventDef(item, gcalTimezone) {
        var url = item.htmlLink || null;
        // make the URLs for each event show times in the correct timezone
        if (url && gcalTimezone) {
            url = injectQsComponent(url, 'ctz=' + gcalTimezone);
        }
        return {
            id: item.id,
            title: item.summary,
            start: item.start.dateTime || item.start.date,
            end: item.end.dateTime || item.end.date,
            url: url,
            location: item.location,
            description: item.description,
            attachments: item.attachments || [],
            extendedProps: (item.extendedProperties || {}).shared || {},
        };
    }
    // Injects a string like "arg=value" into the querystring of a URL
    // TODO: move to a general util file?
    function injectQsComponent(url, component) {
        // inject it after the querystring but before the fragment
        return url.replace(/(\?.*?)?(#|$)/, function (whole, qs, hash) { return (qs ? qs + '&' : '?') + component + hash; });
    }
    var plugin = common.createPlugin({
        eventSourceDefs: [eventSourceDef],
        optionRefiners: OPTION_REFINERS,
        eventSourceRefiners: EVENT_SOURCE_REFINERS,
    });

    common.globalPlugins.push(plugin);

    exports.default = plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}, FullCalendar));
