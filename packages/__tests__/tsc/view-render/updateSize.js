import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
describe('updateSize method', function () {
    it('updates size of a previously hidden element', function () {
        var $el = $('<div style="display:none" />').appendTo('body');
        var calendar = initCalendar({
            initialView: 'dayGridMonth',
            contentHeight: 600,
        }, $el);
        var calendarWrapper = new CalendarWrapper(calendar);
        $el.show();
        calendar.updateSize();
        expect(calendarWrapper.getViewContainerEl().offsetHeight).toBeCloseTo(600, 0);
        $el.remove();
    });
});
//# sourceMappingURL=updateSize.js.map