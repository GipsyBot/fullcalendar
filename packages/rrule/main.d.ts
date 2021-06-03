import { Identity, DateInput, createDuration, PluginDef } from '@fullcalendar/common';
import { Options } from 'rrule';

declare type RRuleInputObjectFull = Omit<Options, 'dtstart' | 'until' | 'freq' | 'wkst' | 'byweekday'> & {
    dtstart: Options['dtstart'] | DateInput;
    until: Options['until'] | DateInput;
    freq: Options['until'] | string;
    wkst: Options['wkst'] | string;
    byweekday: Options['byweekday'] | string | string[];
};
declare type RRuleInputObject = Partial<RRuleInputObjectFull>;
declare type RRuleInput = RRuleInputObject | string;
declare const RRULE_EVENT_REFINERS: {
    rrule: Identity<RRuleInput>;
    exrule: Identity<Partial<RRuleInputObjectFull> | Partial<RRuleInputObjectFull>[]>;
    exdate: Identity<string | number | Date | number[] | DateInput[]>;
    duration: typeof createDuration;
};


declare type ExtraRefiners = typeof RRULE_EVENT_REFINERS;
declare module '@fullcalendar/common' {
    interface EventRefiners extends ExtraRefiners {
    }
}

declare const _default: PluginDef;

export default _default;
