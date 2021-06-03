import XHRMock from 'xhr-mock';
import dayGridMonth from '@fullcalendar/daygrid';
import iCalendarPlugin from '@fullcalendar/icalendar';
import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
import alldayEvent from './data/alldayEvent';
import multidayEvent from './data/multidayEvent';
import multipleMultidayEvents from './data/multipleMultidayEvents';
import multipleEventsOneMunged from './data/multipleEventsOneMunged';
import oneHourMeeting from './data/oneHourMeeting';
import recurringWeekly from './data/recurringWeekly';
import recurringWeeklyWithoutEnd from './data/recurringWeeklyWithoutEnd';
import recurringWeeklyWithCount from './data/recurringWeeklyWithCount';
import mungedOneHourMeeting from './data/mungedOneHourMeeting';
describe('addICalEventSource with month view', function () {
    var ICAL_MIME_TYPE = 'text/calendar';
    pushOptions({
        plugins: [iCalendarPlugin, dayGridMonth],
        initialDate: '2019-04-10',
        initialView: 'dayGridMonth',
    });
    beforeEach(function () { XHRMock.setup(); });
    afterEach(function () { XHRMock.teardown(); });
    it('adds an all day event', function (done) {
        loadICalendarWith(alldayEvent, function () {
            setTimeout(function () {
                var events = currentCalendar.getEvents();
                expect(events[0].end).toBe(null);
                events.forEach(function (event) { return expect(event.allDay).toBeTruthy(); });
                assertEventCount(1);
                done();
            }, 100);
        });
    });
    it('adds a single multi-day event', function (done) {
        loadICalendarWith(multidayEvent, function () {
            setTimeout(function () {
                assertEventCount(1);
                currentCalendar.getEvents().forEach(function (event) { return expect(event.allDay).toBeTruthy(); });
                done();
            }, 100);
        });
    });
    it('adds multiple multi-day events', function (done) {
        loadICalendarWith(multipleMultidayEvents, function () {
            setTimeout(function () {
                assertEventCount(2);
                currentCalendar.getEvents().forEach(function (event) { return expect(event.allDay).toBeTruthy(); });
                done();
            }, 100);
        });
    });
    it('adds a one-hour long meeting', function (done) {
        loadICalendarWith(oneHourMeeting, function () {
            setTimeout(function () {
                var events = currentCalendar.getEvents();
                expect(events[0].start).toEqualDate('2019-04-15T09:30:00');
                expect(events[0].end).toEqualDate('2019-04-15T10:30:00');
                assertEventCount(1);
                currentCalendar.getEvents().forEach(function (event) { return expect(event.allDay).not.toBeTruthy(); });
                done();
            }, 100);
        });
    });
    it('adds a repeating weekly meeting', function (done) {
        loadICalendarWith(recurringWeekly, function () {
            setTimeout(function () {
                var events = currentCalendar.getEvents();
                expect(events[0].start).toEqualDate('2019-04-01T17:30:00');
                expect(events[0].end).toEqualDate('2019-04-01T18:30:00');
                assertEventCount(6);
                done();
            }, 100);
        });
    });
    it('adds a repeating weekly meeting, with null end', function (done) {
        loadICalendarWith(recurringWeeklyWithoutEnd, function () {
            setTimeout(function () {
                var events = currentCalendar.getEvents();
                expect(events[0].start).toEqualDate('2019-04-01T17:30:00');
                expect(events[0].end).toBe(null);
                assertEventCount(6);
                done();
            }, 100);
        });
    });
    // https://github.com/fullcalendar/fullcalendar/issues/6190
    // this feed starts at beginning of previous month (March 2019) and has 9 total occurences,
    // 5 of which will be visible in the current month (April 2019)
    it('adds a repeating weekly meeting, limited by COUNT, but across months', function (done) {
        loadICalendarWith(recurringWeeklyWithCount, function () {
            setTimeout(function () {
                assertEventCount(5);
                done();
            }, 100);
        });
    });
    it('ignores a munged event', function (done) {
        loadICalendarWith(mungedOneHourMeeting, function () {
            setTimeout(function () {
                assertEventCount(0);
                done();
            }, 100);
        });
    });
    it('adds a valid event and ignores a munged event', function (done) {
        loadICalendarWith(multipleEventsOneMunged, function () {
            setTimeout(function () {
                assertEventCount(1);
                done();
            }, 100);
        });
    });
    it('defaultAllDayEventDuration overrides ical default all day length of one day', function (done) {
        loadICalendarWith(alldayEvent, function () {
            setTimeout(function () {
                assertEventCount(1);
                var event = currentCalendar.getEvents()[0];
                expect(event.end.getDate()).toEqual(event.start.getDate() + 2);
                done();
            }, 100);
        }, function (source) {
            initCalendar({
                forceEventDuration: true,
                defaultAllDayEventDuration: { days: 2 },
            }).addEventSource(source);
        });
    });
    it('calling refetchEvents request ical feed again', function (done) {
        var feedUrl = '/mock.ics';
        var fetchCnt = 0;
        XHRMock.get(feedUrl, function (req, res) {
            fetchCnt += 1;
            return res.status(200)
                .header('content-type', ICAL_MIME_TYPE)
                .body(oneHourMeeting);
        });
        var calendar = initCalendar({
            events: {
                url: feedUrl,
                format: 'ics',
            },
        });
        setTimeout(function () {
            expect(fetchCnt).toBe(1);
            expect(calendar.getEvents().length).toBe(1);
            calendar.refetchEvents();
            setTimeout(function () {
                expect(fetchCnt).toBe(2);
                expect(calendar.getEvents().length).toBe(1);
                done();
            }, 100);
        }, 100);
    });
    function loadICalendarWith(rawICal, assertions, calendarSetup) {
        var feedUrl = '/mock.ics';
        XHRMock.get(feedUrl, function (req, res) {
            expect(req.url().query).toEqual({});
            return res.status(200)
                .header('content-type', ICAL_MIME_TYPE)
                .body(rawICal);
        });
        var source = { url: feedUrl, format: 'ics' };
        if (calendarSetup) {
            calendarSetup(source);
        }
        else {
            initCalendar().addEventSource(source);
        }
        assertions();
    }
    // Checks to make sure all events have been rendered and that the calendar
    // has internal info on all the events.
    // TODO: don't use currentCalendar
    function assertEventCount(expectedCount) {
        expect(currentCalendar.getEvents().length).toEqual(expectedCount);
        var calendarWrapper = new CalendarWrapper(currentCalendar);
        expect(calendarWrapper.getEventEls().length).toEqual(expectedCount);
    }
});
//# sourceMappingURL=month-view.js.map