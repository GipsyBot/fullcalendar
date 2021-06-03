import { __assign, __spreadArrays } from "tslib";
var SegHierarchy = /** @class */ (function () {
    function SegHierarchy() {
        // settings
        this.strictOrder = false;
        this.allowReslicing = false;
        this.maxCoord = -1; // -1 means no max
        this.maxStackCnt = -1; // -1 means no max
        this.levelCoords = []; // ordered
        this.entriesByLevel = []; // parallel with levelCoords
        this.stackCnts = {}; // TODO: use better technique!?
    }
    SegHierarchy.prototype.addSegs = function (segInputs) {
        var hiddenEntries = [];
        for (var _i = 0, segInputs_1 = segInputs; _i < segInputs_1.length; _i++) {
            var segInput = segInputs_1[_i];
            this.insertEntry({
                segInput: segInput,
                spanStart: segInput.spanStart,
                spanEnd: segInput.spanEnd,
                thickness: segInput.thickness,
            }, hiddenEntries);
        }
        return hiddenEntries;
    };
    SegHierarchy.prototype.insertEntry = function (entry, hiddenEntries) {
        var insertion = this.findInsertion(entry);
        if (this.isInsertionValid(insertion, entry)) {
            this.insertEntryAt(entry, insertion);
            return 1;
        }
        return this.handleInvalidInsertion(insertion, entry, hiddenEntries);
    };
    SegHierarchy.prototype.isInsertionValid = function (insertion, entry) {
        return (this.maxCoord === -1 || insertion.levelCoord + entry.thickness <= this.maxCoord) &&
            (this.maxStackCnt === -1 || insertion.stackCnt < this.maxStackCnt);
    };
    SegHierarchy.prototype.handleInvalidInsertion = function (insertion, entry, hiddenEntries) {
        if (this.allowReslicing && insertion.touchingEntry) {
            return this.splitEntry(entry, insertion.touchingEntry, hiddenEntries);
        }
        hiddenEntries.push(entry);
        return 0;
    };
    SegHierarchy.prototype.splitEntry = function (entry, barrier, hiddenEntries) {
        var partCnt = 0;
        var splitHiddenEntries = [];
        if (entry.spanStart < barrier.spanStart) {
            partCnt += this.insertEntry(__assign(__assign({}, entry), { spanStart: entry.spanStart, spanEnd: barrier.spanStart }), splitHiddenEntries);
        }
        if (barrier.spanEnd < entry.spanEnd) {
            partCnt += this.insertEntry(__assign(__assign({}, entry), { spanStart: barrier.spanEnd, spanEnd: entry.spanEnd }), splitHiddenEntries);
        }
        if (partCnt) {
            hiddenEntries.push.apply(hiddenEntries, __spreadArrays([__assign(__assign({}, entry), { spanStart: Math.max(barrier.spanStart, entry.spanStart), spanEnd: Math.min(barrier.spanEnd, entry.spanEnd) })], splitHiddenEntries));
            return partCnt;
        }
        hiddenEntries.push(entry);
        return 0;
    };
    SegHierarchy.prototype.insertEntryAt = function (entry, insertion) {
        var nextLevel = insertion.nextLevel;
        // create a new level
        if (!nextLevel || this.levelCoords[nextLevel - 1] < insertion.levelCoord) {
            insertAt(this.levelCoords, nextLevel, insertion.levelCoord);
            insertAt(this.entriesByLevel, nextLevel, [entry]);
            // insert into existing level
        }
        else {
            insertAt(this.entriesByLevel[nextLevel - 1], insertion.lateralEnd, entry);
        }
        this.stackCnts[buildEntryKey(entry)] = insertion.stackCnt;
    };
    SegHierarchy.prototype.findInsertion = function (newEntry) {
        var _a = this, levelCoords = _a.levelCoords, entriesByLevel = _a.entriesByLevel, stackCnts = _a.stackCnts, strictOrder = _a.strictOrder;
        var levelCnt = levelCoords.length;
        var level; // running value while iterating all segs
        var levelCoord; // "
        var lateralStart = 0; // "
        var lateralEnd = 0; // "
        var resCoord = 0; // the levelCoord for newSeg
        var touchingEntry = null;
        for (level = 0; level < levelCnt; level += 1) {
            levelCoord = levelCoords[level];
            // if the current level is past the placed entry, we have found a good
            // empty space and can stop. only if not strict-ordering mode.
            if (!strictOrder && levelCoord >= resCoord + newEntry.thickness) {
                break;
            }
            var entries = entriesByLevel[level];
            var entry = void 0;
            var searchRes = binarySearch(entries, newEntry.spanStart, getEntrySpanEnd);
            lateralStart = searchRes[0] + searchRes[1]; // if exact match (which doesn't collide), go to next one
            lateralEnd = lateralStart;
            while ( // loop through entries that horizontally intersect
            (entry = entries[lateralEnd]) && // but not past the whole entry list
                entry.spanStart < newEntry.spanEnd) {
                if (strictOrder ||
                    ( // vertically intersects?
                    resCoord < levelCoord + entry.thickness &&
                        resCoord + newEntry.thickness > levelCoord)) {
                    // push down the potential destination
                    touchingEntry = entry;
                    resCoord = levelCoord + entry.thickness; // move to bottom of colliding entry
                }
                lateralEnd += 1;
            }
        }
        return {
            levelCoord: resCoord,
            nextLevel: level,
            lateralStart: lateralStart,
            lateralEnd: lateralEnd,
            touchingEntry: touchingEntry,
            stackCnt: touchingEntry ? stackCnts[buildEntryKey(touchingEntry)] + 1 : 0,
        };
    };
    // sorted by levelCoord (lowest to highest)
    SegHierarchy.prototype.toRects = function () {
        var _a = this, entriesByLevel = _a.entriesByLevel, levelCoords = _a.levelCoords;
        var levelCnt = entriesByLevel.length;
        var rects = [];
        for (var level = 0; level < levelCnt; level += 1) {
            var entries = entriesByLevel[level];
            var levelCoord = levelCoords[level];
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                rects.push(__assign(__assign({}, entry), { levelCoord: levelCoord }));
            }
        }
        return rects;
    };
    return SegHierarchy;
}());
export { SegHierarchy };
export function getEntrySpanEnd(entry) {
    return entry.spanEnd;
}
export function buildEntryKey(entry) {
    return entry.segInput.index + ':' + entry.spanStart;
}
// returns groups with entries sorted by input order
export function groupIntersectingEntries(entries) {
    var merges = [];
    for (var _i = 0, entries_2 = entries; _i < entries_2.length; _i++) {
        var entry = entries_2[_i];
        var filteredMerges = [];
        var hungryMerge = {
            spanStart: entry.spanStart,
            spanEnd: entry.spanEnd,
            entries: [entry],
        };
        for (var _a = 0, merges_1 = merges; _a < merges_1.length; _a++) {
            var merge = merges_1[_a];
            if (merge.spanStart < hungryMerge.spanEnd && merge.spanEnd > hungryMerge.spanStart) { // collides?
                hungryMerge = {
                    spanStart: Math.min(merge.spanStart, hungryMerge.spanStart),
                    spanEnd: Math.max(merge.spanEnd, hungryMerge.spanEnd),
                    entries: merge.entries.concat(hungryMerge.entries),
                };
            }
            else {
                filteredMerges.push(merge);
            }
        }
        filteredMerges.push(hungryMerge);
        merges = filteredMerges;
    }
    return merges;
}
// general util
// ---------------------------------------------------------------------------------------------------------------------
function insertAt(arr, index, item) {
    arr.splice(index, 0, item);
}
export function binarySearch(a, searchVal, getItemVal) {
    var startIndex = 0;
    var endIndex = a.length; // exclusive
    if (!endIndex || searchVal < getItemVal(a[startIndex])) { // no items OR before first item
        return [0, 0];
    }
    if (searchVal > getItemVal(a[endIndex - 1])) { // after last item
        return [endIndex, 0];
    }
    while (startIndex < endIndex) {
        var middleIndex = Math.floor(startIndex + (endIndex - startIndex) / 2);
        var middleVal = getItemVal(a[middleIndex]);
        if (searchVal < middleVal) {
            endIndex = middleIndex;
        }
        else if (searchVal > middleVal) {
            startIndex = middleIndex + 1;
        }
        else { // equal!
            return [middleIndex, 1];
        }
    }
    return [startIndex, 0];
}
//# sourceMappingURL=event-placement.js.map