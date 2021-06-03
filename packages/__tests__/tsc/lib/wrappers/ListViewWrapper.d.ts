import { Calendar } from '@fullcalendar/core';
import { ViewWrapper } from './ViewWrapper';
export declare class ListViewWrapper extends ViewWrapper {
    static EVENT_DOT_CLASSNAME: string;
    constructor(calendar: Calendar);
    getEventEls(): HTMLElement[];
    getEventInfo(): {
        title: string;
        timeText: string;
    }[];
    getDayInfo(): {
        mainText: string;
        altText: string;
        date: Date;
    }[];
    getHeadingEls(): HTMLElement[];
    getScrollerEl(): Element;
    hasEmptyMessage(): boolean;
    getNavLinkEl(dayDate: any): Element;
    clickNavLink(dayDate: any): void;
}
//# sourceMappingURL=ListViewWrapper.d.ts.map