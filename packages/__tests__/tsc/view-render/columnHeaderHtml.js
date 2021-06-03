import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
describe('dayHeaderContent as html', function () {
    pushOptions({
        initialDate: '2014-05-11',
    });
    describeOptions('initialView', {
        'when month view': 'dayGridMonth',
        'when timeGrid view': 'timeGridDay',
        'when dayGrid view': 'dayGridDay',
    }, function (viewName) {
        var ViewWrapper = viewName.match(/^dayGrid/) ? DayGridViewWrapper : TimeGridViewWrapper;
        it('should contain custom HTML', function () {
            var calendar = initCalendar({
                dayHeaderContent: function (arg) {
                    return { html: '<div class="test">' + currentCalendar.formatDate(arg.date, { weekday: 'long' }) + '</div>' };
                },
            });
            var headerWrapper = new ViewWrapper(calendar).header;
            var $firstCellEl = $(headerWrapper.getCellEls()[0]);
            expect($firstCellEl.find('.test').length).toBe(1);
            expect($firstCellEl.text()).toBe('Sunday');
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
//# sourceMappingURL=columnHeaderHtml.js.map