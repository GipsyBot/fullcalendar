import { __extends } from "tslib";
import { createElement, BaseComponent, RefMap, createRef, PositionCache, memoize, NowIndicatorRoot, } from '@fullcalendar/common';
import { splitSegsByCol, splitInteractionByCol } from './TimeColsSeg';
import { TimeCol } from './TimeCol';
var TimeColsContent = /** @class */ (function (_super) {
    __extends(TimeColsContent, _super);
    function TimeColsContent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.splitFgEventSegs = memoize(splitSegsByCol);
        _this.splitBgEventSegs = memoize(splitSegsByCol);
        _this.splitBusinessHourSegs = memoize(splitSegsByCol);
        _this.splitNowIndicatorSegs = memoize(splitSegsByCol);
        _this.splitDateSelectionSegs = memoize(splitSegsByCol);
        _this.splitEventDrag = memoize(splitInteractionByCol);
        _this.splitEventResize = memoize(splitInteractionByCol);
        _this.rootElRef = createRef();
        _this.cellElRefs = new RefMap();
        return _this;
    }
    TimeColsContent.prototype.render = function () {
        var _this = this;
        var _a = this, props = _a.props, context = _a.context;
        var nowIndicatorTop = context.options.nowIndicator &&
            props.slatCoords &&
            props.slatCoords.safeComputeTop(props.nowDate); // might return void
        var colCnt = props.cells.length;
        var fgEventSegsByRow = this.splitFgEventSegs(props.fgEventSegs, colCnt);
        var bgEventSegsByRow = this.splitBgEventSegs(props.bgEventSegs, colCnt);
        var businessHourSegsByRow = this.splitBusinessHourSegs(props.businessHourSegs, colCnt);
        var nowIndicatorSegsByRow = this.splitNowIndicatorSegs(props.nowIndicatorSegs, colCnt);
        var dateSelectionSegsByRow = this.splitDateSelectionSegs(props.dateSelectionSegs, colCnt);
        var eventDragByRow = this.splitEventDrag(props.eventDrag, colCnt);
        var eventResizeByRow = this.splitEventResize(props.eventResize, colCnt);
        return (createElement("div", { className: "fc-timegrid-cols", ref: this.rootElRef },
            createElement("table", { style: {
                    minWidth: props.tableMinWidth,
                    width: props.clientWidth,
                } },
                props.tableColGroupNode,
                createElement("tbody", null,
                    createElement("tr", null,
                        props.axis && (createElement("td", { className: "fc-timegrid-col fc-timegrid-axis" },
                            createElement("div", { className: "fc-timegrid-col-frame" },
                                createElement("div", { className: "fc-timegrid-now-indicator-container" }, typeof nowIndicatorTop === 'number' && (createElement(NowIndicatorRoot, { isAxis: true, date: props.nowDate }, function (rootElRef, classNames, innerElRef, innerContent) { return (createElement("div", { ref: rootElRef, className: ['fc-timegrid-now-indicator-arrow'].concat(classNames).join(' '), style: { top: nowIndicatorTop } }, innerContent)); })))))),
                        props.cells.map(function (cell, i) { return (createElement(TimeCol, { key: cell.key, elRef: _this.cellElRefs.createRef(cell.key), dateProfile: props.dateProfile, date: cell.date, nowDate: props.nowDate, todayRange: props.todayRange, extraHookProps: cell.extraHookProps, extraDataAttrs: cell.extraDataAttrs, extraClassNames: cell.extraClassNames, extraDateSpan: cell.extraDateSpan, fgEventSegs: fgEventSegsByRow[i], bgEventSegs: bgEventSegsByRow[i], businessHourSegs: businessHourSegsByRow[i], nowIndicatorSegs: nowIndicatorSegsByRow[i], dateSelectionSegs: dateSelectionSegsByRow[i], eventDrag: eventDragByRow[i], eventResize: eventResizeByRow[i], slatCoords: props.slatCoords, eventSelection: props.eventSelection, forPrint: props.forPrint })); }))))));
    };
    TimeColsContent.prototype.componentDidMount = function () {
        this.updateCoords();
    };
    TimeColsContent.prototype.componentDidUpdate = function () {
        this.updateCoords();
    };
    TimeColsContent.prototype.updateCoords = function () {
        var props = this.props;
        if (props.onColCoords &&
            props.clientWidth !== null // means sizing has stabilized
        ) {
            props.onColCoords(new PositionCache(this.rootElRef.current, collectCellEls(this.cellElRefs.currentMap, props.cells), true, // horizontal
            false));
        }
    };
    return TimeColsContent;
}(BaseComponent));
export { TimeColsContent };
function collectCellEls(elMap, cells) {
    return cells.map(function (cell) { return elMap[cell.key]; });
}
//# sourceMappingURL=TimeColsContent.js.map