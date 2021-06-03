import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
describe('toolbar rendering', function () {
    it('produces type="button" attributes', function () {
        var calendar = initCalendar({
            headerToolbar: {
                left: 'today',
                center: 'title',
                right: 'prev,next',
            },
        });
        var toolbarWrapper = new CalendarWrapper(calendar).toolbar;
        var todayButtonEl = toolbarWrapper.getButtonEl('today');
        var prevButtonEl = toolbarWrapper.getButtonEl('prev');
        expect(todayButtonEl.getAttribute('type')).toBe('button');
        expect(prevButtonEl.getAttribute('type')).toBe('button');
    });
});
//# sourceMappingURL=toolbar-misc.js.map