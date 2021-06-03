import { Calendar } from '@fullcalendar/core';
import interactionPlugin, { ThirdPartyDraggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ListenerCounter } from '../lib/ListenerCounter';
import 'components-jqueryui'; // for .sortable and .draggable
import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper';
import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper';
describe('external drag and drop with jquery UI', function () {
    pushOptions({
        plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin],
        initialDate: '2014-08-23',
        initialView: 'dayGridMonth',
        droppable: true,
    });
    // TODO: fill out tests for droppable/drop, with RTL
    var thirdPartyDraggable;
    beforeEach(function () {
        $('body').append('<div id="sidebar" style="width:200px">' +
            ("<a class=\"" + CalendarWrapper.EVENT_CLASSNAME + " event1\">event 1</a>") +
            ("<a class=\"" + CalendarWrapper.EVENT_CLASSNAME + " event2\">event 2</a>") +
            '</div>' +
            '<div id="cal" style="width:600px;position:absolute;top:10px;left:220px" />');
        thirdPartyDraggable = new ThirdPartyDraggable({
            itemSelector: "#sidebar ." + CalendarWrapper.EVENT_CLASSNAME,
        });
    });
    afterEach(function () {
        $('#sidebar').remove();
        $('#cal').remove();
        thirdPartyDraggable.destroy();
    });
    function initCalendarInContainer(options) {
        if (options === void 0) { options = {}; }
        return initCalendar(options, $('#cal')[0]);
    }
    describeValues({
        'with draggable': function () { return $('#sidebar a').draggable(); },
        'with sortable': function () { return $('#sidebar').sortable(); },
    }, function (initDnd) {
        describe('in month view', function () {
            pushOptions({
                initialView: 'dayGridMonth',
            });
            it('works after the view is changed', function (done) {
                var callCnt = 0;
                var dayGridWrapper;
                var calendar = initCalendarInContainer({
                    drop: function (arg) {
                        if (callCnt === 0) {
                            expect(arg.date).toEqualDate('2014-08-06');
                            calendar.next();
                            calendar.prev();
                            setTimeout(function () {
                                $('#sidebar .event1').remove();
                                $('#sidebar .event2').simulate('drag', {
                                    end: dayGridWrapper.getDayEl('2014-08-06'),
                                });
                            }, 0);
                        }
                        else if (callCnt === 1) {
                            expect(arg.date).toEqualDate('2014-08-06');
                            setTimeout(done); // weird
                        }
                        callCnt += 1;
                    },
                });
                dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                initDnd();
                setTimeout(function () {
                    $('#sidebar .event1').simulate('drag', {
                        end: dayGridWrapper.getDayEl('2014-08-06'),
                    });
                });
            });
            describe('dropAccept', function () {
                it('works with a className that does match', function (done) {
                    var options = {
                        dropAccept: '.event1',
                        drop: function () { },
                    };
                    spyOn(options, 'drop').and.callThrough();
                    var calendar = initCalendarInContainer(options);
                    var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                    initDnd();
                    setTimeout(function () {
                        $('#sidebar .event1').simulate('drag', {
                            end: dayGridWrapper.getDayEl('2014-08-06'),
                            callback: function () {
                                expect(options.drop).toHaveBeenCalled();
                                done();
                            },
                        });
                    });
                });
                it('prevents a classNames that doesn\'t match', function (done) {
                    var options = {
                        dropAccept: '.event2',
                        drop: function () { },
                    };
                    spyOn(options, 'drop').and.callThrough();
                    var calendar = initCalendarInContainer(options);
                    var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                    initDnd();
                    setTimeout(function () {
                        $('#sidebar .event1').simulate('drag', {
                            end: dayGridWrapper.getDayEl('2014-08-06'),
                            callback: function () {
                                expect(options.drop).not.toHaveBeenCalled();
                                done();
                            },
                        });
                    });
                });
                it('works with a filter function that returns true', function (done) {
                    var options = {
                        dropAccept: function (el) {
                            expect(el instanceof HTMLElement).toBe(true);
                            return true;
                        },
                        drop: function () { },
                    };
                    spyOn(options, 'drop').and.callThrough();
                    var calendar = initCalendarInContainer(options);
                    var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                    initDnd();
                    setTimeout(function () {
                        $('#sidebar .event1').simulate('drag', {
                            end: dayGridWrapper.getDayEl('2014-08-06'),
                            callback: function () {
                                expect(options.drop).toHaveBeenCalled();
                                done();
                            },
                        });
                    });
                });
                it('prevents a drop with a filter function that returns false', function (done) {
                    var options = {
                        dropAccept: function (el) {
                            expect(el instanceof HTMLElement).toBe(true);
                            return false;
                        },
                        drop: function () { },
                    };
                    spyOn(options, 'drop').and.callThrough();
                    var calendar = initCalendarInContainer(options);
                    var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
                    initDnd();
                    setTimeout(function () {
                        $('#sidebar .event1').simulate('drag', {
                            end: dayGridWrapper.getDayEl('2014-08-06'),
                            callback: function () {
                                expect(options.drop).not.toHaveBeenCalled();
                                done();
                            },
                        });
                    });
                });
            });
        });
        describe('in timeGrid view', function () {
            pushOptions({
                initialView: 'timeGridWeek',
                dragScroll: false,
                scrollTime: '00:00:00',
            });
            it('works after the view is changed', function (done) {
                var callCnt = 0;
                var timeGridWrapper;
                var calendar = initCalendarInContainer({
                    drop: function (arg) {
                        if (callCnt === 0) {
                            expect(arg.date).toEqualDate('2014-08-20T01:00:00Z');
                            currentCalendar.next();
                            currentCalendar.prev();
                            setTimeout(function () {
                                $('#sidebar .event1').remove();
                                $('#sidebar .event2').simulate('drag', {
                                    end: timeGridWrapper.getPoint('2014-08-20T01:00:00'),
                                });
                            }, 0);
                        }
                        else if (callCnt === 1) {
                            expect(arg.date).toEqualDate('2014-08-20T01:00:00Z');
                            setTimeout(done); // weird
                        }
                        callCnt += 1;
                    },
                });
                timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                initDnd();
                setTimeout(function () {
                    $('#sidebar .event1').simulate('drag', {
                        end: timeGridWrapper.getPoint('2014-08-20T01:00:00'),
                    });
                });
            });
            it('works with timezone as "local"', function (done) {
                var calendar = initCalendarInContainer({
                    timeZone: 'local',
                    drop: function (arg) {
                        expect(arg.date).toEqualLocalDate('2014-08-20T01:00:00');
                        done();
                    },
                });
                var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                initDnd();
                setTimeout(function () {
                    $('#sidebar .event1').simulate('drag', {
                        end: timeGridWrapper.getPoint('2014-08-20T01:00:00'),
                    });
                });
            });
            it('works with timezone as "UTC"', function (done) {
                var calendar = initCalendarInContainer({
                    timeZone: 'UTC',
                    drop: function (arg) {
                        expect(arg.date).toEqualDate('2014-08-20T01:00:00Z');
                        done();
                    },
                });
                var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                initDnd();
                setTimeout(function () {
                    $('#sidebar .event1').simulate('drag', {
                        end: timeGridWrapper.getPoint('2014-08-20T01:00:00'),
                    });
                });
            });
            describe('dropAccept', function () {
                it('works with a className that does match', function (done) {
                    var options = {
                        dropAccept: '.event1',
                        drop: function () { },
                    };
                    spyOn(options, 'drop').and.callThrough();
                    var calendar = initCalendarInContainer(options);
                    var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                    initDnd();
                    setTimeout(function () {
                        $('#sidebar .event1').simulate('drag', {
                            end: timeGridWrapper.getPoint('2014-08-20T01:00:00'),
                            callback: function () {
                                expect(options.drop).toHaveBeenCalled();
                                done();
                            },
                        });
                    });
                });
                it('prevents a classNames that doesn\'t match', function (done) {
                    var options = {
                        dropAccept: '.event2',
                        drop: function () { },
                    };
                    spyOn(options, 'drop').and.callThrough();
                    var calendar = initCalendarInContainer(options);
                    var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                    initDnd();
                    setTimeout(function () {
                        $('#sidebar .event1').simulate('drag', {
                            end: timeGridWrapper.getPoint('2014-08-20T01:00:00'),
                            callback: function () {
                                expect(options.drop).not.toHaveBeenCalled();
                                done();
                            },
                        });
                    });
                });
                it('works with a filter function that returns true', function (done) {
                    var options = {
                        dropAccept: function (el) {
                            expect(el instanceof HTMLElement).toBe(true);
                            return true;
                        },
                        drop: function () { },
                    };
                    spyOn(options, 'drop').and.callThrough();
                    var calendar = initCalendarInContainer(options);
                    var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                    initDnd();
                    setTimeout(function () {
                        $('#sidebar .event1').simulate('drag', {
                            end: timeGridWrapper.getPoint('2014-08-20T01:00:00'),
                            callback: function () {
                                expect(options.drop).toHaveBeenCalled();
                                done();
                            },
                        });
                    });
                });
                it('prevents a drop with a filter function that returns false', function (done) {
                    var options = {
                        dropAccept: function (el) {
                            expect(el instanceof HTMLElement).toBe(true);
                            return false;
                        },
                        drop: function () { },
                    };
                    spyOn(options, 'drop').and.callThrough();
                    var calendar = initCalendarInContainer(options);
                    var timeGridWrapper = new TimeGridViewWrapper(calendar).timeGrid;
                    initDnd();
                    setTimeout(function () {
                        $('#sidebar .event1').simulate('drag', {
                            end: timeGridWrapper.getPoint('2014-08-20T01:00:00'),
                            callback: function () {
                                expect(options.drop).not.toHaveBeenCalled();
                                done();
                            },
                        });
                    });
                });
            });
        });
        // Issue 2433
        it('should not have drag handlers cleared when other calendar navigates', function () {
            var calendar0 = initCalendarInContainer();
            initDnd();
            var el0 = calendar0.el;
            var $el1 = $('<div id="calendar2">').insertAfter(el0);
            var calendar1 = new Calendar($el1[0], getCurrentOptions());
            calendar1.render();
            var docListenerCounter = new ListenerCounter(document);
            docListenerCounter.startWatching();
            calendar0.next();
            expect(docListenerCounter.stopWatching()).toBe(0);
            calendar1.destroy();
            $el1.remove();
        });
    });
    // https://github.com/fullcalendar/fullcalendar/issues/2926
    it('gives a mouseup event to the drop handler', function (done) {
        var options = {
            drop: function (info) {
                expect(info.jsEvent.type).toBe('mouseup');
            },
        };
        spyOn(options, 'drop').and.callThrough();
        var calendar = initCalendarInContainer(options);
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        setTimeout(function () {
            $('#sidebar .event1').draggable().simulate('drag', {
                end: dayGridWrapper.getDayEl('2014-08-06'),
                callback: function () {
                    expect(options.drop).toHaveBeenCalled();
                    done();
                },
            });
        });
    });
});
//# sourceMappingURL=external-dnd.js.map