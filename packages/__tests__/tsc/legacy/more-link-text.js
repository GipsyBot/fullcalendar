import frLocale from '@fullcalendar/core/locales/fr';
import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
describe('moreLinkText', function () {
    pushOptions({
        initialDate: '2014-08-01',
        initialView: 'dayGridMonth',
        dayMaxEventRows: 3,
        events: [
            { title: 'event1', start: '2014-07-29' },
            { title: 'event2', start: '2014-07-29' },
            { title: 'event2', start: '2014-07-29' },
            { title: 'event2', start: '2014-07-29' },
        ],
    });
    it('allows a string', function () {
        var calendar = initCalendar({
            moreLinkText: 'extra',
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        expect(dayGridWrapper.getMoreEl()).toHaveText('+2 extra');
    });
    it('allows a function', function () {
        var calendar = initCalendar({
            moreLinkText: function (n) {
                expect(typeof n).toBe('number');
                return 'there are ' + n + ' more events!';
            },
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        expect(dayGridWrapper.getMoreEl()).toHaveText('there are 2 more events!');
    });
    it('has a default value that is affected by the custom locale', function () {
        var calendar = initCalendar({
            locale: frLocale,
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        expect(dayGridWrapper.getMoreEl()).toHaveText('+2 en plus');
    });
    it('is not affected by a custom locale when the value is explicitly specified', function () {
        var calendar = initCalendar({
            locale: frLocale,
            moreLinkText: 'extra',
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        expect(dayGridWrapper.getMoreEl()).toHaveText('+2 extra');
    });
});
//# sourceMappingURL=more-link-text.js.map