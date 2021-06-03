import { Rect } from '@fullcalendar/common';
import { ScrollGeomCache } from './ScrollGeomCache';
export declare class WindowScrollGeomCache extends ScrollGeomCache {
    constructor(doesListening: boolean);
    getEventTarget(): EventTarget;
    computeClientRect(): Rect;
    handleScrollChange(): void;
}
//# sourceMappingURL=WindowScrollGeomCache.d.ts.map