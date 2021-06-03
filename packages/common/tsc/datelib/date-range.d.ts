import { DateMarker } from './marker';
import { DateEnv, DateInput } from './env';
export interface DateRangeInput {
    start?: DateInput;
    end?: DateInput;
}
export interface OpenDateRange {
    start: DateMarker | null;
    end: DateMarker | null;
}
export interface DateRange {
    start: DateMarker;
    end: DateMarker;
}
export declare function parseRange(input: DateRangeInput, dateEnv: DateEnv): OpenDateRange;
export declare function invertRanges(ranges: DateRange[], constraintRange: DateRange): DateRange[];
export declare function intersectRanges(range0: OpenDateRange, range1: OpenDateRange): OpenDateRange;
export declare function rangesEqual(range0: OpenDateRange, range1: OpenDateRange): boolean;
export declare function rangesIntersect(range0: OpenDateRange, range1: OpenDateRange): boolean;
export declare function rangeContainsRange(outerRange: OpenDateRange, innerRange: OpenDateRange): boolean;
export declare function rangeContainsMarker(range: OpenDateRange, date: DateMarker | number): boolean;
export declare function constrainMarkerToRange(date: DateMarker, range: DateRange): DateMarker;
//# sourceMappingURL=date-range.d.ts.map