import { createDuration, asRoughMs, formatIsoTimeString, addDurations, wholeDivideDurations, } from '@fullcalendar/common';
// potential nice values for the slot-duration and interval-duration
// from largest to smallest
var STOCK_SUB_DURATIONS = [
    { hours: 1 },
    { minutes: 30 },
    { minutes: 15 },
    { seconds: 30 },
    { seconds: 15 },
];
export function buildSlatMetas(slotMinTime, slotMaxTime, explicitLabelInterval, slotDuration, dateEnv) {
    var dayStart = new Date(0);
    var slatTime = slotMinTime;
    var slatIterator = createDuration(0);
    var labelInterval = explicitLabelInterval || computeLabelInterval(slotDuration);
    var metas = [];
    while (asRoughMs(slatTime) < asRoughMs(slotMaxTime)) {
        var date = dateEnv.add(dayStart, slatTime);
        var isLabeled = wholeDivideDurations(slatIterator, labelInterval) !== null;
        metas.push({
            date: date,
            time: slatTime,
            key: date.toISOString(),
            isoTimeStr: formatIsoTimeString(date),
            isLabeled: isLabeled,
        });
        slatTime = addDurations(slatTime, slotDuration);
        slatIterator = addDurations(slatIterator, slotDuration);
    }
    return metas;
}
// Computes an automatic value for slotLabelInterval
function computeLabelInterval(slotDuration) {
    var i;
    var labelInterval;
    var slotsPerLabel;
    // find the smallest stock label interval that results in more than one slots-per-label
    for (i = STOCK_SUB_DURATIONS.length - 1; i >= 0; i -= 1) {
        labelInterval = createDuration(STOCK_SUB_DURATIONS[i]);
        slotsPerLabel = wholeDivideDurations(labelInterval, slotDuration);
        if (slotsPerLabel !== null && slotsPerLabel > 1) {
            return labelInterval;
        }
    }
    return slotDuration; // fall back
}
//# sourceMappingURL=time-slat-meta.js.map