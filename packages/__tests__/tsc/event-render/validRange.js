import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
describe('validRange event rendering', function () {
    describe('with start constraint', function () {
        describe('when month view', function () {
            pushOptions({
                initialView: 'dayGridMonth',
                initialDate: '2017-06-01',
                validRange: { start: '2017-06-07' },
            });
            describe('when event is partially before', function () {
                pushOptions({
                    events: [
                        { start: '2017-06-05', end: '2017-06-09' },
                    ],
                });
                it('truncates the event\'s beginning', function () {
                    var calendar = initCalendar();
                    var calendarWrapper = new CalendarWrapper(calendar);
                    var eventEl = calendarWrapper.getFirstEventEl();
                    var eventInfo = calendarWrapper.getEventElInfo(eventEl);
                    expect(eventInfo.isStart).toBe(false);
                    expect(eventInfo.isEnd).toBe(true);
                    // TODO: more test about positioning
                });
            });
        });
    });
    describe('with end constraint', function () {
        describe('when month view', function () {
            pushOptions({
                initialView: 'dayGridMonth',
                initialDate: '2017-06-01',
                validRange: { end: '2017-06-07' },
            });
            describe('when event is partially before', function () {
                pushOptions({
                    events: [
                        { start: '2017-06-05', end: '2017-06-09' },
                    ],
                });
                it('truncates the event\'s end', function () {
                    var calendar = initCalendar();
                    var calendarWrapper = new CalendarWrapper(calendar);
                    var eventEl = calendarWrapper.getFirstEventEl();
                    var eventInfo = calendarWrapper.getEventElInfo(eventEl);
                    expect(eventInfo.isStart).toBe(true);
                    expect(eventInfo.isEnd).toBe(false);
                    // TODO: more test about positioning
                });
            });
        });
    });
});
//# sourceMappingURL=validRange.js.map