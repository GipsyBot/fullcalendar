import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
describe('eventClick', function () {
    pushOptions({
        initialDate: '2018-08-31',
        initialView: 'dayGridMonth',
    });
    it('receives correct args', function (done) {
        var calendar = initCalendar({
            events: [
                { start: '2018-08-31' },
            ],
            eventClick: function (arg) {
                expect(arg.el instanceof HTMLElement).toBe(true);
                expect(typeof arg.event).toBe('object');
                expect(arg.event.start instanceof Date).toBe(true);
                expect(arg.jsEvent instanceof UIEvent).toBe(true);
                expect(typeof arg.view).toBe('object');
                done();
            },
        });
        var eventEls = new CalendarWrapper(calendar).getEventEls();
        expect(eventEls.length).toBe(1);
        $(eventEls[0]).simulate('click');
    });
    it('fires on a background event', function (done) {
        var calendar = initCalendar({
            events: [
                { start: '2018-08-31', display: 'background' },
            ],
            eventClick: function (arg) {
                expect(arg.event.display).toBe('background');
                done();
            },
        });
        var bgEventEls = new CalendarWrapper(calendar).getBgEventEls();
        expect(bgEventEls.length).toBe(1);
        $(bgEventEls[0]).simulate('click');
    });
    it('works via touch', function (done) {
        var calendar = initCalendar({
            events: [
                { start: '2018-08-31' },
            ],
            eventClick: function () {
                done();
            },
        });
        var eventEls = new CalendarWrapper(calendar).getEventEls();
        expect(eventEls.length).toBe(1);
        $(eventEls[0]).simulate('click');
    });
});
//# sourceMappingURL=eventClick.js.map