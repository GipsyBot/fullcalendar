/// <reference types="@fullcalendar/core-preact" />
import { createElement, VNode, EventStore, EventUiHash, DateSpan, EventInteractionState, DayTableModel, Duration, DateComponent, ViewContext, RefObject, CssDimValue, DateProfile } from '@fullcalendar/common';
export interface DayTableProps {
    dateProfile: DateProfile;
    dayTableModel: DayTableModel;
    nextDayThreshold: Duration;
    businessHours: EventStore;
    eventStore: EventStore;
    eventUiBases: EventUiHash;
    dateSelection: DateSpan | null;
    eventSelection: string;
    eventDrag: EventInteractionState | null;
    eventResize: EventInteractionState | null;
    colGroupNode: VNode;
    tableMinWidth: CssDimValue;
    renderRowIntro?: () => VNode;
    dayMaxEvents: boolean | number;
    dayMaxEventRows: boolean | number;
    expandRows: boolean;
    showWeekNumbers: boolean;
    headerAlignElRef?: RefObject<HTMLElement>;
    clientWidth: number | null;
    clientHeight: number | null;
    forPrint: boolean;
}
export declare class DayTable extends DateComponent<DayTableProps, ViewContext> {
    private slicer;
    private tableRef;
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=DayTable.d.ts.map