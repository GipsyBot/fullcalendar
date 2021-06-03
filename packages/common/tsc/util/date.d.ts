import { DateMarker } from '../datelib/marker';
import { Duration } from '../datelib/duration';
import { DateEnv } from '../datelib/env';
import { DateRange, OpenDateRange } from '../datelib/date-range';
export declare function computeAlignedDayRange(timedRange: DateRange): DateRange;
export declare function computeVisibleDayRange(timedRange: OpenDateRange, nextDayThreshold?: Duration): OpenDateRange;
export declare function isMultiDayRange(range: DateRange): boolean;
export declare function diffDates(date0: DateMarker, date1: DateMarker, dateEnv: DateEnv, largeUnit?: string): Duration;
//# sourceMappingURL=date.d.ts.map