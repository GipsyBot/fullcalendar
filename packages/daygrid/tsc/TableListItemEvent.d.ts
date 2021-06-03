import { createElement, BaseComponent, Seg } from '@fullcalendar/common';
export interface DotTableEventProps {
    seg: Seg;
    isDragging: boolean;
    isSelected: boolean;
    isPast: boolean;
    isFuture: boolean;
    isToday: boolean;
    defaultDisplayEventEnd: boolean;
}
export declare class TableListItemEvent extends BaseComponent<DotTableEventProps> {
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=TableListItemEvent.d.ts.map