import arLocale from '@fullcalendar/core/locales/ar';
import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
describe('dayNumbers', function () {
    pushOptions({
        initialDate: '2018-01-01',
    });
    it('respects locale in month view', function () {
        var calendar = initCalendar({
            initialView: 'dayGridMonth',
            locale: arLocale,
        });
        var dayGridViewWrapper = new DayGridViewWrapper(calendar).dayGrid;
        expect(dayGridViewWrapper.getDayNumberText('2018-01-01')).toMatch(/1|١٤?/); // normal 1, or an Arabic 1
    });
});
//# sourceMappingURL=dayNumbers.js.map