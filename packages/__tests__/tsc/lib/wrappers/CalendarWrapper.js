import { findElements } from '@fullcalendar/core';
import { ToolbarWrapper } from './ToolbarWrapper';
var CalendarWrapper = /** @class */ (function () {
    function CalendarWrapper(calendar) {
        this.calendar = calendar;
    }
    Object.defineProperty(CalendarWrapper.prototype, "toolbar", {
        // TODO: distinguish between header/footerToolbar
        get: function () {
            var toolbarEl = this.calendar.el.querySelector('.fc-toolbar');
            return toolbarEl ? new ToolbarWrapper(toolbarEl) : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalendarWrapper.prototype, "footerToolbar", {
        get: function () {
            var toolbarEl = this.calendar.el.querySelector('.fc-footer-toolbar');
            return toolbarEl ? new ToolbarWrapper(toolbarEl) : null;
        },
        enumerable: false,
        configurable: true
    });
    CalendarWrapper.prototype.getViewContainerEl = function () {
        return this.calendar.el.querySelector('.fc-view-harness');
    };
    CalendarWrapper.prototype.getViewEl = function () {
        return this.calendar.el.querySelector('.fc-view');
    };
    CalendarWrapper.prototype.getViewName = function () {
        return this.getViewEl().getAttribute('class').match(/fc-(\w+)-view/)[1];
    };
    // DISCOURAGE use of the following...
    CalendarWrapper.prototype.getNonBusinessDayEls = function () {
        return findElements(this.calendar.el, '.fc-non-business');
    };
    CalendarWrapper.prototype.getEventEls = function () {
        return findElements(this.calendar.el, '.fc-event:not(.fc-bg-event)');
    };
    CalendarWrapper.prototype.getFirstEventEl = function () {
        return this.calendar.el.querySelector('.fc-event:not(.fc-bg-event)');
    };
    CalendarWrapper.prototype.getTodayEls = function () {
        return findElements(this.calendar.el, '.fc-day-today');
    };
    CalendarWrapper.prototype.getEventElInfo = function (eventEl) {
        return {
            isStart: eventEl.classList.contains(CalendarWrapper.EVENT_IS_START_CLASSNAME),
            isEnd: eventEl.classList.contains(CalendarWrapper.EVENT_IS_END_CLASSNAME),
            timeText: $(eventEl).find('.' + CalendarWrapper.EVENT_TIME_CLASSNAME).text() || '',
            titleEl: eventEl.querySelector('.' + CalendarWrapper.EVENT_TITLE_CLASSNAME),
            resizerEl: eventEl.querySelector('.' + CalendarWrapper.EVENT_RESIZER_CLASSNAME),
        };
    };
    CalendarWrapper.prototype.getBgEventEls = function () {
        return findElements(this.calendar.el, '.' + CalendarWrapper.BG_EVENT_CLASSNAME);
    };
    CalendarWrapper.prototype.getFirstDateEl = function () {
        return this.calendar.el.querySelector('.fc [data-date]');
    };
    CalendarWrapper.prototype.getDateCellEl = function (dateStr) {
        return this.calendar.el.querySelector('td.fc-day[data-date="' + dateStr + '"]');
    };
    CalendarWrapper.prototype.getLicenseMessage = function () {
        return $('.fc-license-message', this.calendar.el).text();
    };
    CalendarWrapper.prototype.isAllowingDragging = function () {
        return !$('body').hasClass('fc-not-allowed');
    };
    CalendarWrapper.EVENT_CLASSNAME = 'fc-event'; // TODO: put this everywhere?
    CalendarWrapper.EVENT_IS_START_CLASSNAME = 'fc-event-start';
    CalendarWrapper.EVENT_IS_END_CLASSNAME = 'fc-event-end';
    CalendarWrapper.EVENT_TIME_CLASSNAME = 'fc-event-time';
    CalendarWrapper.EVENT_TITLE_CLASSNAME = 'fc-event-title';
    CalendarWrapper.EVENT_RESIZER_CLASSNAME = 'fc-event-resizer';
    CalendarWrapper.EVENT_START_RESIZER_CLASSNAME = 'fc-event-resizer-start';
    CalendarWrapper.EVENT_END_RESIZER_CLASSNAME = 'fc-event-resizer-end';
    CalendarWrapper.BG_EVENT_CLASSNAME = 'fc-bg-event';
    CalendarWrapper.DAY_PAST_CLASSNAME = 'fc-day-past';
    CalendarWrapper.DAY_FUTURE_CLASSNAME = 'fc-day-future';
    CalendarWrapper.SLOT_PAST_CLASSNAME = 'fc-slot-past';
    CalendarWrapper.SLOT_FUTURE_CLASSNAME = 'fc-slot-future';
    CalendarWrapper.TODAY_CLASSNAME = 'fc-day-today';
    CalendarWrapper.SLOT_TODAY_CLASSNAME = 'fc-slot-today';
    CalendarWrapper.DOW_CLASSNAMES = ['fc-day-sun', 'fc-day-mon', 'fc-day-tue', 'fc-day-wed', 'fc-day-thu', 'fc-day-fri', 'fc-day-sat'];
    CalendarWrapper.DOW_SLOT_CLASSNAMES = ['fc-slot-sun', 'fc-slot-mon', 'fc-slot-tue', 'fc-slot-wed', 'fc-slot-thu', 'fc-slot-fri', 'fc-slot-sat'];
    CalendarWrapper.LTR_CLASSNAME = 'fc-direction-ltr';
    CalendarWrapper.RTL_CLASSNAME = 'fc-direction-rtl';
    CalendarWrapper.BOOTSTRAP_CLASSNAME = 'fc-theme-bootstrap';
    CalendarWrapper.UNTHEMED_CLASSNAME = 'fc-theme-standard';
    CalendarWrapper.ROOT_CLASSNAME = 'fc';
    return CalendarWrapper;
}());
export { CalendarWrapper };
//# sourceMappingURL=CalendarWrapper.js.map