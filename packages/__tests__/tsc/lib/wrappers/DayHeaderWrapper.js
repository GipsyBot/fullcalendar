import { findElements } from '@fullcalendar/core';
import { parseIsoAsUtc, formatIsoDay } from '../datelib-utils';
import { parseUtcDate } from '../date-parsing';
import { CalendarWrapper } from './CalendarWrapper';
var DayHeaderWrapper = /** @class */ (function () {
    function DayHeaderWrapper(el) {
        this.el = el;
    }
    DayHeaderWrapper.prototype.getDates = function () {
        return this.getCellEls().map(function (cellEl) { return parseIsoAsUtc(cellEl.getAttribute('data-date')); });
    };
    DayHeaderWrapper.prototype.getCellEls = function () {
        return findElements(this.el, '.fc-col-header-cell');
    };
    DayHeaderWrapper.prototype.getCellEl = function (dateOrDow) {
        if (typeof dateOrDow === 'number') {
            return this.el.querySelector(".fc-col-header-cell." + CalendarWrapper.DOW_CLASSNAMES[dateOrDow]);
        }
        if (typeof dateOrDow === 'string') {
            dateOrDow = parseUtcDate(dateOrDow);
        }
        return this.el.querySelector(".fc-col-header-cell[data-date=\"" + formatIsoDay(dateOrDow) + "\"]");
    };
    DayHeaderWrapper.prototype.getCellText = function (dateOrDow) {
        return $(this.getCellEl(dateOrDow)).text();
    };
    DayHeaderWrapper.prototype.getCellInfo = function () {
        return this.getCellEls().map(function (cellEl) { return ({
            text: $(cellEl).text(),
            date: parseIsoAsUtc(cellEl.getAttribute('data-date')),
            isToday: cellEl.classList.contains('fc-day-today'),
        }); });
    };
    DayHeaderWrapper.prototype.getNavLinkEls = function () {
        return findElements(this.el, '.fc-col-header-cell[data-date] a[data-navlink]');
    };
    DayHeaderWrapper.prototype.getNavLinkEl = function (dayDate) {
        if (typeof dayDate === 'string') {
            dayDate = new Date(dayDate);
        }
        return this.el.querySelector('.fc-col-header-cell[data-date="' + formatIsoDay(dayDate) + '"] a');
    };
    DayHeaderWrapper.prototype.clickNavLink = function (date) {
        $.simulateMouseClick(this.getNavLinkEl(date));
    };
    return DayHeaderWrapper;
}());
export { DayHeaderWrapper };
//# sourceMappingURL=DayHeaderWrapper.js.map