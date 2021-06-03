import { EventInput, EventInputTransformer } from './event-parse';
import { DateRange } from '../datelib/date-range';
import { EventUi } from '../component/event-ui';
import { CalendarContext } from '../CalendarContext';
import { CalendarApi } from '../CalendarApi';
import { Dictionary } from '../options';
export declare type EventSourceError = {
    message: string;
    response?: any;
    [otherProp: string]: any;
};
export declare type EventSourceSuccessResponseHandler = (this: CalendarApi, rawData: any, response: any) => EventInput[] | void;
export declare type EventSourceErrorResponseHandler = (error: EventSourceError) => void;
export interface EventSource<Meta> {
    _raw: any;
    sourceId: string;
    sourceDefId: number;
    meta: Meta;
    publicId: string;
    isFetching: boolean;
    latestFetchId: string;
    fetchRange: DateRange | null;
    defaultAllDay: boolean | null;
    eventDataTransform: EventInputTransformer;
    ui: EventUi;
    success: EventSourceSuccessResponseHandler | null;
    failure: EventSourceErrorResponseHandler | null;
    extendedProps: Dictionary;
}
export declare type EventSourceHash = {
    [sourceId: string]: EventSource<any>;
};
export declare type EventSourceFetcher<Meta> = (arg: {
    eventSource: EventSource<Meta>;
    range: DateRange;
    isRefetch: boolean;
    context: CalendarContext;
}, success: (res: {
    rawEvents: EventInput[];
    xhr?: XMLHttpRequest;
}) => void, failure: (error: EventSourceError) => void) => (void | PromiseLike<EventInput[]>);
//# sourceMappingURL=event-source.d.ts.map