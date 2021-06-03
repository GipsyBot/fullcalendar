import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
describe('fixedMirrorParent', function () {
    pushOptions({
        initialView: 'dayGridMonth',
        initialDate: '2020-10-26',
    });
    it('changes the mirror\'s parent element', function (done) {
        var calendar = initCalendar({
            editable: true,
            fixedMirrorParent: document.body,
            events: [
                { start: '2020-10-04' },
            ],
        });
        var wrapper = new DayGridViewWrapper(calendar).dayGrid;
        var eventEls = wrapper.getEventEls();
        $(eventEls[0]).simulate('drag', {
            dx: -100,
            onBeforeRelease: function () {
                var $mirrorEl = $('body').find('> .' + CalendarWrapper.EVENT_CLASSNAME); // direct child
                expect($mirrorEl.length).toBe(1);
            },
            onRelease: function () {
                done();
            },
        });
    });
});
//# sourceMappingURL=fixedMirrorParent.js.map