import { Seg, Hit, EventMutation, PointerDragEvent, EventStore, EventApi, EventRenderRange, Interaction, InteractionSettings, ViewApi, Duration, EventChangeArg } from '@fullcalendar/common';
import { HitDragging } from './HitDragging';
import { FeaturefulElementDragging } from '../dnd/FeaturefulElementDragging';
export declare type EventResizeStartArg = EventResizeStartStopArg;
export declare type EventResizeStopArg = EventResizeStartStopArg;
export interface EventResizeStartStopArg {
    el: HTMLElement;
    event: EventApi;
    jsEvent: MouseEvent;
    view: ViewApi;
}
export interface EventResizeDoneArg extends EventChangeArg {
    el: HTMLElement;
    startDelta: Duration;
    endDelta: Duration;
    jsEvent: MouseEvent;
    view: ViewApi;
}
export declare class EventResizing extends Interaction {
    dragging: FeaturefulElementDragging;
    hitDragging: HitDragging;
    draggingSegEl: HTMLElement | null;
    draggingSeg: Seg | null;
    eventRange: EventRenderRange | null;
    relevantEvents: EventStore | null;
    validMutation: EventMutation | null;
    mutatedRelevantEvents: EventStore | null;
    constructor(settings: InteractionSettings);
    destroy(): void;
    handlePointerDown: (ev: PointerDragEvent) => void;
    handleDragStart: (ev: PointerDragEvent) => void;
    handleHitUpdate: (hit: Hit | null, isFinal: boolean, ev: PointerDragEvent) => void;
    handleDragEnd: (ev: PointerDragEvent) => void;
    querySegEl(ev: PointerDragEvent): HTMLElement;
}
//# sourceMappingURL=EventResizing.d.ts.map