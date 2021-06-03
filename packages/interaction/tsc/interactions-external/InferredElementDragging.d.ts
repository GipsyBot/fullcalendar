import { PointerDragEvent, ElementDragging } from '@fullcalendar/common';
import { PointerDragging } from '../dnd/PointerDragging';
export declare class InferredElementDragging extends ElementDragging {
    pointer: PointerDragging;
    shouldIgnoreMove: boolean;
    mirrorSelector: string;
    currentMirrorEl: HTMLElement | null;
    constructor(containerEl: HTMLElement);
    destroy(): void;
    handlePointerDown: (ev: PointerDragEvent) => void;
    handlePointerMove: (ev: PointerDragEvent) => void;
    handlePointerUp: (ev: PointerDragEvent) => void;
    setIgnoreMove(bool: boolean): void;
    setMirrorIsVisible(bool: boolean): void;
}
//# sourceMappingURL=InferredElementDragging.d.ts.map