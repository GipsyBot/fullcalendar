var canVGrowWithinCell;
export function getCanVGrowWithinCell() {
    if (canVGrowWithinCell == null) {
        canVGrowWithinCell = computeCanVGrowWithinCell();
    }
    return canVGrowWithinCell;
}
function computeCanVGrowWithinCell() {
    // for SSR, because this function is call immediately at top-level
    // TODO: just make this logic execute top-level, immediately, instead of doing lazily
    if (typeof document === 'undefined') {
        return true;
    }
    var el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.top = '0px';
    el.style.left = '0px';
    el.innerHTML = '<table><tr><td><div></div></td></tr></table>';
    el.querySelector('table').style.height = '100px';
    el.querySelector('div').style.height = '100%';
    document.body.appendChild(el);
    var div = el.querySelector('div');
    var possible = div.offsetHeight > 0;
    document.body.removeChild(el);
    return possible;
}
//# sourceMappingURL=table-styling.js.map