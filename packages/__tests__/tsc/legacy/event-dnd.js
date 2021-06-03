import { createDuration } from '@fullcalendar/core';
import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
import { waitEventDrag2 } from '../lib/wrappers/interaction-util';
import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
import { queryEventElInfo } from '../lib/wrappers/TimeGridWrapper';
import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
describe('eventDrop', function () {
    pushOptions({
        timeZone: 'UTC',
        initialDate: '2014-06-11',
        editable: true,
        dragScroll: false,
        longPressDelay: 100,
    });
    describe('when in month view', function () {
        pushOptions({
            initialView: 'dayGridMonth',
        });
        // TODO: test that event's dragged via touch that don't wait long enough for longPressDelay
        // SHOULD NOT drag
        [false, true].forEach(function (isTouch) {
            describe('with ' + (isTouch ? 'touch' : 'mouse'), function () {
                describe('when dragging an all-day event to another day', function () {
                    it('should be given correct arguments, with whole-day delta', function (done) {
                        var calendar = initCalendarWithSpies({
                            events: [{
                                    title: 'all-day event',
                                    start: '2014-06-11',
                                    allDay: true,
                                }],
                        });
                        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                        var dragging = dayGridWrapper.dragEventToDate(dayGridWrapper.getFirstEventEl(), '2014-06-11', '2014-06-20', isTouch);
                        waitEventDrag2(calendar, dragging).then(function (arg) {
                            var delta = createDuration({ day: 9 });
                            expect(arg.delta).toEqual(delta);
                            expect(arg.event.start).toEqualDate('2014-06-20');
                            expect(arg.event.end).toBeNull();
                            arg.revert();
                            var event = currentCalendar.getEvents()[0];
                            expect(event.start).toEqualDate('2014-06-11');
                            expect(event.end).toBeNull();
                            done();
                        });
                    });
                });
            });
        });
        describe('when gragging a timed event to another day', function () {
            it('should be given correct arguments, with whole-day delta', function (done) {
                var calendar = initCalendarWithSpies({
                    events: [{
                            title: 'timed event',
                            start: '2014-06-11T06:00:00',
                            allDay: false,
                        }],
                });
                var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                var dragging = dayGridWrapper.dragEventToDate(dayGridWrapper.getFirstEventEl(), '2014-06-11', '2014-06-16');
                waitEventDrag2(calendar, dragging).then(function (arg) {
                    var delta = createDuration({ day: 5 });
                    expect(arg.delta).toEqual(delta);
                    expect(arg.event.start).toEqualDate('2014-06-16T06:00:00Z');
                    expect(arg.event.end).toBeNull();
                    arg.revert();
                    var event = currentCalendar.getEvents()[0];
                    expect(event.start).toEqualDate('2014-06-11T06:00:00Z');
                    expect(event.end).toBeNull();
                    done();
                });
            });
        });
        // https://github.com/fullcalendar/fullcalendar/issues/4458
        describe('when dragging an event back in time when duration not editable', function () {
            it('should work', function (done) {
                var calendar = initCalendarWithSpies({
                    initialDate: '2019-01-16',
                    eventDurationEditable: false,
                    events: [{
                            title: 'event',
                            start: '2019-01-16T10:30:00+00:00',
                            end: '2019-01-16T12:30:00+00:00',
                        }],
                });
                var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                var dragging = dayGridWrapper.dragEventToDate(dayGridWrapper.getFirstEventEl(), '2019-01-16', '2019-01-14');
                waitEventDrag2(calendar, dragging).then(function (arg) {
                    expect(arg.delta).toEqual(createDuration({ day: -2 }));
                    expect(arg.event.start).toEqualDate('2019-01-14T10:30:00+00:00');
                    expect(arg.event.end).toEqualDate('2019-01-14T12:30:00+00:00');
                    done();
                });
            });
        });
        // TODO: tests for eventMouseEnter/eventMouseLeave firing correctly when no dragging
        it('should not fire any eventMouseEnter/eventMouseLeave events while dragging', function (done) {
            var eventMouseEnterSpy = spyOnCalendarCallback('eventMouseEnter');
            var eventMouseLeaveSpy = spyOnCalendarCallback('eventMouseLeave');
            var calendar = initCalendar({
                events: [
                    {
                        title: 'all-day event',
                        start: '2014-06-11',
                        allDay: true,
                        className: 'event1',
                    },
                    {
                        title: 'event2',
                        start: '2014-06-10',
                        allDay: true,
                        className: 'event2',
                    },
                ],
            });
            var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
            $('.event1').simulate('drag', {
                end: dayGridWrapper.getDayEl('2014-06-20'),
                moves: 10,
                duration: 1000,
                onRelease: function () {
                    done();
                },
            });
            setTimeout(function () {
                $('.event2')
                    .simulate('mouseover')
                    .simulate('mouseenter')
                    .simulate('mouseout')
                    .simulate('mouseleave');
                setTimeout(function () {
                    expect(eventMouseEnterSpy).not.toHaveBeenCalled();
                    expect(eventMouseLeaveSpy).not.toHaveBeenCalled();
                }, 0);
            }, 500);
        });
    });
    describe('when in timeGrid view', function () {
        pushOptions({
            initialView: 'timeGridWeek',
        });
        [false, true].forEach(function (isTouch) {
            describe('with ' + (isTouch ? 'touch' : 'mouse'), function () {
                describe('when dragging a timed event to another time on a different day', function () {
                    it('should be given correct arguments and delta with days/time', function (done) {
                        var calendar = initCalendarWithSpies({
                            events: [{
                                    title: 'timed event',
                                    start: '2014-06-11T06:00:00',
                                    allDay: false,
                                }],
                        });
                        var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                        var dragging = timeGridWrapper.dragEventToDate(timeGridWrapper.getFirstEventEl(), '2014-06-12T07:30:00');
                        waitEventDrag2(calendar, dragging).then(function (arg) {
                            var delta = createDuration({ day: 1, hour: 1, minute: 30 });
                            expect(arg.delta).toEqual(delta);
                            expect(arg.event.start).toEqualDate('2014-06-12T07:30:00Z');
                            expect(arg.event.end).toBeNull();
                            arg.revert();
                            var event = currentCalendar.getEvents()[0];
                            expect(event.start).toEqualDate('2014-06-11T06:00:00Z');
                            expect(event.end).toBeNull();
                            done();
                        });
                    });
                });
            });
        });
        describe('when dragging an all-day event to another all-day', function () {
            it('should be given correct arguments, with whole-day delta', function (done) {
                var calendar = initCalendarWithSpies({
                    events: [{
                            title: 'all-day event',
                            start: '2014-06-11',
                            allDay: true,
                        }],
                });
                var dayGridWrapper = new TimeGridViewWrapper(calendar).dayGrid;
                var dragging = dayGridWrapper.dragEventToDate(dayGridWrapper.getFirstEventEl(), '2014-06-11', '2014-06-13');
                waitEventDrag2(calendar, dragging).then(function (arg) {
                    var delta = createDuration({ day: 2 });
                    expect(arg.delta).toEqual(delta);
                    expect(arg.event.start).toEqualDate('2014-06-13');
                    expect(arg.event.end).toBeNull();
                    arg.revert();
                    var event = currentCalendar.getEvents()[0];
                    expect(event.start).toEqualDate('2014-06-11');
                    expect(event.end).toBeNull();
                    done();
                });
            });
        });
        describe('when dragging an all-day event to a time slot on a different day', function () {
            it('should be given correct arguments and delta with days/time', function (done) {
                var calendar = initCalendarWithSpies({
                    scrollTime: '01:00:00',
                    height: 400,
                    events: [{
                            title: 'all-day event',
                            start: '2014-06-11',
                            allDay: true,
                        }],
                });
                var viewWrapper = new TimeGridViewWrapper(calendar);
                var dragging = viewWrapper.timeGrid.dragEventToDate(viewWrapper.dayGrid.getFirstEventEl(), '2014-06-10T01:00:00');
                waitEventDrag2(calendar, dragging).then(function (arg) {
                    var delta = createDuration({ day: -1, hour: 1 });
                    expect(arg.delta).toEqual(delta);
                    expect(arg.event.start).toEqualDate('2014-06-10T01:00:00Z');
                    expect(arg.event.end).toBeNull();
                    expect(arg.event.allDay).toBe(false);
                    arg.revert();
                    var event = currentCalendar.getEvents()[0];
                    expect(event.start).toEqualDate('2014-06-11');
                    expect(event.end).toBeNull();
                    expect(event.allDay).toBe(true);
                    done();
                });
            });
        });
        describe('when dragging a timed event to an all-day slot on a different day', function () {
            it('should be given correct arguments, with whole-day delta', function (done) {
                var calendar = initCalendarWithSpies({
                    scrollTime: '01:00:00',
                    height: 400,
                    events: [{
                            title: 'timed event',
                            start: '2014-06-11T01:00:00',
                            allDay: false,
                        }],
                });
                var viewWrapper = new TimeGridViewWrapper(calendar);
                var dragging = viewWrapper.dayGrid.dragEventToDate(viewWrapper.timeGrid.getFirstEventEl(), null, '2014-06-10');
                waitEventDrag2(calendar, dragging).then(function (arg) {
                    var delta = createDuration({ day: -1 });
                    expect(arg.delta).toEqual(delta);
                    expect(arg.event.start).toEqualDate('2014-06-10');
                    expect(arg.event.end).toBeNull();
                    expect(arg.event.allDay).toBe(true);
                    arg.revert();
                    var event = currentCalendar.getEvents()[0];
                    expect(event.start).toEqualDate('2014-06-11T01:00:00Z');
                    expect(event.end).toBeNull();
                    expect(event.allDay).toBe(false);
                    done();
                });
            });
        });
        describe('when dragging a timed event with no end time', function () {
            it('should continue to only show the updated start time', function (done) {
                var dragged = false;
                var calendar = initCalendarWithSpies({
                    scrollTime: '01:00:00',
                    height: 400,
                    events: [{
                            title: 'timed event',
                            start: '2014-06-11T01:00:00',
                            allDay: false,
                        }],
                });
                var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                var dragging = timeGridWrapper.dragEventToDate(timeGridWrapper.getFirstEventEl(), '2014-06-11T02:30:00', function () {
                    dragged = true;
                    var mirrorEls = timeGridWrapper.getMirrorEls();
                    expect(mirrorEls.length).toBe(1);
                    expect(queryEventElInfo(mirrorEls[0]).timeText).toBe('2:30');
                });
                waitEventDrag2(calendar, dragging).then(function () {
                    expect(dragged).toBe(true);
                    done();
                });
            });
        });
        describe('when dragging a timed event with an end time', function () {
            it('should continue to show the updated start and end time', function (done) {
                var dragged = false;
                var calendar = initCalendarWithSpies({
                    scrollTime: '01:00:00',
                    height: 400,
                    events: [{
                            title: 'timed event',
                            start: '2014-06-11T01:00:00',
                            end: '2014-06-11T02:00:00',
                            allDay: false,
                        }],
                });
                var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                var dragging = timeGridWrapper.dragEventToDate(timeGridWrapper.getFirstEventEl(), '2014-06-11T02:30:00', function () {
                    dragged = true;
                    var mirrorEls = timeGridWrapper.getMirrorEls();
                    expect(mirrorEls.length).toBe(1);
                    expect(queryEventElInfo(mirrorEls[0]).timeText).toBe('2:30 - 3:30');
                });
                waitEventDrag2(calendar, dragging).then(function () {
                    expect(dragged).toBe(true);
                    done();
                });
            });
        });
        // https://github.com/fullcalendar/fullcalendar/issues/4503
        describe('when dragging to one of the last slots', function () {
            it('should work', function (done) {
                var calendar = initCalendarWithSpies({
                    scrollTime: '23:00:00',
                    height: 400,
                    events: [{
                            title: 'timed event',
                            start: '2014-06-11T18:00:00',
                            allDay: false,
                        }],
                });
                var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                var dragging = timeGridWrapper.dragEventToDate(timeGridWrapper.getFirstEventEl(), '2014-06-11T23:30:00');
                waitEventDrag2(calendar, dragging).then(function () {
                    var event = currentCalendar.getEvents()[0];
                    expect(event.start).toEqualDate('2014-06-11T23:30:00Z');
                    expect(event.end).toBeNull();
                    expect(event.allDay).toBe(false);
                    done();
                });
            });
        });
    });
    // Initialize a calendar, run a drag, and do type-checking of all arguments for all handlers.
    // TODO: more discrimination instead of just checking for 'object'
    function initCalendarWithSpies(options) {
        options.eventDragStart = function (arg) {
            expect(arg.el instanceof Element).toBe(true);
            expect(arg.el).toHaveClass(CalendarWrapper.EVENT_CLASSNAME);
            expect(typeof arg.event).toBe('object');
            expect(typeof arg.jsEvent).toBe('object');
            expect(typeof arg.view).toBe('object');
        };
        options.eventDragStop = function (arg) {
            expect(options.eventDragStart).toHaveBeenCalled();
            expect(arg.el instanceof Element).toBe(true);
            expect(arg.el).toHaveClass(CalendarWrapper.EVENT_CLASSNAME);
            expect(typeof arg.event).toBe('object');
            expect(typeof arg.jsEvent).toBe('object');
            expect(typeof arg.view).toBe('object');
        };
        options.eventDrop = function (arg) {
            expect(options.eventDragStop).toHaveBeenCalled();
            expect(arg.el instanceof Element).toBe(true);
            expect(arg.el).toHaveClass(CalendarWrapper.EVENT_CLASSNAME);
            expect(typeof arg.delta).toBe('object');
            expect(typeof arg.revert).toBe('function');
            expect(typeof arg.jsEvent).toBe('object');
            expect(typeof arg.view).toBe('object');
        };
        spyOn(options, 'eventDragStart').and.callThrough();
        spyOn(options, 'eventDragStop').and.callThrough();
        return initCalendar(options);
    }
});
//# sourceMappingURL=event-dnd.js.map