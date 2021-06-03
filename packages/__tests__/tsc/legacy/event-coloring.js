import { RED_REGEX } from '../lib/dom-misc';
import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
describe('event coloring', function () {
    pushOptions({
        initialDate: '2014-11-04',
        allDaySlot: false,
    });
    describe('when in month view', function () {
        pushOptions({
            initialView: 'dayGridMonth',
        });
        defineViewTests(false);
    });
    describe('when in week view', function () {
        pushOptions({
            initialView: 'timeGridWeek',
        });
        defineViewTests(true);
    });
    function defineViewTests(eventHasTime) {
        describe('for foreground events', function () {
            testTextColor(eventHasTime);
            testBorderColor(eventHasTime);
            testBackgroundColor(eventHasTime);
        });
        describe('for background events', function () {
            testBackgroundColor(eventHasTime, 'background');
        });
    }
    function testTextColor(eventHasTime) {
        var eventOptions = getEventOptions(eventHasTime);
        it('should accept the global eventTextColor', function () {
            initCalendar({
                eventTextColor: 'red',
                events: [getTestEvent(eventOptions)],
            });
            expect(getEventCss('color')).toMatch(RED_REGEX);
        });
        it('should accept an event source\'s textColor', function () {
            initCalendar({
                eventTextColor: 'blue',
                eventSources: [{
                        textColor: 'red',
                        events: [getTestEvent(eventOptions)],
                    }],
            });
            expect(getEventCss('color')).toMatch(RED_REGEX);
        });
        it('should accept an event object\'s textColor', function () {
            var eventInput = getTestEvent(eventOptions, {
                textColor: 'red',
            });
            initCalendar({
                eventTextColor: 'blue',
                events: [eventInput],
            });
            expect(getEventCss('color')).toMatch(RED_REGEX);
        });
    }
    function testBorderColor(eventHasTime) {
        var eventOptions = getEventOptions(eventHasTime);
        it('should accept the global eventColor for border color', function () {
            initCalendar({
                eventColor: 'red',
                events: [getTestEvent(eventOptions)],
            });
            expect(getEventCss('border-top-color')).toMatch(RED_REGEX);
        });
        it('should accept the global eventBorderColor', function () {
            initCalendar({
                eventColor: 'blue',
                eventBorderColor: 'red',
                events: [getTestEvent(eventOptions)],
            });
            expect(getEventCss('border-top-color')).toMatch(RED_REGEX);
        });
        it('should accept an event source\'s color for the border', function () {
            initCalendar({
                eventBorderColor: 'blue',
                eventSources: [{
                        color: 'red',
                        events: [getTestEvent(eventOptions)],
                    }],
            });
            expect(getEventCss('border-top-color')).toMatch(RED_REGEX);
        });
        it('should accept an event source\'s borderColor', function () {
            initCalendar({
                eventBorderColor: 'blue',
                eventSources: [{
                        color: 'blue',
                        borderColor: 'red',
                        events: [getTestEvent(eventOptions)],
                    }],
            });
            expect(getEventCss('border-top-color')).toMatch(RED_REGEX);
        });
        it('should accept an event object\'s color for the border', function () {
            var eventInput = getTestEvent(eventOptions, {
                color: 'red',
            });
            initCalendar({
                eventSources: [{
                        borderColor: 'blue',
                        events: [eventInput],
                    }],
            });
            expect(getEventCss('border-top-color')).toMatch(RED_REGEX);
        });
        it('should accept an event object\'s borderColor', function () {
            var eventInput = getTestEvent(eventOptions, {
                color: 'blue',
                borderColor: 'red',
            });
            initCalendar({
                eventSources: [{
                        events: [eventInput],
                    }],
            });
            expect(getEventCss('border-top-color')).toMatch(RED_REGEX);
        });
    }
    function testBackgroundColor(eventHasTime, display) {
        var eventOptions = getEventOptions(eventHasTime);
        if (typeof display !== 'undefined') {
            eventOptions.display = display;
        }
        it('should accept the global eventColor for background color', function () {
            initCalendar({
                eventColor: 'red',
                events: [getTestEvent(eventOptions)],
            });
            expect(getEventCss('background-color', display)).toMatch(RED_REGEX);
        });
        it('should accept the global eventBackgroundColor', function () {
            initCalendar({
                eventColor: 'blue',
                eventBackgroundColor: 'red',
                events: [getTestEvent(eventOptions)],
            });
            expect(getEventCss('background-color', display)).toMatch(RED_REGEX);
        });
        it('should accept an event source\'s color for the background', function () {
            initCalendar({
                eventBackgroundColor: 'blue',
                eventSources: [{
                        color: 'red',
                        events: [getTestEvent(eventOptions)],
                    }],
            });
            expect(getEventCss('background-color', display)).toMatch(RED_REGEX);
        });
        it('should accept an event source\'s backgroundColor', function () {
            initCalendar({
                eventSources: [{
                        color: 'blue',
                        backgroundColor: 'red',
                        events: [getTestEvent(eventOptions)],
                    }],
            });
            expect(getEventCss('background-color', display)).toMatch(RED_REGEX);
        });
        it('should accept an event object\'s color for the background', function () {
            var eventInput = getTestEvent(eventOptions);
            eventInput.color = 'red';
            initCalendar({
                eventSources: [{
                        backgroundColor: 'blue',
                        events: [eventInput],
                    }],
            });
            expect(getEventCss('background-color', display)).toMatch(RED_REGEX);
        });
        it('should accept an event object\'s backgroundColor', function () {
            var eventInput = getTestEvent(eventOptions);
            eventInput.color = 'blue'; // even when there's a more general setting
            eventInput.backgroundColor = 'red';
            initCalendar({
                eventSources: [{
                        events: [eventInput],
                    }],
            });
            expect(getEventCss('background-color', display)).toMatch(RED_REGEX);
        });
    }
    function getEventCss(prop, display) {
        var calendarWrapper = new CalendarWrapper(currentCalendar);
        var eventEl = display === 'background'
            ? calendarWrapper.getBgEventEls()[0]
            : calendarWrapper.getEventEls()[0];
        if (prop === 'color') {
            return $(eventEl).find('.fc-event-title').css(prop);
        }
        return $(eventEl).css(prop);
    }
    function getTestEvent(defaultOptions, extraOptions) {
        if (extraOptions === void 0) { extraOptions = {}; }
        var event = {};
        $.extend(event, defaultOptions);
        if (extraOptions) {
            $.extend(event, extraOptions);
        }
        return event;
    }
    function getEventOptions(eventHasTime) {
        var options = {
            start: '2014-11-04',
        };
        if (eventHasTime) {
            options.start += 'T01:00:00';
        }
        return options;
    }
});
//# sourceMappingURL=event-coloring.js.map