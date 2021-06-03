describe('Event::setProps', function () {
    it('allows setting id', function () {
        var calendar = initCalendar({
            events: [
                { id: '123', start: '2021-01-01' },
            ],
        });
        var events = calendar.getEvents();
        var event = events[0];
        expect(event.id).toBe('123');
        event.setProp('id', '456');
        expect(event.id).toBe('456');
        events = calendar.getEvents();
        event = events[0];
        expect(event.id).toBe('456');
    });
});
//# sourceMappingURL=Event.setProp.js.map