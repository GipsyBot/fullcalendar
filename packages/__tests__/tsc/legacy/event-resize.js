import { createDuration } from '@fullcalendar/core';
import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
import { waitEventResize2 } from '../lib/wrappers/interaction-util';
import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
describe('eventResize', function () {
    pushOptions({
        initialDate: '2014-06-11',
        editable: true,
        longPressDelay: 100,
    });
    describe('when in month view', function () {
        pushOptions({
            initialView: 'dayGridMonth',
        });
        describe('when resizing an all-day event with mouse', function () {
            it('should have correct arguments with a whole-day delta', function (done) {
                var calendar = initCalendar({
                    events: [{
                            title: 'all-day event',
                            start: '2014-06-11',
                            allDay: true,
                        }],
                });
                checkCalendarTriggers(calendar);
                var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                var resizing = dayGridWrapper.resizeEvent(dayGridWrapper.getFirstEventEl(), '2014-06-11', '2014-06-16');
                waitEventResize2(calendar, resizing).then(function (arg) {
                    expect(arg.endDelta).toEqual(createDuration({ day: 5 }));
                    expect(arg.event.start).toEqualDate('2014-06-11');
                    expect(arg.event.end).toEqualDate('2014-06-17');
                    arg.revert();
                    var event = calendar.getEvents()[0];
                    expect(event.start).toEqualDate('2014-06-11');
                    expect(event.end).toBeNull();
                    done();
                });
            });
        });
        describe('when resizing an all-day event via touch', function () {
            // for https://github.com/fullcalendar/fullcalendar/issues/3118
            [true, false].forEach(function (eventStartEditable) {
                describe('when eventStartEditable is ' + eventStartEditable, function () {
                    pushOptions({ eventStartEditable: eventStartEditable });
                    it('should have correct arguments with a whole-day delta', function (done) {
                        var calendar = initCalendar({
                            dragRevertDuration: 0,
                            events: [{
                                    title: 'all-day event',
                                    start: '2014-06-11',
                                    allDay: true,
                                }],
                        });
                        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                        var resizing = dayGridWrapper.resizeEventTouch(dayGridWrapper.getFirstEventEl(), '2014-06-11', '2014-06-16');
                        waitEventResize2(calendar, resizing).then(function (arg) {
                            expect(arg.endDelta).toEqual(createDuration({ day: 5 }));
                            expect(arg.event.start).toEqualDate('2014-06-11');
                            expect(arg.event.end).toEqualDate('2014-06-17');
                            arg.revert();
                            var event = calendar.getEvents()[0];
                            expect(event.start).toEqualDate('2014-06-11');
                            expect(event.end).toBeNull();
                            done();
                        });
                    });
                });
            });
        });
        describe('when rendering a timed event', function () {
            it('should not have resize capabilities', function () {
                initCalendar({
                    events: [{
                            title: 'timed event',
                            start: '2014-06-11T08:00:00',
                            allDay: false,
                        }],
                });
                expect($("." + CalendarWrapper.EVENT_CLASSNAME + " ." + CalendarWrapper.EVENT_RESIZER_CLASSNAME)).not.toBeInDOM();
            });
        });
    });
    describe('when in timeGrid view', function () {
        pushOptions({
            initialView: 'timeGridWeek',
        });
        describe('when resizing an all-day event', function () {
            it('should have correct arguments with a whole-day delta', function (done) {
                var calendar = initCalendar({
                    events: [{
                            title: 'all-day event',
                            start: '2014-06-11',
                            allDay: true,
                        }],
                });
                var dayGridWrapper = new TimeGridViewWrapper(calendar).dayGrid;
                var resizing = dayGridWrapper.resizeEvent(dayGridWrapper.getFirstEventEl(), '2014-06-11', '2014-06-13');
                waitEventResize2(calendar, resizing).then(function (arg) {
                    expect(arg.endDelta).toEqual(createDuration({ day: 2 }));
                    expect(arg.event.start).toEqualDate('2014-06-11');
                    expect(arg.event.end).toEqualDate('2014-06-14');
                    arg.revert();
                    var event = calendar.getEvents()[0];
                    expect(event.start).toEqualDate('2014-06-11');
                    expect(event.end).toBeNull();
                    done();
                });
            });
        });
        describe('when resizing a timed event with an end', function () {
            pushOptions({
                events: [{
                        title: 'timed event event',
                        start: '2014-06-11T05:00:00',
                        end: '2014-06-11T07:00:00',
                        allDay: false,
                    }],
            });
            it('should have correct arguments with a timed delta', function (done) {
                var calendar = initCalendar();
                var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                var resizing = timeGridWrapper.resizeEvent(timeGridWrapper.getFirstEventEl(), '2014-06-11T07:00:00', '2014-06-11T09:30:00');
                waitEventResize2(calendar, resizing).then(function (arg) {
                    expect(arg.endDelta).toEqual(createDuration({ hour: 2, minute: 30 }));
                    expect(arg.event.start).toEqualDate('2014-06-11T05:00:00Z');
                    expect(arg.event.end).toEqualDate('2014-06-11T09:30:00Z');
                    arg.revert();
                    var event = calendar.getEvents()[0];
                    expect(event.start).toEqualDate('2014-06-11T05:00:00Z');
                    expect(event.end).toEqualDate('2014-06-11T07:00:00Z');
                    done();
                });
            });
            it('should have correct arguments with a timed delta via touch', function (done) {
                var calendar = initCalendar({
                    dragRevertDuration: 0,
                });
                var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                var resizing = timeGridWrapper.resizeEventTouch(timeGridWrapper.getFirstEventEl(), '2014-06-11T07:00:00Z', '2014-06-11T09:30:00Z');
                waitEventResize2(calendar, resizing).then(function (arg) {
                    expect(arg.endDelta).toEqual(createDuration({ hour: 2, minute: 30 }));
                    expect(arg.event.start).toEqualDate('2014-06-11T05:00:00Z');
                    expect(arg.event.end).toEqualDate('2014-06-11T09:30:00Z');
                    arg.revert();
                    var event = calendar.getEvents()[0];
                    expect(event.start).toEqualDate('2014-06-11T05:00:00Z');
                    expect(event.end).toEqualDate('2014-06-11T07:00:00Z');
                    done();
                });
            });
            // TODO: test RTL
            it('should have correct arguments with a timed delta when resized to a different day', function (done) {
                var calendar = initCalendar();
                var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                var resizing = timeGridWrapper.resizeEventTouch(timeGridWrapper.getFirstEventEl(), '2014-06-11T07:00:00Z', '2014-06-12T09:30:00Z');
                waitEventResize2(calendar, resizing).then(function (arg) {
                    expect(arg.endDelta).toEqual(createDuration({ day: 1, hour: 2, minute: 30 }));
                    expect(arg.event.start).toEqualDate('2014-06-11T05:00:00Z');
                    expect(arg.event.end).toEqualDate('2014-06-12T09:30:00Z');
                    arg.revert();
                    var event = calendar.getEvents()[0];
                    expect(event.start).toEqualDate('2014-06-11T05:00:00Z');
                    expect(event.end).toEqualDate('2014-06-11T07:00:00Z');
                    done();
                });
            });
            it('should have correct arguments with a timed delta, when timezone is local', function (done) {
                var calendar = initCalendar({
                    timeZone: 'local',
                });
                var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                var resizing = timeGridWrapper.resizeEventTouch(timeGridWrapper.getFirstEventEl(), '2014-06-11T07:00:00', '2014-06-11T09:30:00');
                waitEventResize2(calendar, resizing).then(function (arg) {
                    expect(arg.endDelta).toEqual(createDuration({ hour: 2, minute: 30 }));
                    expect(arg.event.start).toEqualLocalDate('2014-06-11T05:00:00');
                    expect(arg.event.end).toEqualLocalDate('2014-06-11T09:30:00');
                    arg.revert();
                    var event = calendar.getEvents()[0];
                    expect(event.start).toEqualLocalDate('2014-06-11T05:00:00');
                    expect(event.end).toEqualLocalDate('2014-06-11T07:00:00');
                    done();
                });
            });
            it('should have correct arguments with a timed delta, when timezone is UTC', function (done) {
                var calendar = initCalendar({
                    timeZone: 'UTC',
                });
                var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                var resizing = timeGridWrapper.resizeEventTouch(timeGridWrapper.getFirstEventEl(), '2014-06-11T07:00:00', '2014-06-11T09:30:00');
                waitEventResize2(calendar, resizing).then(function (arg) {
                    expect(arg.endDelta).toEqual(createDuration({ hour: 2, minute: 30 }));
                    expect(arg.event.start).toEqualDate('2014-06-11T05:00:00+00:00');
                    expect(arg.event.end).toEqualDate('2014-06-11T09:30:00+00:00');
                    arg.revert();
                    var event = calendar.getEvents()[0];
                    expect(event.start).toEqualDate('2014-06-11T05:00:00');
                    expect(event.end).toEqualDate('2014-06-11T07:00:00+00:00');
                    done();
                });
            });
            it('should display the correct time text while resizing', function (done) {
                var calendar = initCalendar();
                var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                var onBeforeReleaseCalled = false; // don't trust ourselves :(
                timeGridWrapper.resizeEvent(timeGridWrapper.getFirstEventEl(), '2014-06-11T07:00:00Z', '2014-06-11T09:30:00Z', function () {
                    var $mirrorEls = $(timeGridWrapper.getMirrorEls());
                    expect($mirrorEls.length).toBe(1);
                    expect($mirrorEls.find('.' + CalendarWrapper.EVENT_TIME_CLASSNAME)).toHaveText('5:00 - 9:30');
                    onBeforeReleaseCalled = true;
                }).then(function () {
                    expect(onBeforeReleaseCalled).toBe(true);
                    done();
                });
            });
            it('should run the temporarily rendered event through eventDidMount', function (done) {
                var calendar = initCalendar({
                    eventDidMount: function (arg) {
                        $(arg.el).addClass('eventDidRender');
                    },
                });
                var onBeforeReleaseCalled = false; // don't trust ourselves :(
                var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                timeGridWrapper.resizeEvent(timeGridWrapper.getFirstEventEl(), '2014-06-11T07:00:00Z', '2014-06-11T09:30:00Z', function () {
                    var $mirrorEls = $(timeGridWrapper.getMirrorEls());
                    expect($mirrorEls.length).toBe(1);
                    expect($mirrorEls).toHaveClass('eventDidRender');
                    onBeforeReleaseCalled = true;
                }).then(function () {
                    expect(onBeforeReleaseCalled).toBe(true);
                    done();
                });
            });
            it('should not fire the windowResize handler', function (done) {
                // has to do this crap because PhantomJS was trigger false window resizes unrelated to the event resize
                var isDragging = false;
                var calledWhileDragging = false;
                var calendar = initCalendar({
                    windowResizeDelay: 0,
                    windowResize: function (ev) {
                        if (isDragging) {
                            calledWhileDragging = true;
                        }
                    },
                });
                var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                timeGridWrapper.resizeEvent(timeGridWrapper.getFirstEventEl(), '2014-06-11T07:00:00Z', '2014-06-11T09:30:00Z', function () {
                    isDragging = false;
                }).then(function () {
                    expect(calledWhileDragging).toBe(false);
                    done();
                });
            });
        });
        describe('when resizing a timed event without an end', function () {
            pushOptions({
                defaultTimedEventDuration: '02:00',
                events: [{
                        title: 'timed event event',
                        start: '2014-06-11T05:00:00',
                        allDay: false,
                    }],
            });
            // copied and pasted from other test :(
            it('should display the correct time text while resizing', function (done) {
                var calendar = initCalendar();
                var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                var onBeforeReleaseCalled = false; // don't trust ourselves :(
                timeGridWrapper.resizeEvent(timeGridWrapper.getFirstEventEl(), '2014-06-11T07:00:00Z', '2014-06-11T09:30:00Z', function () {
                    var $mirrorEls = $(timeGridWrapper.getMirrorEls());
                    expect($mirrorEls.length).toBe(1);
                    expect($mirrorEls.find('.' + CalendarWrapper.EVENT_TIME_CLASSNAME)).toHaveText('5:00 - 9:30');
                    onBeforeReleaseCalled = true;
                }).then(function () {
                    expect(onBeforeReleaseCalled).toBe(true);
                    done();
                });
            });
        });
    });
    function checkCalendarTriggers(calendar) {
        calendar.on('eventResizeStart', function (arg) {
            expect(arg.el instanceof Element).toBe(true);
            expect(typeof arg.event).toBe('object');
            expect(typeof arg.jsEvent).toBe('object');
            expect(typeof arg.view).toBe('object');
        });
        calendar.on('eventResizeStop', function (arg) {
            expect(arg.el instanceof Element).toBe(true);
            expect(typeof arg.event).toBe('object');
            expect(typeof arg.jsEvent).toBe('object');
            expect(typeof arg.view).toBe('object');
        });
        calendar.on('eventResize', function (arg) {
            expect(arg.el instanceof Element).toBe(true);
            expect(typeof arg.event).toBe('object');
            expect(typeof arg.startDelta).toBe('object');
            expect(typeof arg.endDelta).toBe('object');
            expect(typeof arg.revert).toBe('function');
            expect(typeof arg.jsEvent).toBe('object');
            expect(typeof arg.view).toBe('object');
        });
    }
});
//# sourceMappingURL=event-resize.js.map