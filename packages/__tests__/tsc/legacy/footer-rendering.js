import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
describe('footerToolbar rendering', function () {
    pushOptions({
        initialDate: '2014-06-04',
        initialView: 'timeGridWeek',
    });
    describe('when supplying footerToolbar options', function () {
        it('should append a footerToolbar element to the DOM', function () {
            var calendar = initCalendar({
                footerToolbar: {
                    left: 'next,prev',
                    center: 'prevYear today nextYear timeGridDay,timeGridWeek',
                    right: 'title',
                },
            });
            var calendarWrapper = new CalendarWrapper(calendar);
            expect(calendarWrapper.footerToolbar).toBeTruthy();
        });
    });
    describe('when setting footerToolbar to false', function () {
        it('should not have footerToolbar table', function () {
            var calendar = initCalendar({
                footerToolbar: false,
            });
            var calendarWrapper = new CalendarWrapper(calendar);
            expect(calendarWrapper.footerToolbar).toBeFalsy();
        });
    });
    it('allow for dynamically changing', function () {
        var calendar = initCalendar({
            footerToolbar: {
                left: 'next,prev',
                center: 'prevYear today nextYear timeGridDay,timeGridWeek',
                right: 'title',
            },
        });
        var calendarWrapper = new CalendarWrapper(calendar);
        expect(calendarWrapper.footerToolbar).toBeTruthy();
        currentCalendar.setOption('footerToolbar', false);
        expect(calendarWrapper.footerToolbar).toBeFalsy();
    });
});
//# sourceMappingURL=footer-rendering.js.map