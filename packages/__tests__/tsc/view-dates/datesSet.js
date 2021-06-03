import { __assign } from "tslib";
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
describe('datesSet', function () {
    pushOptions({
        initialView: 'dayGridMonth',
        now: '2020-06-21',
    });
    it('won\'t fire when a non-dateprofile-related option is reset', function () {
        var fireCnt = 0;
        var options = __assign(__assign({}, getCurrentOptions()), { weekNumbers: false, datesSet: function () {
                fireCnt += 1;
            } });
        var $calendarEl = $('<div>').appendTo('body');
        var calendar = new Calendar($calendarEl[0], options);
        calendar.render();
        expect(fireCnt).toBe(1);
        calendar.resetOptions(__assign(__assign({}, options), { weekNumbers: true }));
        expect(fireCnt).toBe(1);
        calendar.destroy();
        $calendarEl.remove();
    });
    it('won\'t fire when a complex object-like option is reset', function () {
        function buildHeaderToolbar() {
            return {
                left: 'today',
            };
        }
        var fireCnt = 0;
        var options = __assign(__assign({}, getCurrentOptions()), { headerToolbar: buildHeaderToolbar(), datesSet: function () {
                fireCnt += 1;
            } });
        var $calendarEl = $('<div>').appendTo('body');
        var calendar = new Calendar($calendarEl[0], options);
        calendar.render();
        expect(fireCnt).toBe(1);
        calendar.resetOptions(__assign(__assign({}, options), { headerToolbar: buildHeaderToolbar() }));
        expect(fireCnt).toBe(1);
        calendar.destroy();
        $calendarEl.remove();
    });
    it('won\'t fire when plugins option is reset', function () {
        var fireCnt = 0;
        var options = __assign(__assign({}, getCurrentOptions()), { plugins: [dayGridPlugin], datesSet: function () {
                fireCnt += 1;
            } });
        var $calendarEl = $('<div>').appendTo('body');
        var calendar = new Calendar($calendarEl[0], options);
        calendar.render();
        expect(fireCnt).toBe(1);
        calendar.resetOptions(__assign(__assign({}, options), { plugins: [dayGridPlugin] }));
        expect(fireCnt).toBe(1);
        calendar.destroy();
        $calendarEl.remove();
    });
});
//# sourceMappingURL=datesSet.js.map