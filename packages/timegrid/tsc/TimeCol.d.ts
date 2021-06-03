import { Ref, DateMarker, BaseComponent, createElement, EventSegUiInteractionState, Seg, DateRange, DateProfile, SegInput, SegEntryGroup, Dictionary } from '@fullcalendar/common';
import { TimeColsSeg } from './TimeColsSeg';
import { TimeColsSlatsCoords } from './TimeColsSlatsCoords';
import { TimeColSegRect } from './event-placement';
export interface TimeColProps {
    elRef?: Ref<HTMLTableCellElement>;
    dateProfile: DateProfile;
    date: DateMarker;
    nowDate: DateMarker;
    todayRange: DateRange;
    extraDataAttrs?: any;
    extraHookProps?: any;
    extraClassNames?: string[];
    extraDateSpan?: Dictionary;
    fgEventSegs: TimeColsSeg[];
    bgEventSegs: TimeColsSeg[];
    businessHourSegs: TimeColsSeg[];
    nowIndicatorSegs: TimeColsSeg[];
    dateSelectionSegs: TimeColsSeg[];
    eventSelection: string;
    eventDrag: EventSegUiInteractionState | null;
    eventResize: EventSegUiInteractionState | null;
    slatCoords: TimeColsSlatsCoords;
    forPrint: boolean;
}
export declare class TimeCol extends BaseComponent<TimeColProps> {
    sortEventSegs: (segs: any, eventOrderSpecs: import("@fullcalendar/common").OrderSpec<import("@fullcalendar/common").EventApi>[]) => Seg[];
    computeFgSegPlacements: (segInputs: SegInput[], strictOrder?: boolean, maxStackCnt?: number) => {
        segRects: TimeColSegRect[];
        hiddenGroups: SegEntryGroup[];
    };
    render(): createElement.JSX.Element;
    renderFgSegs(sortedFgSegs: TimeColsSeg[], segIsInvisible: {
        [instanceId: string]: any;
    }, isDragging?: boolean, isResizing?: boolean, isDateSelecting?: boolean): createElement.JSX.Element;
    renderPositionedFgSegs(segs: TimeColsSeg[], // if not mirror, needs to be sorted
    segIsInvisible: {
        [instanceId: string]: any;
    }, isDragging?: boolean, isResizing?: boolean, isDateSelecting?: boolean): createElement.JSX.Element;
    renderHiddenGroups(hiddenGroups: SegEntryGroup[], segs: TimeColsSeg[]): createElement.JSX.Element;
    buildSegInputs(segs: TimeColsSeg[]): SegInput[];
    renderFillSegs(segs: TimeColsSeg[], fillType: string): createElement.JSX.Element;
    renderNowIndicator(segs: TimeColsSeg[]): createElement.JSX.Element[];
    computeSegTopBottomCss(segLike: {
        spanStart: number;
        spanEnd: number;
    }): {
        top: number;
        bottom: number;
    };
    computeSegLeftRightCss(segRect: TimeColSegRect): {
        zIndex: number;
        left: string;
        right: string;
    };
}
export declare function renderPlainFgSegs(sortedFgSegs: TimeColsSeg[], { todayRange, nowDate, eventSelection, eventDrag, eventResize }: {
    todayRange: DateRange;
    nowDate: DateMarker;
    eventSelection: string;
    eventDrag: EventSegUiInteractionState | null;
    eventResize: EventSegUiInteractionState | null;
}): createElement.JSX.Element;
//# sourceMappingURL=TimeCol.d.ts.map