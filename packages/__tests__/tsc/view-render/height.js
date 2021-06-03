import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
describe('view height', function () {
    // https://github.com/fullcalendar/fullcalendar/issues/6034
    xit('does not squish view-specific height:auto in timegrid view', function () {
        var calendar = initCalendar({
            initialView: 'timeGridWeek',
            aspectRatio: 1.8,
            views: {
                timeGrid: {
                    height: 'auto',
                },
            },
        });
        var viewWrapper = new TimeGridViewWrapper(calendar);
        var scrollerEl = viewWrapper.getScrollerEl();
        expect(scrollerEl.getBoundingClientRect().height).toBeGreaterThan(10);
    });
});
//# sourceMappingURL=height.js.map