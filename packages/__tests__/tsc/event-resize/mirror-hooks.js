import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
import { waitEventResize } from '../lib/wrappers/interaction-util';
import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
describe('event resize mirror', function () {
    pushOptions({
        editable: true,
        initialDate: '2018-12-25',
        eventDragMinDistance: 0,
    });
    describe('in month view', function () {
        pushOptions({
            initialView: 'dayGridMonth',
            events: [
                { start: '2018-12-03', title: 'all day event' },
            ],
        });
        it('gets passed through render hooks', function (done) {
            var mirrorMountCalls = 0;
            var mirrorContentCalls = 0;
            var mirrorUnmountCalls = 0;
            var calendar = initCalendar({
                eventDidMount: function (info) {
                    if (info.isMirror) {
                        mirrorMountCalls += 1;
                    }
                },
                eventContent: function (info) {
                    if (info.isMirror) {
                        mirrorContentCalls += 1;
                    }
                },
                eventWillUnmount: function (info) {
                    if (info.isMirror) {
                        mirrorUnmountCalls += 1;
                    }
                },
            });
            var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
            var resizing = dayGridWrapper.resizeEvent(// drag TWO days
            dayGridWrapper.getEventEls()[0], '2018-12-03', '2018-12-05');
            waitEventResize(calendar, resizing).then(function () {
                expect(mirrorMountCalls).toBe(1);
                expect(mirrorContentCalls).toBe(3);
                expect(mirrorUnmountCalls).toBe(1);
                done();
            });
        });
    });
    describe('in timeGrid view', function () {
        pushOptions({
            initialView: 'timeGridWeek',
            scrollTime: '00:00',
            slotDuration: '01:00',
            snapDuration: '01:00',
            events: [
                { start: '2018-12-25T01:00:00', end: '2018-12-25T02:00:00', title: 'timed event' },
            ],
        });
        it('gets passed through eventWillUnmount', function (done) {
            var mirrorMountCalls = 0;
            var mirrorContentCalls = 0;
            var mirrorUnmountCalls = 0;
            var calendar = initCalendar({
                eventDidMount: function (info) {
                    if (info.isMirror) {
                        mirrorMountCalls += 1;
                    }
                },
                eventContent: function (info) {
                    if (info.isMirror) {
                        mirrorContentCalls += 1;
                    }
                },
                eventWillUnmount: function (info) {
                    if (info.isMirror) {
                        mirrorUnmountCalls += 1;
                    }
                },
            });
            var eventEl = new CalendarWrapper(calendar).getFirstEventEl();
            var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
            var resizing = timeGridWrapper.resizeEvent(eventEl, '2018-12-25T02:00:00', '2018-12-25T04:00:00');
            waitEventResize(calendar, resizing).then(function () {
                expect(mirrorMountCalls).toBe(1);
                expect(mirrorContentCalls).toBe(3);
                expect(mirrorUnmountCalls).toBe(1);
                done();
            });
        });
    });
});
//# sourceMappingURL=mirror-hooks.js.map