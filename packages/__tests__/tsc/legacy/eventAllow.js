import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
import { waitEventDrag } from '../lib/wrappers/interaction-util';
describe('eventAllow', function () {
    pushOptions({
        now: '2016-09-04',
        initialView: 'timeGridWeek',
        scrollTime: '00:00',
        editable: true,
        events: [
            {
                title: 'event 1',
                start: '2016-09-04T01:00',
            },
        ],
    });
    it('disallows dragging when returning false', function (done) {
        var options = {
            eventAllow: function (dropInfo, event) {
                expect(typeof dropInfo).toBe('object');
                expect(dropInfo.start instanceof Date).toBe(true);
                expect(dropInfo.end instanceof Date).toBe(true);
                expect(typeof event).toBe('object');
                expect(event.title).toBe('event 1');
                return false;
            },
        };
        spyOn(options, 'eventAllow').and.callThrough();
        var calendar = initCalendar(options);
        var calendarWrapper = new CalendarWrapper(calendar);
        var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
        var dragging = timeGridWrapper.dragEventToDate(calendarWrapper.getFirstEventEl(), '2016-09-04T03:00:00');
        waitEventDrag(calendar, dragging).then(function (modifiedEvent) {
            expect(modifiedEvent).toBeFalsy(); // drop failure?
            expect(options.eventAllow).toHaveBeenCalled();
            done();
        });
    });
    it('allows dragging when returning true', function (done) {
        var options = {
            eventAllow: function () {
                return true;
            },
        };
        spyOn(options, 'eventAllow').and.callThrough();
        var calendar = initCalendar(options);
        var calendarWrapper = new CalendarWrapper(calendar);
        var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
        var dragging = timeGridWrapper.dragEventToDate(calendarWrapper.getFirstEventEl(), '2016-09-04T03:00:00Z');
        waitEventDrag(calendar, dragging).then(function (modifiedEvent) {
            expect(modifiedEvent.start).toEqualDate('2016-09-04T03:00:00Z');
            expect(options.eventAllow).toHaveBeenCalled();
            done();
        });
    });
});
//# sourceMappingURL=eventAllow.js.map