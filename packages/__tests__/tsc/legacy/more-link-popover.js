import { __assign } from "tslib";
import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
import { DayGridWrapper } from '../lib/wrappers/DayGridWrapper';
describe('more-link popover', function () {
    var testEvents = [
        { title: 'event1', start: '2014-07-28', end: '2014-07-30', className: 'event1' },
        { title: 'event2', start: '2014-07-29', end: '2014-07-31', className: 'event2' },
        { title: 'event3', start: '2014-07-29', className: 'event3' },
        { title: 'event4', start: '2014-07-29', className: 'event4' },
    ];
    pushOptions({
        initialView: 'dayGridMonth',
        initialDate: '2014-08-01',
        dayMaxEventRows: 3,
        events: testEvents,
        dragScroll: false,
        handleWindowResize: false,
    });
    describeOptions('initialView', {
        'when in month view': 'dayGridMonth',
        'when in dayGridWeek view': 'dayGridWeek',
        'when in week view': 'timeGridWeek',
    }, function (viewName) {
        var ViewWrapper = viewName.match(/^dayGrid/) ? DayGridViewWrapper : TimeGridViewWrapper;
        it('aligns horizontally with left edge of cell if LTR', function (done) {
            var calendar = initCalendar({
                direction: 'ltr',
            });
            setTimeout(function () {
                var dayGridWrapper = new ViewWrapper(calendar).dayGrid;
                dayGridWrapper.openMorePopover();
                setTimeout(function () {
                    var cellLeft = dayGridWrapper.getDayEl('2014-07-29').getBoundingClientRect().left;
                    var popoverLeft = dayGridWrapper.getMorePopoverEl().getBoundingClientRect().left;
                    var diff = Math.abs(cellLeft - popoverLeft);
                    expect(diff).toBeLessThan(2);
                    done();
                });
            });
        });
        it('aligns horizontally with left edge of cell if RTL', function (done) {
            var calendar = initCalendar({
                direction: 'rtl',
            });
            setTimeout(function () {
                var dayGridWrapper = new ViewWrapper(calendar).dayGrid;
                dayGridWrapper.openMorePopover();
                setTimeout(function () {
                    var cellRight = dayGridWrapper.getDayEl('2014-07-29').getBoundingClientRect().right;
                    var popoverRight = dayGridWrapper.getMorePopoverEl().getBoundingClientRect().right;
                    var diff = Math.abs(cellRight - popoverRight);
                    expect(diff).toBeLessThan(2);
                    done();
                });
            });
        });
    });
    describe('when in month view', function () {
        pushOptions({
            initialView: 'dayGridMonth',
        });
        it('aligns with top of cell', function (done) {
            var calendar = initCalendar();
            setTimeout(function () {
                var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                dayGridWrapper.openMorePopover();
                setTimeout(function () {
                    var cellTop = dayGridWrapper.getDayEl('2014-07-29').getBoundingClientRect().top;
                    var popoverTop = dayGridWrapper.getMorePopoverEl().getBoundingClientRect().top;
                    var diff = Math.abs(cellTop - popoverTop);
                    expect(diff).toBeLessThan(2);
                    done();
                });
            });
        });
        it('works with background events', function (done) {
            var calendar = initCalendar({
                events: testEvents.concat([
                    {
                        start: '2014-07-29',
                        display: 'background',
                    },
                ]),
            });
            setTimeout(function () {
                var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                dayGridWrapper.openMorePopover();
                setTimeout(function () {
                    expect(dayGridWrapper.getMorePopoverEventCnt()).toBeGreaterThan(1);
                    expect(dayGridWrapper.getMorePopoverBgEventCnt()).toBe(0);
                    done();
                });
            });
        });
        it('works with events that have invalid end times', function (done) {
            var calendar = initCalendar({
                events: [
                    { title: 'event1', start: '2014-07-29', end: '2014-07-29' },
                    { title: 'event2', start: '2014-07-29', end: '2014-07-28' },
                    { title: 'event3', start: '2014-07-29T00:00:00', end: '2014-07-29T00:00:00' },
                    { title: 'event4', start: '2014-07-29T00:00:00', end: '2014-07-28T23:00:00' },
                ],
            });
            setTimeout(function () {
                var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                dayGridWrapper.openMorePopover();
                setTimeout(function () {
                    expect(dayGridWrapper.getMorePopoverEventCnt()).toBe(4);
                    done();
                });
            });
        });
        // issue 2385
        it('orders events correctly regardless of ID', function (done) {
            var calendar = initCalendar({
                initialDate: '2012-03-22',
                dayMaxEventRows: 3,
                events: [
                    {
                        id: '39957',
                        title: 'event01',
                        start: '2012-03-22T11:00:00',
                        end: '2012-03-22T11:30:00',
                        allDay: false,
                    },
                    {
                        id: '40607',
                        title: 'event02',
                        start: '2012-03-22T16:15:00',
                        end: '2012-03-22T16:30:00',
                        allDay: false,
                    },
                    {
                        id: '40760',
                        title: 'event03',
                        start: '2012-03-22T16:00:00',
                        end: '2012-03-22T16:15:00',
                        allDay: false,
                    },
                    {
                        id: '41284',
                        title: 'event04',
                        start: '2012-03-22T19:00:00',
                        end: '2012-03-22T19:15:00',
                        allDay: false,
                    },
                    {
                        id: '41645',
                        title: 'event05',
                        start: '2012-03-22T11:30:00',
                        end: '2012-03-22T12:00:00',
                        allDay: false,
                    },
                    {
                        id: '41679',
                        title: 'event07',
                        start: '2012-03-22T12:00:00',
                        end: '2012-03-22T12:15:00',
                        allDay: false,
                    },
                    {
                        id: '42246',
                        title: 'event08',
                        start: '2012-03-22T16:45:00',
                        end: '2012-03-22T17:00:00',
                        allDay: false,
                    },
                ],
            });
            setTimeout(function () {
                var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                dayGridWrapper.openMorePopover();
                setTimeout(function () {
                    var titles = dayGridWrapper.getMorePopoverEventTitles();
                    expect(titles).toEqual([
                        'event01', 'event05', 'event07', 'event03', 'event02', 'event08', 'event04',
                    ]);
                    done();
                });
            });
        });
        // https://github.com/fullcalendar/fullcalendar/issues/3856
        it('displays multi-day events only once', function (done) {
            var calendar = initCalendar({
                initialDate: '2017-10-04',
                events: [
                    {
                        title: 'Long event',
                        className: 'long-event',
                        start: '2017-10-03',
                        end: '2017-10-20',
                    },
                    {
                        title: 'Meeting',
                        className: 'meeting-event',
                        start: '2017-10-04T10:00:00',
                        end: '2017-10-04T12:00:00',
                    },
                    {
                        title: 'Lunch 1',
                        className: 'lunch1-event',
                        start: '2017-10-04T12:00:00',
                    },
                    {
                        title: 'Lunch 2',
                        className: 'lunch2-event',
                        start: '2017-10-04T14:00:00',
                    },
                ],
            });
            var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
            dayGridWrapper.openMorePopover();
            setTimeout(function () {
                var popoverEl = dayGridWrapper.getMorePopoverEl();
                var eventEls = dayGridWrapper.getMorePopoverEventEls();
                expect(eventEls.length).toBe(4);
                var $longEventEl = $('.long-event', popoverEl);
                var $meetingEventEl = $('.meeting-event', popoverEl);
                var $lunch1EventEl = $('.lunch1-event', popoverEl);
                var $lunch2EventEl = $('.lunch2-event', popoverEl);
                expect($longEventEl).not.toHaveClass(CalendarWrapper.EVENT_IS_START_CLASSNAME);
                expect($longEventEl).not.toHaveClass(CalendarWrapper.EVENT_IS_END_CLASSNAME);
                [$meetingEventEl, $lunch1EventEl, $lunch2EventEl].forEach(function ($el) {
                    expect($el).toHaveClass(CalendarWrapper.EVENT_IS_START_CLASSNAME);
                    expect($el).toHaveClass(CalendarWrapper.EVENT_IS_END_CLASSNAME);
                });
                done();
            });
        });
        // https://github.com/fullcalendar/fullcalendar/issues/4331
        it('displays events that were collapsed in previous days', function (done) {
            var calendar = initCalendar({
                initialDate: '2018-10-01',
                events: [
                    {
                        title: 'e1',
                        start: '2018-10-18',
                    },
                    {
                        title: 'e2',
                        start: '2018-10-18',
                    },
                    {
                        title: 'e3',
                        start: '2018-10-18T11:00:00',
                    },
                    {
                        title: 'e4',
                        start: '2018-10-18T12:00:00',
                        end: '2018-10-19T12:00:00',
                    },
                    {
                        title: 'e5',
                        start: '2018-10-19',
                        className: 'event-e5',
                    },
                ],
            });
            var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
            dayGridWrapper.openMorePopover(1); // click the second +more link
            setTimeout(done);
        });
    });
    describeOptions('initialView', {
        'when in dayGridWeek view': 'dayGridWeek',
        'when in week view': 'timeGridWeek',
    }, function (viewName) {
        var ViewWrapper = viewName.match(/^dayGrid/) ? DayGridViewWrapper : TimeGridViewWrapper;
        it('aligns with top of header', function (done) {
            var calendar = initCalendar();
            var viewWrapper = new ViewWrapper(calendar);
            var dayGridWrapper = viewWrapper.dayGrid;
            dayGridWrapper.openMorePopover();
            setTimeout(function () {
                var popoverTop = dayGridWrapper.getMorePopoverEl().getBoundingClientRect().top;
                var headTop = viewWrapper.header.el.getBoundingClientRect().top;
                var diff = Math.abs(popoverTop - headTop);
                expect(diff).toBeLessThan(2);
                done();
            });
        });
    });
    // TODO: somehow test how the popover does to the edge of any scroll container
    it('closes when user clicks the X', function (done) {
        var calendar = initCalendar();
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        dayGridWrapper.openMorePopover();
        setTimeout(function () {
            expect(dayGridWrapper.getMorePopoverEl()).toBeVisible();
            dayGridWrapper.closeMorePopover();
            setTimeout(function () {
                expect(dayGridWrapper.getMorePopoverEl()).not.toBeVisible();
                done();
            });
        });
    });
    // https://github.com/fullcalendar/fullcalendar/issues/4584
    it('doesn\'t fire a dateClick', function (done) {
        var dateClickCalled = false;
        spyOnCalendarCallback('dateClick', function () {
            dateClickCalled = true;
        });
        var calendar = initCalendar();
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        dayGridWrapper.openMorePopover();
        setTimeout(function () {
            $.simulateMouseClick(dayGridWrapper.getMorePopoverHeaderEl());
            setTimeout(function () {
                expect(dateClickCalled).toBe(false);
                done();
            }, 500);
        });
    });
    it('doesn\'t close when user clicks somewhere inside of the popover', function (done) {
        var calendar = initCalendar();
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        dayGridWrapper.openMorePopover();
        setTimeout(function () {
            var popoverEl = dayGridWrapper.getMorePopoverEl();
            var popoverHeaderEl = dayGridWrapper.getMorePopoverHeaderEl();
            expect(popoverEl).toBeVisible();
            expect(popoverHeaderEl).toBeInDOM();
            $(popoverHeaderEl).simulate('mousedown').simulate('click');
            setTimeout(function () {
                expect(popoverEl).toBeVisible();
                done();
            });
        });
    });
    it('closes when user clicks outside of the popover', function (done) {
        var calendar = initCalendar();
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        dayGridWrapper.openMorePopover();
        setTimeout(function () {
            var popoverEl = dayGridWrapper.getMorePopoverEl();
            expect(popoverEl).toBeVisible();
            $('body').simulate('mousedown').simulate('click');
            setTimeout(function () {
                expect(popoverEl).not.toBeVisible();
                done();
            });
        });
    });
    describe('when dragging events out', function () {
        pushOptions({
            editable: true,
        });
        describe('when dragging an all-day event to a different day', function () {
            it('should have the new day and remain all-day', function (done) {
                var calendar = initCalendar({
                    eventDrop: function (arg) {
                        expect(arg.event.start).toEqualDate('2014-07-28');
                        expect(arg.event.allDay).toBe(true);
                        done();
                    },
                });
                var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                dayGridWrapper.openMorePopover();
                setTimeout(function () {
                    $('.event4', dayGridWrapper.getMorePopoverEl()).simulate('drag', {
                        end: dayGridWrapper.getDayEl('2014-07-28'),
                    });
                }, 0);
            });
        });
        describe('when dragging a timed event to a whole day', function () {
            it('should move to new day but maintain its time', function (done) {
                var calendar = initCalendar({
                    events: testEvents.concat([
                        {
                            title: 'event5',
                            start: '2014-07-29T13:00:00',
                            className: 'event5',
                        },
                    ]),
                    eventDrop: function (arg) {
                        expect(arg.event.start).toEqualDate('2014-07-28T13:00:00Z');
                        expect(arg.event.allDay).toBe(false);
                        done();
                    },
                });
                var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                dayGridWrapper.openMorePopover();
                setTimeout(function () {
                    $('.event5', dayGridWrapper.getMorePopoverEl()).simulate('drag', {
                        end: dayGridWrapper.getDayEl('2014-07-28T13:00:00'),
                    });
                }, 0);
            });
        });
        describe('when dragging a whole day event to a timed slot', function () {
            it('should assume the new time, with a cleared end', function (done) {
                var calendar = initCalendar({
                    initialView: 'timeGridWeek',
                    scrollTime: '00:00:00',
                    eventDrop: function (arg) {
                        expect(arg.event.start).toEqualDate('2014-07-30T03:00:00Z');
                        expect(arg.event.allDay).toBe(false);
                        done();
                    },
                });
                var viewWrapper = new TimeGridViewWrapper(calendar);
                var dayGridWrapper = viewWrapper.dayGrid;
                dayGridWrapper.openMorePopover();
                setTimeout(function () {
                    $('.event4', dayGridWrapper.getMorePopoverEl()).simulate('drag', {
                        localPoint: { left: '0%', top: '50%' },
                        end: viewWrapper.timeGrid.getPoint('2014-07-30T03:00:00'),
                    });
                }, 0);
            });
        });
        describe('when a single-day event isn\'t dragged out all the way', function () {
            it('shouldn\'t do anything', function (done) {
                var dayGridWrapper;
                var calendar = initCalendar({
                    eventDragStop: function () {
                        setTimeout(function () {
                            expect(dayGridWrapper.getMorePopoverEl()).toBeInDOM();
                            done();
                        }, 0);
                    },
                });
                var viewWrapper = new DayGridViewWrapper(calendar);
                dayGridWrapper = viewWrapper.dayGrid;
                dayGridWrapper.openMorePopover();
                setTimeout(function () {
                    $('.event1', dayGridWrapper.getMorePopoverEl()).simulate('drag', {
                        localPoint: { left: '0%', top: '50%' },
                        dx: 20,
                    });
                }, 0);
            });
        });
    });
    it('calls event render handlers', function (done) {
        var options = {
            events: [
                { title: 'event1', start: '2014-07-28', end: '2014-07-30', className: 'event1' },
                { title: 'event2', start: '2014-07-29', end: '2014-07-31', className: 'event2' },
                { title: 'event3', start: '2014-07-29', className: 'event3' },
                { title: 'event4', start: '2014-07-29', className: 'event4' },
            ],
            eventDidMount: function () { },
            eventContent: function () { },
            eventWillUnmount: function () { },
        };
        spyOn(options, 'eventDidMount');
        spyOn(options, 'eventContent');
        spyOn(options, 'eventWillUnmount');
        function resetCounts() {
            options.eventDidMount.calls.reset();
            options.eventContent.calls.reset();
            options.eventWillUnmount.calls.reset();
        }
        var calendar = initCalendar(options);
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        expect(options.eventDidMount.calls.count()).toBe(4);
        expect(options.eventContent.calls.count()).toBe(4);
        expect(options.eventWillUnmount.calls.count()).toBe(0);
        resetCounts();
        dayGridWrapper.openMorePopover();
        setTimeout(function () {
            expect(options.eventDidMount.calls.count()).toBe(4);
            expect(options.eventContent.calls.count()).toBe(4);
            expect(options.eventWillUnmount.calls.count()).toBe(0);
            resetCounts();
            dayGridWrapper.closeMorePopover();
            setTimeout(function () {
                expect(options.eventDidMount.calls.count()).toBe(0);
                expect(options.eventContent.calls.count()).toBe(0);
                expect(options.eventWillUnmount.calls.count()).toBe(4);
                done();
            });
        });
    });
    it('displays latest events after refetch', function (done) {
        var fetchCnt = 0;
        var newTitle = 'cool';
        var calendar = initCalendar({
            events: function (info, callback) {
                fetchCnt += 1;
                if (fetchCnt === 1) {
                    callback(testEvents);
                }
                else {
                    callback(testEvents.slice(0, -1).concat([
                        __assign(__assign({}, testEvents[testEvents.length - 1]), { title: newTitle }),
                    ]));
                }
            },
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        dayGridWrapper.openMorePopover();
        setTimeout(function () {
            calendar.refetchEvents();
            var eventEls = dayGridWrapper.getMorePopoverEventEls();
            var eventInfo = DayGridWrapper.getEventElInfo(eventEls[2]);
            expect(eventInfo.title).toBe(newTitle);
            done();
        });
    });
});
//# sourceMappingURL=more-link-popover.js.map