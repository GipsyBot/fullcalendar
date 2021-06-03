import { Rect, ScrollController } from '@fullcalendar/common';
export declare abstract class ScrollGeomCache extends ScrollController {
    clientRect: Rect;
    origScrollTop: number;
    origScrollLeft: number;
    protected scrollController: ScrollController;
    protected doesListening: boolean;
    protected scrollTop: number;
    protected scrollLeft: number;
    protected scrollWidth: number;
    protected scrollHeight: number;
    protected clientWidth: number;
    protected clientHeight: number;
    constructor(scrollController: ScrollController, doesListening: boolean);
    abstract getEventTarget(): EventTarget;
    abstract computeClientRect(): Rect;
    destroy(): void;
    handleScroll: () => void;
    getScrollTop(): number;
    getScrollLeft(): number;
    setScrollTop(top: number): void;
    setScrollLeft(top: number): void;
    getClientWidth(): number;
    getClientHeight(): number;
    getScrollWidth(): number;
    getScrollHeight(): number;
    handleScrollChange(): void;
}
//# sourceMappingURL=ScrollGeomCache.d.ts.map