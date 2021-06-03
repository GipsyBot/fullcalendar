import { DateFormatter, DateFormattingContext } from './DateFormatter';
import { ZonedMarker } from './zoned-marker';
export declare class CmdFormatter implements DateFormatter {
    cmdStr: string;
    constructor(cmdStr: string);
    format(date: ZonedMarker, context: DateFormattingContext, betterDefaultSeparator?: string): string;
    formatRange(start: ZonedMarker, end: ZonedMarker, context: DateFormattingContext, betterDefaultSeparator?: string): string;
}
//# sourceMappingURL=formatting-cmd.d.ts.map