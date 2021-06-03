export declare class TimeGridWrapper {
    el: HTMLElement;
    constructor(el: HTMLElement);
    getAllDayEls(): HTMLElement[];
    getMirrorEls(): HTMLElement[];
    getDayEls(date: any): HTMLElement[];
    getSlotEls(): HTMLElement[];
    getAxisTexts(): string[];
    getSlotAxisEls(): HTMLElement[];
    getSlotLaneEls(): HTMLElement[];
    getSlotElByIndex(index: any): HTMLElement[];
    getMainSlotTable(): HTMLElement;
    getSeparateSlotAxisTable(): HTMLElement;
    getSlotElByTime(timeMs: any): Element;
    getNonBusinessDayEls(): HTMLElement[];
    getColEl(col: any): HTMLElement;
    queryBgEventsInCol(col: any): HTMLElement[];
    queryNonBusinessSegsInCol(col: any): HTMLElement[];
    getHighlightEls(): HTMLElement[];
    getDowEls(dayAbbrev: any): HTMLElement[];
    isStructureValid(): boolean;
    getMoreEls(): HTMLElement[];
    openMorePopover(index?: any): void;
    getMorePopoverEl(): HTMLElement;
    getMorePopoverEventEls(): HTMLElement[];
    hasNowIndicator(): boolean;
    getNowIndicatorArrowEl(): Element;
    getNowIndicatorLineEl(): Element;
    getTimeAxisInfo(): {
        text: string;
        isMajor: boolean;
    }[];
    getLastMajorAxisInfo(): {
        text: string;
        isMajor: boolean;
    };
    dragEventToDate(eventEl: HTMLElement, dropDate: any, onBeforeRelease?: any): Promise<unknown>;
    resizeEvent(eventEl: HTMLElement, origEndDate: any, newEndDate: any, onBeforeRelease?: any): Promise<unknown>;
    resizeEventTouch(eventEl: HTMLElement, origEndDate: any, newEndDate: any): Promise<unknown>;
    selectDates(start: any, end: any): Promise<unknown>;
    selectDatesTouch(start: any, end: any): Promise<unknown>;
    clickDate(date: any): Promise<unknown>;
    getRect(start: any, end: any): {
        left: any;
        right: any;
        top: any;
        bottom: any;
    };
    getPoint(date: any, isEnd?: any): {
        left: number;
        top: any;
    };
    getLine(date: any): {
        left: any;
        right: any;
        top: any;
        bottom: any;
    };
    getTimeTop(targetTimeMs: any): any;
    computeSpanRects(start: any, end: any): any[];
    private computeDayInfo;
    private computeSlotInfo;
    getEventEls(): HTMLElement[];
    getFirstEventEl(): HTMLElement;
    getBgEventEls(): HTMLElement[];
    getEventTimeTexts(): string[];
    static getEventElInfo(eventEl: any): {
        title: string;
        timeText: string;
    };
    checkEventRendering(start: any, end: any): {
        rects: any[];
        els: HTMLElement[];
        length: number;
        isMatch: boolean;
    };
}
export declare function queryEventElInfo(eventEl: HTMLElement): {
    timeText: string;
    isShort: boolean;
};
//# sourceMappingURL=TimeGridWrapper.d.ts.map