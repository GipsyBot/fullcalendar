import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
describe('aspectRatio', function () {
    function getCalendarElement(width) {
        return $('<div id="calendar" style="max-width:none">').appendTo('body').width(width)[0];
    }
    describe('when default settings are used', function () {
        var elementWidth = 675;
        it('view div should use the ratio 1:35 to set height', function () {
            var calendar = initCalendar({}, getCalendarElement(elementWidth));
            var viewContainerEl = new CalendarWrapper(calendar).getViewContainerEl();
            var rect = viewContainerEl.getBoundingClientRect();
            expect(Math.round(rect.height)).toEqual(500);
        });
        it('view div should have width of div', function () {
            var calendar = initCalendar({}, getCalendarElement(elementWidth));
            var viewContainerEl = new CalendarWrapper(calendar).getViewContainerEl();
            var rect = viewContainerEl.getBoundingClientRect();
            expect(Math.round(rect.width)).toEqual(elementWidth);
        });
    });
    describe('when initializing the aspectRatio', function () {
        var elementWidth = 1000;
        describe('to 2', function () {
            pushOptions({
                aspectRatio: 2,
            });
            it('should not change the width', function () {
                var calendar = initCalendar({}, getCalendarElement(elementWidth));
                var viewContainerEl = new CalendarWrapper(calendar).getViewContainerEl();
                var rect = viewContainerEl.getBoundingClientRect();
                expect(Math.round(rect.width)).toEqual(elementWidth);
            });
            it('should set the height to width sizes very close to ratio of 2', function () {
                var calendar = initCalendar({}, getCalendarElement(elementWidth));
                var viewContainerEl = new CalendarWrapper(calendar).getViewContainerEl();
                var rect = viewContainerEl.getBoundingClientRect();
                var ratio = Math.round((rect.width / rect.height) * 100);
                expect(Math.round(ratio)).toEqual(200);
            });
        });
        describe('to 1', function () {
            pushOptions({
                aspectRatio: 1,
            });
            it('should not change the width', function () {
                var calendar = initCalendar({}, getCalendarElement(elementWidth));
                var viewContainerEl = new CalendarWrapper(calendar).getViewContainerEl();
                var rect = viewContainerEl.getBoundingClientRect();
                expect(Math.round(rect.width)).toEqual(elementWidth);
            });
            it('should set the height to width sizes very close to ratio of 2', function () {
                var calendar = initCalendar({}, getCalendarElement(elementWidth));
                var viewContainerEl = new CalendarWrapper(calendar).getViewContainerEl();
                var rect = viewContainerEl.getBoundingClientRect();
                var ratio = Math.round((rect.width / rect.height) * 100);
                expect(Math.round(ratio)).toEqual(100);
            });
        });
        describe('to less than 0.5', function () {
            pushOptions({
                aspectRatio: 0.4,
            });
            it('should not change the width', function () {
                var calendar = initCalendar({}, getCalendarElement(elementWidth));
                var viewContainerEl = new CalendarWrapper(calendar).getViewContainerEl();
                var rect = viewContainerEl.getBoundingClientRect();
                expect(Math.round(rect.width)).toEqual(elementWidth);
            });
            it('should set the height to width ratio to 0.5', function () {
                var calendar = initCalendar({}, getCalendarElement(elementWidth));
                var viewContainerEl = new CalendarWrapper(calendar).getViewContainerEl();
                var rect = viewContainerEl.getBoundingClientRect();
                var ratio = Math.round((rect.width / rect.height) * 100);
                expect(Math.round(ratio)).toEqual(50);
            });
        });
        describe('to negative', function () {
            pushOptions({
                aspectRatio: -2,
            });
            it('should not change the width', function () {
                var calendar = initCalendar({}, getCalendarElement(elementWidth));
                var viewContainerEl = new CalendarWrapper(calendar).getViewContainerEl();
                var rect = viewContainerEl.getBoundingClientRect();
                expect(Math.round(rect.width)).toEqual(elementWidth);
            });
            it('should set the height to width ratio to 0.5', function () {
                var calendar = initCalendar({}, getCalendarElement(elementWidth));
                var viewContainerEl = new CalendarWrapper(calendar).getViewContainerEl();
                var rect = viewContainerEl.getBoundingClientRect();
                var ratio = Math.round((rect.width / rect.height) * 100);
                expect(Math.round(ratio)).toEqual(50);
            });
        });
        describe('to zero', function () {
            pushOptions({
                aspectRatio: 0,
            });
            it('should not change the width', function () {
                var calendar = initCalendar({}, getCalendarElement(elementWidth));
                var viewContainerEl = new CalendarWrapper(calendar).getViewContainerEl();
                var rect = viewContainerEl.getBoundingClientRect();
                expect(Math.round(rect.width)).toEqual(elementWidth);
            });
            it('should set the height to width ratio to 0.5', function () {
                var calendar = initCalendar({}, getCalendarElement(elementWidth));
                var viewContainerEl = new CalendarWrapper(calendar).getViewContainerEl();
                var rect = viewContainerEl.getBoundingClientRect();
                var ratio = Math.round((rect.width / rect.height) * 100);
                expect(Math.round(ratio)).toEqual(50);
            });
        });
        describe('to very large', function () {
            pushOptions({
                aspectRatio: 4000,
            });
            it('should not change the width', function () {
                var calendar = initCalendar({}, getCalendarElement(elementWidth));
                var viewContainerEl = new CalendarWrapper(calendar).getViewContainerEl();
                var rect = viewContainerEl.getBoundingClientRect();
                expect(Math.round(rect.width)).toEqual(elementWidth);
            });
            it('should cause rows to be natural height', function () {
                var calendar = initCalendar({}, getCalendarElement(elementWidth));
                var viewContainerEl = new CalendarWrapper(calendar).getViewContainerEl();
                var actualHeight = viewContainerEl.getBoundingClientRect().height;
                var naturalHeight = viewContainerEl.getBoundingClientRect().height;
                expect(Math.round(actualHeight)).toEqual(Math.round(naturalHeight));
            });
        });
    });
});
//# sourceMappingURL=aspectRatio.js.map