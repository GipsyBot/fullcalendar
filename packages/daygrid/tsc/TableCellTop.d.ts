import { createElement, DateMarker, DateRange, BaseComponent, DateProfile, Dictionary } from '@fullcalendar/common';
interface TableCellTopProps {
    date: DateMarker;
    dateProfile: DateProfile;
    showDayNumber: boolean;
    forceDayTop: boolean;
    todayRange: DateRange;
    extraHookProps?: Dictionary;
}
export declare class TableCellTop extends BaseComponent<TableCellTopProps> {
    render(): createElement.JSX.Element;
}
export {};
//# sourceMappingURL=TableCellTop.d.ts.map