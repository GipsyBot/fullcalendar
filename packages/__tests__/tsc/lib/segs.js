import { isRectsSimilar } from './geom';
import { getBoundingRects } from './dom-geom';
export function doElsMatchSegs(els, segs, segToRectFunc) {
    var elRect;
    var found;
    var i;
    var j;
    var k;
    var len;
    var len1;
    var seg;
    var segRect;
    var unmatchedRects = getBoundingRects(els);
    if (unmatchedRects.length !== segs.length) {
        return false;
    }
    for (j = 0, len = segs.length; j < len; j += 1) {
        seg = segs[j];
        segRect = segToRectFunc(seg);
        found = false;
        for (i = k = 0, len1 = unmatchedRects.length; k < len1; i = (k += 1)) {
            elRect = unmatchedRects[i];
            if (isRectsSimilar(elRect, segRect)) {
                unmatchedRects.splice(i, 1); // remove
                found = true;
                break;
            }
        }
        if (!found) {
            return false;
        }
    }
    return !unmatchedRects.length;
}
//# sourceMappingURL=segs.js.map