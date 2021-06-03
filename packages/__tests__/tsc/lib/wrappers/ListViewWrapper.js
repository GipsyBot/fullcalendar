import { __extends } from "tslib";
import { findElements } from '@fullcalendar/core';
import { ViewWrapper } from './ViewWrapper';
import { formatIsoDay } from '../datelib-utils';
var ListViewWrapper = /** @class */ (function (_super) {
    __extends(ListViewWrapper, _super);
    function ListViewWrapper(calendar) {
        return _super.call(this, calendar, 'fc-list') || this;
    }
    ListViewWrapper.prototype.getEventEls = function () {
        return findElements(this.el, '.fc-list-event');
    };
    ListViewWrapper.prototype.getEventInfo = function () {
        return this.getEventEls().map(function (eventEl) { return ({
            title: $(eventEl).find('.fc-list-event-title').text(),
            timeText: $(eventEl).find('.fc-list-event-time').text(),
        }); });
    };
    ListViewWrapper.prototype.getDayInfo = function () {
        return this.getHeadingEls().map(function (el) {
            var $el = $(el);
            return {
                mainText: $el.find('.fc-list-day-text').text() || '',
                altText: $el.find('.fc-list-day-side-text').text() || '',
                date: new Date(el.getAttribute('data-date')),
            };
        });
    };
    ListViewWrapper.prototype.getHeadingEls = function () {
        return findElements(this.el, '.fc-list-day');
    };
    ListViewWrapper.prototype.getScrollerEl = function () {
        return this.el.querySelector('.fc-scroller');
    };
    ListViewWrapper.prototype.hasEmptyMessage = function () {
        return Boolean(this.el.querySelector('.fc-list-empty'));
    };
    ListViewWrapper.prototype.getNavLinkEl = function (dayDate) {
        if (typeof dayDate === 'string') {
            dayDate = new Date(dayDate);
        }
        return this.el.querySelector('.fc-list-day[data-date="' + formatIsoDay(dayDate) + '"] a.fc-list-day-text');
    };
    ListViewWrapper.prototype.clickNavLink = function (dayDate) {
        $.simulateMouseClick(this.getNavLinkEl(dayDate));
    };
    ListViewWrapper.EVENT_DOT_CLASSNAME = 'fc-list-event-dot';
    return ListViewWrapper;
}(ViewWrapper));
export { ListViewWrapper };
//# sourceMappingURL=ListViewWrapper.js.map