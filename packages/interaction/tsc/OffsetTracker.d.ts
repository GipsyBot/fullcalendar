import { Rect } from '@fullcalendar/common';
import { ElementScrollGeomCache } from './ElementScrollGeomCache';
export declare class OffsetTracker {
    scrollCaches: ElementScrollGeomCache[];
    origRect: Rect;
    constructor(el: HTMLElement);
    destroy(): void;
    computeLeft(): number;
    computeTop(): number;
    isWithinClipping(pageX: number, pageY: number): boolean;
}
//# sourceMappingURL=OffsetTracker.d.ts.map