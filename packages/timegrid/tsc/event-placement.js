import { __assign } from "tslib";
import { SegHierarchy, buildEntryKey, getEntrySpanEnd, binarySearch, groupIntersectingEntries, } from '@fullcalendar/common';
// segInputs assumed sorted
export function computeFgSegPlacements(segInputs, strictOrder, maxStackCnt) {
    var hierarchy = new SegHierarchy();
    if (strictOrder != null) {
        hierarchy.strictOrder = strictOrder;
    }
    if (maxStackCnt != null) {
        hierarchy.maxStackCnt = maxStackCnt;
    }
    var hiddenEntries = hierarchy.addSegs(segInputs);
    var hiddenGroups = groupIntersectingEntries(hiddenEntries);
    var web = buildWeb(hierarchy);
    web = stretchWeb(web, 1); // all levelCoords/thickness will have 0.0-1.0
    var segRects = webToRects(web);
    return { segRects: segRects, hiddenGroups: hiddenGroups };
}
function buildWeb(hierarchy) {
    var entriesByLevel = hierarchy.entriesByLevel;
    var buildNode = cacheable(function (level, lateral) { return level + ':' + lateral; }, function (level, lateral) {
        var siblingRange = findNextLevelSegs(hierarchy, level, lateral);
        var nextLevelRes = buildNodes(siblingRange, buildNode);
        var entry = entriesByLevel[level][lateral];
        return [
            __assign(__assign({}, entry), { nextLevelNodes: nextLevelRes[0] }),
            entry.thickness + nextLevelRes[1],
        ];
    });
    return buildNodes(entriesByLevel.length
        ? { level: 0, lateralStart: 0, lateralEnd: entriesByLevel[0].length }
        : null, buildNode)[0];
}
function buildNodes(siblingRange, buildNode) {
    if (!siblingRange) {
        return [[], 0];
    }
    var level = siblingRange.level, lateralStart = siblingRange.lateralStart, lateralEnd = siblingRange.lateralEnd;
    var lateral = lateralStart;
    var pairs = [];
    while (lateral < lateralEnd) {
        pairs.push(buildNode(level, lateral));
        lateral += 1;
    }
    pairs.sort(cmpDescPressures);
    return [
        pairs.map(extractNode),
        pairs[0][1],
    ];
}
function cmpDescPressures(a, b) {
    return b[1] - a[1];
}
function extractNode(a) {
    return a[0];
}
function findNextLevelSegs(hierarchy, subjectLevel, subjectLateral) {
    var levelCoords = hierarchy.levelCoords, entriesByLevel = hierarchy.entriesByLevel;
    var subjectEntry = entriesByLevel[subjectLevel][subjectLateral];
    var afterSubject = levelCoords[subjectLevel] + subjectEntry.thickness;
    var levelCnt = levelCoords.length;
    var level = subjectLevel;
    // skip past levels that are too high up
    for (; level < levelCnt && levelCoords[level] < afterSubject; level += 1)
        ; // do nothing
    for (; level < levelCnt; level += 1) {
        var entries = entriesByLevel[level];
        var entry = void 0;
        var searchIndex = binarySearch(entries, subjectEntry.spanStart, getEntrySpanEnd);
        var lateralStart = searchIndex[0] + searchIndex[1]; // if exact match (which doesn't collide), go to next one
        var lateralEnd = lateralStart;
        while ( // loop through entries that horizontally intersect
        (entry = entries[lateralEnd]) && // but not past the whole seg list
            entry.spanStart < subjectEntry.spanEnd) {
            lateralEnd += 1;
        }
        if (lateralStart < lateralEnd) {
            return { level: level, lateralStart: lateralStart, lateralEnd: lateralEnd };
        }
    }
    return null;
}
function stretchWeb(topLevelNodes, totalThickness) {
    var stretchNode = cacheable(function (node, startCoord, prevThickness) { return buildEntryKey(node); }, function (node, startCoord, prevThickness) {
        var nextLevelNodes = node.nextLevelNodes, thickness = node.thickness;
        var allThickness = thickness + prevThickness;
        var thicknessFraction = thickness / allThickness;
        var endCoord;
        var newChildren = [];
        if (!nextLevelNodes.length) {
            endCoord = totalThickness;
        }
        else {
            for (var _i = 0, nextLevelNodes_1 = nextLevelNodes; _i < nextLevelNodes_1.length; _i++) {
                var childNode = nextLevelNodes_1[_i];
                if (endCoord === undefined) {
                    var res = stretchNode(childNode, startCoord, allThickness);
                    endCoord = res[0];
                    newChildren.push(res[1]);
                }
                else {
                    var res = stretchNode(childNode, endCoord, 0);
                    newChildren.push(res[1]);
                }
            }
        }
        var newThickness = (endCoord - startCoord) * thicknessFraction;
        return [endCoord - newThickness, __assign(__assign({}, node), { thickness: newThickness, nextLevelNodes: newChildren })];
    });
    return topLevelNodes.map(function (node) { return stretchNode(node, 0, 0)[1]; });
}
// not sorted in any particular order
function webToRects(topLevelNodes) {
    var rects = [];
    var processNode = cacheable(function (node, levelCoord, stackDepth) { return buildEntryKey(node); }, function (node, levelCoord, stackDepth) {
        var rect = __assign(__assign({}, node), { levelCoord: levelCoord,
            stackDepth: stackDepth, stackForward: 0 });
        rects.push(rect);
        return (rect.stackForward = processNodes(node.nextLevelNodes, levelCoord + node.thickness, stackDepth + 1) + 1);
    });
    function processNodes(nodes, levelCoord, stackDepth) {
        var stackForward = 0;
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            stackForward = Math.max(processNode(node, levelCoord, stackDepth), stackForward);
        }
        return stackForward;
    }
    processNodes(topLevelNodes, 0, 0);
    return rects; // TODO: sort rects by levelCoord to be consistent with toRects?
}
// TODO: move to general util
function cacheable(keyFunc, workFunc) {
    var cache = {};
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var key = keyFunc.apply(void 0, args);
        return (key in cache)
            ? cache[key]
            : (cache[key] = workFunc.apply(void 0, args));
    };
}
//# sourceMappingURL=event-placement.js.map