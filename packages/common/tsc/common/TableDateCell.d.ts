import { DateRange } from '../datelib/date-range';
import { DateMarker } from '../datelib/marker';
import { createElement } from '../vdom';
import { DateFormatter } from '../datelib/DateFormatter';
import { BaseComponent } from '../vdom-util';
import { DateProfile } from '../DateProfileGenerator';
import { Dictionary } from '../options';
export interface TableDateCellProps {
    date: DateMarker;
    dateProfile: DateProfile;
    todayRange: DateRange;
    colCnt: number;
    dayHeaderFormat: DateFormatter;
    colSpan?: number;
    isSticky?: boolean;
    extraDataAttrs?: Dictionary;
    extraHookProps?: Dictionary;
}
export declare class TableDateCell extends BaseComponent<TableDateCellProps> {
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=TableDateCell.d.ts.map