import { findElements } from '@fullcalendar/core';
import { formatIsoDay } from '../datelib-utils';
import { getRectCenter, intersectRects, addPoints, subtractPoints } from '../geom';
import { CalendarWrapper } from './CalendarWrapper';
var DayGridWrapper = /** @class */ (function () {
    function DayGridWrapper(el) {
        this.el = el;
    }
    DayGridWrapper.prototype.getRootTableEl = function () {
        return $(this.el).find('> table')[0];
    };
    DayGridWrapper.prototype.getAllDayEls = function () {
        return findElements(this.el, '.fc-day[data-date]');
    };
    DayGridWrapper.prototype.getMirrorEls = function () {
        return findElements(this.el, '.fc-event.fc-event-mirror');
    };
    DayGridWrapper.prototype.getDayEl = function (date) {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return this.el.querySelector('.fc-day[data-date="' + formatIsoDay(date) + '"]');
    };
    DayGridWrapper.prototype.getDayEls = function (date) {
        if (typeof date === 'number') {
            return findElements(this.el, ".fc-day." + CalendarWrapper.DOW_CLASSNAMES[date]);
        }
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return findElements(this.el, '.fc-day[data-date="' + formatIsoDay(date) + '"]');
    };
    DayGridWrapper.prototype.getDayNumberText = function (date) {
        return $(this.getDayEl(date).querySelector('.fc-daygrid-day-top')).text();
    };
    DayGridWrapper.prototype.getDayElsInRow = function (row) {
        return findElements(this.getRowEl(row), '.fc-day');
    };
    // TODO: discourage use
    DayGridWrapper.prototype.getNonBusinessDayEls = function () {
        return findElements(this.el, '.fc-non-business');
    };
    // example: gets all the Mondays in the first row of days
    // TODO: discourage use
    DayGridWrapper.prototype.getDowEls = function (dayAbbrev) {
        return findElements(this.el, "tr:first-child > td.fc-day-" + dayAbbrev);
    };
    DayGridWrapper.prototype.getDisabledDayEls = function () {
        return findElements(this.el, '.fc-day-disabled');
    };
    DayGridWrapper.prototype.getMoreEl = function () {
        return this.el.querySelector('.fc-daygrid-more-link');
    };
    DayGridWrapper.prototype.getMoreEls = function () {
        return findElements(this.el, '.fc-daygrid-more-link');
    };
    DayGridWrapper.prototype.getWeekNavLinkEls = function () {
        return findElements(this.el, '.fc-daygrid-week-number[data-navlink]');
    };
    DayGridWrapper.prototype.getWeekNumberEls = function () {
        return findElements(this.el, '.fc-daygrid-week-number');
    };
    DayGridWrapper.prototype.getWeekNumberEl = function (rowIndex) {
        return this.getRowEl(rowIndex).querySelector('.fc-daygrid-week-number');
    };
    DayGridWrapper.prototype.getWeekNumberText = function (rowIndex) {
        return $(this.getWeekNumberEl(rowIndex)).text();
    };
    DayGridWrapper.prototype.getNavLinkEl = function (date) {
        return this.getDayEl(date).querySelector('.fc-daygrid-day-number[data-navlink]');
    };
    DayGridWrapper.prototype.clickNavLink = function (date) {
        $.simulateMouseClick(this.getNavLinkEl(date));
    };
    DayGridWrapper.prototype.openMorePopover = function (index) {
        if (index == null) {
            $(this.getMoreEl()).simulate('click');
        }
        else {
            $(this.el.querySelectorAll('.fc-daygrid-more-link')[index]).simulate('click');
        }
    };
    DayGridWrapper.prototype.getMorePopoverEl = function () {
        var viewWrapperEl = this.el.closest('.fc-view-harness');
        return viewWrapperEl.querySelector('.fc-more-popover');
    };
    DayGridWrapper.prototype.getMorePopoverHeaderEl = function () {
        return this.getMorePopoverEl().querySelector('.fc-popover-header');
    };
    DayGridWrapper.prototype.getMorePopoverEventEls = function () {
        return findElements(this.getMorePopoverEl(), '.fc-event');
    };
    DayGridWrapper.prototype.getMorePopoverEventCnt = function () {
        return this.getMorePopoverEventEls().length;
    };
    DayGridWrapper.prototype.getMorePopoverEventTitles = function () {
        return this.getMorePopoverEventEls().map(function (el) { return $(el.querySelector('.fc-event-title')).text(); });
    };
    DayGridWrapper.prototype.getMorePopoverBgEventCnt = function () {
        return this.getMorePopoverEl().querySelectorAll('.fc-bg-event').length;
    };
    DayGridWrapper.prototype.closeMorePopover = function () {
        $(this.getMorePopoverEl().querySelector('.fc-popover-close')).simulate('click');
    };
    DayGridWrapper.prototype.getMorePopoverTitle = function () {
        return $(this.getMorePopoverEl().querySelector('.fc-popover-title')).text();
    };
    DayGridWrapper.prototype.getRowEl = function (i) {
        return this.el.querySelector("tr:nth-child(" + (i + 1) + ")"); // nth-child is 1-indexed!
    };
    DayGridWrapper.prototype.getRowEls = function () {
        return findElements(this.el, 'tr');
    };
    DayGridWrapper.prototype.getBgEventEls = function (row) {
        var parentEl = row == null ? this.el : this.getRowEl(row);
        return findElements(parentEl, '.fc-bg-event');
    };
    DayGridWrapper.prototype.getEventEls = function () {
        return findElements(this.el, '.fc-daygrid-event');
    };
    DayGridWrapper.prototype.isEventListItem = function (el) {
        return el.classList.contains('fc-daygrid-dot-event');
    };
    DayGridWrapper.prototype.getFirstEventEl = function () {
        return this.el.querySelector('.fc-daygrid-event');
    };
    DayGridWrapper.prototype.getHighlightEls = function () {
        return findElements(this.el, '.fc-highlight');
    };
    DayGridWrapper.getEventElInfo = function (eventEl) {
        return {
            title: $(eventEl).find('.fc-event-title').text(),
            timeText: $(eventEl).find('.fc-event-time').text(),
        };
    };
    DayGridWrapper.prototype.clickDate = function (date) {
        $.simulateMouseClick(this.getDayEl(date));
    };
    DayGridWrapper.prototype.selectDates = function (start, inclusiveEnd) {
        var _this = this;
        return new Promise(function (resolve) {
            $(_this.getDayEls(start)).simulate('drag', {
                point: getRectCenter(_this.getDayEl(start).getBoundingClientRect()),
                end: getRectCenter(_this.getDayEl(inclusiveEnd).getBoundingClientRect()),
                onRelease: function () { return resolve(); },
            });
        });
    };
    DayGridWrapper.prototype.selectDatesTouch = function (start, inclusiveEnd) {
        var _this = this;
        return new Promise(function (resolve) {
            var startEl = _this.getDayEl(start);
            setTimeout(function () {
                // QUESTION: why do we not need to do press-down first?
                $(startEl).simulate('drag', {
                    isTouch: true,
                    end: getRectCenter(_this.getDayEl(inclusiveEnd).getBoundingClientRect()),
                    onRelease: function () { return resolve(); },
                });
            }, 0);
        });
    };
    DayGridWrapper.prototype.dragEventToDate = function (eventEl, startDate, endDate, isTouch, onBeforeRelease) {
        var _this = this;
        return new Promise(function (resolve) {
            if (!startDate) {
                var rect1 = _this.getDayEl(endDate).getBoundingClientRect();
                var point1 = getRectCenter(rect1);
                $(eventEl).simulate('drag', {
                    isTouch: isTouch || false,
                    delay: isTouch ? 200 : 0,
                    end: point1,
                    onBeforeRelease: onBeforeRelease,
                    onRelease: function () { return resolve(); },
                });
            }
            else {
                var rect0 = _this.getDayEl(startDate).getBoundingClientRect();
                var rect1 = _this.getDayEl(endDate).getBoundingClientRect();
                var eventRect = eventEl.getBoundingClientRect();
                var point0 = getRectCenter(intersectRects(eventRect, rect0));
                var point1 = getRectCenter(rect1);
                $(eventEl).simulate('drag', {
                    isTouch: isTouch || false,
                    delay: isTouch ? 200 : 0,
                    point: point0,
                    end: point1,
                    onBeforeRelease: onBeforeRelease,
                    onRelease: function () { return resolve(); },
                });
            }
        });
    };
    DayGridWrapper.prototype.resizeEvent = function (eventEl, origEndDate, newEndDate, fromStart) {
        var _this = this;
        return new Promise(function (resolve) {
            var rect0 = _this.getDayEl(origEndDate).getBoundingClientRect();
            var rect1 = _this.getDayEl(newEndDate).getBoundingClientRect();
            var resizerEl = $(eventEl).find('.' + (fromStart ? CalendarWrapper.EVENT_START_RESIZER_CLASSNAME : CalendarWrapper.EVENT_END_RESIZER_CLASSNAME)).css('display', 'block')[0]; // usually only displays on hover. force display
            var resizerRect = resizerEl.getBoundingClientRect();
            var resizerCenter = getRectCenter(resizerRect);
            var vector = subtractPoints(resizerCenter, rect0);
            var endPoint = addPoints(rect1, vector);
            $(resizerEl).simulate('drag', {
                point: resizerCenter,
                end: endPoint,
                onRelease: function () { return resolve(); },
            });
        });
    };
    DayGridWrapper.prototype.resizeEventTouch = function (eventEl, origEndDate, newEndDate, fromStart) {
        var _this = this;
        return new Promise(function (resolve) {
            var rect0 = _this.getDayEl(origEndDate).getBoundingClientRect();
            var rect1 = _this.getDayEl(newEndDate).getBoundingClientRect();
            setTimeout(function () {
                $(eventEl).simulate('drag', {
                    isTouch: true,
                    delay: 200,
                    onRelease: function () {
                        var resizerEl = eventEl.querySelector('.' + (fromStart ? CalendarWrapper.EVENT_START_RESIZER_CLASSNAME : CalendarWrapper.EVENT_END_RESIZER_CLASSNAME));
                        var resizerRect = resizerEl.getBoundingClientRect();
                        var resizerCenter = getRectCenter(resizerRect);
                        var vector = subtractPoints(resizerCenter, rect0);
                        var endPoint = addPoints(rect1, vector);
                        $(resizerEl).simulate('drag', {
                            isTouch: true,
                            point: resizerCenter,
                            end: endPoint,
                            onRelease: function () { return resolve(); },
                        });
                    },
                });
            }, 0);
        });
    };
    DayGridWrapper.EVENT_IS_START_CLASSNAME = 'fc-event-start';
    DayGridWrapper.EVENT_IS_END_CLASSNAME = 'fc-event-end';
    return DayGridWrapper;
}());
export { DayGridWrapper };
//# sourceMappingURL=DayGridWrapper.js.map