describe('timegrid slots', function () {
    // https://github.com/fullcalendar/fullcalendar/issues/5952
    it('can render a single big slot without error', function () {
        initCalendar({
            initialView: 'timeGridDay',
            slotDuration: '24:00',
        });
    });
});
//# sourceMappingURL=timegrid-slots.js.map