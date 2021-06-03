import { createElement } from '../vdom';
import { EventRoot } from './EventRoot';
export function renderFill(fillType) {
    return (createElement("div", { className: "fc-" + fillType }));
}
export var BgEvent = function (props) { return (createElement(EventRoot, { defaultContent: renderInnerContent, seg: props.seg /* uselesss i think */, timeText: "", disableDragging: true, disableResizing: true, isDragging: false, isResizing: false, isDateSelecting: false, isSelected: false, isPast: props.isPast, isFuture: props.isFuture, isToday: props.isToday }, function (rootElRef, classNames, innerElRef, innerContent, hookProps) { return (createElement("div", { ref: rootElRef, className: ['fc-bg-event'].concat(classNames).join(' '), style: {
        backgroundColor: hookProps.backgroundColor,
    } }, innerContent)); })); };
function renderInnerContent(props) {
    var title = props.event.title;
    return title && (createElement("div", { className: "fc-event-title" }, props.event.title));
}
//# sourceMappingURL=bg-fill.js.map