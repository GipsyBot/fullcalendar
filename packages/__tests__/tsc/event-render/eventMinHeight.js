import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
describe('eventMinHeight', function () {
    pushOptions({
        initialView: 'timeGridWeek',
        initialDate: '2017-08-10',
        events: [
            { start: '2017-08-10T10:30:00', end: '2017-08-10T10:31:00' },
        ],
    });
    it('has a non-zero default', function () {
        var calendar = initCalendar();
        var eventEl = new CalendarWrapper(calendar).getFirstEventEl();
        expect(eventEl.offsetHeight).toBeGreaterThan(5);
    });
    it('can be set and rendered', function () {
        var calendar = initCalendar({
            eventMinHeight: 40,
        });
        var eventEl = new CalendarWrapper(calendar).getFirstEventEl();
        expect(eventEl.offsetHeight).toBeGreaterThanOrEqual(39);
    });
    it('will ignore temporal non-collision and render side-by-side', function () {
        var calendar = initCalendar({
            eventMinHeight: 40,
            events: [
                { start: '2017-08-10T10:30:00', end: '2017-08-10T10:31:00', title: 'event a' },
                { start: '2017-08-10T10:31:20', end: '2017-08-10T10:31:40', title: 'event b' },
            ],
        });
        var eventEls = new CalendarWrapper(calendar).getEventEls();
        expect(eventEls[0].getBoundingClientRect().left)
            .toBeLessThan(eventEls[1].getBoundingClientRect().left);
    });
});
//# sourceMappingURL=eventMinHeight.js.map