import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
import { waitEventDrag } from '../lib/wrappers/interaction-util';
describe('event touch dragging', function () {
    // https://github.com/fullcalendar/fullcalendar/issues/5706
    it('keeps event selected when initiated on custom element', function (done) {
        var calendar = initCalendar({
            initialDate: '2020-08-12',
            editable: true,
            longPressDelay: 100,
            events: [
                { title: 'event', start: '2020-08-12' },
            ],
            eventContent: { html: '<i>the text</i>' },
        });
        var gridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        var eventEl = gridWrapper.getEventEls()[0];
        var dragging = gridWrapper.dragEventToDate(eventEl.querySelector('i'), null, // don't specify start date. start drag on center of given element
        '2020-08-13', true);
        waitEventDrag(calendar, dragging).then(function (event) {
            expect(event.startStr).toBe('2020-08-13');
            done();
        });
    });
});
//# sourceMappingURL=touch.js.map