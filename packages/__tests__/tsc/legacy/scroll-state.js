import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
describe('scroll state', function () {
    var calendarEl;
    beforeEach(function () {
        calendarEl = $('<div id="calendar">').width(800).appendTo('body');
    });
    afterEach(function () {
        calendarEl.remove();
        calendarEl = null;
    });
    pushOptions({
        initialDate: '2015-02-20',
        contentHeight: 200,
        scrollTime: '00:00',
    });
    describeOptions('initialView', {
        'when in month view': 'dayGridMonth',
        'when in week view': 'timeGridWeek',
    }, function (viewName) {
        var ViewWrapper = viewName.match(/^dayGrid/) ? DayGridViewWrapper : TimeGridViewWrapper;
        it('should be maintained when resizing window', function (done) {
            var scrollEl;
            var scroll0;
            var calendar = initCalendar({
                windowResize: function () {
                    setTimeout(function () {
                        expect(scrollEl.scrollTop).toBe(scroll0);
                        done();
                    }, 0);
                },
            }, calendarEl);
            scrollEl = new ViewWrapper(calendar).getScrollerEl();
            setTimeout(function () {
                scrollEl.scrollTop = 9999; // all the way
                scroll0 = scrollEl.scrollTop;
                $(window).simulate('resize');
            }, 0);
        });
        it('should be maintained when after rerendering events', function () {
            var calendar = initCalendar({
                events: [{
                        start: '2015-02-20',
                    }],
            }, calendarEl);
            var scrollEl = new ViewWrapper(calendar).getScrollerEl();
            var eventEl0 = new CalendarWrapper(calendar).getEventEls();
            expect(eventEl0.length).toBe(1);
            scrollEl.scrollTop = 9999; // all the way
            var scroll0 = scrollEl.scrollTop;
            currentCalendar.render();
            var eventEl1 = new CalendarWrapper(calendar).getEventEls();
            expect(eventEl1.length).toBe(1);
            expect(scrollEl.scrollTop).toBe(scroll0);
        });
    });
});
//# sourceMappingURL=scroll-state.js.map