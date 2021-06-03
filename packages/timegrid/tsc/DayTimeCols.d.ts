/// <reference types="@fullcalendar/core-preact" />
import { createElement, VNode, DateComponent, DateProfile, EventStore, EventUiHash, EventInteractionState, DateSpan, DateRange, DayTableModel, DateEnv, CssDimValue, Duration } from '@fullcalendar/common';
import { TimeSlatMeta } from './time-slat-meta';
import { TimeColsSlatsCoords } from './TimeColsSlatsCoords';
export interface DayTimeColsProps {
    dateProfile: DateProfile;
    dayTableModel: DayTableModel;
    axis: boolean;
    slotDuration: Duration;
    slatMetas: TimeSlatMeta[];
    businessHours: EventStore;
    eventStore: EventStore;
    eventUiBases: EventUiHash;
    dateSelection: DateSpan | null;
    eventSelection: string;
    eventDrag: EventInteractionState | null;
    eventResize: EventInteractionState | null;
    tableColGroupNode: VNode;
    tableMinWidth: CssDimValue;
    clientWidth: number | null;
    clientHeight: number | null;
    expandRows: boolean;
    onScrollTopRequest?: (scrollTop: number) => void;
    forPrint: boolean;
    onSlatCoords?: (slatCoords: TimeColsSlatsCoords) => void;
}
export declare class DayTimeCols extends DateComponent<DayTimeColsProps> {
    private buildDayRanges;
    private slicer;
    private timeColsRef;
    render(): createElement.JSX.Element;
}
export declare function buildDayRanges(dayTableModel: DayTableModel, dateProfile: DateProfile, dateEnv: DateEnv): DateRange[];
//# sourceMappingURL=DayTimeCols.d.ts.map