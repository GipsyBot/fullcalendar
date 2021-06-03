import { Identity, EventDropArg } from '@fullcalendar/common';
import { DateClickArg, EventDragStartArg, EventDragStopArg, EventResizeStartArg, EventResizeStopArg, EventResizeDoneArg, DropArg, EventReceiveArg, EventLeaveArg } from './api-type-deps';
export declare const OPTION_REFINERS: {
    fixedMirrorParent: Identity<HTMLElement>;
};
export declare const LISTENER_REFINERS: {
    dateClick: Identity<(arg: DateClickArg) => void>;
    eventDragStart: Identity<(arg: EventDragStartArg) => void>;
    eventDragStop: Identity<(arg: EventDragStopArg) => void>;
    eventDrop: Identity<(arg: EventDropArg) => void>;
    eventResizeStart: Identity<(arg: EventResizeStartArg) => void>;
    eventResizeStop: Identity<(arg: EventResizeStopArg) => void>;
    eventResize: Identity<(arg: EventResizeDoneArg) => void>;
    drop: Identity<(arg: DropArg) => void>;
    eventReceive: Identity<(arg: EventReceiveArg) => void>;
    eventLeave: Identity<(arg: EventLeaveArg) => void>;
};
//# sourceMappingURL=options.d.ts.map