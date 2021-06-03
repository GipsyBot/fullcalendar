import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
describe('weekViewRender', function () {
    var nowStr = '2018-05-28'; // is a Monday
    pushOptions({
        now: nowStr,
        initialView: 'timeGridWeek',
    });
    describe('verify th class for today', function () {
        it('should have today class only on "today"', function () {
            var calendar = initCalendar();
            var headerWrapper = new TimeGridViewWrapper(calendar).header;
            var cellInfo = headerWrapper.getCellInfo();
            expect(cellInfo[1].date).toEqualDate(nowStr);
            expect(cellInfo[1].isToday).toBe(true);
        });
    });
});
//# sourceMappingURL=weekViewRender.js.map