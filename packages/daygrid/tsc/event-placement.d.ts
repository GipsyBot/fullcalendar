import { DayTableCell } from '@fullcalendar/common';
import { TableSeg } from './TableSeg';
export interface TableSegPlacement {
    seg: TableSeg;
    isVisible: boolean;
    isAbsolute: boolean;
    absoluteTop: number;
    marginTop: number;
}
export declare function computeFgSegPlacement(segs: TableSeg[], // assumed already sorted
dayMaxEvents: boolean | number, dayMaxEventRows: boolean | number, strictOrder: boolean, eventInstanceHeights: {
    [instanceId: string]: number;
}, maxContentHeight: number | null, cells: DayTableCell[]): {
    singleColPlacements: TableSegPlacement[][];
    multiColPlacements: TableSegPlacement[][];
    moreCnts: number[];
    moreMarginTops: number[];
};
//# sourceMappingURL=event-placement.d.ts.map