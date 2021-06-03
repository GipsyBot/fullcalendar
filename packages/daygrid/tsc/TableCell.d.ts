import { Ref, ComponentChildren, createElement, DateMarker, DateComponent, DateRange, DateProfile, Dictionary, EventSegUiInteractionState } from '@fullcalendar/common';
import { TableSegPlacement } from './event-placement';
export interface TableCellProps {
    date: DateMarker;
    dateProfile: DateProfile;
    extraHookProps?: Dictionary;
    extraDataAttrs?: Dictionary;
    extraClassNames?: string[];
    extraDateSpan?: Dictionary;
    elRef?: Ref<HTMLTableCellElement>;
    innerElRef?: Ref<HTMLDivElement>;
    bgContent: ComponentChildren;
    fgContentElRef?: Ref<HTMLDivElement>;
    fgContent: ComponentChildren;
    moreCnt: number;
    moreMarginTop: number;
    showDayNumber: boolean;
    showWeekNumber: boolean;
    forceDayTop: boolean;
    todayRange: DateRange;
    eventSelection: string;
    eventDrag: EventSegUiInteractionState | null;
    eventResize: EventSegUiInteractionState | null;
    singlePlacements: TableSegPlacement[];
}
export declare class TableCell extends DateComponent<TableCellProps> {
    private rootElRef;
    render(): createElement.JSX.Element;
    handleRootEl: (el: HTMLElement) => void;
}
//# sourceMappingURL=TableCell.d.ts.map