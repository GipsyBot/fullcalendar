import { __assign, __extends } from "tslib";
import { BaseComponent, createElement, isMultiDayRange, buildSegTimeText, createFormatter, EventRoot, RenderHook, } from '@fullcalendar/common';
var DEFAULT_TIME_FORMAT = createFormatter({
    hour: 'numeric',
    minute: '2-digit',
    meridiem: 'short',
});
var ListViewEventRow = /** @class */ (function (_super) {
    __extends(ListViewEventRow, _super);
    function ListViewEventRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListViewEventRow.prototype.render = function () {
        var _a = this, props = _a.props, context = _a.context;
        var seg = props.seg;
        var timeFormat = context.options.eventTimeFormat || DEFAULT_TIME_FORMAT;
        return (createElement(EventRoot, { seg: seg, timeText: "" // BAD. because of all-day content
            , disableDragging: true, disableResizing: true, defaultContent: renderEventInnerContent, isPast: props.isPast, isFuture: props.isFuture, isToday: props.isToday, isSelected: props.isSelected, isDragging: props.isDragging, isResizing: props.isResizing, isDateSelecting: props.isDateSelecting }, function (rootElRef, classNames, innerElRef, innerContent, hookProps) { return (createElement("tr", { className: ['fc-list-event', hookProps.event.url ? 'fc-event-forced-url' : ''].concat(classNames).join(' '), ref: rootElRef },
            buildTimeContent(seg, timeFormat, context),
            createElement("td", { className: "fc-list-event-graphic" },
                createElement("span", { className: "fc-list-event-dot", style: { borderColor: hookProps.borderColor || hookProps.backgroundColor } })),
            createElement("td", { className: "fc-list-event-title", ref: innerElRef }, innerContent))); }));
    };
    return ListViewEventRow;
}(BaseComponent));
export { ListViewEventRow };
function renderEventInnerContent(props) {
    var event = props.event;
    var url = event.url;
    var anchorAttrs = url ? { href: url } : {};
    return (createElement("a", __assign({}, anchorAttrs), event.title));
}
function buildTimeContent(seg, timeFormat, context) {
    var options = context.options;
    if (options.displayEventTime !== false) {
        var eventDef = seg.eventRange.def;
        var eventInstance = seg.eventRange.instance;
        var doAllDay = false;
        var timeText = void 0;
        if (eventDef.allDay) {
            doAllDay = true;
        }
        else if (isMultiDayRange(seg.eventRange.range)) { // TODO: use (!isStart || !isEnd) instead?
            if (seg.isStart) {
                timeText = buildSegTimeText(seg, timeFormat, context, null, null, eventInstance.range.start, seg.end);
            }
            else if (seg.isEnd) {
                timeText = buildSegTimeText(seg, timeFormat, context, null, null, seg.start, eventInstance.range.end);
            }
            else {
                doAllDay = true;
            }
        }
        else {
            timeText = buildSegTimeText(seg, timeFormat, context);
        }
        if (doAllDay) {
            var hookProps = {
                text: context.options.allDayText,
                view: context.viewApi,
            };
            return (createElement(RenderHook, { hookProps: hookProps, classNames: options.allDayClassNames, content: options.allDayContent, defaultContent: renderAllDayInner, didMount: options.allDayDidMount, willUnmount: options.allDayWillUnmount }, function (rootElRef, classNames, innerElRef, innerContent) { return (createElement("td", { className: ['fc-list-event-time'].concat(classNames).join(' '), ref: rootElRef }, innerContent)); }));
        }
        return (createElement("td", { className: "fc-list-event-time" }, timeText));
    }
    return null;
}
function renderAllDayInner(hookProps) {
    return hookProps.text;
}
//# sourceMappingURL=ListViewEventRow.js.map