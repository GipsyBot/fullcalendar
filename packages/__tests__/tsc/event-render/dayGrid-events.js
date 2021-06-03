import { DayGridViewWrapper } from '../lib/wrappers/DayGridViewWrapper';
import { anyElsIntersect } from '../lib/dom-geom';
import { filterVisibleEls } from '../lib/dom-misc';
describe('dayGrid advanced event rendering', function () {
    pushOptions({
        initialDate: '2020-05-01',
    });
    // https://github.com/fullcalendar/fullcalendar/issues/5408
    it('renders without intersecting', function () {
        var calendar = initCalendar({
            initialView: 'dayGridMonth',
            initialDate: '2020-05-01',
            events: [
                { start: '2020-05-02', end: '2020-05-04', title: 'event a' },
                { start: '2020-05-02', end: '2020-05-04', title: 'event b' },
                { start: '2020-05-03', end: '2020-05-05', title: 'event c' },
                { start: '2020-05-04', title: 'event d' },
                { start: '2020-05-04', title: 'event e' },
            ],
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        var eventEls = dayGridWrapper.getEventEls();
        expect(anyElsIntersect(eventEls)).toBe(false);
    });
    // https://github.com/fullcalendar/fullcalendar/issues/5771
    it('renders more-links correctly when first obscured event is longer than event before it', function () {
        var calendar = initCalendar({
            initialView: 'dayGridMonth',
            initialDate: '2020-08-01',
            dayMaxEventRows: 3,
            events: [
                { title: 'big1', start: '2020-07-23', end: '2020-07-28' },
                { title: 'small1', start: '2020-07-24', end: '2020-07-27' },
                { title: 'small2', start: '2020-07-24', end: '2020-07-27' },
                { title: 'big2', start: '2020-07-25', end: '2020-07-28' },
            ],
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        var eventEls = dayGridWrapper.getEventEls();
        var visibleEventEls = filterVisibleEls(eventEls);
        var moreLinkEls = dayGridWrapper.getMoreEls();
        expect(visibleEventEls.length).toBe(3);
        expect(moreLinkEls.length).toBe(1);
        expect(anyElsIntersect(visibleEventEls.concat(moreLinkEls))).toBe(false);
    });
    // https://github.com/fullcalendar/fullcalendar/issues/5790
    it('positions more-links correctly in columns that have empty space', function () {
        var calendar = initCalendar({
            initialView: 'dayGridMonth',
            initialDate: '2020-09-01',
            dayMaxEventRows: 4,
            events: [
                { start: '2020-08-30', end: '2020-09-04' },
                { start: '2020-08-31', end: '2020-09-03' },
                { start: '2020-09-01', end: '2020-09-04' },
                { start: '2020-09-02', end: '2020-09-04' },
                { start: '2020-09-02', end: '2020-09-04' },
            ],
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        var eventEls = dayGridWrapper.getEventEls();
        var visibleEventEls = filterVisibleEls(eventEls);
        var moreLinkEls = dayGridWrapper.getMoreEls();
        expect(visibleEventEls.length).toBe(3);
        expect(moreLinkEls.length).toBe(2);
        expect(anyElsIntersect(visibleEventEls.concat(moreLinkEls))).toBe(false);
        expect(Math.abs(moreLinkEls[0].getBoundingClientRect().top -
            moreLinkEls[1].getBoundingClientRect().top)).toBeLessThan(1);
    });
    // https://github.com/fullcalendar/fullcalendar/issues/5883
    it('it renders without gaps when ordered by title', function () {
        var calendar = initCalendar({
            initialDate: '2020-10-01',
            eventOrder: 'title',
            dayMaxEventRows: 3,
            events: [
                {
                    title: 'b1',
                    start: '2020-10-20',
                    end: '2020-10-22',
                },
                {
                    title: 'b2',
                    start: '2020-10-21',
                    end: '2020-10-22',
                },
                {
                    title: 'b3',
                    start: '2020-10-20',
                    end: '2020-10-23',
                },
                {
                    title: 'b4',
                    start: '2020-10-20',
                    end: '2020-10-23',
                },
            ],
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        var eventEls = dayGridWrapper.getEventEls();
        var visibleEventEls = filterVisibleEls(eventEls);
        var moreLinkEls = dayGridWrapper.getMoreEls();
        expect(visibleEventEls.length).toBe(2);
        expect(moreLinkEls.length).toBe(3);
        expect(anyElsIntersect(visibleEventEls.concat(moreLinkEls))).toBe(false);
    });
    it('won\'t intersect when doing custom rendering', function () {
        var calendar = initCalendar({
            initialView: 'dayGridMonth',
            initialDate: '2020-06-01',
            events: [
                { start: '2020-06-04', end: '2020-06-08', title: 'event a' },
                { start: '2020-06-05', end: '2020-06-09', title: 'event b' },
                { start: '2020-06-08T12:00:00', title: 'event c' },
            ],
            eventContent: function (arg) {
                return {
                    html: "\n            <b>" + arg.timeText + "</b>\n            <i>" + arg.event.title + "</i>\n          ",
                };
            },
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        var eventEls = dayGridWrapper.getEventEls();
        expect(anyElsIntersect(eventEls)).toBe(false);
    });
    it('renders single-day timed event as list-item', function () {
        var calendar = initCalendar({
            initialView: 'dayGridMonth',
            initialDate: '2020-05-01',
            eventDisplay: 'auto',
            events: [
                {
                    title: 'event 1',
                    start: '2020-05-11T22:00:00',
                },
            ],
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        var eventEl = dayGridWrapper.getEventEls()[0];
        expect(dayGridWrapper.isEventListItem(eventEl)).toBe(true);
    });
    it('does not render multi-day event as list-item', function () {
        var calendar = initCalendar({
            initialView: 'dayGridMonth',
            initialDate: '2020-05-01',
            eventDisplay: 'auto',
            events: [
                {
                    title: 'event 1',
                    start: '2020-05-11T22:00:00',
                    end: '2020-05-12T06:00:00',
                },
            ],
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        var eventEl = dayGridWrapper.getEventEls()[0];
        expect(dayGridWrapper.isEventListItem(eventEl)).toBe(false);
    });
    // https://github.com/fullcalendar/fullcalendar/issues/5634
    it('does not render split multi-day event as list-item', function () {
        var calendar = initCalendar({
            initialView: 'dayGridMonth',
            initialDate: '2020-05-01',
            eventDisplay: 'auto',
            events: [
                {
                    title: 'event',
                    start: '2020-05-09T12:00:00',
                    end: '2020-05-10T12:00:00',
                },
            ],
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        var eventEls = dayGridWrapper.getEventEls();
        expect(eventEls.length).toBe(2);
        expect(dayGridWrapper.isEventListItem(eventEls[0])).toBe(false);
        expect(dayGridWrapper.isEventListItem(eventEls[0])).toBe(false);
    });
    it('render only block when eventDislay:block', function () {
        var calendar = initCalendar({
            eventDisplay: 'block',
            events: [
                { start: '2020-05-02T02:00:00', title: 'event a' },
            ],
        });
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        var eventEl = dayGridWrapper.getEventEls()[0];
        expect(dayGridWrapper.isEventListItem(eventEl)).toBe(false);
    });
    it('adjusts more link when getting bigger then smaller with liquid height', function () {
        var LARGE_HEIGHT = 800;
        var SMALL_HEIGHT = 500;
        var $container = $("<div style=\"height:" + LARGE_HEIGHT + "px\"><div></div></div>").appendTo('body');
        var calendar = initCalendar({
            height: '100%',
            dayMaxEvents: true,
            events: [
                { start: '2020-05-02', end: '2020-05-03', title: 'event a' },
                { start: '2020-05-02', end: '2020-05-03', title: 'event b' },
                { start: '2020-05-02', end: '2020-05-03', title: 'event c' },
                { start: '2020-05-02', end: '2020-05-03', title: 'event d' },
                { start: '2020-05-02', end: '2020-05-03', title: 'event e' },
                { start: '2020-05-02', end: '2020-05-03', title: 'event f' },
            ],
        }, $container.find('div'));
        var dayGridWrapper = new DayGridViewWrapper(calendar).dayGrid;
        var origEventCnt = filterVisibleEls(dayGridWrapper.getEventEls()).length;
        $container.css('height', SMALL_HEIGHT);
        calendar.updateSize();
        var smallEventCnt = filterVisibleEls(dayGridWrapper.getEventEls()).length;
        expect(smallEventCnt).not.toBe(origEventCnt);
        $container.css('height', LARGE_HEIGHT);
        calendar.updateSize();
        var largeEventCnt = filterVisibleEls(dayGridWrapper.getEventEls()).length;
        expect(largeEventCnt).toBe(origEventCnt);
        $container.remove();
    });
    // https://github.com/fullcalendar/fullcalendar/issues/5850
    it('does not have JS error when dayMaxEventRows and almost no height', function () {
        initCalendar({
            height: '100%',
            eventDisplay: 'block',
            dayMaxEventRows: true,
            events: [
                { start: '2020-05-02T02:00:00', title: 'event a' },
            ],
        });
    });
    // https://github.com/fullcalendar/fullcalendar/issues/5863
    it('does not have JS error when dayMaxEventRows and almost no height', function () {
        var $container = $('<div style="width:100px" />').appendTo('body');
        initCalendar({
            height: '100%',
            eventDisplay: 'block',
            dayMaxEventRows: true,
            events: [
                { start: '2020-05-02T02:00:00', title: 'event a' },
            ],
        }, $container[0]);
        $container.remove();
    });
    it('doesn\'t create more-link while positioning events with temporary unknown dimensions', function () {
        var renderedMoreLink = false;
        initCalendar({
            initialView: 'dayGridMonth',
            moreLinkDidMount: function () {
                renderedMoreLink = true;
            },
            events: [
                { id: '1', start: '2020-05-05' },
            ],
        });
        expect(renderedMoreLink).toBe(false);
    });
    it('can render events with strict ordering', function () {
        initCalendar({
            initialView: 'dayGridMonth',
            eventOrder: 'id',
            eventOrderStrict: true,
            events: [
                { id: '1', start: '2020-05-05' },
                { id: '2', start: '2020-05-03', end: '2020-05-08' },
                { id: '3', start: '2020-05-04' },
            ],
            eventDidMount: function (arg) {
                arg.el.setAttribute('data-event-id', arg.event.id);
            },
        });
        var el1 = document.querySelector('[data-event-id="1"]');
        var el2 = document.querySelector('[data-event-id="2"]');
        var el3 = document.querySelector('[data-event-id="3"]');
        var top1 = el1.getBoundingClientRect().top;
        var top2 = el2.getBoundingClientRect().top;
        var top3 = el3.getBoundingClientRect().top;
        expect(top1).toBeLessThan(top2);
        expect(top2).toBeLessThan(top3);
    });
});
//# sourceMappingURL=dayGrid-events.js.map