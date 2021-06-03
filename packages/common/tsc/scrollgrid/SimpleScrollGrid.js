import { __assign, __extends, __spreadArrays } from "tslib";
import { createElement, Fragment } from '../vdom';
import { BaseComponent, setRef } from '../vdom-util';
import { Scroller } from './Scroller';
import { RefMap } from '../util/RefMap';
import { renderMicroColGroup, computeShrinkWidth, getScrollGridClassNames, getSectionClassNames, getAllowYScrolling, renderChunkContent, getSectionHasLiquidHeight, hasShrinkWidth, isColPropsEqual, } from './util';
import { getCanVGrowWithinCell } from '../util/table-styling';
import { memoize } from '../util/memoize';
import { isPropsEqual } from '../util/object';
import { getScrollbarWidths } from '../util/scrollbar-width';
var SimpleScrollGrid = /** @class */ (function (_super) {
    __extends(SimpleScrollGrid, _super);
    function SimpleScrollGrid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.processCols = memoize(function (a) { return a; }, isColPropsEqual); // so we get same `cols` props every time
        // yucky to memoize VNodes, but much more efficient for consumers
        _this.renderMicroColGroup = memoize(renderMicroColGroup);
        _this.scrollerRefs = new RefMap();
        _this.scrollerElRefs = new RefMap(_this._handleScrollerEl.bind(_this));
        _this.state = {
            shrinkWidth: null,
            forceYScrollbars: false,
            scrollerClientWidths: {},
            scrollerClientHeights: {},
        };
        // TODO: can do a really simple print-view. dont need to join rows
        _this.handleSizing = function () {
            _this.setState(__assign({ shrinkWidth: _this.computeShrinkWidth() }, _this.computeScrollerDims()));
        };
        return _this;
    }
    SimpleScrollGrid.prototype.render = function () {
        var _a = this, props = _a.props, state = _a.state, context = _a.context;
        var sectionConfigs = props.sections || [];
        var cols = this.processCols(props.cols);
        var microColGroupNode = this.renderMicroColGroup(cols, state.shrinkWidth);
        var classNames = getScrollGridClassNames(props.liquid, context);
        if (props.collapsibleWidth) {
            classNames.push('fc-scrollgrid-collapsible');
        }
        // TODO: make DRY
        var configCnt = sectionConfigs.length;
        var configI = 0;
        var currentConfig;
        var headSectionNodes = [];
        var bodySectionNodes = [];
        var footSectionNodes = [];
        while (configI < configCnt && (currentConfig = sectionConfigs[configI]).type === 'header') {
            headSectionNodes.push(this.renderSection(currentConfig, microColGroupNode));
            configI += 1;
        }
        while (configI < configCnt && (currentConfig = sectionConfigs[configI]).type === 'body') {
            bodySectionNodes.push(this.renderSection(currentConfig, microColGroupNode));
            configI += 1;
        }
        while (configI < configCnt && (currentConfig = sectionConfigs[configI]).type === 'footer') {
            footSectionNodes.push(this.renderSection(currentConfig, microColGroupNode));
            configI += 1;
        }
        // firefox bug: when setting height on table and there is a thead or tfoot,
        // the necessary height:100% on the liquid-height body section forces the *whole* table to be taller. (bug #5524)
        // use getCanVGrowWithinCell as a way to detect table-stupid firefox.
        // if so, use a simpler dom structure, jam everything into a lone tbody.
        var isBuggy = !getCanVGrowWithinCell();
        return createElement('table', {
            className: classNames.join(' '),
            style: { height: props.height },
        }, Boolean(!isBuggy && headSectionNodes.length) && createElement.apply(void 0, __spreadArrays(['thead', {}], headSectionNodes)), Boolean(!isBuggy && bodySectionNodes.length) && createElement.apply(void 0, __spreadArrays(['tbody', {}], bodySectionNodes)), Boolean(!isBuggy && footSectionNodes.length) && createElement.apply(void 0, __spreadArrays(['tfoot', {}], footSectionNodes)), isBuggy && createElement.apply(void 0, __spreadArrays(['tbody', {}], headSectionNodes, bodySectionNodes, footSectionNodes)));
    };
    SimpleScrollGrid.prototype.renderSection = function (sectionConfig, microColGroupNode) {
        if ('outerContent' in sectionConfig) {
            return (createElement(Fragment, { key: sectionConfig.key }, sectionConfig.outerContent));
        }
        return (createElement("tr", { key: sectionConfig.key, className: getSectionClassNames(sectionConfig, this.props.liquid).join(' ') }, this.renderChunkTd(sectionConfig, microColGroupNode, sectionConfig.chunk)));
    };
    SimpleScrollGrid.prototype.renderChunkTd = function (sectionConfig, microColGroupNode, chunkConfig) {
        if ('outerContent' in chunkConfig) {
            return chunkConfig.outerContent;
        }
        var props = this.props;
        var _a = this.state, forceYScrollbars = _a.forceYScrollbars, scrollerClientWidths = _a.scrollerClientWidths, scrollerClientHeights = _a.scrollerClientHeights;
        var needsYScrolling = getAllowYScrolling(props, sectionConfig); // TODO: do lazily. do in section config?
        var isLiquid = getSectionHasLiquidHeight(props, sectionConfig);
        // for `!props.liquid` - is WHOLE scrollgrid natural height?
        // TODO: do same thing in advanced scrollgrid? prolly not b/c always has horizontal scrollbars
        var overflowY = !props.liquid ? 'visible' :
            forceYScrollbars ? 'scroll' :
                !needsYScrolling ? 'hidden' :
                    'auto';
        var sectionKey = sectionConfig.key;
        var content = renderChunkContent(sectionConfig, chunkConfig, {
            tableColGroupNode: microColGroupNode,
            tableMinWidth: '',
            clientWidth: (!props.collapsibleWidth && scrollerClientWidths[sectionKey] !== undefined) ? scrollerClientWidths[sectionKey] : null,
            clientHeight: scrollerClientHeights[sectionKey] !== undefined ? scrollerClientHeights[sectionKey] : null,
            expandRows: sectionConfig.expandRows,
            syncRowHeights: false,
            rowSyncHeights: [],
            reportRowHeightChange: function () { },
        });
        return (createElement("td", { ref: chunkConfig.elRef },
            createElement("div", { className: "fc-scroller-harness" + (isLiquid ? ' fc-scroller-harness-liquid' : '') },
                createElement(Scroller, { ref: this.scrollerRefs.createRef(sectionKey), elRef: this.scrollerElRefs.createRef(sectionKey), overflowY: overflowY, overflowX: !props.liquid ? 'visible' : 'hidden' /* natural height? */, maxHeight: sectionConfig.maxHeight, liquid: isLiquid, liquidIsAbsolute // because its within a harness
                    : true }, content))));
    };
    SimpleScrollGrid.prototype._handleScrollerEl = function (scrollerEl, key) {
        var section = getSectionByKey(this.props.sections, key);
        if (section) {
            setRef(section.chunk.scrollerElRef, scrollerEl);
        }
    };
    SimpleScrollGrid.prototype.componentDidMount = function () {
        this.handleSizing();
        this.context.addResizeHandler(this.handleSizing);
    };
    SimpleScrollGrid.prototype.componentDidUpdate = function () {
        // TODO: need better solution when state contains non-sizing things
        this.handleSizing();
    };
    SimpleScrollGrid.prototype.componentWillUnmount = function () {
        this.context.removeResizeHandler(this.handleSizing);
    };
    SimpleScrollGrid.prototype.computeShrinkWidth = function () {
        return hasShrinkWidth(this.props.cols)
            ? computeShrinkWidth(this.scrollerElRefs.getAll())
            : 0;
    };
    SimpleScrollGrid.prototype.computeScrollerDims = function () {
        var scrollbarWidth = getScrollbarWidths();
        var _a = this, scrollerRefs = _a.scrollerRefs, scrollerElRefs = _a.scrollerElRefs;
        var forceYScrollbars = false;
        var scrollerClientWidths = {};
        var scrollerClientHeights = {};
        for (var sectionKey in scrollerRefs.currentMap) {
            var scroller = scrollerRefs.currentMap[sectionKey];
            if (scroller && scroller.needsYScrolling()) {
                forceYScrollbars = true;
                break;
            }
        }
        for (var _i = 0, _b = this.props.sections; _i < _b.length; _i++) {
            var section = _b[_i];
            var sectionKey = section.key;
            var scrollerEl = scrollerElRefs.currentMap[sectionKey];
            if (scrollerEl) {
                var harnessEl = scrollerEl.parentNode; // TODO: weird way to get this. need harness b/c doesn't include table borders
                scrollerClientWidths[sectionKey] = Math.floor(harnessEl.getBoundingClientRect().width - (forceYScrollbars
                    ? scrollbarWidth.y // use global because scroller might not have scrollbars yet but will need them in future
                    : 0));
                scrollerClientHeights[sectionKey] = Math.floor(harnessEl.getBoundingClientRect().height);
            }
        }
        return { forceYScrollbars: forceYScrollbars, scrollerClientWidths: scrollerClientWidths, scrollerClientHeights: scrollerClientHeights };
    };
    return SimpleScrollGrid;
}(BaseComponent));
export { SimpleScrollGrid };
SimpleScrollGrid.addStateEquality({
    scrollerClientWidths: isPropsEqual,
    scrollerClientHeights: isPropsEqual,
});
function getSectionByKey(sections, key) {
    for (var _i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
        var section = sections_1[_i];
        if (section.key === key) {
            return section;
        }
    }
    return null;
}
//# sourceMappingURL=SimpleScrollGrid.js.map