import { createDuration } from '../datelib/duration';
import { DateInput } from '../datelib/env';
import { Identity } from '../options';
export declare const SIMPLE_RECURRING_REFINERS: {
    daysOfWeek: Identity<number[]>;
    startTime: typeof createDuration;
    endTime: typeof createDuration;
    duration: typeof createDuration;
    startRecur: Identity<DateInput>;
    endRecur: Identity<DateInput>;
};
//# sourceMappingURL=recurring-event-simple-refiners.d.ts.map