import { createDuration, identity } from '@fullcalendar/common';
export var RRULE_EVENT_REFINERS = {
    rrule: identity,
    exrule: identity,
    exdate: identity,
    duration: createDuration,
};
//# sourceMappingURL=event-refiners.js.map