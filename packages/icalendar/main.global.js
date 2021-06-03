/*!
FullCalendar v5.7.1
Docs & License: https://fullcalendar.io/
(c) 2021 Adam Shaw
*/
var FullCalendarICalendar = (function (exports, common, ICAL) {
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

    var eventSourceDef = {
        parseMeta: function (refined) {
            if (refined.url && refined.format === 'ics') {
                return {
                    url: refined.url,
                    format: 'ics',
                };
            }
            return null;
        },
        fetch: function (arg, onSuccess, onFailure) {
            var meta = arg.eventSource.meta;
            var internalState = meta.internalState;
            function handleICalEvents(errorMessage, iCalEvents, xhr) {
                if (errorMessage) {
                    onFailure({ message: errorMessage, xhr: xhr });
                }
                else {
                    onSuccess({ rawEvents: expandICalEvents(iCalEvents, arg.range), xhr: xhr });
                }
            }
            /*
            NOTE: isRefetch is a HACK. we would do the recurring-expanding in a separate plugin hook,
            but we couldn't leverage built-in allDay-guessing, among other things.
            */
            if (!internalState || arg.isRefetch) {
                internalState = meta.internalState = {
                    completed: false,
                    callbacks: [handleICalEvents],
                    errorMessage: '',
                    iCalEvents: [],
                    xhr: null,
                };
                requestICal(meta.url, function (rawFeed, xhr) {
                    var iCalEvents = parseICalFeed(rawFeed);
                    for (var _i = 0, _a = internalState.callbacks; _i < _a.length; _i++) {
                        var callback = _a[_i];
                        callback('', iCalEvents, xhr);
                    }
                    internalState.completed = true;
                    internalState.callbacks = [];
                    internalState.iCalEvents = iCalEvents;
                    internalState.xhr = xhr;
                }, function (errorMessage, xhr) {
                    for (var _i = 0, _a = internalState.callbacks; _i < _a.length; _i++) {
                        var callback = _a[_i];
                        callback(errorMessage, [], xhr);
                    }
                    internalState.completed = true;
                    internalState.callbacks = [];
                    internalState.errorMessage = errorMessage;
                    internalState.xhr = xhr;
                });
            }
            else if (!internalState.completed) {
                internalState.callbacks.push(handleICalEvents);
            }
            else {
                handleICalEvents(internalState.errorMessage, internalState.iCalEvents, internalState.xhr);
            }
        },
    };
    function requestICal(url, successCallback, failureCallback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 400) {
                successCallback(xhr.responseText, xhr);
            }
            else {
                failureCallback('Request failed', xhr);
            }
        };
        xhr.onerror = function () { return failureCallback('Request failed', xhr); };
        xhr.send(null);
    }
    function parseICalFeed(feedStr) {
        var components = null;
        try {
            var feed = ICAL.parse(feedStr);
            var rootComponent = new ICAL.Component(feed);
            components = rootComponent.getAllSubcomponents('vevent');
        }
        catch (error) {
            console.warn("Error parsing feed: " + error);
            return [];
        }
        var iCalEvents = [];
        for (var _i = 0, components_1 = components; _i < components_1.length; _i++) {
            var component = components_1[_i];
            try {
                var iCalEvent = new ICAL.Event(component);
                if (iCalEvent.startDate) { // is an accessor method. if throws an error, is a bad event
                    iCalEvents.push(iCalEvent);
                }
            }
            catch (error) {
                console.warn("Unable to process item in calendar: " + error);
            }
        }
        return iCalEvents;
    }
    function expandICalEvents(iCalEvents, range) {
        var eventInputs = [];
        for (var _i = 0, iCalEvents_1 = iCalEvents; _i < iCalEvents_1.length; _i++) {
            var iCalEvent = iCalEvents_1[_i];
            if (iCalEvent.isRecurring()) {
                eventInputs.push.apply(eventInputs, expandRecurringEvent(iCalEvent, range));
            }
            else {
                eventInputs.push(buildSingleEvent(iCalEvent));
            }
        }
        return eventInputs;
    }
    function buildSingleEvent(iCalEvent) {
        return __assign(__assign({}, buildNonDateProps(iCalEvent)), { start: iCalEvent.startDate.toString(), end: (specifiesEnd(iCalEvent) && iCalEvent.endDate)
                ? iCalEvent.endDate.toString()
                : null });
    }
    /*
    This is suprisingly involved and not built-in to ical.js:
    https://github.com/mozilla-comm/ical.js/issues/285
    https://github.com/mifi/ical-expander/blob/master/index.js
    TODO: handle VEVENTs that are *exceptions*
    */
    function expandRecurringEvent(iCalEvent, range) {
        var rangeStart = common.addDays(range.start, -1);
        var rangeEnd = common.addDays(range.end, 1);
        var expansion = iCalEvent.iterator();
        var hasDuration = specifiesEnd(iCalEvent);
        var eventInputs = [];
        var startDateTime;
        while ((startDateTime = expansion.next())) { // will start expanding ALL occurences
            var startDate = startDateTime.toJSDate();
            var endDate = null;
            var endDateTime = null;
            if (hasDuration) {
                endDateTime = startDateTime.clone();
                endDateTime.addDuration(iCalEvent.duration);
                endDate = endDateTime.toJSDate();
            }
            if (startDate >= rangeEnd.valueOf()) { // is event's start on-or-after the range's end?
                break;
            }
            else if ((endDate || startDate) > rangeStart.valueOf()) { // is event's end after the range's start?
                eventInputs.push(__assign(__assign({}, buildNonDateProps(iCalEvent)), { start: startDateTime.toString(), end: endDateTime ? endDateTime.toString() : null }));
            }
        }
        return eventInputs;
    }
    function buildNonDateProps(iCalEvent) {
        return {
            title: iCalEvent.summary,
            url: extractEventUrl(iCalEvent),
            extendedProps: {
                location: iCalEvent.location,
                organizer: iCalEvent.organizer,
                description: iCalEvent.description,
            },
        };
    }
    function extractEventUrl(iCalEvent) {
        var urlProp = iCalEvent.component.getFirstProperty('url');
        return urlProp ? urlProp.getFirstValue() : '';
    }
    function specifiesEnd(iCalEvent) {
        return Boolean(iCalEvent.component.getFirstProperty('dtend')) ||
            Boolean(iCalEvent.component.getFirstProperty('duration'));
    }
    var plugin = common.createPlugin({
        eventSourceDefs: [eventSourceDef],
    });

    common.globalPlugins.push(plugin);

    exports.default = plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}, FullCalendar, ICAL));
