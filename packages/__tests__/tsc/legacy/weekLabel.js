import esLocale from '@fullcalendar/core/locales/es';
import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
describe('weekText', function () {
    pushOptions({
        weekNumbers: true,
    });
    ['timeGridWeek'].forEach(function (viewName) {
        describe('when views is ' + viewName, function () {
            pushOptions({
                initialView: viewName,
            });
            it('renders correctly by default', function () {
                var calendar = initCalendar();
                expectWeekNumberTitle(calendar, 'W');
            });
            it('renders correctly when unspecified and when locale is customized', function () {
                var calendar = initCalendar({
                    locale: esLocale,
                });
                expectWeekNumberTitle(calendar, 'Sm');
            });
            it('renders correctly when customized and LTR', function () {
                var calendar = initCalendar({
                    direction: 'ltr',
                    weekText: 'YO',
                });
                expectWeekNumberTitle(calendar, 'YO');
            });
            it('renders correctly when customized and RTL', function () {
                var calendar = initCalendar({
                    direction: 'rtl',
                    weekText: 'YO',
                });
                expectWeekNumberTitle(calendar, 'YO');
            });
        });
        function expectWeekNumberTitle(calendar, title) {
            var viewWrapper = new TimeGridViewWrapper(calendar);
            var text = viewWrapper.getHeaderWeekText()
                .replace(/\d/g, '').trim(); // remove the number
            expect(text).toBe(title);
        }
    });
});
//# sourceMappingURL=weekLabel.js.map