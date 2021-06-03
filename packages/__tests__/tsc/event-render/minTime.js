import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
describe('slotMinTime', function () {
    pushOptions({
        initialView: 'timeGridWeek',
        initialDate: '2017-03-22',
        scrollTime: '00:00',
    });
    describe('event rendering', function () {
        describe('when event is within negative slotMinTime', function () {
            pushOptions({
                slotMinTime: { hours: -2 },
                events: [
                    { start: '2017-03-22T22:00:00', end: '2017-03-23T00:00:00' },
                ],
            });
            it('renders two event elements in the correct places', function () {
                var calendar = initCalendar();
                var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                var res = timeGridWrapper.checkEventRendering('2017-03-22T22:00:00Z', '2017-03-23T00:00:00Z');
                expect(res.length).toBe(2);
                expect(res.isMatch).toBe(true);
            });
        });
        describe('when event start cut off by positive slotMinTime', function () {
            pushOptions({
                slotMinTime: { hours: 12 },
                events: [
                    { start: '2017-03-22T10:00:00', end: '2017-03-22T14:00:00' },
                ],
            });
            it('shows time-text as original event start time', function () {
                var calendar = initCalendar();
                var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                var timeTexts = timeGridWrapper.getEventTimeTexts();
                expect(timeTexts[0]).toBe('10:00 - 2:00');
            });
        });
    });
    it('can be changed dynamically', function () {
        var calendar = initCalendar();
        currentCalendar.setOption('slotMinTime', '09:00');
        var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
        expect(timeGridWrapper.getTimeAxisInfo()[0].text).toBe('9am');
    });
});
//# sourceMappingURL=minTime.js.map