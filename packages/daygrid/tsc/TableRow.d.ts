/// <reference types="@fullcalendar/core-preact" />
import { EventSegUiInteractionState, VNode, DateComponent, createElement, PositionCache, DateRange, DateProfile, DayTableCell } from '@fullcalendar/common';
import { TableSeg } from './TableSeg';
import { TableSegPlacement } from './event-placement';
export interface TableRowProps {
    cells: DayTableCell[];
    renderIntro?: () => VNode;
    businessHourSegs: TableSeg[];
    bgEventSegs: TableSeg[];
    fgEventSegs: TableSeg[];
    dateSelectionSegs: TableSeg[];
    eventSelection: string;
    eventDrag: EventSegUiInteractionState | null;
    eventResize: EventSegUiInteractionState | null;
    dayMaxEvents: boolean | number;
    dayMaxEventRows: boolean | number;
    clientWidth: number | null;
    clientHeight: number | null;
    dateProfile: DateProfile;
    todayRange: DateRange;
    showDayNumbers: boolean;
    showWeekNumbers: boolean;
    forPrint: boolean;
}
interface TableRowState {
    framePositions: PositionCache;
    maxContentHeight: number | null;
    eventInstanceHeights: {
        [instanceId: string]: number;
    };
}
export declare class TableRow extends DateComponent<TableRowProps, TableRowState> {
    private cellElRefs;
    private frameElRefs;
    private fgElRefs;
    private segHarnessRefs;
    private rootElRef;
    state: TableRowState;
    render(): createElement.JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: TableRowProps, prevState: TableRowState): void;
    getHighlightSegs(): TableSeg[];
    getMirrorSegs(): TableSeg[];
    renderFgSegs(col: number, segPlacements: TableSegPlacement[], todayRange: DateRange, isForcedInvisible: {
        [instanceId: string]: any;
    }, isDragging?: boolean, isResizing?: boolean, isDateSelecting?: boolean): VNode[];
    renderFillSegs(segs: TableSeg[], fillType: string): VNode;
    updateSizing(isExternalSizingChange: any): void;
    queryEventInstanceHeights(): {
        [key: string]: number;
    };
    computeMaxContentHeight(): number;
    getCellEls(): HTMLTableCellElement[];
}
export {};
//# sourceMappingURL=TableRow.d.ts.map