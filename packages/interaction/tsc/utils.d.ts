import { DateSpan, CalendarContext, DatePointApi, DateEnv, ViewApi, EventApi } from '@fullcalendar/common';
export interface DropArg extends DatePointApi {
    draggedEl: HTMLElement;
    jsEvent: MouseEvent;
    view: ViewApi;
}
export declare type EventReceiveArg = EventReceiveLeaveArg;
export declare type EventLeaveArg = EventReceiveLeaveArg;
export interface EventReceiveLeaveArg {
    draggedEl: HTMLElement;
    event: EventApi;
    relatedEvents: EventApi[];
    revert: () => void;
    view: ViewApi;
}
export declare function buildDatePointApiWithContext(dateSpan: DateSpan, context: CalendarContext): DatePointApi;
export declare function buildDatePointApi(span: DateSpan, dateEnv: DateEnv): DatePointApi;
//# sourceMappingURL=utils.d.ts.map