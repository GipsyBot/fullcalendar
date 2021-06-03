import { DateFormatter, DateFormattingContext } from './DateFormatter';
import { ZonedMarker } from './zoned-marker';
export interface NativeFormatterOptions extends Intl.DateTimeFormatOptions {
    week?: 'short' | 'narrow' | 'numeric';
    meridiem?: 'lowercase' | 'short' | 'narrow' | boolean;
    omitZeroMinute?: boolean;
    omitCommas?: boolean;
    separator?: string;
}
export declare class NativeFormatter implements DateFormatter {
    standardDateProps: any;
    extendedSettings: any;
    severity: number;
    private buildFormattingFunc;
    constructor(formatSettings: NativeFormatterOptions);
    format(date: ZonedMarker, context: DateFormattingContext): string;
    formatRange(start: ZonedMarker, end: ZonedMarker, context: DateFormattingContext, betterDefaultSeparator?: string): string;
    getLargestUnit(): "week" | "day" | "year" | "month" | "time";
}
//# sourceMappingURL=formatting-native.d.ts.map