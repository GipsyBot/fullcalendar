import { PointerDragEvent } from '@fullcalendar/common';
import { FeaturefulElementDragging } from '../dnd/FeaturefulElementDragging';
import { DragMetaGenerator } from './ExternalElementDragging';
export interface ExternalDraggableSettings {
    eventData?: DragMetaGenerator;
    itemSelector?: string;
    minDistance?: number;
    longPressDelay?: number;
    appendTo?: HTMLElement;
}
export declare class ExternalDraggable {
    dragging: FeaturefulElementDragging;
    settings: ExternalDraggableSettings;
    constructor(el: HTMLElement, settings?: ExternalDraggableSettings);
    handlePointerDown: (ev: PointerDragEvent) => void;
    handleDragStart: (ev: PointerDragEvent) => void;
    destroy(): void;
}
//# sourceMappingURL=ExternalDraggable.d.ts.map