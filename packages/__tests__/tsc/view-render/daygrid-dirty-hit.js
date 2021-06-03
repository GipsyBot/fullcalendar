import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
describe('daygrid view with updated dimensions', function () {
    it('reports correct dateClick after resize', function (done) {
        var $wrapper = $('<div><div style="width:auto"></div></div>').appendTo('body');
        $wrapper.width(200);
        var calendar = initCalendar({
            initialDate: '2019-04-01',
            initialView: 'dayGridMonth',
            dateClick: function (arg) {
                expect(arg.date).toEqualDate('2019-04-02'); // a Tues
                $wrapper.remove();
                done();
            },
        }, $wrapper.children().get(0));
        $wrapper.width(400);
        calendar.updateSize();
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        $(dayGridWrapper.getDayEl('2019-04-02')).simulate('drag'); // a click
    });
});
//# sourceMappingURL=daygrid-dirty-hit.js.map