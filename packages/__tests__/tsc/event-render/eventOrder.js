import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
describe('eventOrder', function () {
    pushOptions({
        initialDate: '2018-01-01',
        initialView: 'dayGridMonth',
        eventDidMount: function (arg) {
            arg.el.setAttribute('data-event-id', arg.event.id);
        },
    });
    describe('when all different start times', function () {
        pushOptions({
            events: [
                { id: 'z', title: 'a', start: '2018-01-01T10:00:00' },
                { id: 'y', title: 'b', start: '2018-01-01T09:00:00' },
                { id: 'x', title: 'c', start: '2018-01-01T08:00:00' },
            ],
        });
        it('will sort by start time by default', function () {
            initCalendar();
            expect(getEventOrder()).toEqual(['x', 'y', 'z']);
        });
    });
    describe('when all the same date', function () {
        pushOptions({
            events: [
                { id: 'z', title: 'a', start: '2018-01-01T09:00:00', myOrder: 3 },
                { id: 'y', title: 'b', start: '2018-01-01T09:00:00', myOrder: 1 },
                { id: 'x', title: 'c', start: '2018-01-01T09:00:00', myOrder: 2 },
            ],
        });
        it('sorts by title by default', function () {
            initCalendar();
            expect(getEventOrder()).toEqual(['z', 'y', 'x']);
        });
        it('can sort by a standard prop', function () {
            initCalendar({
                eventOrder: 'id',
            });
            expect(getEventOrder()).toEqual(['x', 'y', 'z']);
        });
        it('can sort by a non-standard prop', function () {
            initCalendar({
                eventOrder: 'myOrder',
            });
            expect(getEventOrder()).toEqual(['y', 'x', 'z']);
        });
    });
    describe('when different dates', function () {
        pushOptions({
            events: [
                { id: 'z', title: 'a', start: '2018-01-03T09:00:00', end: '2018-01-06T09:00:00', myOrder: 3 },
                { id: 'y', title: 'b', start: '2018-01-02T09:00:00', end: '2018-01-06T09:00:00', myOrder: 1 },
                { id: 'x', title: 'c', start: '2018-01-01T09:00:00', end: '2018-01-06T09:00:00', myOrder: 2 },
            ],
        });
        it('sorting by a prop will override date-determined order', function () {
            initCalendar({
                eventOrder: 'myOrder',
            });
            expect(getEventOrder()).toEqual(['y', 'x', 'z']);
        });
    });
    describe('when different durations', function () {
        pushOptions({
            events: [
                { id: 'z', title: 'a', start: '2018-01-01T09:00:00', end: '2018-01-04T09:00:00', myOrder: 3 },
                { id: 'y', title: 'b', start: '2018-01-01T09:00:00', end: '2018-01-02T09:00:00', myOrder: 1 },
                { id: 'x', title: 'c', start: '2018-01-01T09:00:00', end: '2018-01-03T09:00:00', myOrder: 2 },
            ],
        });
        it('sorting by a prop will override duration-determined order', function () {
            initCalendar({
                eventOrder: 'myOrder',
            });
            expect(getEventOrder()).toEqual(['y', 'x', 'z']);
        });
    });
    describe('when long event split across weeks', function () {
        pushOptions({
            events: [
                { id: 'x', start: '2018-01-06', end: '2018-01-08' },
                { id: 'y', start: '2018-01-06', end: '2018-01-07' },
                { id: 'z', start: '2018-01-07', end: '2018-01-08' },
            ],
        });
        it('should prioritize eventOrder duration', function () {
            var calendar = initCalendar({
                eventOrder: '-duration',
            });
            var dayGrid = new DayGridViewWrapper(calendar).dayGrid;
            var rowEls = dayGrid.getRowEls();
            var xEvent0 = rowEls[0].querySelector('[data-event-id="x"]');
            var xEvent1 = rowEls[1].querySelector('[data-event-id="x"]');
            var yEvent = rowEls[0].querySelector('[data-event-id="y"]');
            var zEvent = rowEls[1].querySelector('[data-event-id="z"]');
            expect(xEvent0.getBoundingClientRect().top)
                .toBeLessThan(yEvent.getBoundingClientRect().top);
            expect(xEvent1.getBoundingClientRect().top)
                .toBeLessThan(zEvent.getBoundingClientRect().top);
        });
    });
    function getEventOrder() {
        var objs = new CalendarWrapper(currentCalendar).getEventEls().map(function (el) { return ({
            id: el.getAttribute('data-event-id'),
            top: el.getBoundingClientRect().top,
        }); });
        objs.sort(function (a, b) { return a.top - b.top; });
        return objs.map(function (obj) { return obj.id; });
    }
});
//# sourceMappingURL=eventOrder.js.map