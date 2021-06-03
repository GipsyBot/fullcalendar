import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
describe('select method', function () {
    pushOptions({
        initialDate: '2014-05-25',
        selectable: true,
    });
    /*
    THINGS TO IMPLEMENT IN SRC (in addition to notes further down):
    - better date normalization (for both render and reporting to select callback)
      - if second date is the same or before the first
      - if given a mixture of timed/all-day
      - for dayGrid/month views, when given timed dates, should really be all-day
    */
    describeOptions('direction', {
        'when LTR': 'ltr',
        'when RTL': 'rtl',
    }, function () {
        describe('when in month view', function () {
            pushOptions({
                initialView: 'dayGridMonth',
            });
            describe('when called with all-day date strings', function () {
                describe('when in bounds', function () {
                    it('renders a selection', function () {
                        var calendar = initCalendar();
                        calendar.select('2014-05-07', '2014-05-09');
                        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                        expect(dayGridWrapper.getHighlightEls()).toBeVisible();
                    });
                    it('renders a selection when called with one argument', function () {
                        var calendar = initCalendar();
                        calendar.select('2014-05-07');
                        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                        expect(dayGridWrapper.getHighlightEls()).toBeVisible();
                    });
                    it('fires a selection event', function () {
                        var selectSpy = spyOnCalendarCallback('select', function (arg) {
                            expect(arg.allDay).toEqual(true);
                            expect(arg.start).toEqualDate('2014-05-07');
                            expect(arg.end).toEqualDate('2014-05-09');
                        });
                        var calendar = initCalendar();
                        calendar.select('2014-05-07', '2014-05-09');
                        expect(selectSpy).toHaveBeenCalled();
                    });
                });
                describe('when out of bounds', function () {
                    it('doesn\'t render a selection', function () {
                        var calendar = initCalendar();
                        calendar.select('2015-05-07', '2015-05-09');
                        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                        expect(dayGridWrapper.getHighlightEls()).not.toBeVisible();
                    });
                    /*
                    TODO: implement this behavior
                    it('doesn\'t fire a selection event', function() {
                      options.select = function(arg) {
                        expect(arg.start).toEqualDate('2014-05-07');
                        expect(arg.end).toEqualDate('2014-05-09');
                      };
                      spyOn(options, 'select').and.callThrough();
                      let calendar = initCalendar(options);
                      calendar.select('2015-05-07', '2015-05-09');
                      expect(options.select).not.toHaveBeenCalled();
                    });
                    */
                });
            });
            describe('when called with timed date strings', function () {
                it('renders a selection', function () {
                    var calendar = initCalendar();
                    calendar.select('2014-05-07T06:00:00', '2014-05-09T07:00:00');
                    var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                    expect(dayGridWrapper.getHighlightEls()).toBeVisible();
                });
                it('fires a selection event', function () {
                    var selectSpy = spyOnCalendarCallback('select', function (arg) {
                        expect(arg.allDay).toEqual(false);
                        expect(arg.start).toEqualDate('2014-05-07T06:00:00Z');
                        expect(arg.end).toEqualDate('2014-05-09T06:00:00Z');
                    });
                    var calendar = initCalendar();
                    calendar.select('2014-05-07T06:00:00', '2014-05-09T06:00:00');
                    expect(selectSpy).toHaveBeenCalled();
                });
            });
        });
        describe('when in week view', function () {
            pushOptions({
                initialView: 'timeGridWeek',
                scrollTime: '01:00:00',
                height: 400,
            });
            describe('when called with timed date strings', function () {
                describe('when in bounds', function () {
                    it('renders a selection when called with one argument', function () {
                        var calendar = initCalendar();
                        calendar.select('2014-05-26T06:00:00');
                        var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                        expect(timeGridWrapper.getHighlightEls()).toBeVisible();
                    });
                    it('renders a selection over the slot area', function () {
                        var calendar = initCalendar();
                        calendar.select('2014-05-26T06:00:00', '2014-05-26T08:00:00');
                        var viewWrapper = new TimeGridViewWrapper(calendar);
                        var highlightEls = viewWrapper.timeGrid.getHighlightEls();
                        expect(highlightEls).toBeVisible();
                        var slotAreaTop = $(viewWrapper.getScrollerEl()).offset().top;
                        var overlayTop = $(highlightEls[0]).offset().top;
                        expect(overlayTop).toBeGreaterThan(slotAreaTop);
                    });
                });
                describe('when out of bounds', function () {
                    it('doesn\'t render a selection', function () {
                        var calendar = initCalendar();
                        calendar.select('2015-05-26T06:00:00', '2015-05-26T07:00:00');
                        var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                        expect(timeGridWrapper.getHighlightEls()).not.toBeVisible();
                    });
                    /*
                    TODO: implement this behavior
                    it('doesn\'t fire a selection event', function() {
                      options.select = function(arg) {
                        expect(arg.start).toEqualDate('2015-05-07T06:00:00Z');
                        expect(arg.end).toEqualDate('2015-05-09T07:00:00Z');
                      };
                      spyOn(options, 'select').and.callThrough();
                      let calendar = initCalendar(options);
                      calendar.select('2015-05-07T06:00:00', '2015-05-09T07:00:00');
                      expect(options.select).not.toHaveBeenCalled();
                    });
                    */
                });
            });
            describe('when called with all-day date strings', function () {
                describe('when allDaySlot is on', function () {
                    pushOptions({
                        allDaySlot: true,
                    });
                    it('renders a selection over the day area', function () {
                        var calendar = initCalendar();
                        calendar.select('2014-05-26', '2014-05-28');
                        var viewWrapper = new TimeGridViewWrapper(calendar);
                        var highlightEls = viewWrapper.dayGrid.getHighlightEls();
                        expect(highlightEls).toBeVisible();
                        var slotAreaTop = $(viewWrapper.getScrollerEl()).offset().top;
                        var overlayTop = $(highlightEls[0]).offset().top;
                        expect(overlayTop).toBeLessThan(slotAreaTop);
                    });
                    it('fires a selection event', function () {
                        var selectSpy = spyOnCalendarCallback('select', function (arg) {
                            expect(arg.allDay).toEqual(true);
                            expect(arg.start).toEqualDate('2014-05-26');
                            expect(arg.end).toEqualDate('2014-05-28');
                        });
                        var calendar = initCalendar();
                        calendar.select('2014-05-26', '2014-05-28');
                        expect(selectSpy).toHaveBeenCalled();
                    });
                });
                describe('when allDaySlot is off', function () {
                    pushOptions({
                        allDaySlot: false,
                    });
                    it('doesn\'t render the all-day selection over time area', function () {
                        var calendar = initCalendar();
                        calendar.select('2014-05-26', '2014-05-28');
                        var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                        expect(timeGridWrapper.getHighlightEls()).not.toBeVisible();
                    });
                    /*
                    TODO: implement
                    it('doesn\'t fire a selection event', function() {
                      options.select = function(arg) {
                        expect(arg.allDay).toEqual(true);
                        expect(arg.start).toEqualDate('2014-05-26');
                        expect(arg.end).toEqualDate('2014-05-28');
                      };
                      spyOn(options, 'select').and.callThrough();
                      let calendar = initCalendar(options);
                      calendar.select('2014-05-26', '2014-05-28');
                      expect(options.select).not.toHaveBeenCalled();
                    });
                    */
                });
            });
        });
    });
});
//# sourceMappingURL=select-method.js.map