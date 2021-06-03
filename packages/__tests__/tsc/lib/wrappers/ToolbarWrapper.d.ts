export declare class ToolbarWrapper {
    private el;
    constructor(el: HTMLElement);
    getButtonEnabled(name: any): boolean;
    getButtonInfo(name: any, iconPrefix?: string): {
        text: string;
        iconEl: Element;
        iconName: string;
    };
    getButtonEl(name: any): Element;
    getTitleText(): string;
    getSectionContent(index: any): any;
}
//# sourceMappingURL=ToolbarWrapper.d.ts.map