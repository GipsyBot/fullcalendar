import { __assign, __extends } from "tslib";
import { createElement, Fragment } from '../vdom';
import { BaseComponent } from '../vdom-util';
import { buildSegTimeText } from '../component/event-rendering';
import { EventRoot } from './EventRoot';
// should not be a purecomponent
var StandardEvent = /** @class */ (function (_super) {
    __extends(StandardEvent, _super);
    function StandardEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StandardEvent.prototype.render = function () {
        var _a = this, props = _a.props, context = _a.context;
        var seg = props.seg;
        var timeFormat = context.options.eventTimeFormat || props.defaultTimeFormat;
        var timeText = buildSegTimeText(seg, timeFormat, context, props.defaultDisplayEventTime, props.defaultDisplayEventEnd);
        return (createElement(EventRoot, { seg: seg, timeText: timeText, disableDragging: props.disableDragging, disableResizing: props.disableResizing, defaultContent: props.defaultContent || renderInnerContent, isDragging: props.isDragging, isResizing: props.isResizing, isDateSelecting: props.isDateSelecting, isSelected: props.isSelected, isPast: props.isPast, isFuture: props.isFuture, isToday: props.isToday }, function (rootElRef, classNames, innerElRef, innerContent, hookProps) { return (createElement("a", __assign({ className: props.extraClassNames.concat(classNames).join(' '), style: {
                borderColor: hookProps.borderColor,
                backgroundColor: hookProps.backgroundColor,
            }, ref: rootElRef }, getSegAnchorAttrs(seg)),
            createElement("div", { className: "fc-event-main", ref: innerElRef, style: { color: hookProps.textColor } }, innerContent),
            hookProps.isStartResizable &&
                createElement("div", { className: "fc-event-resizer fc-event-resizer-start" }),
            hookProps.isEndResizable &&
                createElement("div", { className: "fc-event-resizer fc-event-resizer-end" }))); }));
    };
    return StandardEvent;
}(BaseComponent));
export { StandardEvent };
function renderInnerContent(innerProps) {
    return (createElement("div", { className: "fc-event-main-frame" },
        innerProps.timeText && (createElement("div", { className: "fc-event-time" }, innerProps.timeText)),
        createElement("div", { className: "fc-event-title-container" },
            createElement("div", { className: "fc-event-title fc-sticky" }, innerProps.event.title || createElement(Fragment, null, "\u00A0")))));
}
function getSegAnchorAttrs(seg) {
    var url = seg.eventRange.def.url;
    return url ? { href: url } : {};
}
//# sourceMappingURL=StandardEvent.js.map