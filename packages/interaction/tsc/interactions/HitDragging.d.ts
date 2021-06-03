import { Emitter, PointerDragEvent, Point, Hit, InteractionSettingsStore, ElementDragging } from '@fullcalendar/common';
import { OffsetTracker } from '../OffsetTracker';
export declare class HitDragging {
    droppableStore: InteractionSettingsStore;
    dragging: ElementDragging;
    emitter: Emitter<any>;
    useSubjectCenter: boolean;
    requireInitial: boolean;
    offsetTrackers: {
        [componentUid: string]: OffsetTracker;
    };
    initialHit: Hit | null;
    movingHit: Hit | null;
    finalHit: Hit | null;
    coordAdjust?: Point;
    constructor(dragging: ElementDragging, droppableStore: InteractionSettingsStore);
    handlePointerDown: (ev: PointerDragEvent) => void;
    processFirstCoord(ev: PointerDragEvent): void;
    handleDragStart: (ev: PointerDragEvent) => void;
    handleDragMove: (ev: PointerDragEvent) => void;
    handlePointerUp: (ev: PointerDragEvent) => void;
    handleDragEnd: (ev: PointerDragEvent) => void;
    handleMove(ev: PointerDragEvent, forceHandle?: boolean): void;
    prepareHits(): void;
    releaseHits(): void;
    queryHitForOffset(offsetLeft: number, offsetTop: number): Hit | null;
}
export declare function isHitsEqual(hit0: Hit | null, hit1: Hit | null): boolean;
//# sourceMappingURL=HitDragging.d.ts.map