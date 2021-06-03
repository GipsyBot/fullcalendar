import { Seg, PointerDragEvent, Hit, EventMutation, EventStore, EventInteractionState, EventRenderRange, EventApi, Interaction, InteractionSettings, CalendarContext, ViewApi } from '@fullcalendar/common';
import { HitDragging } from './HitDragging';
import { FeaturefulElementDragging } from '../dnd/FeaturefulElementDragging';
export declare type EventDragStopArg = EventDragArg;
export declare type EventDragStartArg = EventDragArg;
export interface EventDragArg {
    el: HTMLElement;
    event: EventApi;
    jsEvent: MouseEvent;
    view: ViewApi;
}
export declare class EventDragging extends Interaction {
    static SELECTOR: string;
    dragging: FeaturefulElementDragging;
    hitDragging: HitDragging;
    subjectEl: HTMLElement | null;
    subjectSeg: Seg | null;
    isDragging: boolean;
    eventRange: EventRenderRange | null;
    relevantEvents: EventStore | null;
    receivingContext: CalendarContext | null;
    validMutation: EventMutation | null;
    mutatedRelevantEvents: EventStore | null;
    constructor(settings: InteractionSettings);
    destroy(): void;
    handlePointerDown: (ev: PointerDragEvent) => void;
    handleDragStart: (ev: PointerDragEvent) => void;
    handleHitUpdate: (hit: Hit | null, isFinal: boolean) => void;
    handlePointerUp: () => void;
    handleDragEnd: (ev: PointerDragEvent) => void;
    displayDrag(nextContext: CalendarContext | null, state: EventInteractionState): void;
    clearDrag(): void;
    cleanup(): void;
}
//# sourceMappingURL=EventDragging.d.ts.map