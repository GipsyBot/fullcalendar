import { __assign, __extends } from "tslib";
import { createElement, BaseComponent, EventRoot, buildSegTimeText, Fragment } from '@fullcalendar/common';
import { DEFAULT_TABLE_EVENT_TIME_FORMAT } from './event-rendering';
var TableListItemEvent = /** @class */ (function (_super) {
    __extends(TableListItemEvent, _super);
    function TableListItemEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableListItemEvent.prototype.render = function () {
        var _a = this, props = _a.props, context = _a.context;
        var timeFormat = context.options.eventTimeFormat || DEFAULT_TABLE_EVENT_TIME_FORMAT;
        var timeText = buildSegTimeText(props.seg, timeFormat, context, true, props.defaultDisplayEventEnd);
        return (createElement(EventRoot, { seg: props.seg, timeText: timeText, defaultContent: renderInnerContent, isDragging: props.isDragging, isResizing: false, isDateSelecting: false, isSelected: props.isSelected, isPast: props.isPast, isFuture: props.isFuture, isToday: props.isToday }, function (rootElRef, classNames, innerElRef, innerContent) { return ( // we don't use styles!
        createElement("a", __assign({ className: ['fc-daygrid-event', 'fc-daygrid-dot-event'].concat(classNames).join(' '), ref: rootElRef }, getSegAnchorAttrs(props.seg)), innerContent)); }));
    };
    return TableListItemEvent;
}(BaseComponent));
export { TableListItemEvent };
function renderInnerContent(innerProps) {
    return (createElement(Fragment, null,
        createElement("div", { className: "fc-daygrid-event-dot", style: { borderColor: innerProps.borderColor || innerProps.backgroundColor } }),
        innerProps.timeText && (createElement("div", { className: "fc-event-time" }, innerProps.timeText)),
        createElement("div", { className: "fc-event-title" }, innerProps.event.title || createElement(Fragment, null, "\u00A0"))));
}
function getSegAnchorAttrs(seg) {
    var url = seg.eventRange.def.url;
    return url ? { href: url } : {};
}
//# sourceMappingURL=TableListItemEvent.js.map