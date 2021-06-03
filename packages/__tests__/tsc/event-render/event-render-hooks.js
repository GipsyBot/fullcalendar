import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
import { RED_REGEX } from '../lib/dom-misc';
describe('eventContent', function () {
    pushOptions({
        initialView: 'dayGridMonth',
        initialDate: '2020-06-01',
        events: [
            { title: 'my event', start: '2020-06-01T01:00:00' },
        ],
    });
    it('can inject html content', function () {
        var calendar = initCalendar({
            eventContent: function (info) {
                return {
                    html: "<b>" + info.timeText + "</b><i>" + info.event.title + "</i>",
                };
            },
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        var eventEl = dayGridWrapper.getEventEls()[0];
        expect(eventEl.querySelector('b').innerHTML).toBe('1a');
        expect(eventEl.querySelector('i').innerHTML).toBe('my event');
    });
    it('can inject text content', function () {
        var calendar = initCalendar({
            eventContent: function (info) {
                return info.timeText + ' - ' + info.event.title;
            },
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        var eventEl = dayGridWrapper.getEventEls()[0];
        expect(eventEl.innerHTML).toBe('1a - my event');
    });
    it('will render default if nothing returned', function () {
        var calendar = initCalendar({
            eventContent: function () {
            },
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        var eventEl = dayGridWrapper.getEventEls()[0];
        expect($(eventEl).text()).toBe('1amy event');
    });
    // https://github.com/fullcalendar/fullcalendar/issues/5916
    xit('can render multiple appearance changes in eventDidMount', function () {
        var calendar = initCalendar({
            initialView: 'timeGridWeek',
            initialDate: '2020-12-13',
            eventDidMount: function (arg) {
                arg.event.setProp('backgroundColor', 'red');
                arg.event.setProp('title', 'name changed');
            },
            events: [
                {
                    id: 'a',
                    title: 'a',
                    start: '2020-12-15T09:30:00',
                },
                {
                    id: 'b',
                    title: 'b',
                    start: '2020-12-22T09:30:00',
                },
            ],
        });
        function expectEventDataChanged(id) {
            var event = calendar.getEventById(id);
            expect(event.title).toBe('name changed');
            expect(event.backgroundColor).toBe('red');
        }
        var viewWrapper = new TimeGridViewWrapper(calendar).timeGrid;
        var eventEl = viewWrapper.getEventEls()[0];
        expect($(eventEl).css('background-color')).toMatch(RED_REGEX);
        expectEventDataChanged('a');
        calendar.next();
        eventEl = viewWrapper.getEventEls()[0];
        expect($(eventEl).css('background-color')).toMatch(RED_REGEX);
        expectEventDataChanged('b');
    });
});
//# sourceMappingURL=event-render-hooks.js.map