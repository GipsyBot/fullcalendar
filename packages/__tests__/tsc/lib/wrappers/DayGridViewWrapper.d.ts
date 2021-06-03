import { Calendar } from '@fullcalendar/core';
import { ViewWrapper } from './ViewWrapper';
import { DayGridWrapper } from './DayGridWrapper';
import { DayHeaderWrapper } from './DayHeaderWrapper';
export declare class DayGridViewWrapper extends ViewWrapper {
    constructor(calendar: Calendar);
    get header(): DayHeaderWrapper;
    get dayGrid(): DayGridWrapper;
    getScrollerEl(): HTMLElement;
}
//# sourceMappingURL=DayGridViewWrapper.d.ts.map