import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
describe('when weekends option is set', function () {
    it('should show sat and sun if true', function () {
        var calendar = initCalendar({
            weekends: true,
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        expect(dayGridWrapper.getDayEls(0).length).toBeGreaterThan(0); // 0=sunday
        expect(dayGridWrapper.getDayEls(6).length).toBeGreaterThan(0); // 6=saturday
    });
    it('should not show sat and sun if false', function () {
        var calendar = initCalendar({
            weekends: false,
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        expect(dayGridWrapper.getDayEls(0).length).toBe(0); // 0=sunday
        expect(dayGridWrapper.getDayEls(6).length).toBe(0); // 6=saturday
    });
});
//# sourceMappingURL=weekends.js.map