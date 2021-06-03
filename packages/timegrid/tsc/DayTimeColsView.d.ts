import { createElement, DateProfileGenerator, DateProfile, DayTableModel } from '@fullcalendar/common';
import { TimeColsView } from './TimeColsView';
export declare class DayTimeColsView extends TimeColsView {
    private buildTimeColsModel;
    private buildSlatMetas;
    render(): createElement.JSX.Element;
}
export declare function buildTimeColsModel(dateProfile: DateProfile, dateProfileGenerator: DateProfileGenerator): DayTableModel;
//# sourceMappingURL=DayTimeColsView.d.ts.map