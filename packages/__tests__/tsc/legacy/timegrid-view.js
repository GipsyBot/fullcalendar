import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
describe('timeGrid view rendering', function () {
    pushOptions({
        initialView: 'timeGridWeek',
    });
    it('should have have days ordered sun to sat', function () {
        var calendar = initCalendar();
        var viewWrapper = new TimeGridViewWrapper(calendar);
        var axisEl = viewWrapper.getHeaderAxisEl();
        var thEls = viewWrapper.header.getCellEls();
        expect(axisEl).toBeTruthy();
        var dowClassNames = CalendarWrapper.DOW_CLASSNAMES;
        for (var i = 0; i < dowClassNames.length; i += 1) {
            expect(thEls[i]).toHaveClass(dowClassNames[i]);
        }
    });
});
//# sourceMappingURL=timegrid-view.js.map