export declare class DayHeaderWrapper {
    el: HTMLElement;
    constructor(el: HTMLElement);
    getDates(): Date[];
    getCellEls(): HTMLElement[];
    getCellEl(dateOrDow: any): Element;
    getCellText(dateOrDow: any): string;
    getCellInfo(): {
        text: string;
        date: Date;
        isToday: boolean;
    }[];
    getNavLinkEls(): HTMLElement[];
    getNavLinkEl(dayDate: any): Element;
    clickNavLink(date: any): void;
}
//# sourceMappingURL=DayHeaderWrapper.d.ts.map