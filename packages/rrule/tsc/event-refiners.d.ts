import { createDuration, DateInput, Identity } from '@fullcalendar/common';
import { Options as RRuleOptions } from 'rrule';
export declare type RRuleInputObjectFull = Omit<RRuleOptions, 'dtstart' | 'until' | 'freq' | 'wkst' | 'byweekday'> & {
    dtstart: RRuleOptions['dtstart'] | DateInput;
    until: RRuleOptions['until'] | DateInput;
    freq: RRuleOptions['until'] | string;
    wkst: RRuleOptions['wkst'] | string;
    byweekday: RRuleOptions['byweekday'] | string | string[];
};
export declare type RRuleInputObject = Partial<RRuleInputObjectFull>;
export declare type RRuleInput = RRuleInputObject | string;
export declare const RRULE_EVENT_REFINERS: {
    rrule: Identity<RRuleInput>;
    exrule: Identity<Partial<RRuleInputObjectFull> | Partial<RRuleInputObjectFull>[]>;
    exdate: Identity<string | number | Date | number[] | DateInput[]>;
    duration: typeof createDuration;
};
//# sourceMappingURL=event-refiners.d.ts.map