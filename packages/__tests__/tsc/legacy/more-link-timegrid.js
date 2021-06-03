import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
import { TimeGridWrapper } from '../lib/wrappers/TimeGridWrapper';
describe('eventMaxStack', function () {
    pushOptions({
        initialView: 'timeGridDay',
        initialDate: '2021-05-07',
        scrollTime: 0,
        eventMaxStack: 2,
    });
    it('puts hidden events in a popover', function (done) {
        var calendar = initCalendar({
            events: [
                { start: '2021-05-07T00:00:00', end: '2021-05-07T01:00:00' },
                { start: '2021-05-07T00:00:00', end: '2021-05-07T01:00:00' },
                { start: '2021-05-07T00:00:00', end: '2021-05-07T01:00:00' },
            ],
        });
        var timeGrid = new TimeGridViewWrapper(calendar).timeGrid;
        var moreLinkEls = timeGrid.getMoreEls();
        expect(moreLinkEls.length).toBe(1);
        timeGrid.openMorePopover();
        setTimeout(function () {
            var moreEventEls = timeGrid.getMorePopoverEventEls();
            expect(moreEventEls.length).toBe(1);
            done();
        });
    });
    it('can drag events out of popover', function (done) {
        var calendar = initCalendar({
            editable: true,
            events: [
                { id: '1', start: '2021-05-07T00:00:00', end: '2021-05-07T01:00:00' },
                { id: '2', start: '2021-05-07T00:00:00', end: '2021-05-07T01:00:00' },
                { id: '3', start: '2021-05-07T00:00:00', end: '2021-05-07T01:00:00' },
            ],
        });
        var timeGrid = new TimeGridViewWrapper(calendar).timeGrid;
        timeGrid.openMorePopover();
        setTimeout(function () {
            var moreEventEls = timeGrid.getMorePopoverEventEls();
            var newStart = '2021-05-07T02:00:00';
            $(moreEventEls).simulate('drag', {
                end: timeGrid.getPoint(newStart),
                onRelease: function () {
                    var event = calendar.getEventById('3');
                    expect(event.start).toEqualDate(newStart);
                    done();
                },
            });
        });
    });
    it('causes separate adjacent more links', function () {
        var calendar = initCalendar({
            events: [
                { start: '2021-05-07T00:00:00', end: '2021-05-07T01:00:00' },
                { start: '2021-05-07T00:00:00', end: '2021-05-07T01:00:00' },
                { start: '2021-05-07T00:00:00', end: '2021-05-07T01:00:00' },
                { start: '2021-05-07T01:00:00', end: '2021-05-07T02:00:00' },
                { start: '2021-05-07T01:00:00', end: '2021-05-07T02:00:00' },
                { start: '2021-05-07T01:00:00', end: '2021-05-07T02:00:00' },
            ],
        });
        var timeGrid = new TimeGridViewWrapper(calendar).timeGrid;
        var moreLinkEls = timeGrid.getMoreEls();
        expect(moreLinkEls.length).toBe(2);
    });
    // TODO: test coords of more link
    it('puts overlapping hidden events in same popover, respecting eventOrder', function (done) {
        var calendar = initCalendar({
            eventOrder: 'title',
            events: [
                { title: '1', start: '2021-05-07T00:00:00', end: '2021-05-07T02:00:00' },
                { title: '2', start: '2021-05-07T00:00:00', end: '2021-05-07T02:00:00' },
                { title: '3', start: '2021-05-07T01:00:00', end: '2021-05-07T03:00:00' },
                { title: '4', start: '2021-05-07T00:30:00', end: '2021-05-07T02:30:00' },
            ],
        });
        var timeGrid = new TimeGridViewWrapper(calendar).timeGrid;
        var moreLinkEls = timeGrid.getMoreEls();
        expect(moreLinkEls.length).toBe(1);
        timeGrid.openMorePopover();
        setTimeout(function () {
            var moreEventEls = timeGrid.getMorePopoverEventEls();
            expect(moreEventEls.length).toBe(2);
            expect(TimeGridWrapper.getEventElInfo(moreEventEls[0]).title).toBe('3');
            done();
        });
    });
});
//# sourceMappingURL=more-link-timegrid.js.map