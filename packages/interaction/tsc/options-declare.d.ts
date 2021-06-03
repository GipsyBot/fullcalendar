import { OPTION_REFINERS, LISTENER_REFINERS } from './options';
declare type ExtraOptionRefiners = typeof OPTION_REFINERS;
declare type ExtraListenerRefiners = typeof LISTENER_REFINERS;
declare module '@fullcalendar/common' {
    interface BaseOptionRefiners extends ExtraOptionRefiners {
    }
    interface CalendarListenerRefiners extends ExtraListenerRefiners {
    }
}
export {};
//# sourceMappingURL=options-declare.d.ts.map