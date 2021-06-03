import { EVENT_SOURCE_REFINERS } from './event-source-refiners';
declare type ExtraEventSourceRefiners = typeof EVENT_SOURCE_REFINERS;
declare module '@fullcalendar/common' {
    interface EventSourceRefiners extends ExtraEventSourceRefiners {
    }
}
export {};
//# sourceMappingURL=event-source-declare.d.ts.map