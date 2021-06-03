/// <reference types="@fullcalendar/core-preact" />
import { createElement, VNode, DateMarker, EventSegUiInteractionState, CssDimValue, PositionCache, ScrollRequest, DateRange, Duration, DateProfile, DayTableCell, Hit, DateComponent } from '@fullcalendar/common';
import { TimeSlatMeta } from './time-slat-meta';
import { TimeColsSlatsCoords } from './TimeColsSlatsCoords';
import { TimeColsSeg } from './TimeColsSeg';
export interface TimeColsProps {
    cells: DayTableCell[];
    dateProfile: DateProfile;
    slotDuration: Duration;
    nowDate: DateMarker;
    todayRange: DateRange;
    businessHourSegs: TimeColsSeg[];
    bgEventSegs: TimeColsSeg[];
    fgEventSegs: TimeColsSeg[];
    dateSelectionSegs: TimeColsSeg[];
    eventSelection: string;
    eventDrag: EventSegUiInteractionState | null;
    eventResize: EventSegUiInteractionState | null;
    tableColGroupNode: VNode;
    tableMinWidth: CssDimValue;
    clientWidth: number | null;
    clientHeight: number | null;
    expandRows: boolean;
    nowIndicatorSegs: TimeColsSeg[];
    onScrollTopRequest?: (scrollTop: number) => void;
    forPrint: boolean;
    axis: boolean;
    slatMetas: TimeSlatMeta[];
    onSlatCoords?: (slatCoords: TimeColsSlatsCoords) => void;
    isHitComboAllowed?: (hit0: Hit, hit1: Hit) => boolean;
}
interface TimeColsState {
    slatCoords: TimeColsSlatsCoords | null;
}
export declare class TimeCols extends DateComponent<TimeColsProps, TimeColsState> {
    private processSlotOptions;
    private scrollResponder;
    private colCoords;
    state: {
        slatCoords: any;
    };
    render(): createElement.JSX.Element;
    handleRootEl: (el: HTMLElement | null) => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: TimeColsProps): void;
    componentWillUnmount(): void;
    handleScrollRequest: (request: ScrollRequest) => boolean;
    handleColCoords: (colCoords: PositionCache | null) => void;
    handleSlatCoords: (slatCoords: TimeColsSlatsCoords | null) => void;
    queryHit(positionLeft: number, positionTop: number): Hit;
}
export {};
//# sourceMappingURL=TimeCols.d.ts.map