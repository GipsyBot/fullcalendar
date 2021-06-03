import { Duration } from '../datelib/duration';
import { EventStore } from './event-store';
import { EventDef } from './event-def';
import { EventUiHash } from '../component/event-ui';
import { CalendarContext } from '../CalendarContext';
export interface EventMutation {
    datesDelta?: Duration;
    startDelta?: Duration;
    endDelta?: Duration;
    standardProps?: any;
    extendedProps?: any;
}
export declare function applyMutationToEventStore(eventStore: EventStore, eventConfigBase: EventUiHash, mutation: EventMutation, context: CalendarContext): EventStore;
export declare type eventDefMutationApplier = (eventDef: EventDef, mutation: EventMutation, context: CalendarContext) => void;
//# sourceMappingURL=event-mutation.d.ts.map