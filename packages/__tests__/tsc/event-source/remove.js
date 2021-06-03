import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
describe('event source remove', function () {
    pushOptions({
        initialDate: '2014-08-01',
    });
    it('correctly removes events provided via `eventSources` at initialization', function () {
        var calendar = initCalendar({
            eventSources: [{
                    id: '5',
                    events: [
                        { title: 'event1', start: '2014-08-01' },
                        { title: 'event2', start: '2014-08-02' },
                    ],
                }],
        });
        var calendarWrapper = new CalendarWrapper(calendar);
        expect(calendar.getEvents().length).toBe(2);
        expect(calendarWrapper.getEventEls().length).toBe(2);
        calendar.getEventSourceById('5').remove();
        expect(calendar.getEvents().length).toBe(0);
        expect(calendarWrapper.getEventEls().length).toBe(0);
    });
    it('won\'t render removed events when subsequent addEventSource', function (done) {
        var source1 = {
            id: '1',
            events: function (arg, callback) {
                setTimeout(function () {
                    callback([{
                            title: 'event1',
                            className: 'event1',
                            start: '2014-08-01T02:00:00',
                        }]);
                }, 100);
            },
        };
        var source2 = {
            id: '2',
            events: function (arg, callback) {
                setTimeout(function () {
                    callback([{
                            title: 'event2',
                            className: 'event2',
                            start: '2014-08-01T02:00:00',
                        }]);
                }, 100);
            },
        };
        var calendar = initCalendar({
            eventSources: [source1],
        });
        calendar.getEventSourceById('1').remove();
        calendar.addEventSource(source2);
        setTimeout(function () {
            expect($('.event1').length).toBe(0);
            expect($('.event2').length).toBe(1);
            done();
        }, 101);
    });
});
//# sourceMappingURL=remove.js.map