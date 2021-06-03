describe('setting option dynamically', function () {
    it('does not cause refetch of events', function (done) {
        var fetchCnt = 0;
        initCalendar({
            initialView: 'dayGridMonth',
            events: function (arg, callback) {
                fetchCnt += 1;
                callback([]);
            },
        });
        expect(fetchCnt).toBe(1);
        currentCalendar.setOption('selectable', true);
        setTimeout(function () {
            expect(fetchCnt).toBe(1);
            done();
        }, 0);
    });
});
//# sourceMappingURL=dynamic-options.js.map