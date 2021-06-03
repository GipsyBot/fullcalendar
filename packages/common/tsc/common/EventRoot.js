import { __extends } from "tslib";
import { createElement, createRef } from '../vdom';
import { EventApi } from '../api/EventApi';
import { computeSegDraggable, computeSegStartResizable, computeSegEndResizable, setElSeg, getEventClassNames, } from '../component/event-rendering';
import { RenderHook } from './render-hook';
import { BaseComponent } from '../vdom-util';
var EventRoot = /** @class */ (function (_super) {
    __extends(EventRoot, _super);
    function EventRoot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.elRef = createRef();
        return _this;
    }
    EventRoot.prototype.render = function () {
        var _a = this, props = _a.props, context = _a.context;
        var options = context.options;
        var seg = props.seg;
        var eventRange = seg.eventRange;
        var ui = eventRange.ui;
        var hookProps = {
            event: new EventApi(context, eventRange.def, eventRange.instance),
            view: context.viewApi,
            timeText: props.timeText,
            textColor: ui.textColor,
            backgroundColor: ui.backgroundColor,
            borderColor: ui.borderColor,
            isDraggable: !props.disableDragging && computeSegDraggable(seg, context),
            isStartResizable: !props.disableResizing && computeSegStartResizable(seg, context),
            isEndResizable: !props.disableResizing && computeSegEndResizable(seg, context),
            isMirror: Boolean(props.isDragging || props.isResizing || props.isDateSelecting),
            isStart: Boolean(seg.isStart),
            isEnd: Boolean(seg.isEnd),
            isPast: Boolean(props.isPast),
            isFuture: Boolean(props.isFuture),
            isToday: Boolean(props.isToday),
            isSelected: Boolean(props.isSelected),
            isDragging: Boolean(props.isDragging),
            isResizing: Boolean(props.isResizing),
        };
        var standardClassNames = getEventClassNames(hookProps).concat(ui.classNames);
        return (createElement(RenderHook, { hookProps: hookProps, classNames: options.eventClassNames, content: options.eventContent, defaultContent: props.defaultContent, didMount: options.eventDidMount, willUnmount: options.eventWillUnmount, elRef: this.elRef }, function (rootElRef, customClassNames, innerElRef, innerContent) { return props.children(rootElRef, standardClassNames.concat(customClassNames), innerElRef, innerContent, hookProps); }));
    };
    EventRoot.prototype.componentDidMount = function () {
        setElSeg(this.elRef.current, this.props.seg);
    };
    /*
    need to re-assign seg to the element if seg changes, even if the element is the same
    */
    EventRoot.prototype.componentDidUpdate = function (prevProps) {
        var seg = this.props.seg;
        if (seg !== prevProps.seg) {
            setElSeg(this.elRef.current, seg);
        }
    };
    return EventRoot;
}(BaseComponent));
export { EventRoot };
//# sourceMappingURL=EventRoot.js.map