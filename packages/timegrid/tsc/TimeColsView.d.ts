/// <reference types="@fullcalendar/core-preact" />
import { createElement, VNode, ChunkContentCallbackArgs, DateComponent, ViewProps, RefObject, CssDimValue } from '@fullcalendar/common';
import { AllDaySplitter } from './AllDaySplitter';
import { TimeSlatMeta } from './time-slat-meta';
import { TimeColsSlatsCoords } from './TimeColsSlatsCoords';
interface TimeColsViewState {
    slatCoords: TimeColsSlatsCoords | null;
}
export declare abstract class TimeColsView extends DateComponent<ViewProps, TimeColsViewState> {
    protected allDaySplitter: AllDaySplitter;
    protected headerElRef: RefObject<HTMLTableCellElement>;
    private rootElRef;
    private scrollerElRef;
    state: {
        slatCoords: any;
    };
    renderSimpleLayout(headerRowContent: VNode | null, allDayContent: ((contentArg: ChunkContentCallbackArgs) => VNode) | null, timeContent: ((contentArg: ChunkContentCallbackArgs) => VNode) | null): createElement.JSX.Element;
    renderHScrollLayout(headerRowContent: VNode | null, allDayContent: ((contentArg: ChunkContentCallbackArgs) => VNode) | null, timeContent: ((contentArg: ChunkContentCallbackArgs) => VNode) | null, colCnt: number, dayMinWidth: number, slatMetas: TimeSlatMeta[], slatCoords: TimeColsSlatsCoords | null): createElement.JSX.Element;
    handleScrollTopRequest: (scrollTop: number) => void;
    getAllDayMaxEventProps(): {
        dayMaxEvents: number | boolean;
        dayMaxEventRows: number | false;
    };
    renderHeadAxis: (rowKey: 'day' | string, frameHeight?: CssDimValue) => createElement.JSX.Element;
    renderTableRowAxis: (rowHeight?: number) => createElement.JSX.Element;
    handleSlatCoords: (slatCoords: TimeColsSlatsCoords) => void;
}
export {};
//# sourceMappingURL=TimeColsView.d.ts.map