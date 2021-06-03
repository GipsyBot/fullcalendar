import { EventSourceHash } from '../structs/event-source';
import { DateProfile } from '../DateProfileGenerator';
import { Action } from './Action';
import { CalendarContext } from '../CalendarContext';
export declare function initEventSources(calendarOptions: any, dateProfile: DateProfile, context: CalendarContext): EventSourceHash;
export declare function reduceEventSources(eventSources: EventSourceHash, action: Action, dateProfile: DateProfile, context: CalendarContext): EventSourceHash;
export declare function reduceEventSourcesNewTimeZone(eventSources: EventSourceHash, dateProfile: DateProfile, context: CalendarContext): EventSourceHash;
export declare function computeEventSourcesLoading(eventSources: EventSourceHash): boolean;
//# sourceMappingURL=eventSources.d.ts.map