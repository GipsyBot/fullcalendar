import { EventInstanceHash } from '../structs/event-instance';
import { EventStore } from '../structs/event-store';
import { Action } from './Action';
import { EventSourceHash } from '../structs/event-source';
import { DateProfile } from '../DateProfileGenerator';
import { DateEnv } from '../datelib/env';
import { CalendarContext } from '../CalendarContext';
export declare function reduceEventStore(eventStore: EventStore, action: Action, eventSources: EventSourceHash, dateProfile: DateProfile, context: CalendarContext): EventStore;
export declare function rezoneEventStoreDates(eventStore: EventStore, oldDateEnv: DateEnv, newDateEnv: DateEnv): EventStore;
export declare function excludeInstances(eventStore: EventStore, removals: EventInstanceHash): EventStore;
//# sourceMappingURL=eventStore.d.ts.map