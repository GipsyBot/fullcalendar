import { RRULE_EVENT_REFINERS } from './event-refiners';
declare type ExtraRefiners = typeof RRULE_EVENT_REFINERS;
declare module '@fullcalendar/common' {
    interface EventRefiners extends ExtraRefiners {
    }
}
export {};
//# sourceMappingURL=event-declare.d.ts.map