import { expandZonedMarker } from './zoned-marker';
export function createVerboseFormattingArg(start, end, context, betterDefaultSeparator) {
    var startInfo = expandZonedMarker(start, context.calendarSystem);
    var endInfo = end ? expandZonedMarker(end, context.calendarSystem) : null;
    return {
        date: startInfo,
        start: startInfo,
        end: endInfo,
        timeZone: context.timeZone,
        localeCodes: context.locale.codes,
        defaultSeparator: betterDefaultSeparator || context.defaultSeparator,
    };
}
//# sourceMappingURL=DateFormatter.js.map