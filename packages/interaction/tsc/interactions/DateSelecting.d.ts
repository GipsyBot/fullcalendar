import { Hit, DateSpan, PointerDragEvent, Interaction, InteractionSettings } from '@fullcalendar/common';
import { HitDragging } from './HitDragging';
import { FeaturefulElementDragging } from '../dnd/FeaturefulElementDragging';
export declare class DateSelecting extends Interaction {
    dragging: FeaturefulElementDragging;
    hitDragging: HitDragging;
    dragSelection: DateSpan | null;
    constructor(settings: InteractionSettings);
    destroy(): void;
    handlePointerDown: (ev: PointerDragEvent) => void;
    handleDragStart: (ev: PointerDragEvent) => void;
    handleHitUpdate: (hit: Hit | null, isFinal: boolean) => void;
    handlePointerUp: (pev: PointerDragEvent) => void;
}
//# sourceMappingURL=DateSelecting.d.ts.map