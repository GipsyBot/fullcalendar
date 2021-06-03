import { DateFormatter, DateFormattingContext, VerboseFormattingArg } from './DateFormatter';
import { ZonedMarker } from './zoned-marker';
export declare type FuncFormatterFunc = (arg: VerboseFormattingArg) => string;
export declare class FuncFormatter implements DateFormatter {
    func: FuncFormatterFunc;
    constructor(func: FuncFormatterFunc);
    format(date: ZonedMarker, context: DateFormattingContext, betterDefaultSeparator?: string): string;
    formatRange(start: ZonedMarker, end: ZonedMarker, context: DateFormattingContext, betterDefaultSeparator?: string): string;
}
//# sourceMappingURL=formatting-func.d.ts.map