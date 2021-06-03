import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
describe('background event', function () {
    pushOptions({
        initialDate: '2020-06-23',
    });
    describe('that are timed', function () {
        pushOptions({
            events: [
                {
                    start: '2020-06-23T12:00:00',
                    end: '2020-06-23T14:00:00',
                    display: 'background',
                },
            ],
        });
        it('won\'t appear in daygrid', function () {
            var calendar = initCalendar();
            var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
            var eventEls = dayGridWrapper.getBgEventEls();
            expect(eventEls.length).toBe(0);
        });
    });
});
//# sourceMappingURL=bg-events.js.map