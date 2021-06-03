describe('event mutations on non-instances', function () {
    pushOptions({
        initialView: 'dayGridWeek',
        now: '2018-09-03',
        events: [
            { id: '1', start: '2018-09-04', display: 'inverse-background' },
        ],
    });
    describe('with date mutating', function () {
        it('doesn\'t do anything', function () {
            var renderCnt = 0;
            var calendar = initCalendar({
                eventContent: function (arg) {
                    renderCnt += 1;
                    if (renderCnt === 2) {
                        arg.event.setStart('2018-08-04');
                        arg.event.setEnd('2018-10-04');
                        arg.event.setDates('2018-08-04', '2018-10-04');
                    }
                },
            });
            expect(renderCnt).toBe(2);
            var event = calendar.getEventById('1');
            expect(event.start).toEqualDate('2018-09-04');
            expect(event.end).toBe(null);
            expect(event.allDay).toBe(true);
        });
    });
    // TODO: test for non-instances to have other props and extended props modified
});
//# sourceMappingURL=Event.mutation.js.map