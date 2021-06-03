import { createDuration } from '../datelib/duration';
import { identity } from '../options';
export var SIMPLE_RECURRING_REFINERS = {
    daysOfWeek: identity,
    startTime: createDuration,
    endTime: createDuration,
    duration: createDuration,
    startRecur: identity,
    endRecur: identity,
};
//# sourceMappingURL=recurring-event-simple-refiners.js.map