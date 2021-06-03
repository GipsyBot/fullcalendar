import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
describe('slotMaxTime', function () {
    describe('when using the default settings', function () {
        describeOptions('initialView', {
            'in week': 'timeGridWeek',
            'in day': 'timeGridDay',
        }, function () {
            it('should start at 12am', function () {
                var calendar = initCalendar({
                    initialView: 'timeGridWeek',
                });
                var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                var lastMajor = timeGridWrapper.getLastMajorAxisInfo();
                expect(lastMajor.text).toEqual('11pm');
            });
        });
    });
    describe('when using a whole number', function () {
        var hourNumbers = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        describe('in week', function () {
            hourNumbers.forEach(function (hourNumber) {
                it('should end at ' + hourNumber, function () {
                    var calendar = initCalendar({
                        initialView: 'timeGridWeek',
                        slotMaxTime: { hours: hourNumber },
                    });
                    var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                    var lastMajor = timeGridWrapper.getLastMajorAxisInfo();
                    var expected = numToStringConverter(hourNumber - 1);
                    expect(lastMajor.text).toEqual(expected);
                });
            });
        });
        describe('in day', function () {
            hourNumbers.forEach(function (hourNumber) {
                it('should end at ' + hourNumber, function () {
                    var calendar = initCalendar({
                        initialView: 'timeGridDay',
                        slotMaxTime: hourNumber + ':00',
                    });
                    var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                    var lastMajor = timeGridWrapper.getLastMajorAxisInfo();
                    var expected = numToStringConverter(hourNumber - 1);
                    expect(lastMajor.text).toEqual(expected);
                });
            });
        });
    });
    describe('when using default slotInterval and \'uneven\' slotMaxTime', function () {
        var hourNumbers = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        describe('in week', function () {
            hourNumbers.forEach(function (hourNumber) {
                it('should end at ' + hourNumber + ':20', function () {
                    var calendar = initCalendar({
                        initialView: 'timeGridWeek',
                        slotMaxTime: { hours: hourNumber, minutes: 20 },
                    });
                    var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                    var lastMajor = timeGridWrapper.getLastMajorAxisInfo();
                    // since exclusive end is :20, last slot will be on the current hour's 00:00
                    var expected = numToStringConverter(hourNumber);
                    expect(lastMajor.text).toEqual(expected);
                });
            });
        });
        describe('in day', function () {
            hourNumbers.forEach(function (hourNumber) {
                it('should end at ' + hourNumber + ':20', function () {
                    var calendar = initCalendar({
                        initialView: 'timeGridDay',
                        slotMaxTime: { hours: hourNumber, minutes: 20 },
                    });
                    var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                    var lastMajor = timeGridWrapper.getLastMajorAxisInfo();
                    // since exclusive end is :20, last slot will be on the current hour's 00:00
                    var expected = numToStringConverter(hourNumber);
                    expect(lastMajor.text).toEqual(expected);
                });
            });
        });
    });
    function numToStringConverter(timeIn) {
        var time = (timeIn % 12) || 12;
        var amPm = 'am';
        if ((timeIn % 24) > 11) {
            amPm = 'pm';
        }
        return time + amPm;
    }
});
//# sourceMappingURL=maxTime.js.map