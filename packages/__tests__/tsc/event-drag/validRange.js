import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
describe('validRange event dragging', function () {
    describe('when start constraint', function () {
        describe('when in month view', function () {
            pushOptions({
                initialView: 'dayGridMonth',
                initialDate: '2017-06-01',
                validRange: { start: '2017-06-06' },
                events: [
                    { start: '2017-06-07', end: '2017-06-10' },
                ],
                editable: true,
            });
            it('won\'t go before validRange', function (done) {
                var modifiedEvent = false;
                var calendar = initCalendar({
                    eventDrop: function (arg) {
                        modifiedEvent = arg.event;
                    },
                });
                var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                $(dayGridWrapper.getEventEls()).simulate('drag', {
                    end: dayGridWrapper.getDayEl('2017-06-06').previousElementSibling,
                    callback: function () {
                        expect(modifiedEvent).toBe(false);
                        done();
                    },
                });
            });
        });
    });
    describe('when end constraint', function () {
        describe('when in month view', function () {
            pushOptions({
                initialView: 'dayGridMonth',
                initialDate: '2017-06-01',
                validRange: { end: '2017-06-09' },
                events: [
                    { start: '2017-06-04', end: '2017-06-07' },
                ],
                editable: true,
            });
            it('won\'t go after validRange', function (done) {
                var modifiedEvent = false;
                var calendar = initCalendar({
                    eventDrop: function (arg) {
                        modifiedEvent = arg.event;
                    },
                });
                var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                $(dayGridWrapper.getEventEls()).simulate('drag', {
                    end: dayGridWrapper.getDayEl('2017-06-08').nextElementSibling,
                    callback: function () {
                        expect(modifiedEvent).toBe(false);
                        done();
                    },
                });
            });
        });
    });
});
//# sourceMappingURL=validRange.js.map