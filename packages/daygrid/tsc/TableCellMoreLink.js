import { __assign, __extends } from "tslib";
import { createElement, MoreLinkRoot, BaseComponent, memoize, getSegMeta, Fragment, } from '@fullcalendar/common';
import { hasListItemDisplay } from './event-rendering';
import { TableBlockEvent } from './TableBlockEvent';
import { TableListItemEvent } from './TableListItemEvent';
var TableCellMoreLink = /** @class */ (function (_super) {
    __extends(TableCellMoreLink, _super);
    function TableCellMoreLink() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.compileSegs = memoize(compileSegs);
        return _this;
    }
    TableCellMoreLink.prototype.render = function () {
        var props = this.props;
        var _a = this.compileSegs(props.singlePlacements), allSegs = _a.allSegs, invisibleSegs = _a.invisibleSegs;
        return (createElement(MoreLinkRoot, { dateProfile: props.dateProfile, todayRange: props.todayRange, allDayDate: props.allDayDate, moreCnt: props.moreCnt, allSegs: allSegs, hiddenSegs: invisibleSegs, alignmentElRef: props.alignmentElRef, alignGridTop: props.alignGridTop, extraDateSpan: props.extraDateSpan, popoverContent: function () {
                var isForcedInvisible = (props.eventDrag ? props.eventDrag.affectedInstances : null) ||
                    (props.eventResize ? props.eventResize.affectedInstances : null) ||
                    {};
                return (createElement(Fragment, null, allSegs.map(function (seg) {
                    var instanceId = seg.eventRange.instance.instanceId;
                    return (createElement("div", { className: "fc-daygrid-event-harness", key: instanceId, style: {
                            visibility: isForcedInvisible[instanceId] ? 'hidden' : '',
                        } }, hasListItemDisplay(seg) ? (createElement(TableListItemEvent, __assign({ seg: seg, isDragging: false, isSelected: instanceId === props.eventSelection, defaultDisplayEventEnd: false }, getSegMeta(seg, props.todayRange)))) : (createElement(TableBlockEvent, __assign({ seg: seg, isDragging: false, isResizing: false, isDateSelecting: false, isSelected: instanceId === props.eventSelection, defaultDisplayEventEnd: false }, getSegMeta(seg, props.todayRange))))));
                })));
            } }, function (rootElRef, classNames, innerElRef, innerContent, handleClick) { return (createElement("a", { ref: rootElRef, className: ['fc-daygrid-more-link'].concat(classNames).join(' '), onClick: handleClick }, innerContent)); }));
    };
    return TableCellMoreLink;
}(BaseComponent));
export { TableCellMoreLink };
function compileSegs(singlePlacements) {
    var allSegs = [];
    var invisibleSegs = [];
    for (var _i = 0, singlePlacements_1 = singlePlacements; _i < singlePlacements_1.length; _i++) {
        var placement = singlePlacements_1[_i];
        allSegs.push(placement.seg);
        if (!placement.isVisible) {
            invisibleSegs.push(placement.seg);
        }
    }
    return { allSegs: allSegs, invisibleSegs: invisibleSegs };
}
//# sourceMappingURL=TableCellMoreLink.js.map