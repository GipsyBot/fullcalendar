var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
describe('event source refetch', function () {
    var OPTIONS = {
        now: '2015-08-07',
        initialView: 'timeGridDay',
        scrollTime: '00:00',
    };
    describe('with a single event source', function () {
        it('will be refetched', function () {
            var fetchConfig = { eventCount: 1, fetchId: 7 };
            var calendar = initWithSources(fetchConfig);
            expect($('.source1-7').length).toEqual(1);
            expect($('.source2-7').length).toEqual(1);
            expect($('.source3-7').length).toEqual(1);
            fetchConfig.eventCount = 2;
            fetchConfig.fetchId = 8;
            calendar.getEventSourceById('blue').refetch();
            // events from unaffected sources remain
            expect($('.source1-7').length).toEqual(1);
            expect($('.source3-7').length).toEqual(1);
            // events from old fetch were cleared
            expect($('.source2-7').length).toEqual(0);
            // events from new fetch were rendered
            expect($('.source2-8').length).toEqual(2);
        });
    });
    describe('multiple event sources', function () {
        it('will be refetched', function () {
            var fetchConfig = { eventCount: 1, fetchId: 7 };
            var calendar = initWithSources(fetchConfig);
            expect($('.source1-7').length).toEqual(1);
            expect($('.source2-7').length).toEqual(1);
            expect($('.source3-7').length).toEqual(1);
            fetchConfig.eventCount = 2;
            fetchConfig.fetchId = 8;
            calendar.getEventSourceById('green0').refetch();
            calendar.getEventSourceById('green1').refetch();
            // events from unaffected sources remain
            expect($('.source2-7').length).toEqual(1);
            // events from old fetch were cleared
            expect($('.source1-7').length).toEqual(0);
            expect($('.source3-7').length).toEqual(0);
            // events from new fetch were rendered
            expect($('.source1-8').length).toEqual(2);
            expect($('.source3-8').length).toEqual(2);
        });
    });
    describe('when called while initial fetch is still pending', function () {
        it('keeps old events and rerenders new', function (done) {
            var fetchConfig = { eventCount: 1, fetchId: 7, fetchDelay: 100 };
            var calendar = initWithSources(fetchConfig);
            fetchConfig.eventCount = 2;
            fetchConfig.fetchId = 8;
            calendar.getEventSourceById('green0').refetch();
            calendar.getEventSourceById('green1').refetch();
            setTimeout(function () {
                // events from unaffected sources remain
                expect($('.source2-7').length).toEqual(1);
                // events from old fetch were cleared
                expect($('.source1-7').length).toEqual(0);
                expect($('.source3-7').length).toEqual(0);
                // events from new fetch were rendered
                expect($('.source1-8').length).toEqual(2);
                expect($('.source3-8').length).toEqual(2);
                done();
            }, fetchConfig.fetchDelay + 1);
        });
    });
    function initWithSources(fetchConfig) {
        return initCalendar(__assign(__assign({}, OPTIONS), { eventSources: [
                {
                    id: 'green0',
                    events: createEventGenerator('source1-', fetchConfig),
                    color: 'green',
                },
                {
                    id: 'blue',
                    events: createEventGenerator('source2-', fetchConfig),
                    color: 'blue',
                },
                {
                    id: 'green1',
                    events: createEventGenerator('source3-', fetchConfig),
                    color: 'green',
                },
            ] }));
    }
    function createEventGenerator(classNamePrefix, fetchConfig) {
        return function (arg, callback) {
            var events = [];
            for (var i = 0; i < fetchConfig.eventCount; i += 1) {
                events.push({
                    start: '2015-08-07T02:00:00',
                    end: '2015-08-07T03:00:00',
                    className: classNamePrefix + fetchConfig.fetchId,
                    title: classNamePrefix + fetchConfig.fetchId,
                });
            }
            if (fetchConfig.fetchDelay) {
                setTimeout(function () {
                    callback(events);
                }, fetchConfig.fetchDelay);
            }
            else {
                callback(events);
            }
        };
    }
});
//# sourceMappingURL=refetch.js.map