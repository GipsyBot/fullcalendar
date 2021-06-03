import { __extends } from "tslib";
import { EventApi } from '../api/EventApi';
import { addDays } from '../datelib/marker';
import { elementClosest } from '../util/dom-manip';
import { createElement, createRef, Fragment } from '../vdom';
import { BaseComponent } from '../vdom-util';
import { ViewContextType } from '../ViewContext';
import { MorePopover } from './MorePopover';
import { RenderHook } from './render-hook';
var MoreLinkRoot = /** @class */ (function (_super) {
    __extends(MoreLinkRoot, _super);
    function MoreLinkRoot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.linkElRef = createRef();
        _this.state = {
            isPopoverOpen: false,
        };
        _this.handleClick = function (ev) {
            var _a = _this, props = _a.props, context = _a.context;
            var moreLinkClick = context.options.moreLinkClick;
            var date = computeRange(props).start;
            function buildPublicSeg(seg) {
                var _a = seg.eventRange, def = _a.def, instance = _a.instance, range = _a.range;
                return {
                    event: new EventApi(context, def, instance),
                    start: context.dateEnv.toDate(range.start),
                    end: context.dateEnv.toDate(range.end),
                    isStart: seg.isStart,
                    isEnd: seg.isEnd,
                };
            }
            if (typeof moreLinkClick === 'function') {
                moreLinkClick = moreLinkClick({
                    date: date,
                    allDay: Boolean(props.allDayDate),
                    allSegs: props.allSegs.map(buildPublicSeg),
                    hiddenSegs: props.hiddenSegs.map(buildPublicSeg),
                    jsEvent: ev,
                    view: context.viewApi,
                });
            }
            if (!moreLinkClick || moreLinkClick === 'popover') {
                _this.setState({ isPopoverOpen: true });
            }
            else if (typeof moreLinkClick === 'string') { // a view name
                context.calendarApi.zoomTo(date, moreLinkClick);
            }
        };
        _this.handlePopoverClose = function () {
            _this.setState({ isPopoverOpen: false });
        };
        return _this;
    }
    MoreLinkRoot.prototype.render = function () {
        var _this = this;
        var props = this.props;
        return (createElement(ViewContextType.Consumer, null, function (context) {
            var viewApi = context.viewApi, options = context.options, calendarApi = context.calendarApi;
            var moreLinkText = options.moreLinkText;
            var moreCnt = props.moreCnt;
            var range = computeRange(props);
            var hookProps = {
                num: moreCnt,
                shortText: "+" + moreCnt,
                text: typeof moreLinkText === 'function'
                    ? moreLinkText.call(calendarApi, moreCnt)
                    : "+" + moreCnt + " " + moreLinkText,
                view: viewApi,
            };
            return (createElement(Fragment, null,
                Boolean(props.moreCnt) && (createElement(RenderHook, { elRef: _this.linkElRef, hookProps: hookProps, classNames: options.moreLinkClassNames, content: options.moreLinkContent, defaultContent: props.defaultContent || renderMoreLinkInner, didMount: options.moreLinkDidMount, willUnmount: options.moreLinkWillUnmount }, function (rootElRef, customClassNames, innerElRef, innerContent) { return props.children(rootElRef, ['fc-more-link'].concat(customClassNames), innerElRef, innerContent, _this.handleClick); })),
                _this.state.isPopoverOpen && (createElement(MorePopover, { startDate: range.start, endDate: range.end, dateProfile: props.dateProfile, todayRange: props.todayRange, extraDateSpan: props.extraDateSpan, parentEl: _this.parentEl, alignmentEl: props.alignmentElRef.current, alignGridTop: props.alignGridTop, onClose: _this.handlePopoverClose }, props.popoverContent()))));
        }));
    };
    MoreLinkRoot.prototype.componentDidMount = function () {
        this.updateParentEl();
    };
    MoreLinkRoot.prototype.componentDidUpdate = function () {
        this.updateParentEl();
    };
    MoreLinkRoot.prototype.updateParentEl = function () {
        if (this.linkElRef.current) {
            this.parentEl = elementClosest(this.linkElRef.current, '.fc-view-harness');
        }
    };
    return MoreLinkRoot;
}(BaseComponent));
export { MoreLinkRoot };
function renderMoreLinkInner(props) {
    return props.text;
}
function computeRange(props) {
    if (props.allDayDate) {
        return {
            start: props.allDayDate,
            end: addDays(props.allDayDate, 1),
        };
    }
    var hiddenSegs = props.hiddenSegs;
    return {
        start: computeEarliestSegStart(hiddenSegs),
        end: computeLatestSegEnd(hiddenSegs),
    };
}
export function computeEarliestSegStart(segs) {
    return segs.reduce(pickEarliestStart).eventRange.range.start;
}
function pickEarliestStart(seg0, seg1) {
    return seg0.eventRange.range.start < seg1.eventRange.range.start ? seg0 : seg1;
}
function computeLatestSegEnd(segs) {
    return segs.reduce(pickLatestEnd).eventRange.range.end;
}
function pickLatestEnd(seg0, seg1) {
    return seg0.eventRange.range.end > seg1.eventRange.range.end ? seg0 : seg1;
}
//# sourceMappingURL=MoreLinkRoot.js.map