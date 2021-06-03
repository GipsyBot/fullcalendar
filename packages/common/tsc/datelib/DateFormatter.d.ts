import { DateMarker } from './marker';
import { CalendarSystem } from './calendar-system';
import { Locale } from './locale';
import { ZonedMarker, ExpandedZonedMarker } from './zoned-marker';
export interface VerboseFormattingArg {
    date: ExpandedZonedMarker;
    start: ExpandedZonedMarker;
    end?: ExpandedZonedMarker;
    timeZone: string;
    localeCodes: string[];
    defaultSeparator: string;
}
export declare function createVerboseFormattingArg(start: ZonedMarker, end: ZonedMarker, context: DateFormattingContext, betterDefaultSeparator?: string): VerboseFormattingArg;
export declare type CmdFormatterFunc = (cmd: string, arg: VerboseFormattingArg) => string;
export interface DateFormattingContext {
    timeZone: string;
    locale: Locale;
    calendarSystem: CalendarSystem;
    computeWeekNumber: (d: DateMarker) => number;
    weekText: string;
    cmdFormatter?: CmdFormatterFunc;
    defaultSeparator: string;
}
export interface DateFormatter {
    format(date: ZonedMarker, context: DateFormattingContext): string;
    formatRange(start: ZonedMarker, end: ZonedMarker, context: DateFormattingContext, betterDefaultSeparator?: string): string;
}
//# sourceMappingURL=DateFormatter.d.ts.map