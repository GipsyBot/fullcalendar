import { __assign, __extends } from "tslib";
import { createElement, Scroller, addDays, startOfDay, intersectRanges, sliceEventStore, memoize, sortEventSegs, getSegMeta, NowTimer, ViewRoot, RenderHook, DateComponent, } from '@fullcalendar/common';
import { ListViewHeaderRow } from './ListViewHeaderRow';
import { ListViewEventRow } from './ListViewEventRow';
/*
Responsible for the scroller, and forwarding event-related actions into the "grid".
*/
var ListView = /** @class */ (function (_super) {
    __extends(ListView, _super);
    function ListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.computeDateVars = memoize(computeDateVars);
        _this.eventStoreToSegs = memoize(_this._eventStoreToSegs);
        _this.setRootEl = function (rootEl) {
            if (rootEl) {
                _this.context.registerInteractiveComponent(_this, {
                    el: rootEl,
                });
            }
            else {
                _this.context.unregisterInteractiveComponent(_this);
            }
        };
        return _this;
    }
    ListView.prototype.render = function () {
        var _this = this;
        var _a = this, props = _a.props, context = _a.context;
        var extraClassNames = [
            'fc-list',
            context.theme.getClass('table'),
            context.options.stickyHeaderDates !== false ? 'fc-list-sticky' : '',
        ];
        var _b = this.computeDateVars(props.dateProfile), dayDates = _b.dayDates, dayRanges = _b.dayRanges;
        var eventSegs = this.eventStoreToSegs(props.eventStore, props.eventUiBases, dayRanges);
        return (createElement(ViewRoot, { viewSpec: context.viewSpec, elRef: this.setRootEl }, function (rootElRef, classNames) { return (createElement("div", { ref: rootElRef, className: extraClassNames.concat(classNames).join(' ') },
            createElement(Scroller, { liquid: !props.isHeightAuto, overflowX: props.isHeightAuto ? 'visible' : 'hidden', overflowY: props.isHeightAuto ? 'visible' : 'auto' }, eventSegs.length > 0 ?
                _this.renderSegList(eventSegs, dayDates) :
                _this.renderEmptyMessage()))); }));
    };
    ListView.prototype.renderEmptyMessage = function () {
        var _a = this.context, options = _a.options, viewApi = _a.viewApi;
        var hookProps = {
            text: options.noEventsText,
            view: viewApi,
        };
        return (createElement(RenderHook, { hookProps: hookProps, classNames: options.noEventsClassNames, content: options.noEventsContent, defaultContent: renderNoEventsInner, didMount: options.noEventsDidMount, willUnmount: options.noEventsWillUnmount }, function (rootElRef, classNames, innerElRef, innerContent) { return (createElement("div", { className: ['fc-list-empty'].concat(classNames).join(' '), ref: rootElRef },
            createElement("div", { className: "fc-list-empty-cushion", ref: innerElRef }, innerContent))); }));
    };
    ListView.prototype.renderSegList = function (allSegs, dayDates) {
        var _a = this.context, theme = _a.theme, options = _a.options;
        var segsByDay = groupSegsByDay(allSegs); // sparse array
        return (createElement(NowTimer, { unit: "day" }, function (nowDate, todayRange) {
            var innerNodes = [];
            for (var dayIndex = 0; dayIndex < segsByDay.length; dayIndex += 1) {
                var daySegs = segsByDay[dayIndex];
                if (daySegs) { // sparse array, so might be undefined
                    var dayStr = dayDates[dayIndex].toISOString();
                    // append a day header
                    innerNodes.push(createElement(ListViewHeaderRow, { key: dayStr, dayDate: dayDates[dayIndex], todayRange: todayRange }));
                    daySegs = sortEventSegs(daySegs, options.eventOrder);
                    for (var _i = 0, daySegs_1 = daySegs; _i < daySegs_1.length; _i++) {
                        var seg = daySegs_1[_i];
                        innerNodes.push(createElement(ListViewEventRow, __assign({ key: dayStr + ':' + seg.eventRange.instance.instanceId /* are multiple segs for an instanceId */, seg: seg, isDragging: false, isResizing: false, isDateSelecting: false, isSelected: false }, getSegMeta(seg, todayRange, nowDate))));
                    }
                }
            }
            return (createElement("table", { className: 'fc-list-table ' + theme.getClass('table') },
                createElement("tbody", null, innerNodes)));
        }));
    };
    ListView.prototype._eventStoreToSegs = function (eventStore, eventUiBases, dayRanges) {
        return this.eventRangesToSegs(sliceEventStore(eventStore, eventUiBases, this.props.dateProfile.activeRange, this.context.options.nextDayThreshold).fg, dayRanges);
    };
    ListView.prototype.eventRangesToSegs = function (eventRanges, dayRanges) {
        var segs = [];
        for (var _i = 0, eventRanges_1 = eventRanges; _i < eventRanges_1.length; _i++) {
            var eventRange = eventRanges_1[_i];
            segs.push.apply(segs, this.eventRangeToSegs(eventRange, dayRanges));
        }
        return segs;
    };
    ListView.prototype.eventRangeToSegs = function (eventRange, dayRanges) {
        var dateEnv = this.context.dateEnv;
        var nextDayThreshold = this.context.options.nextDayThreshold;
        var range = eventRange.range;
        var allDay = eventRange.def.allDay;
        var dayIndex;
        var segRange;
        var seg;
        var segs = [];
        for (dayIndex = 0; dayIndex < dayRanges.length; dayIndex += 1) {
            segRange = intersectRanges(range, dayRanges[dayIndex]);
            if (segRange) {
                seg = {
                    component: this,
                    eventRange: eventRange,
                    start: segRange.start,
                    end: segRange.end,
                    isStart: eventRange.isStart && segRange.start.valueOf() === range.start.valueOf(),
                    isEnd: eventRange.isEnd && segRange.end.valueOf() === range.end.valueOf(),
                    dayIndex: dayIndex,
                };
                segs.push(seg);
                // detect when range won't go fully into the next day,
                // and mutate the latest seg to the be the end.
                if (!seg.isEnd && !allDay &&
                    dayIndex + 1 < dayRanges.length &&
                    range.end <
                        dateEnv.add(dayRanges[dayIndex + 1].start, nextDayThreshold)) {
                    seg.end = range.end;
                    seg.isEnd = true;
                    break;
                }
            }
        }
        return segs;
    };
    return ListView;
}(DateComponent));
export { ListView };
function renderNoEventsInner(hookProps) {
    return hookProps.text;
}
function computeDateVars(dateProfile) {
    var dayStart = startOfDay(dateProfile.renderRange.start);
    var viewEnd = dateProfile.renderRange.end;
    var dayDates = [];
    var dayRanges = [];
    while (dayStart < viewEnd) {
        dayDates.push(dayStart);
        dayRanges.push({
            start: dayStart,
            end: addDays(dayStart, 1),
        });
        dayStart = addDays(dayStart, 1);
    }
    return { dayDates: dayDates, dayRanges: dayRanges };
}
// Returns a sparse array of arrays, segs grouped by their dayIndex
function groupSegsByDay(segs) {
    var segsByDay = []; // sparse array
    var i;
    var seg;
    for (i = 0; i < segs.length; i += 1) {
        seg = segs[i];
        (segsByDay[seg.dayIndex] || (segsByDay[seg.dayIndex] = []))
            .push(seg);
    }
    return segsByDay;
}
//# sourceMappingURL=ListView.js.map