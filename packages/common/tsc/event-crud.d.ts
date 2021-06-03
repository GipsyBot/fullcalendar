import { EventStore } from './structs/event-store';
import { CalendarData } from './reducers/data-types';
import { EventApi } from './api/EventApi';
import { Duration } from './datelib/duration';
import { ViewApi } from './ViewApi';
export interface EventAddArg {
    event: EventApi;
    relatedEvents: EventApi[];
    revert: () => void;
}
export interface EventChangeArg {
    oldEvent: EventApi;
    event: EventApi;
    relatedEvents: EventApi[];
    revert: () => void;
}
export interface EventDropArg extends EventChangeArg {
    el: HTMLElement;
    delta: Duration;
    jsEvent: MouseEvent;
    view: ViewApi;
}
export interface EventRemoveArg {
    event: EventApi;
    relatedEvents: EventApi[];
    revert: () => void;
}
export declare function handleEventStore(eventStore: EventStore, context: CalendarData): void;
//# sourceMappingURL=event-crud.d.ts.map