import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
describe('buttonIcons', function () {
    pushOptions({
        plugins: [dayGridPlugin, bootstrapPlugin],
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'prevYear, nextYear',
        },
    });
    describe('when buttonIcons is not set', function () {
        it('should have default values', function () {
            var calendar = initCalendar();
            var toolbarWrapper = new CalendarWrapper(calendar).toolbar;
            var prevBtn = toolbarWrapper.getButtonInfo('prev');
            var nextBtn = toolbarWrapper.getButtonInfo('next');
            var nextYearBtn = toolbarWrapper.getButtonInfo('nextYear');
            var prevYearBtn = toolbarWrapper.getButtonInfo('prevYear');
            expect(prevBtn.iconName).toBe('chevron-left');
            expect(nextBtn.iconName).toBe('chevron-right');
            expect(nextYearBtn.iconName).toBe('chevrons-right');
            expect(prevYearBtn.iconName).toBe('chevrons-left');
        });
    });
    describe('when buttonIcons is set and theme is falsy', function () {
        pushOptions({
            buttonIcons: {
                prev: 'some-icon-left',
                next: 'some-icon-right',
                prevYear: 'some-icon-leftYear',
                nextYear: 'some-icon-rightYear',
            },
        });
        it('should have the set values', function () {
            var calendar = initCalendar();
            var toolbarWrapper = new CalendarWrapper(calendar).toolbar;
            var prevBtn = toolbarWrapper.getButtonInfo('prev');
            var nextYearBtn = toolbarWrapper.getButtonInfo('nextYear');
            var prevYearBtn = toolbarWrapper.getButtonInfo('prevYear');
            expect(prevBtn.iconName).toBe('some-icon-left');
            expect(prevBtn.iconName).toBe('some-icon-left');
            expect(prevYearBtn.iconName).toBe('some-icon-leftYear');
            expect(nextYearBtn.iconName).toBe('some-icon-rightYear');
        });
    });
    describe('when theme is set', function () {
        pushOptions({
            themeSystem: 'bootstrap',
        });
        it('buttonIcons is ignored', function () {
            var calendar = initCalendar();
            var toolbarWrapper = new CalendarWrapper(calendar).toolbar;
            var prevButtonInfo = toolbarWrapper.getButtonInfo('prev'); // NOT called with 'fa'
            expect(prevButtonInfo.iconName).toBeFalsy();
        });
    });
});
//# sourceMappingURL=buttonIcons.js.map