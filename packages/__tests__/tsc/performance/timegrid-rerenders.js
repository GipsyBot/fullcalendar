it('timegrid view rerenders well', function (done) {
    var dayHeaderRenderCnt = 0;
    var dayCellRenderCnt = 0;
    var slotLabelRenderCnt = 0;
    var slotLaneRenderCnt = 0;
    var eventRenderCnt = 0;
    var calendar = initCalendar({
        initialView: 'timeGridWeek',
        initialDate: '2017-10-04',
        windowResizeDelay: 0,
        events: [
            { title: 'event 0', start: '2017-10-04T00:00:00' },
        ],
        dayHeaderContent: function () {
            dayHeaderRenderCnt += 1;
        },
        dayCellContent: function () {
            dayCellRenderCnt += 1;
        },
        slotLabelContent: function () {
            slotLabelRenderCnt += 1;
        },
        slotLaneContent: function () {
            slotLaneRenderCnt += 1;
        },
        eventContent: function () {
            eventRenderCnt += 1;
        },
    });
    function resetCounts() {
        dayHeaderRenderCnt = 0;
        dayCellRenderCnt = 0;
        slotLabelRenderCnt = 0;
        slotLaneRenderCnt = 0;
        eventRenderCnt = 0;
    }
    expect(dayHeaderRenderCnt).toBe(7);
    expect(dayCellRenderCnt).toBe(14); // all-day row AND time cols
    expect(slotLabelRenderCnt).toBe(24); // one slot per every 2 lanes
    expect(slotLaneRenderCnt).toBe(48);
    expect(eventRenderCnt).toBe(1);
    resetCounts();
    calendar.next();
    expect(dayHeaderRenderCnt).toBe(7);
    expect(dayCellRenderCnt).toBe(14);
    expect(slotLabelRenderCnt).toBe(0);
    expect(slotLaneRenderCnt).toBe(0);
    expect(eventRenderCnt).toBe(0); // event will be out of view
    calendar.changeView('listWeek'); // switch away
    resetCounts();
    calendar.changeView('timeGridWeek'); // return to view
    expect(dayHeaderRenderCnt).toBe(7);
    expect(dayCellRenderCnt).toBe(14);
    expect(slotLabelRenderCnt).toBe(24);
    expect(slotLaneRenderCnt).toBe(48);
    expect(eventRenderCnt).toBe(0); // event still out of view
    resetCounts();
    $(window).simulate('resize');
    setTimeout(function () {
        expect(dayHeaderRenderCnt).toBe(0);
        expect(dayCellRenderCnt).toBe(0);
        expect(slotLabelRenderCnt).toBe(0);
        expect(slotLaneRenderCnt).toBe(0);
        expect(eventRenderCnt).toBe(0);
        done();
    }, 1); // more than windowResizeDelay
});
//# sourceMappingURL=timegrid-rerenders.js.map