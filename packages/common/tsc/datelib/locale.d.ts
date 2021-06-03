import { CalendarOptions, CalendarOptionsRefined } from '../options';
export declare type LocaleCodeArg = string | string[];
export declare type LocaleSingularArg = LocaleCodeArg | LocaleInput;
export interface Locale {
    codeArg: LocaleCodeArg;
    codes: string[];
    week: {
        dow: number;
        doy: number;
    };
    simpleNumberFormat: Intl.NumberFormat;
    options: CalendarOptionsRefined;
}
export interface LocaleInput extends CalendarOptions {
    code: string;
}
export declare type LocaleInputMap = {
    [code: string]: LocaleInput;
};
export interface RawLocaleInfo {
    map: LocaleInputMap;
    defaultCode: string;
}
export declare function organizeRawLocales(explicitRawLocales: LocaleInput[]): RawLocaleInfo;
export declare function buildLocale(inputSingular: LocaleSingularArg, available: LocaleInputMap): Locale;
//# sourceMappingURL=locale.d.ts.map