import { getBoundingRect } from '../lib/dom-geom';
import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
describe('now indicator', function () {
    pushOptions({
        now: '2015-12-26T06:00:00',
        scrollTime: '00:00',
        initialView: 'timeGridWeek',
    });
    it('doesn\'t render by default', function () {
        var calendar = initCalendar();
        var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
        expect(timeGridWrapper.hasNowIndicator()).toBe(false);
    });
    describe('when activated', function () {
        pushOptions({
            nowIndicator: true,
        });
        describeOptions('direction', {
            'when LTR': 'ltr',
            'when RTL': 'rtl',
        }, function () {
            it('doesn\'t render when out of view', function () {
                var calendar = initCalendar({
                    initialDate: '2015-12-27',
                });
                var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                expect(timeGridWrapper.hasNowIndicator()).toBe(false);
            });
            it('renders on correct time', function () {
                var calendar = initCalendar();
                isNowIndicatorRenderedAt(calendar, '2015-12-26T06:00:00Z');
            });
            it('renders on correct time2', function () {
                var calendar = initCalendar({
                    now: '2015-12-20T02:30:00',
                });
                isNowIndicatorRenderedAt(calendar, '2015-12-20T02:30:00Z');
            });
        });
    });
    function isNowIndicatorRenderedAt(calendar, date) {
        var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
        var line = timeGridWrapper.getLine(date);
        var lineEl = timeGridWrapper.getNowIndicatorLineEl();
        var arrowEl = timeGridWrapper.getNowIndicatorArrowEl();
        expect(lineEl).toBeTruthy();
        expect(arrowEl).toBeTruthy();
        var lineElRect = getBoundingRect(lineEl);
        var arrowElRect = getBoundingRect(arrowEl);
        expect(Math.abs((lineElRect.top + lineElRect.bottom) / 2 -
            line.top)).toBeLessThan(2);
        expect(Math.abs((arrowElRect.top + arrowElRect.bottom) / 2 -
            line.top)).toBeLessThan(2);
        var timeGridRect = getBoundingRect(timeGridWrapper.el);
        if (calendar.getOption('direction') === 'rtl') {
            expect(Math.abs(arrowElRect.right - timeGridRect.right)).toBeLessThan(2);
        }
        else {
            expect(Math.abs(arrowElRect.left - timeGridRect.left)).toBeLessThan(2);
        }
    }
});
//# sourceMappingURL=nowIndicator.js.map