describe('implicit unselection', function () {
    pushOptions({
        initialView: 'dayGridMonth',
        fixedWeekCount: true,
        now: '2018-09-11',
    });
    it('happens when dates change', function () {
        var selectFired = 0;
        var unselectFired = 0;
        initCalendar({
            select: function () {
                selectFired += 1;
            },
            unselect: function () {
                unselectFired += 1;
            },
        });
        currentCalendar.select('2018-09-24', '2018-10-03'); // will still be visible after .next()
        expect(selectFired).toBe(1);
        expect(unselectFired).toBe(0);
        currentCalendar.next();
        expect(selectFired).toBe(1);
        expect(unselectFired).toBe(1); // unselected
    });
    it('happens when view changes', function () {
        var selectFired = 0;
        var unselectFired = 0;
        initCalendar({
            select: function () {
                selectFired += 1;
            },
            unselect: function () {
                unselectFired += 1;
            },
        });
        currentCalendar.select('2018-09-09', '2018-09-14'); // will still be visible after view switch
        expect(selectFired).toBe(1);
        expect(unselectFired).toBe(0);
        currentCalendar.changeView('dayGridWeek');
        expect(selectFired).toBe(1);
        expect(unselectFired).toBe(1); // unselected
    });
});
//# sourceMappingURL=implicit-unselect.js.map