describe('Event::source', function () {
    it('returns the correct source', function () {
        initCalendar({
            eventSources: [{
                    id: 'sourceA',
                    events: [
                        { id: 'eventA', start: '2018-09-07' },
                    ],
                }],
        });
        var event = currentCalendar.getEventById('eventA');
        var source = event.source;
        expect(source.id).toBe('sourceA');
    });
    it('returns null for events with no source', function () {
        initCalendar();
        currentCalendar.addEvent({ id: 'eventA', start: '2018-09-07' });
        var event = currentCalendar.getEventById('eventA');
        var source = event.source;
        expect(source).toBe(null);
    });
});
//# sourceMappingURL=Event.source.js.map