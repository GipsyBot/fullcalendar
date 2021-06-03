import { OPTION_REFINERS } from './options';
declare type ExtraOptionRefiners = typeof OPTION_REFINERS;
declare module '@fullcalendar/common' {
    interface BaseOptionRefiners extends ExtraOptionRefiners {
    }
}
export {};
//# sourceMappingURL=options-declare.d.ts.map