import bootstrapPlugin from '@fullcalendar/bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
describe('themeSystem', function () {
    pushOptions({
        plugins: [bootstrapPlugin, timeGridPlugin],
        initialView: 'timeGridWeek',
        headerToolbar: {
            left: 'title',
            center: '',
            right: 'next',
        },
    });
    it('can be changed dynamically', function () {
        var calendar = initCalendar();
        var toolbarWrapper = new CalendarWrapper(calendar).toolbar;
        var buttonInfo = toolbarWrapper.getButtonInfo('next');
        expect(calendar.el).toHaveClass(CalendarWrapper.ROOT_CLASSNAME);
        expect(calendar.el).toHaveClass(CalendarWrapper.UNTHEMED_CLASSNAME);
        expect(calendar.el).not.toHaveClass(CalendarWrapper.BOOTSTRAP_CLASSNAME);
        expect(buttonInfo.iconName).toBeTruthy();
        expect($('.table-bordered').length).toBe(0);
        var viewWrapper = new TimeGridViewWrapper(calendar);
        var scrollEl = viewWrapper.getScrollerEl();
        scrollEl.scrollTop = 99999; // scroll all the way down
        // change option!
        calendar.setOption('themeSystem', 'bootstrap');
        buttonInfo = toolbarWrapper.getButtonInfo('next', 'fa');
        expect(calendar.el).toHaveClass(CalendarWrapper.ROOT_CLASSNAME);
        expect(calendar.el).toHaveClass(CalendarWrapper.BOOTSTRAP_CLASSNAME);
        expect(calendar.el).not.toHaveClass(CalendarWrapper.UNTHEMED_CLASSNAME);
        expect(buttonInfo.iconName).toBeTruthy();
        expect($('.table-bordered').length).toBeGreaterThan(0);
        // make sure scrolled down at least just a little bit
        // since we don't have the bootstrap stylesheet loaded, this will be janky
        expect(scrollEl.scrollTop).toBeGreaterThan(10);
    });
    // this tests the options setter with a single hash argument.
    // TODO: not best place for this.
    it('can be change with other options', function () {
        var calendar = initCalendar();
        expect(calendar.el).toHaveClass(CalendarWrapper.ROOT_CLASSNAME);
        expect(calendar.el).toHaveClass(CalendarWrapper.UNTHEMED_CLASSNAME);
        expect(calendar.el).not.toHaveClass(CalendarWrapper.BOOTSTRAP_CLASSNAME);
        // change option!
        calendar.batchRendering(function () {
            calendar.setOption('themeSystem', 'bootstrap');
            calendar.setOption('businessHours', true);
        });
        expect(calendar.el).toHaveClass(CalendarWrapper.ROOT_CLASSNAME);
        expect(calendar.el).toHaveClass(CalendarWrapper.BOOTSTRAP_CLASSNAME);
        expect(calendar.el).not.toHaveClass(CalendarWrapper.UNTHEMED_CLASSNAME);
    });
});
//# sourceMappingURL=themeSystem.js.map