import enGbLocale from '@fullcalendar/core/locales/en-gb';
import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
describe('slotLabelFormat', function () {
    pushOptions({
        initialDate: '2014-06-04',
        initialView: 'timeGridWeek',
    });
    it('renders correctly when default', function () {
        var calendar = initCalendar();
        expectAxisText(calendar, '12am');
    });
    it('renders correctly when default and the locale is customized', function () {
        var calendar = initCalendar({
            locale: enGbLocale,
        });
        expectAxisText(calendar, '00');
    });
    it('renders correctly when customized', function () {
        var calendar = initCalendar({
            slotLabelFormat: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false },
            locale: 'en-GB',
        });
        expectAxisText(calendar, '00:00:00');
    });
    function expectAxisText(calendar, expectedText) {
        var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
        var axisTexts = timeGridWrapper.getAxisTexts();
        expect(axisTexts[0]).toBe(expectedText);
    }
});
//# sourceMappingURL=slotLabelFormat.js.map