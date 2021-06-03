import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
describe('scrollTime', function () {
    pushOptions({
        initialView: 'timeGridWeek',
    });
    it('accepts a string Duration', function () {
        var calendar = initCalendar({
            scrollTime: '02:00:00',
            height: 400,
        });
        var viewWrapper = new TimeGridViewWrapper(calendar);
        var timeGridWrapper = viewWrapper.timeGrid;
        var slotTop = viewWrapper.timeGrid.getTimeTop('02:00:00') - $(timeGridWrapper.el).offset().top;
        var scrollTop = viewWrapper.getScrollerEl().scrollTop;
        var diff = Math.abs(slotTop - scrollTop);
        expect(slotTop).toBeGreaterThan(0);
        expect(scrollTop).toBeGreaterThan(0);
        expect(diff).toBeLessThan(3);
    });
    it('accepts a Duration object', function () {
        var calendar = initCalendar({
            scrollTime: { hours: 2 },
            height: 400,
        });
        var viewWrapper = new TimeGridViewWrapper(calendar);
        var timeGridWrapper = viewWrapper.timeGrid;
        var slotTop = timeGridWrapper.getTimeTop('02:00:00') - $(timeGridWrapper.el).offset().top;
        var scrollTop = viewWrapper.getScrollerEl().scrollTop;
        var diff = Math.abs(slotTop - scrollTop);
        expect(slotTop).toBeGreaterThan(0);
        expect(scrollTop).toBeGreaterThan(0);
        expect(diff).toBeLessThan(3);
    });
    it('doesn\'t get applied on navigation when scrollTimeReset is false', function () {
        var calendar = initCalendar({
            scrollTime: '02:00:00',
            scrollTimeReset: false,
            height: 400,
        });
        var viewWrapper = new TimeGridViewWrapper(calendar);
        var scrollEl = viewWrapper.getScrollerEl();
        scrollEl.scrollTop = 99999;
        var scrollTop = scrollEl.scrollTop;
        calendar.next();
        expect(scrollEl.scrollTop).toBe(scrollTop); // stays the same
    });
});
//# sourceMappingURL=scrollTime.js.map