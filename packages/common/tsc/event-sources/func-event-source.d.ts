import { EventSourceError } from '../structs/event-source';
import { EventInput } from '../structs/event-parse';
export declare type EventSourceFunc = (arg: {
    start: Date;
    end: Date;
    startStr: string;
    endStr: string;
    timeZone: string;
}, successCallback: (events: EventInput[]) => void, failureCallback: (error: EventSourceError) => void) => (void | PromiseLike<EventInput[]>);
export declare const funcEventSourcePlugin: import("../plugin-system-struct").PluginDef;
//# sourceMappingURL=func-event-source.d.ts.map