import { ViewWrapper } from './ViewWrapper';
import { TimeGridWrapper } from './TimeGridWrapper';
import { DayGridWrapper } from './DayGridWrapper';
import { DayHeaderWrapper } from './DayHeaderWrapper';
export declare class TimeGridViewWrapper extends ViewWrapper {
    constructor(calendar: any);
    get header(): DayHeaderWrapper;
    get timeGrid(): TimeGridWrapper;
    get dayGrid(): DayGridWrapper;
    getScrollerEl(): HTMLElement;
    getHeaderAxisEl(): Element;
    getHeaderWeekNumberLink(): HTMLAnchorElement;
    getHeaderWeekText(): string;
    getAllDayAxisEl(): Element;
    getAllDayAxisElText(): string;
}
//# sourceMappingURL=TimeGridViewWrapper.d.ts.map