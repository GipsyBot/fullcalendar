import arLocale from '@fullcalendar/core/locales/ar';
import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
describe('weekNumberCalculation', function () {
    pushOptions({
        weekNumbers: true,
    });
    describeOptions('initialView', {
        'when in day-grid': 'dayGridDay',
        'when in time-grid': 'timeGridDay',
    }, function (viewName) {
        var getWeekNumberText = viewName.match(/^dayGrid/)
            ? function (calendar) { return new DayGridViewWrapper(calendar).dayGrid.getWeekNumberText(0); }
            : function (calendar) { return new TimeGridViewWrapper(calendar).getHeaderWeekText(); };
        it('should display the American standard when using \'local\'', function () {
            var calendar = initCalendar({
                initialDate: '2013-11-23',
                weekNumberCalculation: 'local',
            });
            expect(getWeekNumber(calendar)).toBe(47);
        });
        it('should display a locale-specific local week number', function () {
            var calendar = initCalendar({
                initialDate: '2013-11-23',
                locale: arLocale,
                weekNumberCalculation: 'local',
            });
            expect(getWeekNumberText(calendar)).toMatch(/٤٨|48/);
        });
        // another local test, but to make sure it is different from ISO
        it('should display the American standard when using \'local\'', function () {
            var calendar = initCalendar({
                initialDate: '2013-11-17',
                weekNumberCalculation: 'local',
            });
            expect(getWeekNumber(calendar)).toBe(47);
        });
        it('should display ISO standard when using \'ISO\'', function () {
            var calendar = initCalendar({
                initialDate: '2013-11-17',
                weekNumberCalculation: 'ISO',
            });
            expect(getWeekNumber(calendar)).toBe(46);
        });
        it('should display the calculated number when a custom function', function () {
            var calendar = initCalendar({
                weekNumberCalculation: function () {
                    return 4;
                },
            });
            expect(getWeekNumber(calendar)).toBe(4);
        });
        function getWeekNumber(calendar) {
            var text = getWeekNumberText(calendar) || '';
            return parseInt(text.replace(/\D/g, ''), 10);
        }
    });
});
//# sourceMappingURL=weekNumberCalculation.js.map