import enGbLocale from '@fullcalendar/core/locales/en-gb';
import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
describe('firstDay', function () {
    describe('when using default settings', function () {
        it('should make Sunday the first day of the week', function () {
            var calendar = initCalendar();
            expectDowStartAt(calendar, 0);
        });
    });
    describe('when setting firstDay to 0', function () {
        pushOptions({
            firstDay: 0,
        });
        it('should make Sunday the first day of the week', function () {
            var calendar = initCalendar();
            expectDowStartAt(calendar, 0);
        });
    });
    describe('when setting firstDay to 1', function () {
        pushOptions({
            firstDay: 1,
        });
        it('should make Monday the first day of the week', function () {
            var calendar = initCalendar();
            expectDowStartAt(calendar, 1);
        });
    });
    describe('when setting weekNumberCalculation to ISO', function () {
        pushOptions({
            weekNumberCalculation: 'ISO',
        });
        it('should make Monday the first day of the week', function () {
            var calendar = initCalendar();
            expectDowStartAt(calendar, 1);
        });
    });
    describeOptions('direction', {
        'when LTR': 'ltr',
        'when RTL': 'rtl',
    }, function () {
        pushOptions({
            firstDay: 2,
        });
        it('should make Tuesday the first day of the week', function () {
            var calendar = initCalendar();
            expectDowStartAt(calendar, 2);
        });
    });
    describe('when setting firstDay to 2 and weekNumberCalculation to ISO', function () {
        pushOptions({
            firstDay: 2,
            weekNumberCalculation: 'ISO',
        });
        it('should make Tuesday the first day of the week', function () {
            var calendar = initCalendar();
            expectDowStartAt(calendar, 2);
        });
    });
    describe('when setting firstDay to 3', function () {
        pushOptions({
            firstDay: 3,
        });
        it('should make Wednesday the first day of the week', function () {
            var calendar = initCalendar();
            expectDowStartAt(calendar, 3);
        });
    });
    it('should have a different default value based on the locale', function () {
        var calendar = initCalendar({
            locale: enGbLocale,
        });
        // firstDay will be 1 (Monday) in Great Britain
        expectDowStartAt(calendar, 1);
    });
    var DOW_CLASSNAMES = CalendarWrapper.DOW_CLASSNAMES;
    function expectDowStartAt(calendar, dowNum) {
        var headerWrapper = new DayGridViewWrapper(calendar).header;
        var cellEls = headerWrapper.getCellEls();
        for (var i = 0; i < 7; i += 1) {
            expect(cellEls[i]).toHaveClass(DOW_CLASSNAMES[(i + dowNum) % 7]);
        }
    }
});
//# sourceMappingURL=firstDay.js.map