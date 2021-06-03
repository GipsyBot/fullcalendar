import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
describe('dayHeaderContent as text', function () {
    pushOptions({
        initialDate: '2014-05-11',
    });
    describeOptions('initialView', {
        'when month view': 'dayGridMonth',
        'when timeGrid view': 'timeGridDay',
        'when dayGrid view': 'dayGridDay',
    }, function (viewName) {
        var ViewWrapper = viewName.match(/^dayGrid/) ? DayGridViewWrapper : TimeGridViewWrapper;
        it('should contain custom HTML escaped text', function () {
            var calendar = initCalendar({
                dayHeaderContent: function (arg) {
                    return '<div>Custom ' + currentCalendar.formatDate(arg.date, { weekday: 'long' }) + '</div>';
                },
            });
            var headerWrapper = new ViewWrapper(calendar).header;
            var $firstCell = $(headerWrapper.getCellEls()[0]);
            expect($firstCell.text()).toBe('<div>Custom Sunday</div>');
        });
    });
    describeTimeZones(function (tz) {
        it('receives correct date', function () {
            var dates = [];
            initCalendar({
                initialView: 'timeGridDay',
                dayHeaderContent: function (arg) {
                    dates.push(arg.date);
                },
            });
            expect(dates.length).toBe(1);
            expect(dates[0]).toEqualDate(tz.parseDate('2014-05-11'));
        });
    });
});
//# sourceMappingURL=columnHeaderText.js.map