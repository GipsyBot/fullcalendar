import { Calendar } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import luxonPlugin, { toLuxonDateTime, toLuxonDuration } from '@fullcalendar/luxon';
import dayGridPlugin from '@fullcalendar/daygrid';
import { testTimeZoneImpl } from '../lib/timeZoneImpl';
import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
describe('luxon plugin', function () {
    var PLUGINS = [luxonPlugin, dayGridPlugin]; // for `new Calendar`
    pushOptions({
        plugins: PLUGINS,
    });
    testTimeZoneImpl(luxonPlugin);
    describe('toLuxonDateTime', function () {
        describe('timezone transfering', function () {
            it('transfers UTC', function () {
                var calendar = new Calendar(document.createElement('div'), {
                    plugins: PLUGINS,
                    events: [{ start: '2018-09-05T12:00:00', end: '2018-09-05T18:00:00' }],
                    timeZone: 'UTC',
                });
                var event = calendar.getEvents()[0];
                var start = toLuxonDateTime(event.start, calendar);
                var end = toLuxonDateTime(event.end, calendar);
                expect(start.toISO()).toBe('2018-09-05T12:00:00.000Z');
                expect(start.zoneName).toBe('UTC');
                expect(end.toISO()).toBe('2018-09-05T18:00:00.000Z');
                expect(end.zoneName).toBe('UTC');
            });
            it('transfers local timezone', function () {
                var calendar = new Calendar(document.createElement('div'), {
                    plugins: PLUGINS,
                    events: [{ start: '2018-09-05T12:00:00', end: '2018-09-05T18:00:00' }],
                    timeZone: 'local',
                });
                var event = calendar.getEvents()[0];
                var start = toLuxonDateTime(event.start, calendar);
                var end = toLuxonDateTime(event.end, calendar);
                expect(start.toJSDate()).toEqualLocalDate('2018-09-05T12:00:00');
                expect(start.zoneName).toMatch('/'); // has a named timezone
                expect(end.toJSDate()).toEqualLocalDate('2018-09-05T18:00:00');
                expect(end.zoneName).toMatch('/'); // has a named timezone
            });
            it('transfers named timezone', function () {
                var calendar = new Calendar(document.createElement('div'), {
                    plugins: PLUGINS,
                    events: [{ start: '2018-09-05T12:00:00', end: '2018-09-05T18:00:00' }],
                    timeZone: 'Europe/Moscow',
                });
                var event = calendar.getEvents()[0];
                var start = toLuxonDateTime(event.start, calendar);
                var end = toLuxonDateTime(event.end, calendar);
                expect(start.toJSDate()).toEqualDate('2018-09-05T12:00:00+03:00');
                expect(start.zoneName).toMatch('Europe/Moscow');
                expect(end.toJSDate()).toEqualDate('2018-09-05T18:00:00+03:00');
                expect(end.zoneName).toMatch('Europe/Moscow');
            });
        });
        it('transfers locale', function () {
            var calendar = new Calendar(document.createElement('div'), {
                plugins: PLUGINS,
                events: [{ start: '2018-09-05T12:00:00', end: '2018-09-05T18:00:00' }],
                locale: esLocale,
            });
            var event = calendar.getEvents()[0];
            var datetime = toLuxonDateTime(event.start, calendar);
            expect(datetime.locale).toEqual('es');
        });
    });
    describe('toLuxonDuration', function () {
        it('converts numeric values correctly', function () {
            var calendar = new Calendar(document.createElement('div'), {
                plugins: PLUGINS,
                defaultTimedEventDuration: '05:00',
                defaultAllDayEventDuration: { days: 3 },
            });
            // hacky way to have a duration parsed
            var timedDuration = toLuxonDuration(calendar.getCurrentData().options.defaultTimedEventDuration, calendar);
            var allDayDuration = toLuxonDuration(calendar.getCurrentData().options.defaultAllDayEventDuration, calendar);
            expect(timedDuration.as('hours')).toBe(5);
            expect(allDayDuration.as('days')).toBe(3);
        });
        it('transfers locale correctly', function () {
            var calendar = new Calendar(document.createElement('div'), {
                plugins: PLUGINS,
                defaultTimedEventDuration: '05:00',
                locale: esLocale,
            });
            // hacky way to have a duration parsed
            var timedDuration = toLuxonDuration(calendar.getCurrentData().options.defaultTimedEventDuration, calendar);
            expect(timedDuration.locale).toBe('es');
        });
    });
    describe('date formatting', function () {
        it('produces event time text', function () {
            var calendar = initCalendar({
                initialView: 'dayGridMonth',
                now: '2018-09-06',
                displayEventEnd: false,
                eventTimeFormat: 'HH:mm:ss\'abc\'',
                events: [
                    { title: 'my event', start: '2018-09-06T13:30:20' },
                ],
            });
            var calendarWrapper = new CalendarWrapper(calendar);
            var eventEl = calendarWrapper.getFirstEventEl();
            var eventInfo = calendarWrapper.getEventElInfo(eventEl);
            expect(eventInfo.timeText).toBe('13:30:20abc');
        });
    });
    describe('range formatting', function () {
        it('renders with same month', function () {
            var calendar = new Calendar(document.createElement('div'), {
                plugins: PLUGINS,
            });
            var s;
            s = calendar.formatRange('2018-09-03', '2018-09-05', 'MMMM {d}, yyyy \'asdf\'');
            expect(s).toEqual('September 3 - 5, 2018 asdf');
            s = calendar.formatRange('2018-09-03', '2018-09-05', '{d} MMMM, yyyy \'asdf\'');
            expect(s).toEqual('3 - 5 September, 2018 asdf');
        });
        it('renders with same year but different month', function () {
            var calendar = new Calendar(document.createElement('div'), {
                plugins: PLUGINS,
            });
            var s;
            s = calendar.formatRange('2018-09-03', '2018-10-05', '{MMMM {d}}, yyyy \'asdf\'');
            expect(s).toEqual('September 3 - October 5, 2018 asdf');
            s = calendar.formatRange('2018-09-03', '2018-10-05', '{{d} MMMM}, yyyy \'asdf\'');
            expect(s).toEqual('3 September - 5 October, 2018 asdf');
        });
        it('renders with different years', function () {
            var calendar = new Calendar(document.createElement('div'), {
                plugins: PLUGINS,
            });
            var s;
            s = calendar.formatRange('2018-09-03', '2019-10-05', '{MMMM {d}}, yyyy \'asdf\'');
            expect(s).toEqual('September 3, 2018 asdf - October 5, 2019 asdf');
            s = calendar.formatRange('2018-09-03', '2019-10-05', '{{d} MMMM}, yyyy \'asdf\'');
            expect(s).toEqual('3 September, 2018 asdf - 5 October, 2019 asdf');
        });
        it('renders the same if same day', function () {
            var calendar = new Calendar(document.createElement('div'), {
                plugins: PLUGINS,
            });
            var s;
            s = calendar.formatRange('2018-09-03T00:00:00', '2018-09-03T23:59:59', 'MMMM d yyyy');
            expect(s).toEqual('September 3 2018');
        });
        it('inherits defaultRangeSeparator', function () {
            var calendar = new Calendar(document.createElement('div'), {
                plugins: PLUGINS,
                defaultRangeSeparator: ' to ',
            });
            var s = calendar.formatRange('2018-09-03', '2018-09-05', 'MMMM d, yyyy \'asdf\'');
            expect(s).toEqual('September 3, 2018 asdf to September 5, 2018 asdf');
        });
        it('produces title with titleRangeSeparator', function () {
            initCalendar({
                plugins: PLUGINS,
                initialView: 'dayGridWeek',
                now: '2018-09-06',
                titleFormat: 'MMMM {d} yy \'yup\'',
                titleRangeSeparator: ' to ',
            });
            expect(currentCalendar.view.title).toBe('September 2 to 8 18 yup');
        });
    });
});
//# sourceMappingURL=luxon.js.map