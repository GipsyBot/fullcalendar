import { __assign, __extends } from "tslib";
import { BaseComponent, createElement, getSegMeta, Fragment, DayCellRoot, NowIndicatorRoot, BgEvent, renderFill, buildIsoString, computeEarliestSegStart, buildEventRangeKey, sortEventSegs, memoize, } from '@fullcalendar/common';
import { TimeColMoreLink } from './TimeColMoreLink';
import { computeFgSegPlacements } from './event-placement';
import { TimeColEvent } from './TimeColEvent';
import { TimeColMisc } from './TimeColMisc';
var TimeCol = /** @class */ (function (_super) {
    __extends(TimeCol, _super);
    function TimeCol() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sortEventSegs = memoize(sortEventSegs);
        _this.computeFgSegPlacements = memoize(computeFgSegPlacements); // only for non-print, non-mirror
        return _this;
    }
    TimeCol.prototype.render = function () {
        var _this = this;
        var _a = this, props = _a.props, context = _a.context;
        var isSelectMirror = context.options.selectMirror;
        var mirrorSegs = (props.eventDrag && props.eventDrag.segs) ||
            (props.eventResize && props.eventResize.segs) ||
            (isSelectMirror && props.dateSelectionSegs) ||
            [];
        var interactionAffectedInstances = // TODO: messy way to compute this
         (props.eventDrag && props.eventDrag.affectedInstances) ||
            (props.eventResize && props.eventResize.affectedInstances) ||
            {};
        var sortedFgSegs = this.sortEventSegs(props.fgEventSegs, context.options.eventOrder);
        return (createElement(DayCellRoot, { elRef: props.elRef, date: props.date, dateProfile: props.dateProfile, todayRange: props.todayRange, extraHookProps: props.extraHookProps }, function (rootElRef, classNames, dataAttrs) { return (createElement("td", __assign({ ref: rootElRef, className: ['fc-timegrid-col'].concat(classNames, props.extraClassNames || []).join(' ') }, dataAttrs, props.extraDataAttrs),
            createElement("div", { className: "fc-timegrid-col-frame" },
                createElement("div", { className: "fc-timegrid-col-bg" },
                    _this.renderFillSegs(props.businessHourSegs, 'non-business'),
                    _this.renderFillSegs(props.bgEventSegs, 'bg-event'),
                    _this.renderFillSegs(props.dateSelectionSegs, 'highlight')),
                createElement("div", { className: "fc-timegrid-col-events" }, _this.renderFgSegs(sortedFgSegs, interactionAffectedInstances)),
                createElement("div", { className: "fc-timegrid-col-events" }, _this.renderFgSegs(mirrorSegs, {}, Boolean(props.eventDrag), Boolean(props.eventResize), Boolean(isSelectMirror))),
                createElement("div", { className: "fc-timegrid-now-indicator-container" }, _this.renderNowIndicator(props.nowIndicatorSegs)),
                createElement(TimeColMisc, { date: props.date, dateProfile: props.dateProfile, todayRange: props.todayRange, extraHookProps: props.extraHookProps })))); }));
    };
    TimeCol.prototype.renderFgSegs = function (sortedFgSegs, segIsInvisible, isDragging, isResizing, isDateSelecting) {
        var props = this.props;
        if (props.forPrint) {
            return renderPlainFgSegs(sortedFgSegs, props);
        }
        if (props.slatCoords) {
            return this.renderPositionedFgSegs(sortedFgSegs, segIsInvisible, isDragging, isResizing, isDateSelecting);
        }
        return null;
    };
    TimeCol.prototype.renderPositionedFgSegs = function (segs, // if not mirror, needs to be sorted
    segIsInvisible, isDragging, isResizing, isDateSelecting) {
        var _this = this;
        var _a = this.context.options, eventMaxStack = _a.eventMaxStack, eventShortHeight = _a.eventShortHeight, eventOrderStrict = _a.eventOrderStrict;
        var _b = this.props, eventSelection = _b.eventSelection, todayRange = _b.todayRange, nowDate = _b.nowDate;
        var isMirror = isDragging || isResizing || isDateSelecting;
        var segInputs = this.buildSegInputs(segs);
        var _c = isMirror ? computeFgSegPlacements(segInputs) : // don't use memoized
            this.computeFgSegPlacements(segInputs, eventOrderStrict, eventMaxStack), segRects = _c.segRects, hiddenGroups = _c.hiddenGroups;
        return (createElement(Fragment, null,
            this.renderHiddenGroups(hiddenGroups, segs),
            segRects.map(function (segRect) {
                var seg = segs[segRect.segInput.index];
                var instanceId = seg.eventRange.instance.instanceId;
                var positionCss = __assign(__assign({}, _this.computeSegTopBottomCss(segRect.segInput)), (isMirror ? { left: 0, right: 0 } : _this.computeSegLeftRightCss(segRect)));
                return (createElement("div", { className: 'fc-timegrid-event-harness' + (segRect.stackForward > 0 ? ' fc-timegrid-event-harness-inset' : ''), key: instanceId, style: __assign({ visibility: segIsInvisible[instanceId] ? 'hidden' : '' }, positionCss) },
                    createElement(TimeColEvent, __assign({ seg: seg, isDragging: isDragging, isResizing: isResizing, isDateSelecting: isDateSelecting, isSelected: instanceId === eventSelection, isShort: (segRect.spanEnd - segRect.spanStart) < eventShortHeight }, getSegMeta(seg, todayRange, nowDate)))));
            })));
    };
    // will already have eventMinHeight applied because segInputs already had it
    TimeCol.prototype.renderHiddenGroups = function (hiddenGroups, segs) {
        var _this = this;
        var _a = this.props, extraDateSpan = _a.extraDateSpan, dateProfile = _a.dateProfile, todayRange = _a.todayRange, nowDate = _a.nowDate, eventSelection = _a.eventSelection, eventDrag = _a.eventDrag, eventResize = _a.eventResize;
        return (createElement(Fragment, null, hiddenGroups.map(function (hiddenGroup) {
            var positionCss = _this.computeSegTopBottomCss(hiddenGroup);
            var hiddenSegs = compileSegsFromEntries(hiddenGroup.entries, segs);
            return (createElement(TimeColMoreLink, { key: buildIsoString(computeEarliestSegStart(hiddenSegs)), hiddenSegs: hiddenSegs, top: positionCss.top, bottom: positionCss.bottom, extraDateSpan: extraDateSpan, dateProfile: dateProfile, todayRange: todayRange, nowDate: nowDate, eventSelection: eventSelection, eventDrag: eventDrag, eventResize: eventResize }));
        })));
    };
    TimeCol.prototype.buildSegInputs = function (segs) {
        var _a = this.props, date = _a.date, slatCoords = _a.slatCoords;
        var eventMinHeight = this.context.options.eventMinHeight;
        var segInputs = [];
        for (var i = 0; i < segs.length; i += 1) {
            var seg = segs[i];
            var spanStart = slatCoords.computeDateTop(seg.start, date);
            var spanEnd = Math.max(spanStart + (eventMinHeight || 0), // yuck
            slatCoords.computeDateTop(seg.end, date));
            segInputs.push({
                index: i,
                spanStart: Math.round(spanStart),
                spanEnd: Math.round(spanEnd),
                thickness: 1,
            });
        }
        return segInputs;
    };
    TimeCol.prototype.renderFillSegs = function (segs, fillType) {
        var _this = this;
        var props = this.props;
        if (!props.slatCoords) {
            return null;
        }
        var segInputs = this.buildSegInputs(segs);
        var children = segInputs.map(function (segInput) {
            var seg = segs[segInput.index];
            return (createElement("div", { key: buildEventRangeKey(seg.eventRange), className: "fc-timegrid-bg-harness", style: _this.computeSegTopBottomCss(segInput) }, fillType === 'bg-event' ?
                createElement(BgEvent, __assign({ seg: seg }, getSegMeta(seg, props.todayRange, props.nowDate))) :
                renderFill(fillType)));
        });
        return createElement(Fragment, null, children);
    };
    TimeCol.prototype.renderNowIndicator = function (segs) {
        var _a = this.props, slatCoords = _a.slatCoords, date = _a.date;
        if (!slatCoords) {
            return null;
        }
        return segs.map(function (seg, i) { return (createElement(NowIndicatorRoot, { isAxis: false, date: date, 
            // key doesn't matter. will only ever be one
            key: i }, function (rootElRef, classNames, innerElRef, innerContent) { return (createElement("div", { ref: rootElRef, className: ['fc-timegrid-now-indicator-line'].concat(classNames).join(' '), style: { top: slatCoords.computeDateTop(seg.start, date) } }, innerContent)); })); });
    };
    TimeCol.prototype.computeSegTopBottomCss = function (segLike) {
        return {
            top: segLike.spanStart,
            bottom: -segLike.spanEnd,
        };
    };
    TimeCol.prototype.computeSegLeftRightCss = function (segRect) {
        var _a = this.context, isRtl = _a.isRtl, options = _a.options;
        var shouldOverlap = options.slotEventOverlap;
        var nearCoord = segRect.levelCoord; // the left side if LTR. the right side if RTL. floating-point
        var farCoord = segRect.levelCoord + segRect.thickness; // the right side if LTR. the left side if RTL. floating-point
        var left; // amount of space from left edge, a fraction of the total width
        var right; // amount of space from right edge, a fraction of the total width
        if (shouldOverlap) {
            // double the width, but don't go beyond the maximum forward coordinate (1.0)
            farCoord = Math.min(1, nearCoord + (farCoord - nearCoord) * 2);
        }
        if (isRtl) {
            left = 1 - farCoord;
            right = nearCoord;
        }
        else {
            left = nearCoord;
            right = 1 - farCoord;
        }
        var props = {
            zIndex: segRect.stackDepth + 1,
            left: left * 100 + '%',
            right: right * 100 + '%',
        };
        if (shouldOverlap && !segRect.stackForward) {
            // add padding to the edge so that forward stacked events don't cover the resizer's icon
            props[isRtl ? 'marginLeft' : 'marginRight'] = 10 * 2; // 10 is a guesstimate of the icon's width
        }
        return props;
    };
    return TimeCol;
}(BaseComponent));
export { TimeCol };
export function renderPlainFgSegs(sortedFgSegs, _a) {
    var todayRange = _a.todayRange, nowDate = _a.nowDate, eventSelection = _a.eventSelection, eventDrag = _a.eventDrag, eventResize = _a.eventResize;
    var hiddenInstances = (eventDrag ? eventDrag.affectedInstances : null) ||
        (eventResize ? eventResize.affectedInstances : null) ||
        {};
    return (createElement(Fragment, null, sortedFgSegs.map(function (seg) {
        var instanceId = seg.eventRange.instance.instanceId;
        return (createElement("div", { key: instanceId, style: { visibility: hiddenInstances[instanceId] ? 'hidden' : '' } },
            createElement(TimeColEvent, __assign({ seg: seg, isDragging: false, isResizing: false, isDateSelecting: false, isSelected: instanceId === eventSelection, isShort: false }, getSegMeta(seg, todayRange, nowDate)))));
    })));
}
function compileSegsFromEntries(segEntries, allSegs) {
    return segEntries.map(function (segEntry) { return allSegs[segEntry.segInput.index]; });
}
//# sourceMappingURL=TimeCol.js.map