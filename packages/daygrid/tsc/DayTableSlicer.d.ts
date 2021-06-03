import { DayTableModel, DateRange, Slicer } from '@fullcalendar/common';
import { TableSeg } from './TableSeg';
export declare class DayTableSlicer extends Slicer<TableSeg, [DayTableModel]> {
    forceDayIfListItem: boolean;
    sliceRange(dateRange: DateRange, dayTableModel: DayTableModel): TableSeg[];
}
//# sourceMappingURL=DayTableSlicer.d.ts.map