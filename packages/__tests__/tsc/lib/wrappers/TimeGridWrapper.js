import { findElements, startOfDay, createDuration, parseMarker, addDays, addMs, getRectCenter, asRoughMs } from '@fullcalendar/core';
import { formatIsoDay, formatIsoTime, ensureDate } from '../datelib-utils';
import { parseUtcDate } from '../date-parsing';
import { getBoundingRect } from '../dom-geom';
import { addPoints } from '../geom';
import { CalendarWrapper } from './CalendarWrapper';
var TimeGridWrapper = /** @class */ (function () {
    function TimeGridWrapper(el) {
        this.el = el;
    }
    TimeGridWrapper.prototype.getAllDayEls = function () {
        return findElements(this.el, '.fc-day[data-date]');
    };
    TimeGridWrapper.prototype.getMirrorEls = function () {
        return findElements(this.el, '.fc-event.fc-event-mirror');
    };
    TimeGridWrapper.prototype.getDayEls = function (date) {
        date = ensureDate(date);
        return findElements(this.el, '.fc-day[data-date="' + formatIsoDay(date) + '"]');
    };
    TimeGridWrapper.prototype.getSlotEls = function () {
        return findElements(this.el, '.fc-timegrid-slot-label[data-time]');
    };
    TimeGridWrapper.prototype.getAxisTexts = function () {
        return this.getSlotAxisEls().map(function (el) { return $(el).text(); });
    };
    TimeGridWrapper.prototype.getSlotAxisEls = function () {
        return findElements(this.el, '.fc-timegrid-slot-label[data-time]');
    };
    TimeGridWrapper.prototype.getSlotLaneEls = function () {
        return findElements(this.el, '.fc-timegrid-slot-lane[data-time]');
    };
    TimeGridWrapper.prototype.getSlotElByIndex = function (index) {
        return $(".fc-timegrid-slots tr:eq(" + index + ")", this.el).get();
    };
    TimeGridWrapper.prototype.getMainSlotTable = function () {
        return $('.fc-timegrid-slots > table')[0];
    };
    TimeGridWrapper.prototype.getSeparateSlotAxisTable = function () {
        return $('.fc-timegrid-axis-chunk > table')[0];
    };
    TimeGridWrapper.prototype.getSlotElByTime = function (timeMs) {
        var date = parseUtcDate('2016-01-01');
        date = new Date(date.valueOf() + timeMs);
        if (date.getUTCDate() === 1) { // ensure no time overflow/underflow
            return this.el.querySelector('.fc-timegrid-slot-label[data-time="' + formatIsoTime(date) + '"]');
        }
        return null;
    };
    TimeGridWrapper.prototype.getNonBusinessDayEls = function () {
        return findElements(this.el, '.fc-non-business');
    };
    TimeGridWrapper.prototype.getColEl = function (col) {
        return this.el.querySelectorAll('.fc-timegrid-col:not(.fc-timegrid-axis)')[col];
    };
    TimeGridWrapper.prototype.queryBgEventsInCol = function (col) {
        return findElements(this.getColEl(col), '.fc-bg-event');
    };
    TimeGridWrapper.prototype.queryNonBusinessSegsInCol = function (col) {
        return findElements(this.getColEl(col), '.fc-non-business');
    };
    TimeGridWrapper.prototype.getHighlightEls = function () {
        return findElements(this.el, '.fc-highlight');
    };
    // TODO: discourage use
    TimeGridWrapper.prototype.getDowEls = function (dayAbbrev) {
        return findElements(this.el, ".fc-day-" + dayAbbrev);
    };
    // for https://github.com/fullcalendar/fullcalendar-scheduler/issues/363
    TimeGridWrapper.prototype.isStructureValid = function () {
        return Boolean(this.el.querySelector('.fc-timegrid-slots'));
    };
    TimeGridWrapper.prototype.getMoreEls = function () {
        return findElements(this.el, '.fc-timegrid-more-link');
    };
    TimeGridWrapper.prototype.openMorePopover = function (index) {
        $(this.getMoreEls()[index || 0]).simulate('click');
    };
    TimeGridWrapper.prototype.getMorePopoverEl = function () {
        var viewWrapperEl = this.el.closest('.fc-view-harness');
        return viewWrapperEl.querySelector('.fc-more-popover');
    };
    TimeGridWrapper.prototype.getMorePopoverEventEls = function () {
        return findElements(this.getMorePopoverEl(), '.fc-event');
    };
    TimeGridWrapper.prototype.hasNowIndicator = function () {
        var hasArrow = Boolean(this.getNowIndicatorArrowEl());
        var hasLine = Boolean(this.getNowIndicatorLineEl());
        if (hasArrow !== hasLine) {
            throw new Error('Inconsistent now-indicator rendering state');
        }
        else {
            return hasArrow;
        }
    };
    TimeGridWrapper.prototype.getNowIndicatorArrowEl = function () {
        return this.el.querySelector('.fc-timegrid-now-indicator-arrow');
    };
    TimeGridWrapper.prototype.getNowIndicatorLineEl = function () {
        return this.el.querySelector('.fc-timegrid-now-indicator-line');
    };
    TimeGridWrapper.prototype.getTimeAxisInfo = function () {
        return $('.fc-timegrid-slot-label[data-time]', this.el).map(function (i, td) { return ({
            text: $(td).text(),
            isMajor: !$(td).hasClass('fc-timegrid-slot-minor'),
        }); }).get();
    };
    TimeGridWrapper.prototype.getLastMajorAxisInfo = function () {
        var cells = this.getTimeAxisInfo();
        for (var i = cells.length - 1; i >= 0; i -= 1) {
            if (cells[i].isMajor) {
                return cells[i];
            }
        }
        return null;
    };
    TimeGridWrapper.prototype.dragEventToDate = function (eventEl, dropDate, onBeforeRelease) {
        var _this = this;
        return new Promise(function (resolve) {
            $(eventEl).simulate('drag', {
                localPoint: { left: '50%', top: 5 },
                end: _this.getPoint(dropDate),
                onBeforeRelease: onBeforeRelease,
                onRelease: function () { return resolve(); },
            });
        });
    };
    TimeGridWrapper.prototype.resizeEvent = function (eventEl, origEndDate, newEndDate, onBeforeRelease) {
        var _this = this;
        return new Promise(function (resolve) {
            var resizerEl = $(eventEl).find('.' + CalendarWrapper.EVENT_RESIZER_CLASSNAME)
                .css('display', 'block')[0]; // usually only displays on hover. force display
            var resizerPoint = getRectCenter(resizerEl.getBoundingClientRect());
            var origPoint = _this.getPoint(origEndDate);
            var yCorrect = resizerPoint.top - origPoint.top;
            var destPoint = _this.getPoint(newEndDate);
            destPoint = addPoints(destPoint, { left: 0, top: yCorrect });
            $(resizerEl).simulate('drag', {
                end: destPoint,
                onBeforeRelease: onBeforeRelease,
                onRelease: function () { return resolve(); },
            });
        });
    };
    TimeGridWrapper.prototype.resizeEventTouch = function (eventEl, origEndDate, newEndDate) {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                $(eventEl).simulate('drag', {
                    isTouch: true,
                    localPoint: { left: '50%', top: '90%' },
                    delay: 200,
                    onRelease: function () {
                        var resizerEl = eventEl.querySelector('.' + CalendarWrapper.EVENT_RESIZER_CLASSNAME);
                        var resizerPoint = getRectCenter(resizerEl.getBoundingClientRect());
                        var origPoint = _this.getPoint(origEndDate);
                        var yCorrect = resizerPoint.top - origPoint.top;
                        var destPoint = _this.getPoint(newEndDate);
                        destPoint = addPoints(destPoint, { left: 0, top: yCorrect });
                        $(resizerEl).simulate('drag', {
                            isTouch: true,
                            end: destPoint,
                            onRelease: function () { return resolve(); },
                        });
                    },
                });
            }, 0);
        });
    };
    TimeGridWrapper.prototype.selectDates = function (start, end) {
        var _this = this;
        var startPoint = this.getPoint(start);
        var endPoint = this.getPoint(end, true);
        startPoint.top += 2;
        endPoint.top -= 2;
        return new Promise(function (resolve) {
            $(_this.getDayEls(start)).simulate('drag', {
                point: startPoint,
                end: endPoint,
                onRelease: function () { return resolve(); },
            });
        });
    };
    TimeGridWrapper.prototype.selectDatesTouch = function (start, end) {
        var dayEls = this.getDayEls(start);
        var startPoint = this.getPoint(start);
        var endPoint = this.getPoint(end, true);
        startPoint.top += 2;
        endPoint.top -= 2;
        return new Promise(function (resolve) {
            setTimeout(function () {
                // QUESTION: why do we not need to do press-down first?
                $(dayEls).simulate('drag', {
                    isTouch: true,
                    point: startPoint,
                    end: endPoint,
                    onRelease: function () { return resolve(); },
                });
            }, 0);
        });
    };
    TimeGridWrapper.prototype.clickDate = function (date) {
        var _this = this;
        return new Promise(function (resolve) {
            $(_this.getDayEls(date)).simulate('drag', {
                point: _this.getPoint(date),
                onRelease: function () { return resolve(); },
            });
        });
    };
    TimeGridWrapper.prototype.getRect = function (start, end) {
        var obj;
        if (typeof start === 'object') {
            obj = start;
            start = obj.start;
            end = obj.end;
        }
        start = ensureDate(start);
        end = ensureDate(end);
        var startDay = startOfDay(start);
        var endDay = startOfDay(end);
        var startTimeMs = start.valueOf() - startDay.valueOf();
        var endTimeMs = end.valueOf() - endDay.valueOf();
        if (startDay.valueOf() === endDay.valueOf()) {
            endTimeMs = end.valueOf() - endDay.valueOf();
        }
        else if (end < start) {
            endTimeMs = startTimeMs;
        }
        else {
            endTimeMs = 1000 * 60 * 60 * 24; // whole day
        }
        var dayEls = this.getDayEls(start);
        var dayRect = getBoundingRect(dayEls);
        return {
            left: dayRect.left,
            right: dayRect.right,
            top: this.getTimeTop(startTimeMs),
            bottom: this.getTimeTop(endTimeMs),
        };
    };
    TimeGridWrapper.prototype.getPoint = function (date, isEnd) {
        date = ensureDate(date);
        var day = startOfDay(date);
        var timeMs = date.valueOf() - day.valueOf();
        if (isEnd && !timeMs) {
            day = addDays(day, -1);
            timeMs = date.valueOf() - day.valueOf();
        }
        var top = this.getTimeTop(timeMs);
        var dayEls = this.getDayEls(day);
        var dayRect;
        expect(dayEls.length).toBe(1);
        dayRect = getBoundingRect(dayEls[0]);
        return {
            left: (dayRect.left + dayRect.right) / 2,
            top: top,
        };
    };
    TimeGridWrapper.prototype.getLine = function (date) {
        date = ensureDate(date);
        var day = startOfDay(date);
        var timeMs = date.valueOf() - day.valueOf();
        var top = this.getTimeTop(timeMs);
        var dayEls = this.getDayEls(date);
        var dayRect;
        expect(dayEls.length).toBe(1);
        dayRect = getBoundingRect(dayEls[0]);
        return {
            left: dayRect.left,
            right: dayRect.right,
            top: top,
            bottom: top,
        };
    };
    TimeGridWrapper.prototype.getTimeTop = function (targetTimeMs) {
        if (typeof targetTimeMs !== 'number') {
            targetTimeMs = asRoughMs(createDuration(targetTimeMs));
        }
        var topBorderWidth = 1; // TODO: kill
        var singleSlotEl = this.getSlotElByTime(targetTimeMs);
        if (singleSlotEl) { // exact slot match
            return $(singleSlotEl).offset().top + topBorderWidth;
        }
        var $slotEl; // used within loop, but we access last val
        var slotEls = this.getSlotEls(); // all slots
        var slotTimeMs = null;
        var prevSlotTimeMs = null;
        for (var i = 0; i < slotEls.length; i += 1) { // traverse earlier to later
            var slotEl = slotEls[i];
            $slotEl = $(slotEl);
            prevSlotTimeMs = slotTimeMs;
            slotTimeMs = createDuration(slotEl.getAttribute('data-time')).milliseconds;
            // is target time between start of previous slot but before this one?
            if (targetTimeMs < slotTimeMs) {
                // before first slot
                if (!prevSlotTimeMs) {
                    return $slotEl.offset().top + topBorderWidth;
                }
                var $prevSlotEl = $(slotEls[i - 1]);
                return $prevSlotEl.offset().top + // previous slot top
                    topBorderWidth +
                    ($prevSlotEl.outerHeight() *
                        ((targetTimeMs - prevSlotTimeMs) / (slotTimeMs - prevSlotTimeMs)));
            }
        }
        // target time must be after the start time of the last slot.
        // `slotTimeMs` is set to the start time of the last slot.
        // guess the duration of the last slot, based on previous duration
        var slotMsDuration = slotTimeMs - prevSlotTimeMs;
        return $slotEl.offset().top + // last slot's top
            topBorderWidth +
            ($slotEl.outerHeight() *
                Math.min(1, (targetTimeMs - slotTimeMs) / slotMsDuration)); // don't go past end of last slot
    };
    TimeGridWrapper.prototype.computeSpanRects = function (start, end) {
        start = ensureDate(start);
        end = ensureDate(end);
        var dayStructs = this.computeDayInfo();
        var slotStructs = this.computeSlotInfo();
        var dayI;
        var dayStruct;
        var slotI;
        var slotStruct;
        var slotDayStart;
        var slotStart;
        var slotEnd;
        var coverage;
        var startTop = null;
        var endTop = null;
        var rects = [];
        for (dayI = 0; dayI < dayStructs.length; dayI += 1) {
            dayStruct = dayStructs[dayI];
            for (slotI = 0; slotI < slotStructs.length; slotI += 1) {
                slotStruct = slotStructs[slotI];
                slotDayStart = addDays(dayStruct.date, slotStruct.dayOffset);
                slotStart = addMs(slotDayStart, slotStruct.startTimeMs);
                slotEnd = addMs(slotDayStart, slotStruct.endTimeMs);
                if (startTop === null) { // looking for the start
                    coverage = (start - slotStart.valueOf()) / (slotEnd.valueOf() - slotStart.valueOf());
                    startTop = (coverage > 0 && coverage <= 1)
                        ? (slotStruct.top + slotStruct.height * coverage)
                        : null;
                }
                else { // looking for the end
                    coverage = (end - slotStart.valueOf()) / (slotEnd.valueOf() - slotStart.valueOf());
                    endTop = (coverage >= 0 && coverage < 1) // exclusive
                        ? (slotStruct.top + slotStruct.height * coverage)
                        : null;
                    if (endTop !== null) { // found end
                        rects.push({
                            left: dayStruct.left,
                            right: dayStruct.right,
                            top: startTop,
                            bottom: endTop,
                            width: dayStruct.right - dayStruct.left,
                            height: endTop - startTop,
                        });
                        startTop = null;
                    }
                }
            }
            if (startTop !== null) { // could not find the start in this day
                rects.push({
                    left: dayStruct.left,
                    right: dayStruct.right,
                    top: startTop,
                    bottom: slotStruct.bottom,
                    width: dayStruct.right - dayStruct.left,
                    height: slotStruct.bottom - startTop,
                });
                startTop = slotStructs[0].top; // top of next column
            }
        }
        return rects;
    };
    TimeGridWrapper.prototype.computeDayInfo = function () {
        var dayEls = this.getAllDayEls();
        var days = dayEls.map(function (node) {
            var rect = node.getBoundingClientRect();
            return $.extend({}, rect, {
                date: parseMarker(node.getAttribute('data-date')).marker,
            });
        });
        return days;
    };
    TimeGridWrapper.prototype.computeSlotInfo = function () {
        var slotEls = this.getSlotEls();
        var slots = slotEls.map(function (node) {
            var rect = node.getBoundingClientRect();
            return $.extend({}, rect, {
                startTimeMs: createDuration(node.getAttribute('data-time')).milliseconds,
            });
        });
        var len = slots.length;
        if (len < 3) {
            console.log('need at least 3 slots'); // eslint-disable-line no-console
            return [];
        }
        var mid = Math.floor(len / 2);
        var i = mid - 1;
        var standardMs = slots[mid + 1].startTimeMs - slots[mid].startTimeMs;
        var ms;
        var dayOffset = 0;
        // iterate from one-before middle to beginning
        for (i = mid - 1; i >= 0; i -= 1) {
            ms = slots[i + 1].startTimeMs - slots[i].startTimeMs;
            // big deviation? assume moved to previous day (b/c of special slotMinTime)
            if (Math.abs(ms - standardMs) > standardMs * 2) {
                dayOffset -= 1;
                slots[i].endTimeMs = slots[i].startTimeMs + standardMs;
            }
            else { // otherwise, current slot's end is next slot's beginning
                slots[i].endTimeMs = slots[i + 1].startTimeMs;
            }
            slots[i].dayOffset = dayOffset;
        }
        dayOffset = 0;
        // iterate from middle to one-before last
        for (i = mid; i < len - 1; i += 1) {
            ms = slots[i + 1].startTimeMs - slots[i].startTimeMs;
            slots[i].dayOffset = dayOffset;
            // big deviation? assume moved to next day (b/c of special slotMaxTime)
            if (Math.abs(ms - standardMs) > standardMs * 2) {
                dayOffset += 1; // will apply to the next slotStruct
                slots[i].endTimeMs = slots[i].startTimeMs + standardMs;
            }
            else { // otherwise, current slot's end is next slot's beginning
                slots[i].endTimeMs = slots[i + 1].startTimeMs;
            }
        }
        // assume last slot has the standard duration
        slots[i].endTimeMs = slots[i].startTimeMs + standardMs;
        slots[i].dayOffset = dayOffset;
        // if last slot went over the day threshold
        if (slots[i].endTimeMs > 1000 * 60 * 60 * 24) {
            slots[i].endTimeMs -= 1000 * 60 * 60 * 24;
            slots[i].dayOffset += 1;
        }
        return slots;
    };
    TimeGridWrapper.prototype.getEventEls = function () {
        return findElements(this.el, '.fc-timegrid-event');
    };
    TimeGridWrapper.prototype.getFirstEventEl = function () {
        return this.el.querySelector('.fc-timegrid-event');
    };
    TimeGridWrapper.prototype.getBgEventEls = function () {
        return findElements(this.el, '.fc-bg-event');
    };
    TimeGridWrapper.prototype.getEventTimeTexts = function () {
        return this.getEventEls().map(function (eventEl) { return $(eventEl.querySelector('.fc-event-time')).text(); });
    };
    TimeGridWrapper.getEventElInfo = function (eventEl) {
        return {
            title: $(eventEl).find('.fc-event-title').text(),
            timeText: $(eventEl).find('.fc-event-time').text(),
        };
    };
    /*
    Returns a boolean.
    TODO: check isStart/isEnd.
    */
    TimeGridWrapper.prototype.checkEventRendering = function (start, end) {
        if (typeof start === 'string') {
            start = new Date(start);
        }
        if (typeof end === 'string') {
            end = new Date(end);
        }
        var expectedRects = this.computeSpanRects(start, end);
        var eventEls = this.getEventEls(); // sorted by DOM order. not good for RTL
        var isMatch = checkEventRenderingMatch(expectedRects, eventEls);
        return {
            rects: expectedRects,
            els: eventEls,
            length: eventEls.length,
            isMatch: isMatch,
        };
    };
    return TimeGridWrapper;
}());
export { TimeGridWrapper };
function checkEventRenderingMatch(expectedRects, eventEls) {
    var expectedLength = expectedRects.length;
    var i;
    var expectedRect;
    var elRect;
    if (eventEls.length !== expectedLength) {
        console.log('does not match element count'); // eslint-disable-line no-console
        return false;
    }
    for (i = 0; i < expectedLength; i += 1) {
        expectedRect = expectedRects[i];
        elRect = eventEls[i].getBoundingClientRect();
        // horizontally contained AND vertically really similar?
        if (!(elRect.left >= expectedRect.left &&
            elRect.right <= expectedRect.right &&
            Math.abs(elRect.top - expectedRect.top) < 1 &&
            Math.abs(elRect.bottom + 1 - expectedRect.bottom) < 1 // add 1 because of bottom margin!
        )) {
            console.log('rects do not match'); // eslint-disable-line no-console
            return false;
        }
    }
    return true;
}
export function queryEventElInfo(eventEl) {
    return {
        timeText: $(eventEl.querySelector('.fc-event-time')).text(),
        isShort: eventEl.classList.contains('fc-timegrid-event-short'),
    };
}
//# sourceMappingURL=TimeGridWrapper.js.map