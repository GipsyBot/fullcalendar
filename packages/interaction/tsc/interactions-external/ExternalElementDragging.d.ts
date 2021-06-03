import { Hit, PointerDragEvent, EventTuple, DatePointApi, EventInteractionState, DragMetaInput, DragMeta, ElementDragging, ViewApi, CalendarContext } from '@fullcalendar/common';
import { HitDragging } from '../interactions/HitDragging';
export declare type DragMetaGenerator = DragMetaInput | ((el: HTMLElement) => DragMetaInput);
export interface ExternalDropApi extends DatePointApi {
    draggedEl: HTMLElement;
    jsEvent: UIEvent;
    view: ViewApi;
}
export declare class ExternalElementDragging {
    hitDragging: HitDragging;
    receivingContext: CalendarContext | null;
    droppableEvent: EventTuple | null;
    suppliedDragMeta: DragMetaGenerator | null;
    dragMeta: DragMeta | null;
    constructor(dragging: ElementDragging, suppliedDragMeta?: DragMetaGenerator);
    handleDragStart: (ev: PointerDragEvent) => void;
    buildDragMeta(subjectEl: HTMLElement): DragMeta;
    handleHitUpdate: (hit: Hit | null, isFinal: boolean, ev: PointerDragEvent) => void;
    handleDragEnd: (pev: PointerDragEvent) => void;
    displayDrag(nextContext: CalendarContext | null, state: EventInteractionState): void;
    clearDrag(): void;
    canDropElOnCalendar(el: HTMLElement, receivingContext: CalendarContext): boolean;
}
//# sourceMappingURL=ExternalElementDragging.d.ts.map