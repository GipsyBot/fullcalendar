import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
describe('print preview', function () {
    pushOptions({
        initialDate: '2019-04-08',
        scrollTime: '00:00',
        events: [
            { id: '2', start: '2019-04-08T05:00:00' },
            { id: '1', start: '2019-04-08T01:00:00' },
        ],
        eventDidMount: function (arg) {
            arg.el.setAttribute('data-id', arg.event.id);
        },
    });
    describeOptions('initialView', {
        'with timeGrid view': 'timeGridDay',
        'with dayGrid view': 'dayGridDay',
    }, function () {
        it('orders events in DOM by start time', function () {
            var calendar = initCalendar();
            var calendarWrapper = new CalendarWrapper(calendar);
            var eventEls = calendarWrapper.getEventEls();
            var ids = eventEls.map(function (el) { return el.getAttribute('data-id'); });
            expect(ids).toEqual(['1', '2']);
        });
    });
    describeOptions('initialView', {
        'with timeGrid view': 'timeGridWeek',
        'with dayGrid view': 'dayGridDay',
    }, function () {
        // https://github.com/fullcalendar/fullcalendar/issues/5709
        it('orders by start time when in actually printing', function (done) {
            var calendar = initCalendar();
            calendar.trigger('_beforeprint');
            setTimeout(function () {
                var calendarWrapper = new CalendarWrapper(calendar);
                var eventEls = calendarWrapper.getEventEls();
                var ids = eventEls.map(function (el) { return el.getAttribute('data-id'); });
                expect(ids).toEqual(['1', '2']);
                done();
            });
        });
    });
});
//# sourceMappingURL=print-preview.js.map