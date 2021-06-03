/// <reference types="@fullcalendar/core-preact" />
import { EventSegUiInteractionState, VNode, DateComponent, RefObject, CssDimValue, createElement, DateProfile, Hit, DayTableCell } from '@fullcalendar/common';
import { TableSeg } from './TableSeg';
export interface TableProps {
    dateProfile: DateProfile;
    cells: DayTableCell[][];
    renderRowIntro?: () => VNode;
    colGroupNode: VNode;
    tableMinWidth: CssDimValue;
    expandRows: boolean;
    showWeekNumbers: boolean;
    clientWidth: number | null;
    clientHeight: number | null;
    businessHourSegs: TableSeg[];
    bgEventSegs: TableSeg[];
    fgEventSegs: TableSeg[];
    dateSelectionSegs: TableSeg[];
    eventSelection: string;
    eventDrag: EventSegUiInteractionState | null;
    eventResize: EventSegUiInteractionState | null;
    dayMaxEvents: boolean | number;
    dayMaxEventRows: boolean | number;
    headerAlignElRef?: RefObject<HTMLElement>;
    forPrint: boolean;
    isHitComboAllowed?: (hit0: Hit, hit1: Hit) => boolean;
}
export declare class Table extends DateComponent<TableProps> {
    private splitBusinessHourSegs;
    private splitBgEventSegs;
    private splitFgEventSegs;
    private splitDateSelectionSegs;
    private splitEventDrag;
    private splitEventResize;
    private rootEl;
    private rowRefs;
    private rowPositions;
    private colPositions;
    render(): createElement.JSX.Element;
    handleRootEl: (rootEl: HTMLElement | null) => void;
    prepareHits(): void;
    queryHit(positionLeft: number, positionTop: number): Hit;
    private getCellEl;
    private getCellRange;
}
//# sourceMappingURL=Table.d.ts.map