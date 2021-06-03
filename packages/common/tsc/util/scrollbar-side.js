import { removeElement, applyStyle } from './dom-manip';
var _isRtlScrollbarOnLeft = null;
export function getIsRtlScrollbarOnLeft() {
    if (_isRtlScrollbarOnLeft === null) {
        _isRtlScrollbarOnLeft = computeIsRtlScrollbarOnLeft();
    }
    return _isRtlScrollbarOnLeft;
}
function computeIsRtlScrollbarOnLeft() {
    var outerEl = document.createElement('div');
    applyStyle(outerEl, {
        position: 'absolute',
        top: -1000,
        left: 0,
        border: 0,
        padding: 0,
        overflow: 'scroll',
        direction: 'rtl',
    });
    outerEl.innerHTML = '<div></div>';
    document.body.appendChild(outerEl);
    var innerEl = outerEl.firstChild;
    var res = innerEl.getBoundingClientRect().left > outerEl.getBoundingClientRect().left;
    removeElement(outerEl);
    return res;
}
//# sourceMappingURL=scrollbar-side.js.map