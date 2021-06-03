import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
describe('dayHeaders', function () {
    pushOptions({
        initialDate: '2014-05-11',
    });
    describeOptions('initialView', {
        'when month view': 'dayGridMonth',
        'when timeGrid view': 'timeGridDay',
        'when dayGrid view': 'dayGridDay',
    }, function (viewName) {
        var ViewWrapper = viewName.match(/^dayGrid/) ? DayGridViewWrapper : TimeGridViewWrapper;
        describe('when on', function () {
            pushOptions({
                dayHeaders: true,
            });
            it('should show header', function () {
                var calendar = initCalendar();
                var viewWrapper = new ViewWrapper(calendar);
                expect(viewWrapper.header).toBeTruthy();
            });
        });
        describe('when off', function () {
            pushOptions({
                dayHeaders: false,
            });
            it('should not show header', function () {
                var calendar = initCalendar();
                var viewWrapper = new ViewWrapper(calendar);
                expect(viewWrapper.header).toBeFalsy();
            });
        });
    });
});
//# sourceMappingURL=columnHeader.js.map