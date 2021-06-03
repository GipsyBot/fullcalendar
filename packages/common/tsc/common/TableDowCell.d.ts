import { createElement } from '../vdom';
import { DateFormatter } from '../datelib/DateFormatter';
import { BaseComponent } from '../vdom-util';
import { Dictionary } from '../options';
export interface TableDowCellProps {
    dow: number;
    dayHeaderFormat: DateFormatter;
    colSpan?: number;
    isSticky?: boolean;
    extraHookProps?: Dictionary;
    extraDataAttrs?: Dictionary;
    extraClassNames?: string[];
}
export declare class TableDowCell extends BaseComponent<TableDowCellProps> {
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=TableDowCell.d.ts.map