export function splitSegsByRow(segs, rowCnt) {
    var byRow = [];
    for (var i = 0; i < rowCnt; i += 1) {
        byRow[i] = [];
    }
    for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
        var seg = segs_1[_i];
        byRow[seg.row].push(seg);
    }
    return byRow;
}
export function splitSegsByFirstCol(segs, colCnt) {
    var byCol = [];
    for (var i = 0; i < colCnt; i += 1) {
        byCol[i] = [];
    }
    for (var _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
        var seg = segs_2[_i];
        byCol[seg.firstCol].push(seg);
    }
    return byCol;
}
export function splitInteractionByRow(ui, rowCnt) {
    var byRow = [];
    if (!ui) {
        for (var i = 0; i < rowCnt; i += 1) {
            byRow[i] = null;
        }
    }
    else {
        for (var i = 0; i < rowCnt; i += 1) {
            byRow[i] = {
                affectedInstances: ui.affectedInstances,
                isEvent: ui.isEvent,
                segs: [],
            };
        }
        for (var _i = 0, _a = ui.segs; _i < _a.length; _i++) {
            var seg = _a[_i];
            byRow[seg.row].segs.push(seg);
        }
    }
    return byRow;
}
//# sourceMappingURL=TableSeg.js.map