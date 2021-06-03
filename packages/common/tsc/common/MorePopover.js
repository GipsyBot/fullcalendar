import { __assign, __extends } from "tslib";
import { DateComponent } from '../component/DateComponent';
import { createElement } from '../vdom';
import { DayCellContent } from './DayCellContent';
import { DayCellRoot } from './DayCellRoot';
import { Popover } from './Popover';
var MorePopover = /** @class */ (function (_super) {
    __extends(MorePopover, _super);
    function MorePopover() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleRootEl = function (rootEl) {
            _this.rootEl = rootEl;
            if (rootEl) {
                _this.context.registerInteractiveComponent(_this, {
                    el: rootEl,
                    useEventCenter: false,
                });
            }
            else {
                _this.context.unregisterInteractiveComponent(_this);
            }
        };
        return _this;
    }
    MorePopover.prototype.render = function () {
        var _a = this.context, options = _a.options, dateEnv = _a.dateEnv;
        var props = this.props;
        var startDate = props.startDate, todayRange = props.todayRange, dateProfile = props.dateProfile;
        var title = dateEnv.format(startDate, options.dayPopoverFormat);
        return (createElement(DayCellRoot, { date: startDate, dateProfile: dateProfile, todayRange: todayRange, elRef: this.handleRootEl }, function (rootElRef, dayClassNames, dataAttrs) { return (createElement(Popover, { elRef: rootElRef, title: title, extraClassNames: ['fc-more-popover'].concat(dayClassNames), extraAttrs: dataAttrs /* TODO: make these time-based when not whole-day? */, parentEl: props.parentEl, alignmentEl: props.alignmentEl, alignGridTop: props.alignGridTop, onClose: props.onClose },
            createElement(DayCellContent, { date: startDate, dateProfile: dateProfile, todayRange: todayRange }, function (innerElRef, innerContent) { return (innerContent &&
                createElement("div", { className: "fc-more-popover-misc", ref: innerElRef }, innerContent)); }),
            props.children)); }));
    };
    MorePopover.prototype.queryHit = function (positionLeft, positionTop, elWidth, elHeight) {
        var _a = this, rootEl = _a.rootEl, props = _a.props;
        if (positionLeft >= 0 && positionLeft < elWidth &&
            positionTop >= 0 && positionTop < elHeight) {
            return {
                dateProfile: props.dateProfile,
                dateSpan: __assign({ allDay: true, range: {
                        start: props.startDate,
                        end: props.endDate,
                    } }, props.extraDateSpan),
                dayEl: rootEl,
                rect: {
                    left: 0,
                    top: 0,
                    right: elWidth,
                    bottom: elHeight,
                },
                layer: 1,
            };
        }
        return null;
    };
    return MorePopover;
}(DateComponent));
export { MorePopover };
//# sourceMappingURL=MorePopover.js.map