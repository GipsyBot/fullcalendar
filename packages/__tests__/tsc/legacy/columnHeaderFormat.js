import frLocale from '@fullcalendar/core/locales/fr';
import enGbLocale from '@fullcalendar/core/locales/en-gb';
import koLocale from '@fullcalendar/core/locales/ko';
import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
describe('dayHeaderFormat', function () {
    describe('when not set', function () {
        pushOptions({
            initialDate: '2014-05-11',
        });
        var VIEWS_WITH_FORMAT = [
            { view: 'dayGridMonth', expected: /^Sun$/ },
            { view: 'dayGridWeek', expected: /^Sun 5[/ ]11$/ },
            { view: 'timeGridWeek', expected: /^Sun 5[/ ]11$/ },
            { view: 'dayGridDay', expected: /^Sunday$/ },
            { view: 'timeGridDay', expected: /^Sunday$/ },
        ];
        it('should have default values', function () {
            var calendar = initCalendar();
            for (var _i = 0, VIEWS_WITH_FORMAT_1 = VIEWS_WITH_FORMAT; _i < VIEWS_WITH_FORMAT_1.length; _i++) {
                var viewWithFormat = VIEWS_WITH_FORMAT_1[_i];
                calendar.changeView(viewWithFormat.view);
                var header = new (viewWithFormat.view.match(/^dayGrid/) ? DayGridViewWrapper : TimeGridViewWrapper)(calendar).header;
                expect(header.getCellText(0)).toMatch(viewWithFormat.expected);
            }
        });
    });
    describe('when dayHeaderFormat is set on a per-view basis', function () {
        pushOptions({
            initialDate: '2014-05-11',
            views: {
                month: { dayHeaderFormat: { weekday: 'long' } },
                day: { dayHeaderFormat: { weekday: 'long', month: 'long', day: 'numeric' } },
                dayGridWeek: { dayHeaderFormat: { weekday: 'long', month: 'numeric', day: 'numeric' } },
            },
        });
        var VIEWS_WITH_FORMAT = [
            { view: 'dayGridMonth', expected: /^Sunday$/ },
            { view: 'timeGridDay', expected: /^Sunday, May 11$/ },
            { view: 'dayGridWeek', expected: /^Sunday, 5[/ ]11$/ },
        ];
        it('should have the correct values', function () {
            var calendar = initCalendar();
            for (var _i = 0, VIEWS_WITH_FORMAT_2 = VIEWS_WITH_FORMAT; _i < VIEWS_WITH_FORMAT_2.length; _i++) {
                var viewWithFormat = VIEWS_WITH_FORMAT_2[_i];
                calendar.changeView(viewWithFormat.view);
                var header = new (viewWithFormat.view.match(/^dayGrid/) ? DayGridViewWrapper : TimeGridViewWrapper)(calendar).header;
                expect(header.getCellText(0)).toMatch(viewWithFormat.expected);
            }
        });
    });
    describe('when locale is French', function () {
        pushOptions({
            initialDate: '2014-05-11',
            locale: frLocale,
        });
        var VIEWS_WITH_FORMAT = [
            { view: 'dayGridMonth', expected: /^dim\.$/ },
            { view: 'dayGridWeek', expected: /^dim\. 11[/ ]0?5$/ },
            { view: 'timeGridWeek', expected: /^dim\. 11[/ ]0?5$/ },
            { view: 'dayGridDay', expected: /^dimanche$/ },
            { view: 'timeGridDay', expected: /^dimanche$/ },
        ];
        it('should have the translated dates', function () {
            var calendar = initCalendar();
            for (var _i = 0, VIEWS_WITH_FORMAT_3 = VIEWS_WITH_FORMAT; _i < VIEWS_WITH_FORMAT_3.length; _i++) {
                var viewWithFormat = VIEWS_WITH_FORMAT_3[_i];
                calendar.changeView(viewWithFormat.view);
                var header = new (viewWithFormat.view.match(/^dayGrid/) ? DayGridViewWrapper : TimeGridViewWrapper)(calendar).header;
                expect(header.getCellText(0)).toMatch(viewWithFormat.expected);
            }
        });
    });
    describe('when locale is en-gb', function () {
        pushOptions({
            initialDate: '2014-05-11',
            locale: enGbLocale,
        });
        var VIEWS_WITH_FORMAT = [
            { view: 'dayGridMonth', expected: /^Sun$/ },
            { view: 'dayGridWeek', expected: /^Sun 11[/ ]0?5$/ },
            { view: 'timeGridWeek', expected: /^Sun 11[/ ]0?5$/ },
            { view: 'dayGridDay', expected: /^Sunday$/ },
            { view: 'timeGridDay', expected: /^Sunday$/ },
        ];
        it('should have the translated dates', function () {
            var calendar = initCalendar();
            for (var _i = 0, VIEWS_WITH_FORMAT_4 = VIEWS_WITH_FORMAT; _i < VIEWS_WITH_FORMAT_4.length; _i++) {
                var viewWithFormat = VIEWS_WITH_FORMAT_4[_i];
                calendar.changeView(viewWithFormat.view);
                var header = new (viewWithFormat.view.match(/^dayGrid/) ? DayGridViewWrapper : TimeGridViewWrapper)(calendar).header;
                expect(header.getCellText(0)).toMatch(viewWithFormat.expected);
            }
        });
    });
    describe('when locale is Korean', function () {
        pushOptions({
            initialDate: '2014-05-11',
            locale: koLocale,
        });
        var VIEWS_WITH_FORMAT = [
            { view: 'dayGridMonth', expected: /^일$/ },
            { view: 'dayGridWeek', expected: /^5[.월] 11[.일] \(?일\)?$/ },
            { view: 'timeGridWeek', expected: /^5[.월] 11[.일] \(?일\)?$/ },
            { view: 'dayGridDay', expected: /^일요일$/ },
            { view: 'timeGridDay', expected: /^일요일$/ },
        ];
        it('should have the translated dates and dayHeaderFormat should be computed differently', function () {
            var calendar = initCalendar();
            for (var _i = 0, VIEWS_WITH_FORMAT_5 = VIEWS_WITH_FORMAT; _i < VIEWS_WITH_FORMAT_5.length; _i++) {
                var viewWithFormat = VIEWS_WITH_FORMAT_5[_i];
                calendar.changeView(viewWithFormat.view);
                var header = new (viewWithFormat.view.match(/^dayGrid/) ? DayGridViewWrapper : TimeGridViewWrapper)(calendar).header;
                expect(header.getCellText(0)).toMatch(viewWithFormat.expected);
            }
        });
    });
    describe('using custom views', function () {
        it('multi-year default only displays day-of-week', function () {
            var calendar = initCalendar({
                views: {
                    multiYear: {
                        type: 'dayGrid',
                        duration: { years: 2 },
                    },
                },
                initialView: 'multiYear',
                initialDate: '2014-12-25',
            });
            var header = new DayGridViewWrapper(calendar).header;
            expect(header.getCellText(0)).toBe('Sun');
        });
        it('multi-month default only displays day-of-week', function () {
            var calendar = initCalendar({
                views: {
                    multiMonth: {
                        type: 'dayGrid',
                        duration: { months: 2 },
                    },
                },
                initialView: 'multiMonth',
                initialDate: '2014-12-25',
            });
            var header = new DayGridViewWrapper(calendar).header;
            expect(header.getCellText(0)).toBe('Sun');
        });
        it('multi-week default only displays day-of-week', function () {
            var calendar = initCalendar({
                views: {
                    multiWeek: {
                        type: 'dayGrid',
                        duration: { weeks: 2 },
                    },
                },
                initialView: 'multiWeek',
                initialDate: '2014-12-25',
            });
            var header = new DayGridViewWrapper(calendar).header;
            expect(header.getCellText(0)).toBe('Sun');
        });
        it('multi-day default displays short full date', function () {
            var calendar = initCalendar({
                views: {
                    multiDay: {
                        type: 'dayGrid',
                        duration: { days: 2 },
                    },
                },
                initialView: 'multiDay',
                initialDate: '2014-12-25',
            });
            var header = new DayGridViewWrapper(calendar).header;
            expect(header.getCellText('2014-12-25')).toMatch(/^Thu 12[/ ]25$/);
        });
    });
});
//# sourceMappingURL=columnHeaderFormat.js.map