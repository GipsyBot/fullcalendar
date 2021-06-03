import { EventInput, EventInputTransformer } from './event-parse';
import { EventSourceFunc } from '../event-sources/func-event-source';
import { EventSource, EventSourceSuccessResponseHandler, EventSourceErrorResponseHandler } from './event-source';
import { JSON_FEED_EVENT_SOURCE_REFINERS } from '../event-sources/json-feed-event-source-refiners';
import { CalendarContext } from '../CalendarContext';
import { EventUiInput, EventUiRefined } from '../component/event-ui';
import { Identity, RawOptionsFromRefiners, RefinedOptionsFromRefiners } from '../options';
declare const EVENT_SOURCE_REFINERS: {
    id: StringConstructor;
    defaultAllDay: BooleanConstructor;
    url: StringConstructor;
    format: StringConstructor;
    events: Identity<EventInput[] | EventSourceFunc>;
    eventDataTransform: Identity<EventInputTransformer>;
    success: Identity<EventSourceSuccessResponseHandler>;
    failure: Identity<EventSourceErrorResponseHandler>;
};
declare type BuiltInEventSourceRefiners = typeof EVENT_SOURCE_REFINERS & typeof JSON_FEED_EVENT_SOURCE_REFINERS;
export interface EventSourceRefiners extends BuiltInEventSourceRefiners {
}
export declare type EventSourceInputObject = EventUiInput & RawOptionsFromRefiners<Required<EventSourceRefiners>>;
export declare type EventSourceInput = EventSourceInputObject | // object in extended form
EventInput[] | EventSourceFunc | // just a function
string;
export declare type EventSourceRefined = EventUiRefined & RefinedOptionsFromRefiners<Required<EventSourceRefiners>>;
export declare function parseEventSource(raw: EventSourceInput, context: CalendarContext, refiners?: {
    id: StringConstructor;
    defaultAllDay: BooleanConstructor;
    url: StringConstructor;
    format: StringConstructor;
    events: Identity<EventInput[] | EventSourceFunc>;
    eventDataTransform: Identity<EventInputTransformer>;
    success: Identity<EventSourceSuccessResponseHandler>;
    failure: Identity<EventSourceErrorResponseHandler>;
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
}): EventSource<any> | null;
export declare function buildEventSourceRefiners(context: CalendarContext): {
    id: StringConstructor;
    defaultAllDay: BooleanConstructor;
    url: StringConstructor;
    format: StringConstructor;
    events: Identity<EventInput[] | EventSourceFunc>;
    eventDataTransform: Identity<EventInputTransformer>;
    success: Identity<EventSourceSuccessResponseHandler>;
    failure: Identity<EventSourceErrorResponseHandler>;
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
export {};
//# sourceMappingURL=event-source-parse.d.ts.map