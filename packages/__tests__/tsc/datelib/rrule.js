import dayGridPlugin from '@fullcalendar/daygrid';
import rrulePlugin from '@fullcalendar/rrule';
import luxonPlugin from '@fullcalendar/luxon';
import { parseUtcDate, parseLocalDate } from '../lib/date-parsing';
describe('rrule plugin', function () {
    pushOptions({
        plugins: [rrulePlugin, dayGridPlugin],
        initialView: 'dayGridMonth',
        now: '2018-09-07',
        timeZone: 'UTC',
    });
    it('expands events when given an rrule object', function () {
        initCalendar({
            events: [
                {
                    rrule: {
                        dtstart: '2018-09-04T13:00:00',
                        freq: 'weekly',
                    },
                },
            ],
        });
        var events = getSortedEvents();
        expect(events.length).toBe(5);
        expect(events[0].start).toEqualDate('2018-09-04T13:00:00Z');
        expect(events[0].end).toBe(null);
        expect(events[1].start).toEqualDate('2018-09-11T13:00:00Z');
        expect(events[2].start).toEqualDate('2018-09-18T13:00:00Z');
        expect(events[3].start).toEqualDate('2018-09-25T13:00:00Z');
        expect(events[4].start).toEqualDate('2018-10-02T13:00:00Z');
    });
    it('can expand monthly recurrence when given an rrule object', function () {
        initCalendar({
            initialView: 'dayGridMonth',
            now: '2018-12-25T12:00:00',
            events: [{
                    rrule: {
                        dtstart: '2018-11-01',
                        freq: 'monthly',
                        count: 13,
                        bymonthday: [13],
                    },
                }],
        });
        var events = currentCalendar.getEvents();
        expect(events.length).toBe(1);
        expect(events[0].start).toEqualDate('2018-12-13');
    });
    // https://github.com/fullcalendar/fullcalendar/issues/6059
    it('can specify strings in byweekday', function () {
        initCalendar({
            initialView: 'dayGridMonth',
            initialDate: '2021-01-01',
            events: [{
                    allDay: true,
                    rrule: {
                        freq: 'weekly',
                        byweekday: ['mo', 'tu'],
                        dtstart: '2021-01-01',
                    },
                }],
        });
        var events = currentCalendar.getEvents();
        expect(events.length).toBe(10);
        expect(events[0].start).toEqualDate('2021-01-04');
    });
    it('can exclude a recurrence with exdate', function () {
        var calendar = initCalendar({
            initialView: 'dayGridMonth',
            now: '2020-12-01',
            events: [{
                    rrule: {
                        dtstart: '2020-12-01',
                        freq: 'weekly',
                    },
                    exdate: '2020-12-08',
                }],
        });
        var events = calendar.getEvents();
        expect(events.length).toBe(5);
        expect(events[0].start).toEqualDate('2020-12-01');
        expect(events[1].start).toEqualDate('2020-12-15');
        expect(events[2].start).toEqualDate('2020-12-22');
        expect(events[3].start).toEqualDate('2020-12-29');
        expect(events[4].start).toEqualDate('2021-01-05');
    });
    it('can exclude multiple recurrences with exdate', function () {
        var calendar = initCalendar({
            initialView: 'dayGridMonth',
            now: '2020-12-01',
            events: [{
                    rrule: {
                        dtstart: '2020-12-01',
                        freq: 'weekly',
                    },
                    exdate: ['2020-12-08', '2020-12-15'],
                }],
        });
        var events = calendar.getEvents();
        expect(events.length).toBe(4);
        expect(events[0].start).toEqualDate('2020-12-01');
        expect(events[1].start).toEqualDate('2020-12-22');
        expect(events[2].start).toEqualDate('2020-12-29');
        expect(events[3].start).toEqualDate('2021-01-05');
    });
    it('can exclude recurrences with an exrule', function () {
        var calendar = initCalendar({
            initialView: 'dayGridMonth',
            now: '2020-12-01',
            events: [{
                    rrule: {
                        dtstart: '2020-12-01',
                        freq: 'weekly',
                    },
                    exrule: {
                        dtstart: '2020-12-08',
                        until: '2020-12-15',
                        freq: 'weekly',
                    },
                }],
        });
        var events = calendar.getEvents();
        expect(events.length).toBe(4);
        expect(events[0].start).toEqualDate('2020-12-01');
        expect(events[1].start).toEqualDate('2020-12-22');
        expect(events[2].start).toEqualDate('2020-12-29');
        expect(events[3].start).toEqualDate('2021-01-05');
    });
    it('can exclude recurrences with multiple exrules', function () {
        var calendar = initCalendar({
            initialView: 'dayGridMonth',
            now: '2020-12-01',
            events: [{
                    rrule: {
                        dtstart: '2020-12-01',
                        freq: 'weekly',
                    },
                    exrule: [
                        {
                            dtstart: '2020-12-08',
                            until: '2020-12-15',
                            freq: 'weekly',
                        },
                        {
                            dtstart: '2020-12-22',
                            until: '2020-12-29',
                            freq: 'weekly',
                        },
                    ],
                }],
        });
        var events = calendar.getEvents();
        expect(events.length).toBe(2);
        expect(events[0].start).toEqualDate('2020-12-01');
        expect(events[1].start).toEqualDate('2021-01-05');
    });
    it('expands events until a date', function () {
        initCalendar({
            events: [
                {
                    rrule: {
                        dtstart: '2018-09-04T13:00:00',
                        until: '2018-10-01',
                        freq: 'weekly',
                    },
                },
            ],
        });
        var events = getSortedEvents();
        expect(events.length).toBe(4);
        expect(events[0].start).toEqualDate('2018-09-04T13:00:00Z');
        expect(events[0].end).toBe(null);
        expect(events[1].start).toEqualDate('2018-09-11T13:00:00Z');
        expect(events[2].start).toEqualDate('2018-09-18T13:00:00Z');
        expect(events[3].start).toEqualDate('2018-09-25T13:00:00Z');
    });
    it('expands a range that starts exactly at the current view\'s start', function () {
        initCalendar({
            initialDate: '2019-04-02',
            initialView: 'dayGridDay',
            events: [
                {
                    title: 'event with everyday with range',
                    allDay: true,
                    rrule: {
                        freq: 'daily',
                        dtstart: '2019-04-02',
                        until: '2019-04-09',
                    },
                },
            ],
        });
        var events = getSortedEvents();
        expect(events.length).toBeGreaterThanOrEqual(1);
        expect(events[0].start).toEqualDate('2019-04-02');
    });
    it('expands events with a duration', function () {
        initCalendar({
            events: [
                {
                    rrule: {
                        dtstart: '2018-09-04T13:00:00',
                        freq: 'weekly',
                    },
                    duration: '03:00',
                },
            ],
        });
        var events = getSortedEvents();
        expect(events.length).toBe(5);
        expect(events[0].start).toEqualDate('2018-09-04T13:00:00Z');
        expect(events[0].end).toEqualDate('2018-09-04T16:00:00Z');
    });
    it('expands events with guessed allDay', function () {
        initCalendar({
            events: [
                {
                    rrule: {
                        dtstart: '2018-09-04',
                        freq: 'weekly',
                    },
                },
            ],
        });
        var events = getSortedEvents();
        expect(events.length).toBe(5);
        expect(events[0].start).toEqualDate('2018-09-04');
        expect(events[0].end).toBe(null);
        expect(events[0].allDay).toBe(true);
    });
    it('inherits defaultAllDay from source', function () {
        initCalendar({
            defaultAllDay: false,
            events: [
                {
                    rrule: {
                        dtstart: parseUtcDate('2018-09-04'),
                        freq: 'weekly',
                    },
                },
            ],
        });
        var events = getSortedEvents();
        expect(events.length).toBe(5);
        expect(events[0].start).toEqualDate('2018-09-04');
        expect(events[0].end).toBe(null);
        expect(events[0].allDay).toBe(false);
    });
    it('inherits defaultAllDay from source setting', function () {
        initCalendar({
            eventSources: [{
                    defaultAllDay: false,
                    events: [
                        {
                            rrule: {
                                dtstart: parseUtcDate('2018-09-04'),
                                freq: 'weekly',
                            },
                        },
                    ],
                }],
        });
        var events = getSortedEvents();
        expect(events.length).toBe(5);
        expect(events[0].start).toEqualDate('2018-09-04');
        expect(events[0].end).toBe(null);
        expect(events[0].allDay).toBe(false);
    });
    it('can generate local dates when given an rrule object', function () {
        initCalendar({
            timeZone: 'local',
            events: [
                {
                    rrule: {
                        dtstart: parseLocalDate('2018-09-04T05:00:00').toISOString(),
                        freq: 'weekly',
                    },
                },
            ],
        });
        var events = getSortedEvents();
        expect(events.length).toBe(5);
        expect(events[0].start).toEqualLocalDate('2018-09-04T05:00:00');
        expect(events[0].end).toBe(null);
        expect(events[0].allDay).toBe(false);
    });
    describe('when given an rrule string', function () {
        it('expands', function () {
            initCalendar({
                events: [
                    {
                        rrule: 'DTSTART:20180904T130000\n' +
                            'RRULE:FREQ=WEEKLY',
                    },
                ],
            });
            var events = getSortedEvents();
            expect(events.length).toBe(5);
            expect(events[0].start).toEqualDate('2018-09-04T13:00:00Z');
            expect(events[0].end).toBe(null);
            expect(events[1].start).toEqualDate('2018-09-11T13:00:00Z');
            expect(events[2].start).toEqualDate('2018-09-18T13:00:00Z');
            expect(events[3].start).toEqualDate('2018-09-25T13:00:00Z');
            expect(events[4].start).toEqualDate('2018-10-02T13:00:00Z');
        });
        // https://github.com/fullcalendar/fullcalendar/issues/6126
        it('expands correctly with UNTIL followed by newline', function () {
            initCalendar({
                events: [
                    {
                        rrule: 'DTSTART:20180904T130000\n' +
                            'RRULE:FREQ=WEEKLY;UNTIL=20180925T130000\n' +
                            'RDATE:20180904T130000',
                    },
                ],
            });
            var events = getSortedEvents();
            expect(events.length).toBe(4);
        });
        it('respects allDay', function () {
            initCalendar({
                events: [
                    {
                        allDay: true,
                        rrule: 'DTSTART:20180904T130000\nRRULE:FREQ=WEEKLY',
                    },
                ],
            });
            var events = getSortedEvents();
            expect(events[0].start).toEqualDate('2018-09-04'); // should round down
            expect(events[0].allDay).toBe(true);
            expect(events[0].extendedProps).toEqual({}); // didnt accumulate allDay or rrule props
        });
        it('can expand monthly recurrence in UTC', function () {
            initCalendar({
                initialView: 'dayGridMonth',
                now: '2018-12-25T12:00:00',
                timeZone: 'UTC',
                events: [{
                        rrule: 'DTSTART:20181101\nRRULE:FREQ=MONTHLY;COUNT=13;BYMONTHDAY=13',
                    }],
            });
            var events = currentCalendar.getEvents();
            expect(events.length).toBe(1);
            expect(events[0].start).toEqualDate('2018-12-13');
        });
        it('can expand monthly recurrence in local timeZone', function () {
            initCalendar({
                initialView: 'dayGridMonth',
                now: '2018-12-25T12:00:00',
                timeZone: 'local',
                events: [{
                        rrule: 'DTSTART:20181101\nRRULE:FREQ=MONTHLY;COUNT=13;BYMONTHDAY=13',
                    }],
            });
            var events = currentCalendar.getEvents();
            expect(events.length).toBe(1);
            expect(events[0].start).toEqualLocalDate('2018-12-13');
        });
        it('can expand weekly timed recurrence in local timeZone', function () {
            initCalendar({
                initialView: 'dayGridMonth',
                now: '2018-12-25T12:00:00',
                timeZone: 'local',
                events: [{
                        rrule: 'DTSTART:20181201T000000\nRRULE:FREQ=WEEKLY',
                    }],
            });
            var events = currentCalendar.getEvents();
            expect(events.length).toBe(6);
            expect(events[0].start).toEqualLocalDate('2018-12-01');
        });
        it('can expand weekly UTC-timed recurrence in local timeZone', function () {
            initCalendar({
                initialView: 'dayGridMonth',
                now: '2018-12-25T12:00:00',
                timeZone: 'local',
                events: [{
                        rrule: 'DTSTART:20181201T000000Z\nRRULE:FREQ=WEEKLY',
                    }],
            });
            var events = currentCalendar.getEvents();
            expect(events.length).toBe(6);
            expect(events[0].start).toEqualDate('2018-12-01');
        });
        it('can expand weekly UTC-timed recurrence in local timeZone, with exclusion', function () {
            initCalendar({
                initialView: 'dayGridMonth',
                now: '2018-12-25T12:00:00',
                timeZone: 'local',
                events: [{
                        rrule: 'DTSTART:20181201T000000Z\nRRULE:FREQ=WEEKLY\nEXDATE:20181208T000000Z',
                    }],
            });
            var events = currentCalendar.getEvents();
            expect(events.length).toBe(5);
            expect(events[0].start).toEqualDate('2018-12-01');
        });
        it('can generate local dates', function () {
            var localStart = buildLocalRRuleDateStr('2018-09-04T05:00:00');
            initCalendar({
                timeZone: 'local',
                events: [
                    {
                        rrule: "DTSTART:" + localStart + "\nRRULE:FREQ=WEEKLY",
                    },
                ],
            });
            var events = getSortedEvents();
            expect(events.length).toBe(5);
            expect(events[0].start).toEqualLocalDate('2018-09-04T05:00:00');
            expect(events[0].end).toBe(null);
            expect(events[0].allDay).toBe(false);
        });
        it('can generate local dates, including EXDATE', function () {
            var localStart = buildLocalRRuleDateStr('2018-09-04T05:00:00');
            var localExdate = buildLocalRRuleDateStr('2018-09-05T05:00:00');
            initCalendar({
                timeZone: 'local',
                events: [
                    {
                        rrule: "DTSTART:" + localStart + "\nRRULE:FREQ=WEEKLY\nEXDATE:" + localExdate,
                    },
                ],
            });
            var events = getSortedEvents();
            expect(events.length).toBe(5);
            expect(events[0].start).toEqualLocalDate('2018-09-04T05:00:00');
            expect(events[0].end).toBe(null);
            expect(events[0].allDay).toBe(false);
        });
        // https://github.com/fullcalendar/fullcalendar/issues/5726
        it('can generate local dates, including EXDATE, when BYDAY and TZ shifting', function () {
            initCalendar({
                timeZone: 'local',
                initialDate: '2020-09-10',
                events: [
                    {
                        rrule: 'DTSTART:20200915T030000Z\nRRULE:FREQ=WEEKLY;BYDAY=SA\nEXDATE:20201003T030000Z',
                    },
                ],
            });
            var events = getSortedEvents();
            expect(events.length).toBe(3);
            expect(events[0].start).toEqualDate('2020-09-19T03:00:00');
            expect(events[1].start).toEqualDate('2020-09-26T03:00:00');
            expect(events[2].start).toEqualDate('2020-10-10T03:00:00');
        });
        // https://github.com/fullcalendar/fullcalendar/issues/5993
        it('won\'t accidentally clip dates when calendar has non-UTC timezone', function () {
            var calendar = initCalendar({
                plugins: [rrulePlugin, dayGridPlugin, luxonPlugin],
                initialDate: '2020-11-01',
                timeZone: 'Asia/Manila',
                events: [
                    {
                        duration: '01:00',
                        rrule: {
                            freq: 'daily',
                            dtstart: '2020-10-24T16:00:00Z',
                        },
                    },
                ],
            });
            var events = calendar.getEvents();
            expect(events[0].start).toEqualDate(calendar.view.activeStart);
        });
    });
    // utils
    function buildLocalRRuleDateStr(inputStr) {
        return parseLocalDate(inputStr).toISOString().replace('.000', '').replace(/[-:]/g, '');
    }
    function getSortedEvents() {
        var events = currentCalendar.getEvents();
        events.sort(function (eventA, eventB) { return eventA.start.valueOf() - eventB.start.valueOf(); });
        return events;
    }
});
//# sourceMappingURL=rrule.js.map