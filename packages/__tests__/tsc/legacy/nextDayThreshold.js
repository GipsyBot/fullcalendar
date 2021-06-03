import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
describe('nextDayThreshold', function () {
    // when a view object exposes its nextDayThreshold value (after some refactoring)...
    //   TODO: detect the default of 9am
    //   TODO: detect 2 or more different types of Duration-ish parsing
    it('renders an event before the threshold', function () {
        var calendar = initCalendar({
            nextDayThreshold: '10:00:00',
            initialDate: '2014-06',
            initialView: 'dayGridMonth',
            events: [
                {
                    title: 'event1',
                    start: '2014-06-08T22:00:00',
                    end: '2014-06-10T09:00:00',
                },
            ],
        });
        expect(renderedDayCount(calendar)).toBe(2);
    });
    it('renders an event equal to the threshold', function () {
        var calendar = initCalendar({
            nextDayThreshold: '10:00:00',
            initialDate: '2014-06',
            initialView: 'dayGridMonth',
            events: [
                {
                    title: 'event1',
                    start: '2014-06-08T22:00:00',
                    end: '2014-06-10T10:00:00',
                },
            ],
        });
        expect(renderedDayCount(calendar)).toBe(3);
    });
    it('renders an event after the threshold', function () {
        var calendar = initCalendar({
            nextDayThreshold: '10:00:00',
            initialDate: '2014-06',
            initialView: 'dayGridMonth',
            events: [
                {
                    title: 'event1',
                    start: '2014-06-08T22:00:00',
                    end: '2014-06-10T11:00:00',
                },
            ],
        });
        expect(renderedDayCount(calendar)).toBe(3);
    });
    it('won\'t render an event that ends before the first day\'s threshold', function () {
        var calendar = initCalendar({
            initialView: 'dayGridMonth',
            initialDate: '2017-10-01',
            nextDayThreshold: '09:00:00',
            events: [{
                    start: '2017-09-30T08:00:00',
                    end: '2017-10-01T08:00:00',
                }],
        });
        var calendarWrapper = new CalendarWrapper(calendar);
        expect(calendarWrapper.getEventEls().length).toBe(0);
    });
    function renderedDayCount(calendar) {
        var headerWrapper = new DayGridViewWrapper(calendar).header;
        var dayEl = headerWrapper.getCellEl(0);
        var cellWidth = $(dayEl).outerWidth(); // works with dayGrid and timeGrid
        var totalWidth = 0;
        var eventEls = new CalendarWrapper(calendar).getEventEls();
        $(eventEls).each(function (i, eventEl) {
            totalWidth += $(eventEl).outerWidth();
        });
        return Math.round(totalWidth / cellWidth);
    }
});
//# sourceMappingURL=nextDayThreshold.js.map