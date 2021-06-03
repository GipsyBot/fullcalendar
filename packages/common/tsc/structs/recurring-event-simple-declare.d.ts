import { SIMPLE_RECURRING_REFINERS } from './recurring-event-simple-refiners';
declare type ExtraRefiners = typeof SIMPLE_RECURRING_REFINERS;
declare module './event-parse' {
    interface EventRefiners extends ExtraRefiners {
    }
}
export {};
//# sourceMappingURL=recurring-event-simple-declare.d.ts.map