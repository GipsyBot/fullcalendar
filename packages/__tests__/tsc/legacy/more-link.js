import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
import { filterVisibleEls } from '../lib/dom-misc';
describe('dayMaxEventRows', function () {
    pushOptions({
        initialDate: '2014-08-01',
        dayMaxEventRows: 3,
    });
    describe('as a number', function () {
        describeOptions('initialView', {
            'when in month view': 'dayGridMonth',
            'when in dayGridWeek view': 'dayGridWeek',
            'when in week view': 'timeGridWeek',
        }, function (viewName) {
            var ViewWrapper = viewName.match(/^dayGrid/) ? DayGridViewWrapper : TimeGridViewWrapper;
            it('doesn\'t display a more link when limit is more than the # of events', function () {
                var calendar = initCalendar({
                    events: [
                        { title: 'event1', start: '2014-07-29' },
                        { title: 'event2', start: '2014-07-29' },
                    ],
                });
                var dayGridWrapper = new ViewWrapper(calendar).dayGrid;
                expect(dayGridWrapper.getMoreEls().length).toBe(0);
            });
            it('doesn\'t display a more link when limit equal to the # of events', function () {
                var calendar = initCalendar({
                    events: [
                        { title: 'event1', start: '2014-07-29' },
                        { title: 'event2', start: '2014-07-29' },
                        { title: 'event2', start: '2014-07-29' },
                    ],
                });
                var dayGridWrapper = new ViewWrapper(calendar).dayGrid;
                expect(dayGridWrapper.getMoreEls().length).toBe(0);
            });
            it('displays a more link when limit is less than the # of events', function () {
                var calendar = initCalendar({
                    events: [
                        { title: 'event1', start: '2014-07-29' },
                        { title: 'event2', start: '2014-07-29' },
                        { title: 'event2', start: '2014-07-29' },
                        { title: 'event2', start: '2014-07-29' },
                    ],
                });
                var dayGridWrapper = new ViewWrapper(calendar).dayGrid;
                var moreEls = dayGridWrapper.getMoreEls();
                expect(moreEls.length).toBe(1);
                expect(moreEls[0]).toHaveText('+2 more');
            });
            it('displays one more per day, when a multi-day event is above', function () {
                var calendar = initCalendar({
                    events: [
                        { title: 'event1', start: '2014-07-29', end: '2014-07-31' },
                        { title: 'event2', start: '2014-07-29', end: '2014-07-31' },
                        { title: 'event2', start: '2014-07-29', end: '2014-07-31' },
                        { title: 'event2', start: '2014-07-29', end: '2014-07-31' },
                    ],
                });
                var dayGridWrapper = new ViewWrapper(calendar).dayGrid;
                var moreEls = dayGridWrapper.getMoreEls();
                var cells = dayGridWrapper.getDayElsInRow(0);
                expect(moreEls.length).toBe(2);
                expect(moreEls[0]).toHaveText('+2 more');
                expect(moreEls[0]).toBeBoundedBy(cells[2]);
                expect(moreEls[1]).toHaveText('+2 more');
                expect(moreEls[1]).toBeBoundedBy(cells[3]);
            });
            it('will render a pertially hidden single-day event', function () {
                var calendar = initCalendar({
                    events: [
                        { title: 'event1', start: '2014-07-29', end: '2014-07-31' },
                        { title: 'event2', start: '2014-07-29', end: '2014-07-31' },
                        { title: 'event3', start: '2014-07-29', end: '2014-07-31' },
                        { title: 'event4', start: '2014-07-29' },
                    ],
                });
                var dayGridWrapper = new ViewWrapper(calendar).dayGrid;
                var eventEls = dayGridWrapper.getEventEls();
                var visibleEventEls = filterVisibleEls(eventEls);
                var moreEls = dayGridWrapper.getMoreEls();
                var cells = dayGridWrapper.getAllDayEls();
                expect(visibleEventEls.length).toBe(3);
                expect(moreEls.length).toBe(1);
                expect(moreEls[0]).toHaveText('+2 more');
                expect(moreEls[0]).toBeBoundedBy(cells[2]);
            });
            // https://github.com/fullcalendar/fullcalendar/issues/6187
            it('will render a partially multi-day hidden event', function () {
                var calendar = initCalendar({
                    events: [
                        { title: 'event1', start: '2014-07-28', end: '2014-07-30' },
                        { title: 'event2', start: '2014-07-28', end: '2014-07-30' },
                        { title: 'event3', start: '2014-07-28', end: '2014-07-30' },
                        { title: 'event4', start: '2014-07-29', end: '2014-07-31' },
                    ],
                });
                var dayGridWrapper = new ViewWrapper(calendar).dayGrid;
                var eventEls = dayGridWrapper.getEventEls();
                var visibleEventEls = filterVisibleEls(eventEls);
                var moreEls = dayGridWrapper.getMoreEls();
                var cells = dayGridWrapper.getDayElsInRow(0);
                expect(visibleEventEls.length).toBe(4);
                expect(moreEls.length).toBe(1);
                expect(moreEls[0]).toHaveText('+2 more');
                expect(moreEls[0]).toBeBoundedBy(cells[2]);
            });
            it('will render a link in place of a hidden single day event, if covered by a multi-day', function () {
                var calendar = initCalendar({
                    events: [
                        { title: 'event1', start: '2014-07-28', end: '2014-07-30' },
                        { title: 'event2', start: '2014-07-28', end: '2014-07-30' },
                        { title: 'event3', start: '2014-07-28' },
                        { title: 'event4', start: '2014-07-28' },
                    ],
                });
                var dayGridWrapper = new ViewWrapper(calendar).dayGrid;
                var cells = dayGridWrapper.getDayElsInRow(0);
                var moreEls = dayGridWrapper.getMoreEls();
                expect(moreEls.length).toBe(1);
                expect(moreEls[0]).toHaveText('+2 more');
                expect(moreEls[0]).toBeBoundedBy(cells[1]);
            });
            it('will render a link in place of a hidden single day event, if covered by a multi-day ' +
                'and in its second column', function () {
                var calendar = initCalendar({
                    events: [
                        { title: 'event1', start: '2014-07-28', end: '2014-07-30' },
                        { title: 'event2', start: '2014-07-28', end: '2014-07-30' },
                        { title: 'event3', start: '2014-07-29' },
                        { title: 'event4', start: '2014-07-29' },
                    ],
                });
                var dayGridWrapper = new ViewWrapper(calendar).dayGrid;
                var cells = dayGridWrapper.getDayElsInRow(0);
                var moreEls = dayGridWrapper.getMoreEls();
                expect(moreEls.length).toBe(1);
                expect(moreEls[0]).toHaveText('+2 more');
                expect(moreEls[0]).toBeBoundedBy(cells[2]);
            });
        });
    });
    describe('when auto', function () {
        pushOptions({
            dayMaxEvents: true,
        });
        describe('in month view', function () {
            pushOptions({
                initialView: 'dayGridMonth',
                events: [
                    { title: 'event1', start: '2014-07-28', end: '2014-07-30' },
                    { title: 'event2', start: '2014-07-28', end: '2014-07-30' },
                    { title: 'event2', start: '2014-07-29' },
                    { title: 'event2', start: '2014-07-29' },
                    { title: 'event2', start: '2014-07-29' },
                    { title: 'event2', start: '2014-07-29' },
                    { title: 'event2', start: '2014-07-29' },
                    { title: 'event2', start: '2014-07-29' },
                    { title: 'event2', start: '2014-07-29' },
                    { title: 'event2', start: '2014-07-29' },
                    { title: 'event2', start: '2014-07-29' },
                    { title: 'event2', start: '2014-07-29' },
                    { title: 'event2', start: '2014-07-29' },
                ],
            });
            it('renders the heights of all the rows the same, regardless of # of events', function () {
                var calendar = initCalendar();
                var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                var rowEls = dayGridWrapper.getRowEls();
                expect(rowEls.length).toBeGreaterThan(0);
                var rowHeights = rowEls.map(function (rowEl) { return rowEl.getBoundingClientRect().height; });
                var totalHeight = rowHeights.reduce(function (prev, current) { return prev + current; }, 0);
                var aveHeight = totalHeight / rowHeights.length;
                rowHeights.forEach(function (rowHeight) {
                    var diff = Math.abs(rowHeight - aveHeight);
                    expect(diff).toBeLessThan(2);
                });
            });
            it('renders a more link when there are obviously too many events', function () {
                var $el = $('<div id="calendar">').appendTo('body').width(800);
                var calendar = initCalendar({}, $el);
                var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                var moreEls = dayGridWrapper.getMoreEls();
                expect(moreEls.length).toBe(1);
            });
        });
        describeOptions('initialView', {
            'when in month view': 'dayGridMonth',
            'when in dayGridWeek view': 'dayGridWeek',
        }, function () {
            it('doesn\'t render a more link where there should obviously not be a limit', function () {
                var calendar = initCalendar({
                    events: [
                        { title: 'event1', start: '2014-07-28', end: '2014-07-30' },
                    ],
                });
                var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                expect(dayGridWrapper.getMoreEls().length).toBe(0);
            });
        });
        describe('in week view', function () {
            pushOptions({
                initialView: 'timeGridWeek',
            });
            it('behaves as if limit is 5', function () {
                var calendar = initCalendar({
                    events: [
                        { title: 'event1', start: '2014-07-29' },
                        { title: 'event2', start: '2014-07-29' },
                        { title: 'event2', start: '2014-07-29' },
                        { title: 'event2', start: '2014-07-29' },
                        { title: 'event2', start: '2014-07-29' },
                        { title: 'event2', start: '2014-07-29' },
                        { title: 'event2', start: '2014-07-29' },
                    ],
                });
                var dayGridWrapper = new TimeGridViewWrapper(calendar).dayGrid;
                var eventEls = filterVisibleEls(dayGridWrapper.getEventEls());
                var moreEls = dayGridWrapper.getMoreEls();
                expect(eventEls.length).toBe(4);
                expect(moreEls.length).toBe(1);
                expect(moreEls[0]).toHaveText('+3 more');
            });
        });
    });
});
//# sourceMappingURL=more-link.js.map