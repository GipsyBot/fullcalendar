import { __spreadArrays } from "tslib";
import { createElement } from '../vdom';
import { findElements } from '../util/dom-manip';
import { computeSmallestCellWidth } from '../util/misc';
import { isPropsEqual } from '../util/object';
import { isArraysEqual } from '../util/array';
export function computeShrinkWidth(chunkEls) {
    var shrinkCells = findElements(chunkEls, '.fc-scrollgrid-shrink');
    var largestWidth = 0;
    for (var _i = 0, shrinkCells_1 = shrinkCells; _i < shrinkCells_1.length; _i++) {
        var shrinkCell = shrinkCells_1[_i];
        largestWidth = Math.max(largestWidth, computeSmallestCellWidth(shrinkCell));
    }
    return Math.ceil(largestWidth); // <table> elements work best with integers. round up to ensure contents fits
}
export function getSectionHasLiquidHeight(props, sectionConfig) {
    return props.liquid && sectionConfig.liquid; // does the section do liquid-height? (need to have whole scrollgrid liquid-height as well)
}
export function getAllowYScrolling(props, sectionConfig) {
    return sectionConfig.maxHeight != null || // if its possible for the height to max out, we might need scrollbars
        getSectionHasLiquidHeight(props, sectionConfig); // if the section is liquid height, it might condense enough to require scrollbars
}
// TODO: ONLY use `arg`. force out internal function to use same API
export function renderChunkContent(sectionConfig, chunkConfig, arg) {
    var expandRows = arg.expandRows;
    var content = typeof chunkConfig.content === 'function' ?
        chunkConfig.content(arg) :
        createElement('table', {
            className: [
                chunkConfig.tableClassName,
                sectionConfig.syncRowHeights ? 'fc-scrollgrid-sync-table' : '',
            ].join(' '),
            style: {
                minWidth: arg.tableMinWidth,
                width: arg.clientWidth,
                height: expandRows ? arg.clientHeight : '',
            },
        }, arg.tableColGroupNode, createElement('tbody', {}, typeof chunkConfig.rowContent === 'function' ? chunkConfig.rowContent(arg) : chunkConfig.rowContent));
    return content;
}
export function isColPropsEqual(cols0, cols1) {
    return isArraysEqual(cols0, cols1, isPropsEqual);
}
export function renderMicroColGroup(cols, shrinkWidth) {
    var colNodes = [];
    /*
    for ColProps with spans, it would have been great to make a single <col span="">
    HOWEVER, Chrome was getting messing up distributing the width to <td>/<th> elements with colspans.
    SOLUTION: making individual <col> elements makes Chrome behave.
    */
    for (var _i = 0, cols_1 = cols; _i < cols_1.length; _i++) {
        var colProps = cols_1[_i];
        var span = colProps.span || 1;
        for (var i = 0; i < span; i += 1) {
            colNodes.push(createElement("col", { style: {
                    width: colProps.width === 'shrink' ? sanitizeShrinkWidth(shrinkWidth) : (colProps.width || ''),
                    minWidth: colProps.minWidth || '',
                } }));
        }
    }
    return createElement.apply(void 0, __spreadArrays(['colgroup', {}], colNodes));
}
export function sanitizeShrinkWidth(shrinkWidth) {
    /* why 4? if we do 0, it will kill any border, which are needed for computeSmallestCellWidth
    4 accounts for 2 2-pixel borders. TODO: better solution? */
    return shrinkWidth == null ? 4 : shrinkWidth;
}
export function hasShrinkWidth(cols) {
    for (var _i = 0, cols_2 = cols; _i < cols_2.length; _i++) {
        var col = cols_2[_i];
        if (col.width === 'shrink') {
            return true;
        }
    }
    return false;
}
export function getScrollGridClassNames(liquid, context) {
    var classNames = [
        'fc-scrollgrid',
        context.theme.getClass('table'),
    ];
    if (liquid) {
        classNames.push('fc-scrollgrid-liquid');
    }
    return classNames;
}
export function getSectionClassNames(sectionConfig, wholeTableVGrow) {
    var classNames = [
        'fc-scrollgrid-section',
        "fc-scrollgrid-section-" + sectionConfig.type,
        sectionConfig.className,
    ];
    if (wholeTableVGrow && sectionConfig.liquid && sectionConfig.maxHeight == null) {
        classNames.push('fc-scrollgrid-section-liquid');
    }
    if (sectionConfig.isSticky) {
        classNames.push('fc-scrollgrid-section-sticky');
    }
    return classNames;
}
export function renderScrollShim(arg) {
    return (createElement("div", { className: "fc-scrollgrid-sticky-shim", style: {
            width: arg.clientWidth,
            minWidth: arg.tableMinWidth,
        } }));
}
export function getStickyHeaderDates(options) {
    var stickyHeaderDates = options.stickyHeaderDates;
    if (stickyHeaderDates == null || stickyHeaderDates === 'auto') {
        stickyHeaderDates = options.height === 'auto' || options.viewHeight === 'auto';
    }
    return stickyHeaderDates;
}
export function getStickyFooterScrollbar(options) {
    var stickyFooterScrollbar = options.stickyFooterScrollbar;
    if (stickyFooterScrollbar == null || stickyFooterScrollbar === 'auto') {
        stickyFooterScrollbar = options.height === 'auto' || options.viewHeight === 'auto';
    }
    return stickyFooterScrollbar;
}
//# sourceMappingURL=util.js.map