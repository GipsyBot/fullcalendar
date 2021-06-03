import { DateInput } from '../datelib/env';
import { CalendarContext } from '../CalendarContext';
import { EventDef } from './event-def';
import { EventInstance } from './event-instance';
import { EventSource } from './event-source';
import { RefinedOptionsFromRefiners, RawOptionsFromRefiners, Identity, Dictionary } from '../options';
import { EventUiInput, EventUiRefined } from '../component/event-ui';
export declare const EVENT_NON_DATE_REFINERS: {
    id: StringConstructor;
    groupId: StringConstructor;
    title: StringConstructor;
    url: StringConstructor;
};
export declare const EVENT_DATE_REFINERS: {
    start: Identity<DateInput>;
    end: Identity<DateInput>;
    date: Identity<DateInput>;
    allDay: BooleanConstructor;
};
declare const EVENT_REFINERS: {
    extendedProps: Identity<Record<string, any>>;
    start: Identity<DateInput>;
    end: Identity<DateInput>;
    date: Identity<DateInput>;
    allDay: BooleanConstructor;
    id: StringConstructor;
    groupId: StringConstructor;
    title: StringConstructor;
    url: StringConstructor;
};
declare type BuiltInEventRefiners = typeof EVENT_REFINERS;
export interface EventRefiners extends BuiltInEventRefiners {
}
export declare type EventInput = EventUiInput & RawOptionsFromRefiners<Required<EventRefiners>> & // Required hack
{
    [extendedProp: string]: any;
};
export declare type EventRefined = EventUiRefined & RefinedOptionsFromRefiners<Required<EventRefiners>>;
export interface EventTuple {
    def: EventDef;
    instance: EventInstance | null;
}
export declare type EventInputTransformer = (input: EventInput) => EventInput;
export declare type EventDefMemberAdder = (refined: EventRefined) => Partial<EventDef>;
export declare function parseEvent(raw: EventInput, eventSource: EventSource<any> | null, context: CalendarContext, allowOpenRange: boolean, refiners?: {
    extendedProps: Identity<Record<string, any>>;
    start: Identity<DateInput>;
    end: Identity<DateInput>;
    date: Identity<DateInput>;
    allDay: BooleanConstructor;
    id: StringConstructor;
    groupId: StringConstructor;
    title: StringConstructor;
    url: StringConstructor;
    display: StringConstructor;
    editable: BooleanConstructor;
    startEditable: BooleanConstructor;
    durationEditable: BooleanConstructor;
    constraint: Identity<any>;
    overlap: Identity<boolean>;
    allow: Identity<import("./constraint").AllowFunc>;
    className: typeof import("../main").parseClassNames;
    classNames: typeof import("../main").parseClassNames;
    color: StringConstructor;
    backgroundColor: StringConstructor;
    borderColor: StringConstructor;
    textColor: StringConstructor;
}): EventTuple | null;
export declare function refineEventDef(raw: EventInput, context: CalendarContext, refiners?: {
    extendedProps: Identity<Record<string, any>>;
    start: Identity<DateInput>;
    end: Identity<DateInput>;
    date: Identity<DateInput>;
    allDay: BooleanConstructor;
    id: StringConstructor;
    groupId: StringConstructor;
    title: StringConstructor;
    url: StringConstructor;
    display: StringConstructor;
    editable: BooleanConstructor;
    startEditable: BooleanConstructor;
    durationEditable: BooleanConstructor;
    constraint: Identity<any>;
    overlap: Identity<boolean>;
    allow: Identity<import("./constraint").AllowFunc>;
    className: typeof import("../main").parseClassNames;
    classNames: typeof import("../main").parseClassNames;
    color: StringConstructor;
    backgroundColor: StringConstructor;
    borderColor: StringConstructor;
    textColor: StringConstructor;
}): {
    refined: RefinedOptionsFromRefiners<{
        extendedProps: Identity<Record<string, any>>;
        start: Identity<DateInput>;
        end: Identity<DateInput>;
        date: Identity<DateInput>;
        allDay: BooleanConstructor;
        id: StringConstructor;
        groupId: StringConstructor;
        title: StringConstructor;
        url: StringConstructor;
        display: StringConstructor;
        editable: BooleanConstructor;
        startEditable: BooleanConstructor;
        durationEditable: BooleanConstructor;
        constraint: Identity<any>;
        overlap: Identity<boolean>;
        allow: Identity<import("./constraint").AllowFunc>;
        className: typeof import("../main").parseClassNames;
        classNames: typeof import("../main").parseClassNames;
        color: StringConstructor;
        backgroundColor: StringConstructor;
        borderColor: StringConstructor;
        textColor: StringConstructor;
    }>;
    extra: Record<string, any>;
};
export declare function buildEventRefiners(context: CalendarContext): {
    extendedProps: Identity<Record<string, any>>;
    start: Identity<DateInput>;
    end: Identity<DateInput>;
    date: Identity<DateInput>;
    allDay: BooleanConstructor;
    id: StringConstructor;
    groupId: StringConstructor;
    title: StringConstructor;
    url: StringConstructor;
    display: StringConstructor;
    editable: BooleanConstructor;
    startEditable: BooleanConstructor;
    durationEditable: BooleanConstructor;
    constraint: Identity<any>;
    overlap: Identity<boolean>;
    allow: Identity<import("./constraint").AllowFunc>;
    className: typeof import("../main").parseClassNames;
    classNames: typeof import("../main").parseClassNames;
    color: StringConstructor;
    backgroundColor: StringConstructor;
    borderColor: StringConstructor;
    textColor: StringConstructor;
};
export declare function parseEventDef(refined: EventRefined, extra: Dictionary, sourceId: string, allDay: boolean, hasEnd: boolean, context: CalendarContext): EventDef;
export {};
//# sourceMappingURL=event-parse.d.ts.map