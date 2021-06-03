import { EventDef, EventDefHash } from './event-def';
import { EventInstanceHash } from './event-instance';
import { EventInput, EventTuple } from './event-parse';
import { CalendarContext } from '../CalendarContext';
import { EventSource } from './event-source';
export interface EventStore {
    defs: EventDefHash;
    instances: EventInstanceHash;
}
export declare function parseEvents(rawEvents: EventInput[], eventSource: EventSource<any> | null, context: CalendarContext, allowOpenRange?: boolean): EventStore;
export declare function eventTupleToStore(tuple: EventTuple, eventStore?: EventStore): EventStore;
export declare function getRelevantEvents(eventStore: EventStore, instanceId: string): EventStore;
export declare function createEmptyEventStore(): EventStore;
export declare function mergeEventStores(store0: EventStore, store1: EventStore): EventStore;
export declare function filterEventStoreDefs(eventStore: EventStore, filterFunc: (eventDef: EventDef) => boolean): EventStore;
export declare function excludeSubEventStore(master: EventStore, sub: EventStore): EventStore;
//# sourceMappingURL=event-store.d.ts.map