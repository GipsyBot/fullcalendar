import { EventSource } from '../structs/event-source';
import { CalendarContext } from '../CalendarContext';
export declare class EventSourceApi {
    private context;
    internalEventSource: EventSource<any>;
    constructor(context: CalendarContext, internalEventSource: EventSource<any>);
    remove(): void;
    refetch(): void;
    get id(): string;
    get url(): string;
    get format(): string;
}
//# sourceMappingURL=EventSourceApi.d.ts.map