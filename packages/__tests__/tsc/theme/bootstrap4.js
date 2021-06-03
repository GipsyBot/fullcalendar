import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
describe('bootstrap theme', function () {
    pushOptions({
        plugins: [bootstrapPlugin, dayGridPlugin],
        themeSystem: 'bootstrap',
    });
    describe('fa', function () {
        pushOptions({
            headerToolbar: { left: '', center: '', right: 'next' },
        });
        it('renders default', function () {
            var calendar = initCalendar();
            var toolbarWrapper = new CalendarWrapper(calendar).toolbar;
            var buttonInfo = toolbarWrapper.getButtonInfo('next', 'fa');
            expect(buttonInfo.iconName).toBe('chevron-right');
        });
        it('renders a customized icon', function () {
            var calendar = initCalendar({
                bootstrapFontAwesome: {
                    next: 'asdf',
                },
            });
            var toolbarWrapper = new CalendarWrapper(calendar).toolbar;
            var buttonInfo = toolbarWrapper.getButtonInfo('next', 'fa');
            expect(buttonInfo.iconName).toBe('asdf');
        });
        it('renders text when specified as false', function () {
            var calendar = initCalendar({
                bootstrapFontAwesome: false,
            });
            var toolbarWrapper = new CalendarWrapper(calendar).toolbar;
            expect(toolbarWrapper.getButtonInfo('next', 'fa').iconName).toBeFalsy();
        });
    });
});
//# sourceMappingURL=bootstrap4.js.map