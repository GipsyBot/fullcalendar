import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
describe('rerendering a calendar', function () {
    it('keeps sizing', function () {
        var calendar = initCalendar({
            initialView: 'dayGridMonth',
            initialDate: '2019-08-08',
            dayMaxEventRows: 3,
            events: [
                { date: '2019-08-08', title: 'event' },
                { date: '2019-08-08', title: 'event' },
                { date: '2019-08-08', title: 'event' },
                { date: '2019-08-08', title: 'event' },
            ],
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        expect(dayGridWrapper.getMoreEls().length).toBe(1);
        calendar.render();
        expect(dayGridWrapper.getMoreEls().length).toBe(1); // good way to test that sizing is maintained
    });
});
//# sourceMappingURL=rerender.js.map