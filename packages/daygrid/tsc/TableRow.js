import { __assign, __extends, __spreadArrays } from "tslib";
import { DateComponent, createElement, PositionCache, RefMap, getSegMeta, Fragment, BgEvent, renderFill, isPropsEqual, createRef, buildEventRangeKey, sortEventSegs, } from '@fullcalendar/common';
import { splitSegsByFirstCol } from './TableSeg';
import { TableCell } from './TableCell';
import { TableListItemEvent } from './TableListItemEvent';
import { TableBlockEvent } from './TableBlockEvent';
import { computeFgSegPlacement } from './event-placement';
import { hasListItemDisplay } from './event-rendering';
var TableRow = /** @class */ (function (_super) {
    __extends(TableRow, _super);
    function TableRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cellElRefs = new RefMap(); // the <td>
        _this.frameElRefs = new RefMap(); // the fc-daygrid-day-frame
        _this.fgElRefs = new RefMap(); // the fc-daygrid-day-events
        _this.segHarnessRefs = new RefMap(); // indexed by "instanceId:firstCol"
        _this.rootElRef = createRef();
        _this.state = {
            framePositions: null,
            maxContentHeight: null,
            eventInstanceHeights: {},
        };
        return _this;
    }
    TableRow.prototype.render = function () {
        var _this = this;
        var _a = this, props = _a.props, state = _a.state, context = _a.context;
        var options = context.options;
        var colCnt = props.cells.length;
        var businessHoursByCol = splitSegsByFirstCol(props.businessHourSegs, colCnt);
        var bgEventSegsByCol = splitSegsByFirstCol(props.bgEventSegs, colCnt);
        var highlightSegsByCol = splitSegsByFirstCol(this.getHighlightSegs(), colCnt);
        var mirrorSegsByCol = splitSegsByFirstCol(this.getMirrorSegs(), colCnt);
        var _b = computeFgSegPlacement(sortEventSegs(props.fgEventSegs, options.eventOrder), props.dayMaxEvents, props.dayMaxEventRows, options.eventOrderStrict, state.eventInstanceHeights, state.maxContentHeight, props.cells), singleColPlacements = _b.singleColPlacements, multiColPlacements = _b.multiColPlacements, moreCnts = _b.moreCnts, moreMarginTops = _b.moreMarginTops;
        var isForcedInvisible = // TODO: messy way to compute this
         (props.eventDrag && props.eventDrag.affectedInstances) ||
            (props.eventResize && props.eventResize.affectedInstances) ||
            {};
        return (createElement("tr", { ref: this.rootElRef },
            props.renderIntro && props.renderIntro(),
            props.cells.map(function (cell, col) {
                var normalFgNodes = _this.renderFgSegs(col, props.forPrint ? singleColPlacements[col] : multiColPlacements[col], props.todayRange, isForcedInvisible);
                var mirrorFgNodes = _this.renderFgSegs(col, buildMirrorPlacements(mirrorSegsByCol[col], multiColPlacements), props.todayRange, {}, Boolean(props.eventDrag), Boolean(props.eventResize), false);
                return (createElement(TableCell, { key: cell.key, elRef: _this.cellElRefs.createRef(cell.key), innerElRef: _this.frameElRefs.createRef(cell.key) /* FF <td> problem, but okay to use for left/right. TODO: rename prop */, dateProfile: props.dateProfile, date: cell.date, showDayNumber: props.showDayNumbers, showWeekNumber: props.showWeekNumbers && col === 0, forceDayTop: props.showWeekNumbers /* even displaying weeknum for row, not necessarily day */, todayRange: props.todayRange, eventSelection: props.eventSelection, eventDrag: props.eventDrag, eventResize: props.eventResize, extraHookProps: cell.extraHookProps, extraDataAttrs: cell.extraDataAttrs, extraClassNames: cell.extraClassNames, extraDateSpan: cell.extraDateSpan, moreCnt: moreCnts[col], moreMarginTop: moreMarginTops[col], singlePlacements: singleColPlacements[col], fgContentElRef: _this.fgElRefs.createRef(cell.key), fgContent: ( // Fragment scopes the keys
                    createElement(Fragment, null,
                        createElement(Fragment, null, normalFgNodes),
                        createElement(Fragment, null, mirrorFgNodes))), bgContent: ( // Fragment scopes the keys
                    createElement(Fragment, null,
                        _this.renderFillSegs(highlightSegsByCol[col], 'highlight'),
                        _this.renderFillSegs(businessHoursByCol[col], 'non-business'),
                        _this.renderFillSegs(bgEventSegsByCol[col], 'bg-event'))) }));
            })));
    };
    TableRow.prototype.componentDidMount = function () {
        this.updateSizing(true);
    };
    TableRow.prototype.componentDidUpdate = function (prevProps, prevState) {
        var currentProps = this.props;
        this.updateSizing(!isPropsEqual(prevProps, currentProps));
    };
    TableRow.prototype.getHighlightSegs = function () {
        var props = this.props;
        if (props.eventDrag && props.eventDrag.segs.length) { // messy check
            return props.eventDrag.segs;
        }
        if (props.eventResize && props.eventResize.segs.length) { // messy check
            return props.eventResize.segs;
        }
        return props.dateSelectionSegs;
    };
    TableRow.prototype.getMirrorSegs = function () {
        var props = this.props;
        if (props.eventResize && props.eventResize.segs.length) { // messy check
            return props.eventResize.segs;
        }
        return [];
    };
    TableRow.prototype.renderFgSegs = function (col, segPlacements, todayRange, isForcedInvisible, isDragging, isResizing, isDateSelecting) {
        var context = this.context;
        var eventSelection = this.props.eventSelection;
        var framePositions = this.state.framePositions;
        var defaultDisplayEventEnd = this.props.cells.length === 1; // colCnt === 1
        var isMirror = isDragging || isResizing || isDateSelecting;
        var nodes = [];
        if (framePositions) {
            for (var _i = 0, segPlacements_1 = segPlacements; _i < segPlacements_1.length; _i++) {
                var placement = segPlacements_1[_i];
                var seg = placement.seg;
                var instanceId = seg.eventRange.instance.instanceId;
                var key = instanceId + ':' + col;
                var isVisible = placement.isVisible && !isForcedInvisible[instanceId];
                var isAbsolute = placement.isAbsolute;
                var left = '';
                var right = '';
                if (isAbsolute) {
                    if (context.isRtl) {
                        right = 0;
                        left = framePositions.lefts[seg.lastCol] - framePositions.lefts[seg.firstCol];
                    }
                    else {
                        left = 0;
                        right = framePositions.rights[seg.firstCol] - framePositions.rights[seg.lastCol];
                    }
                }
                /*
                known bug: events that are force to be list-item but span multiple days still take up space in later columns
                todo: in print view, for multi-day events, don't display title within non-start/end segs
                */
                nodes.push(createElement("div", { className: 'fc-daygrid-event-harness' + (isAbsolute ? ' fc-daygrid-event-harness-abs' : ''), key: key, ref: isMirror ? null : this.segHarnessRefs.createRef(key), style: {
                        visibility: isVisible ? '' : 'hidden',
                        marginTop: isAbsolute ? '' : placement.marginTop,
                        top: isAbsolute ? placement.absoluteTop : '',
                        left: left,
                        right: right,
                    } }, hasListItemDisplay(seg) ? (createElement(TableListItemEvent, __assign({ seg: seg, isDragging: isDragging, isSelected: instanceId === eventSelection, defaultDisplayEventEnd: defaultDisplayEventEnd }, getSegMeta(seg, todayRange)))) : (createElement(TableBlockEvent, __assign({ seg: seg, isDragging: isDragging, isResizing: isResizing, isDateSelecting: isDateSelecting, isSelected: instanceId === eventSelection, defaultDisplayEventEnd: defaultDisplayEventEnd }, getSegMeta(seg, todayRange))))));
            }
        }
        return nodes;
    };
    TableRow.prototype.renderFillSegs = function (segs, fillType) {
        var isRtl = this.context.isRtl;
        var todayRange = this.props.todayRange;
        var framePositions = this.state.framePositions;
        var nodes = [];
        if (framePositions) {
            for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
                var seg = segs_1[_i];
                var leftRightCss = isRtl ? {
                    right: 0,
                    left: framePositions.lefts[seg.lastCol] - framePositions.lefts[seg.firstCol],
                } : {
                    left: 0,
                    right: framePositions.rights[seg.firstCol] - framePositions.rights[seg.lastCol],
                };
                nodes.push(createElement("div", { key: buildEventRangeKey(seg.eventRange), className: "fc-daygrid-bg-harness", style: leftRightCss }, fillType === 'bg-event' ?
                    createElement(BgEvent, __assign({ seg: seg }, getSegMeta(seg, todayRange))) :
                    renderFill(fillType)));
            }
        }
        return createElement.apply(void 0, __spreadArrays([Fragment, {}], nodes));
    };
    TableRow.prototype.updateSizing = function (isExternalSizingChange) {
        var _a = this, props = _a.props, frameElRefs = _a.frameElRefs;
        if (!props.forPrint &&
            props.clientWidth !== null // positioning ready?
        ) {
            if (isExternalSizingChange) {
                var frameEls = props.cells.map(function (cell) { return frameElRefs.currentMap[cell.key]; });
                if (frameEls.length) {
                    var originEl = this.rootElRef.current;
                    this.setState({
                        framePositions: new PositionCache(originEl, frameEls, true, // isHorizontal
                        false),
                    });
                }
            }
            var limitByContentHeight = props.dayMaxEvents === true || props.dayMaxEventRows === true;
            this.setState({
                eventInstanceHeights: this.queryEventInstanceHeights(),
                maxContentHeight: limitByContentHeight ? this.computeMaxContentHeight() : null,
            });
        }
    };
    TableRow.prototype.queryEventInstanceHeights = function () {
        var segElMap = this.segHarnessRefs.currentMap;
        var eventInstanceHeights = {};
        // get the max height amongst instance segs
        for (var key in segElMap) {
            var height = Math.round(segElMap[key].getBoundingClientRect().height);
            var instanceId = key.split(':')[0]; // deconstruct how renderFgSegs makes the key
            eventInstanceHeights[instanceId] = Math.max(eventInstanceHeights[instanceId] || 0, height);
        }
        return eventInstanceHeights;
    };
    TableRow.prototype.computeMaxContentHeight = function () {
        var firstKey = this.props.cells[0].key;
        var cellEl = this.cellElRefs.currentMap[firstKey];
        var fcContainerEl = this.fgElRefs.currentMap[firstKey];
        return cellEl.getBoundingClientRect().bottom - fcContainerEl.getBoundingClientRect().top;
    };
    TableRow.prototype.getCellEls = function () {
        var elMap = this.cellElRefs.currentMap;
        return this.props.cells.map(function (cell) { return elMap[cell.key]; });
    };
    return TableRow;
}(DateComponent));
export { TableRow };
TableRow.addStateEquality({
    eventInstanceHeights: isPropsEqual,
});
function buildMirrorPlacements(mirrorSegs, colPlacements) {
    if (!mirrorSegs.length) {
        return [];
    }
    var topsByInstanceId = buildAbsoluteTopHash(colPlacements); // TODO: cache this at first render?
    return mirrorSegs.map(function (seg) { return ({
        seg: seg,
        isVisible: true,
        isAbsolute: true,
        absoluteTop: topsByInstanceId[seg.eventRange.instance.instanceId],
        marginTop: 0,
    }); });
}
function buildAbsoluteTopHash(colPlacements) {
    var topsByInstanceId = {};
    for (var _i = 0, colPlacements_1 = colPlacements; _i < colPlacements_1.length; _i++) {
        var placements = colPlacements_1[_i];
        for (var _a = 0, placements_1 = placements; _a < placements_1.length; _a++) {
            var placement = placements_1[_a];
            topsByInstanceId[placement.seg.eventRange.instance.instanceId] = placement.absoluteTop;
        }
    }
    return colPlacements;
}
//# sourceMappingURL=TableRow.js.map