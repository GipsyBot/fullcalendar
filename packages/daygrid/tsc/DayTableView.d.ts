import { createElement, DateProfileGenerator, DateProfile, DayTableModel } from '@fullcalendar/common';
import { TableView } from './TableView';
export declare class DayTableView extends TableView {
    private buildDayTableModel;
    private headerRef;
    private tableRef;
    render(): createElement.JSX.Element;
}
export declare function buildDayTableModel(dateProfile: DateProfile, dateProfileGenerator: DateProfileGenerator): DayTableModel;
//# sourceMappingURL=DayTableView.d.ts.map