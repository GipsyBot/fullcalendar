import { CalendarOptionsRefined } from '../options';
export declare class Theme {
    classes: any;
    iconClasses: any;
    rtlIconClasses: any;
    baseIconClass: string;
    iconOverrideOption: any;
    iconOverrideCustomButtonOption: any;
    iconOverridePrefix: string;
    constructor(calendarOptions: CalendarOptionsRefined);
    setIconOverride(iconOverrideHash: any): void;
    applyIconOverridePrefix(className: any): any;
    getClass(key: any): any;
    getIconClass(buttonName: any, isRtl?: boolean): string;
    getCustomButtonIconClass(customButtonProps: any): string;
}
export declare type ThemeClass = {
    new (calendarOptions: any): Theme;
};
//# sourceMappingURL=Theme.d.ts.map