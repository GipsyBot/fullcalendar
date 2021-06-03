import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
describe('timegrid all-day slot', function () {
    pushOptions({
        initialDate: '2019-04-23',
        initialView: 'timeGridWeek',
        editable: true,
    });
    // https://github.com/fullcalendar/fullcalendar/issues/4616
    it('allows dragging after dynamic event adding', function (done) {
        var calendar = initCalendar({
            eventDrop: function (arg) {
                expect(arg.event.start).toEqualDate('2019-04-24');
                done();
            },
        });
        calendar.batchRendering(function () {
            calendar.addEvent({ start: '2019-04-23' });
            calendar.addEvent({ start: '2019-04-23' });
            calendar.addEvent({ start: '2019-04-23' });
        });
        var dayGridWrapper = new TimeGridViewWrapper(calendar).dayGrid;
        var dayWidth = $(dayGridWrapper.getDayEls('2019-04-23')).width();
        var lastEventEl = dayGridWrapper.getEventEls()[2];
        $(lastEventEl).simulate('drag', {
            localPoint: { left: '50%', top: '99%' },
            dx: dayWidth,
        });
    });
});
//# sourceMappingURL=timegrid-allday-slot.js.map