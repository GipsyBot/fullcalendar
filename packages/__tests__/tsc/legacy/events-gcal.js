import googleCalendarPlugin from '@fullcalendar/google-calendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
// HACK: in our CI setup, requests to the google-calendar api were failing for some reason
// (requests to other services were working however)
var SKIP_GCAL = window.karmaConfig.isCi; // maybe use webpack for this???
if (SKIP_GCAL) {
    console.log('skipping google-calendar'); // eslint-disable-line no-console
}
// eslint-disable-next-line
SKIP_GCAL ||
    describe('Google Calendar plugin', function () {
        var API_KEY = 'AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE';
        var HOLIDAY_CALENDAR_ID = 'en.usa#holiday@group.v.calendar.google.com';
        // Google sometimes stops returning old events. Will need to update this sometimes.
        var DEFAULT_MONTH = '2020-05';
        var NUM_EVENTS = 4; // number of holidays
        var currentWarnArgs;
        var oldConsoleWarn;
        pushOptions({
            plugins: [googleCalendarPlugin, dayGridPlugin],
            initialView: 'dayGridMonth',
            initialDate: DEFAULT_MONTH + '-01',
        });
        beforeEach(function () {
            // Intercept calls to console.warn
            currentWarnArgs = null;
            oldConsoleWarn = console.warn;
            console.warn = function () {
                currentWarnArgs = arguments; // eslint-disable-line prefer-rest-params
            };
        });
        afterEach(function () {
            console.warn = oldConsoleWarn;
        });
        it('request/receives correctly when local timezone', function (done) {
            var calendar = initCalendar({
                googleCalendarApiKey: API_KEY,
                events: { googleCalendarId: HOLIDAY_CALENDAR_ID },
                timeZone: 'local',
            });
            afterEventsLoaded(calendar, function () {
                var events = calendar.getEvents();
                var i;
                expect(events.length).toBe(NUM_EVENTS);
                for (i = 0; i < events.length; i += 1) {
                    expect(events[i].url).not.toMatch('ctz=');
                }
                done();
            });
        });
        it('request/receives correctly when UTC timezone', function (done) {
            var calendar = initCalendar({
                googleCalendarApiKey: API_KEY,
                events: { googleCalendarId: HOLIDAY_CALENDAR_ID },
                timeZone: 'UTC',
            });
            afterEventsLoaded(calendar, function () {
                var events = calendar.getEvents();
                var i;
                expect(events.length).toBe(NUM_EVENTS);
                for (i = 0; i < events.length; i += 1) {
                    expect(events[i].url).toMatch('ctz=UTC');
                }
                done();
            });
        });
        it('request/receives correctly when named timezone, defaults to not editable', function (done) {
            var calendar = initCalendar({
                googleCalendarApiKey: API_KEY,
                events: { googleCalendarId: HOLIDAY_CALENDAR_ID },
                timeZone: 'America/New_York',
            });
            afterEventsLoaded(calendar, function () {
                var events = calendar.getEvents();
                var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                var eventEls = dayGridWrapper.getEventEls();
                var i;
                expect(events.length).toBe(NUM_EVENTS);
                for (i = 0; i < events.length; i += 1) {
                    expect(events[i].url).toMatch('ctz=America/New_York');
                }
                expect(eventEls.length).toBe(NUM_EVENTS);
                expect($('.' + CalendarWrapper.EVENT_RESIZER_CLASSNAME, eventEls[0]).length).toBe(0); // not editable
                done();
            });
        });
        it('allows editable to explicitly be set to true', function (done) {
            var calendar = initCalendar({
                googleCalendarApiKey: API_KEY,
                events: {
                    googleCalendarId: HOLIDAY_CALENDAR_ID,
                    editable: true,
                },
            });
            afterEventsLoaded(calendar, function () {
                var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                var eventEls = dayGridWrapper.getEventEls();
                expect(eventEls.length).toBe(NUM_EVENTS);
                for (var _i = 0, eventEls_1 = eventEls; _i < eventEls_1.length; _i++) {
                    var eventEl = eventEls_1[_i];
                    expect($('.' + CalendarWrapper.EVENT_RESIZER_CLASSNAME, eventEl).length).toBeGreaterThan(0); // editable!
                }
                done();
            });
        });
        it('fetches events correctly when API key is in the event source', function (done) {
            var calendar = initCalendar({
                events: {
                    googleCalendarId: HOLIDAY_CALENDAR_ID,
                    googleCalendarApiKey: API_KEY,
                },
            });
            afterEventsLoaded(calendar, function () {
                var events = calendar.getEvents();
                expect(events.length).toBe(NUM_EVENTS); // 5 holidays in November 2016 (and end of Oct)
                done();
            });
        });
        describe('when not given an API key', function () {
            it('calls error handlers, raises warning, and receives no events', function (done) {
                var options = {
                    events: {
                        failure: function (err) {
                            expect(typeof err).toBe('object');
                        },
                        googleCalendarId: HOLIDAY_CALENDAR_ID,
                    },
                    eventSourceFailure: function (err) {
                        var _this = this;
                        expect(typeof err).toBe('object');
                        setTimeout(function () {
                            var events = _this.getEvents();
                            expect(events.length).toBe(0);
                            expect(currentWarnArgs.length).toBeGreaterThan(0);
                            expect(options.events.failure).toHaveBeenCalled();
                            done();
                        }, 0);
                    },
                };
                spyOn(options.events, 'failure').and.callThrough();
                initCalendar(options);
            });
        });
        describe('when given a bad API key', function () {
            it('calls error handlers, raises warning, and receives no event', function (done) {
                var options = {
                    googleCalendarApiKey: 'asdfasdfasdf',
                    events: {
                        failure: function (err) {
                            expect(typeof err).toBe('object');
                        },
                        googleCalendarId: HOLIDAY_CALENDAR_ID,
                    },
                    eventSourceFailure: function (err) {
                        var _this = this;
                        expect(typeof err).toBe('object');
                        setTimeout(function () {
                            var events = _this.getEvents();
                            expect(events.length).toBe(0);
                            expect(currentWarnArgs.length).toBeGreaterThan(0);
                            expect(options.events.failure).toHaveBeenCalled();
                            done();
                        }, 0);
                    },
                };
                spyOn(options.events, 'failure').and.callThrough();
                initCalendar(options);
            });
        });
        it('calls loading with true then false', function (done) {
            var cmds = [];
            initCalendar({
                googleCalendarApiKey: API_KEY,
                events: 'https://www.googleapis.com/calendar/v3/calendars/usa__en%40holiday.calendar.google.com/events',
                loading: function (bool) {
                    cmds.push(bool);
                    if (cmds.length === 1) {
                        expect(cmds).toEqual([true]);
                    }
                    else if (cmds.length === 2) {
                        expect(cmds).toEqual([true, false]);
                        done();
                    }
                },
            });
        });
        describe('EventSource::remove', function () {
            it('works when specifying only the Google Calendar ID', function (done) {
                var called = false;
                var calendar = initCalendar({
                    googleCalendarApiKey: API_KEY,
                    eventSources: [{ googleCalendarId: HOLIDAY_CALENDAR_ID }],
                });
                afterEventsLoaded(calendar, function () {
                    var events;
                    if (called) {
                        return;
                    } // only the first time
                    called = true;
                    events = calendar.getEvents();
                    expect(events.length).toBe(NUM_EVENTS); // 5 holidays in November 2016 (and end of Oct)
                    setTimeout(function () {
                        calendar.getEventSources()[0].remove();
                        events = calendar.getEvents();
                        expect(events.length).toBe(0);
                        done();
                    }, 0);
                });
            });
            it('works when specifying a raw Google Calendar source object', function (done) {
                var googleSource = { googleCalendarId: HOLIDAY_CALENDAR_ID };
                var called = false;
                var calendar = initCalendar({
                    googleCalendarApiKey: API_KEY,
                    eventSources: [googleSource],
                });
                afterEventsLoaded(calendar, function () {
                    var events;
                    if (called) {
                        return;
                    } // only the first time
                    called = true;
                    events = calendar.getEvents();
                    expect(events.length).toBe(NUM_EVENTS); // 5 holidays in November 2016 (and end of Oct)
                    setTimeout(function () {
                        calendar.getEventSources()[0].remove();
                        events = calendar.getEvents();
                        expect(events.length).toBe(0);
                        done();
                    }, 0);
                });
            });
        });
        function afterEventsLoaded(calendar, callback) {
            calendar.on('eventsSet', function () {
                setTimeout(callback); // because nothing is rendered yet when eventSourceSuccess fires
            });
        }
    });
//# sourceMappingURL=events-gcal.js.map