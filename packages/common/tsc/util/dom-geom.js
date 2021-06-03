import { intersectRects } from './geom';
import { getIsRtlScrollbarOnLeft } from './scrollbar-side';
import { computeScrollbarWidthsForEl } from './scrollbar-width';
export function computeEdges(el, getPadding) {
    if (getPadding === void 0) { getPadding = false; }
    var computedStyle = window.getComputedStyle(el);
    var borderLeft = parseInt(computedStyle.borderLeftWidth, 10) || 0;
    var borderRight = parseInt(computedStyle.borderRightWidth, 10) || 0;
    var borderTop = parseInt(computedStyle.borderTopWidth, 10) || 0;
    var borderBottom = parseInt(computedStyle.borderBottomWidth, 10) || 0;
    var badScrollbarWidths = computeScrollbarWidthsForEl(el); // includes border!
    var scrollbarLeftRight = badScrollbarWidths.y - borderLeft - borderRight;
    var scrollbarBottom = badScrollbarWidths.x - borderTop - borderBottom;
    var res = {
        borderLeft: borderLeft,
        borderRight: borderRight,
        borderTop: borderTop,
        borderBottom: borderBottom,
        scrollbarBottom: scrollbarBottom,
        scrollbarLeft: 0,
        scrollbarRight: 0,
    };
    if (getIsRtlScrollbarOnLeft() && computedStyle.direction === 'rtl') { // is the scrollbar on the left side?
        res.scrollbarLeft = scrollbarLeftRight;
    }
    else {
        res.scrollbarRight = scrollbarLeftRight;
    }
    if (getPadding) {
        res.paddingLeft = parseInt(computedStyle.paddingLeft, 10) || 0;
        res.paddingRight = parseInt(computedStyle.paddingRight, 10) || 0;
        res.paddingTop = parseInt(computedStyle.paddingTop, 10) || 0;
        res.paddingBottom = parseInt(computedStyle.paddingBottom, 10) || 0;
    }
    return res;
}
export function computeInnerRect(el, goWithinPadding, doFromWindowViewport) {
    if (goWithinPadding === void 0) { goWithinPadding = false; }
    var outerRect = doFromWindowViewport ? el.getBoundingClientRect() : computeRect(el);
    var edges = computeEdges(el, goWithinPadding);
    var res = {
        left: outerRect.left + edges.borderLeft + edges.scrollbarLeft,
        right: outerRect.right - edges.borderRight - edges.scrollbarRight,
        top: outerRect.top + edges.borderTop,
        bottom: outerRect.bottom - edges.borderBottom - edges.scrollbarBottom,
    };
    if (goWithinPadding) {
        res.left += edges.paddingLeft;
        res.right -= edges.paddingRight;
        res.top += edges.paddingTop;
        res.bottom -= edges.paddingBottom;
    }
    return res;
}
export function computeRect(el) {
    var rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        right: rect.right + window.pageXOffset,
        bottom: rect.bottom + window.pageYOffset,
    };
}
export function computeClippedClientRect(el) {
    var clippingParents = getClippingParents(el);
    var rect = el.getBoundingClientRect();
    for (var _i = 0, clippingParents_1 = clippingParents; _i < clippingParents_1.length; _i++) {
        var clippingParent = clippingParents_1[_i];
        var intersection = intersectRects(rect, clippingParent.getBoundingClientRect());
        if (intersection) {
            rect = intersection;
        }
        else {
            return null;
        }
    }
    return rect;
}
export function computeHeightAndMargins(el) {
    return el.getBoundingClientRect().height + computeVMargins(el);
}
export function computeVMargins(el) {
    var computed = window.getComputedStyle(el);
    return parseInt(computed.marginTop, 10) +
        parseInt(computed.marginBottom, 10);
}
// does not return window
export function getClippingParents(el) {
    var parents = [];
    while (el instanceof HTMLElement) { // will stop when gets to document or null
        var computedStyle = window.getComputedStyle(el);
        if (computedStyle.position === 'fixed') {
            break;
        }
        if ((/(auto|scroll)/).test(computedStyle.overflow + computedStyle.overflowY + computedStyle.overflowX)) {
            parents.push(el);
        }
        el = el.parentNode;
    }
    return parents;
}
//# sourceMappingURL=dom-geom.js.map