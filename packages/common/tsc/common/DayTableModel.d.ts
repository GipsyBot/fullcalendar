import { DaySeriesModel } from './DaySeriesModel';
import { DateRange } from '../datelib/date-range';
import { DateMarker } from '../datelib/marker';
import { Seg } from '../component/DateComponent';
import { Dictionary } from '../options';
export interface DayTableSeg extends Seg {
    row: number;
    firstCol: number;
    lastCol: number;
}
export interface DayTableCell {
    key: string;
    date: DateMarker;
    extraHookProps?: Dictionary;
    extraDataAttrs?: Dictionary;
    extraClassNames?: string[];
    extraDateSpan?: Dictionary;
}
export declare class DayTableModel {
    rowCnt: number;
    colCnt: number;
    cells: DayTableCell[][];
    headerDates: DateMarker[];
    private daySeries;
    constructor(daySeries: DaySeriesModel, breakOnWeeks: boolean);
    private buildCells;
    private buildCell;
    private buildHeaderDates;
    sliceRange(range: DateRange): DayTableSeg[];
}
//# sourceMappingURL=DayTableModel.d.ts.map