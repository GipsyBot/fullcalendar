import { Rect } from '@fullcalendar/common';
export declare class ElementMirror {
    isVisible: boolean;
    origScreenX?: number;
    origScreenY?: number;
    deltaX?: number;
    deltaY?: number;
    sourceEl: HTMLElement | null;
    mirrorEl: HTMLElement | null;
    sourceElRect: Rect | null;
    parentNode: HTMLElement;
    zIndex: number;
    revertDuration: number;
    start(sourceEl: HTMLElement, pageX: number, pageY: number): void;
    handleMove(pageX: number, pageY: number): void;
    setIsVisible(bool: boolean): void;
    stop(needsRevertAnimation: boolean, callback: () => void): void;
    doRevertAnimation(callback: () => void, revertDuration: number): void;
    cleanup(): void;
    updateElPosition(): void;
    getMirrorEl(): HTMLElement;
}
//# sourceMappingURL=ElementMirror.d.ts.map