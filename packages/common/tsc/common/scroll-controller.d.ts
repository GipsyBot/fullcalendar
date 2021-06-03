export declare abstract class ScrollController {
    abstract getScrollTop(): number;
    abstract getScrollLeft(): number;
    abstract setScrollTop(top: number): void;
    abstract setScrollLeft(left: number): void;
    abstract getClientWidth(): number;
    abstract getClientHeight(): number;
    abstract getScrollWidth(): number;
    abstract getScrollHeight(): number;
    getMaxScrollTop(): number;
    getMaxScrollLeft(): number;
    canScrollVertically(): boolean;
    canScrollHorizontally(): boolean;
    canScrollUp(): boolean;
    canScrollDown(): boolean;
    canScrollLeft(): boolean;
    canScrollRight(): boolean;
}
export declare class ElementScrollController extends ScrollController {
    el: HTMLElement;
    constructor(el: HTMLElement);
    getScrollTop(): number;
    getScrollLeft(): number;
    setScrollTop(top: number): void;
    setScrollLeft(left: number): void;
    getScrollWidth(): number;
    getScrollHeight(): number;
    getClientHeight(): number;
    getClientWidth(): number;
}
export declare class WindowScrollController extends ScrollController {
    getScrollTop(): number;
    getScrollLeft(): number;
    setScrollTop(n: number): void;
    setScrollLeft(n: number): void;
    getScrollWidth(): number;
    getScrollHeight(): number;
    getClientHeight(): number;
    getClientWidth(): number;
}
//# sourceMappingURL=scroll-controller.d.ts.map