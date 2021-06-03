import { startOfDay, addDays } from '../datelib/marker';
import { subtractDurations } from '../datelib/duration';
import { arrayToHash } from '../util/object';
import { intersectRanges } from '../datelib/date-range';
import { createPlugin } from '../plugin-system';
import { SIMPLE_RECURRING_REFINERS } from './recurring-event-simple-refiners';
import './recurring-event-simple-declare';
var recurring = {
    parse: function (refined, dateEnv) {
        if (refined.daysOfWeek || refined.startTime || refined.endTime || refined.startRecur || refined.endRecur) {
            var recurringData = {
                daysOfWeek: refined.daysOfWeek || null,
                startTime: refined.startTime || null,
                endTime: refined.endTime || null,
                startRecur: refined.startRecur ? dateEnv.createMarker(refined.startRecur) : null,
                endRecur: refined.endRecur ? dateEnv.createMarker(refined.endRecur) : null,
            };
            var duration = void 0;
            if (refined.duration) {
                duration = refined.duration;
            }
            if (!duration && refined.startTime && refined.endTime) {
                duration = subtractDurations(refined.endTime, refined.startTime);
            }
            return {
                allDayGuess: Boolean(!refined.startTime && !refined.endTime),
                duration: duration,
                typeData: recurringData,
            };
        }
        return null;
    },
    expand: function (typeData, framingRange, dateEnv) {
        var clippedFramingRange = intersectRanges(framingRange, { start: typeData.startRecur, end: typeData.endRecur });
        if (clippedFramingRange) {
            return expandRanges(typeData.daysOfWeek, typeData.startTime, clippedFramingRange, dateEnv);
        }
        return [];
    },
};
export var simpleRecurringEventsPlugin = createPlugin({
    recurringTypes: [recurring],
    eventRefiners: SIMPLE_RECURRING_REFINERS,
});
function expandRanges(daysOfWeek, startTime, framingRange, dateEnv) {
    var dowHash = daysOfWeek ? arrayToHash(daysOfWeek) : null;
    var dayMarker = startOfDay(framingRange.start);
    var endMarker = framingRange.end;
    var instanceStarts = [];
    while (dayMarker < endMarker) {
        var instanceStart 
        // if everyday, or this particular day-of-week
        = void 0;
        // if everyday, or this particular day-of-week
        if (!dowHash || dowHash[dayMarker.getUTCDay()]) {
            if (startTime) {
                instanceStart = dateEnv.add(dayMarker, startTime);
            }
            else {
                instanceStart = dayMarker;
            }
            instanceStarts.push(instanceStart);
        }
        dayMarker = addDays(dayMarker, 1);
    }
    return instanceStarts;
}
//# sourceMappingURL=recurring-event-simple.js.map