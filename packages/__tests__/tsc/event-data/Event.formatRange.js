describe('Event::formatRange', function () {
    pushOptions({
        timeZone: 'America/New_York',
        locale: 'en',
    });
    var FORMAT_SETTINGS = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZoneName: 'short',
        separator: ' to ',
        omitCommas: true,
    };
    describe('when event has an end', function () {
        pushOptions({
            events: [
                { start: '2018-09-04T12:00:00-05:00', end: '2018-09-05T12:00:00-05:00' },
            ],
        });
        it('formats start and end', function () {
            initCalendar();
            var event = currentCalendar.getEvents()[0];
            var str = event.formatRange(FORMAT_SETTINGS);
            expect(str).toBe('September 4 to 5 2018 12:00 PM GMT-5');
        });
    });
    describe('when event has NO end', function () {
        pushOptions({
            events: [
                { start: '2018-09-04T12:00:00-05:00' },
            ],
        });
        it('formats start', function () {
            initCalendar();
            var event = currentCalendar.getEvents()[0];
            var str = event.formatRange(FORMAT_SETTINGS);
            expect(str).toBe('September 4 2018 12:00 PM GMT-5');
        });
    });
});
//# sourceMappingURL=Event.formatRange.js.map