import { DateMarker } from './marker';
import { CalendarSystem } from './calendar-system';
import { Locale } from './locale';
import { NamedTimeZoneImpl, NamedTimeZoneImplClass } from './timezone';
import { Duration } from './duration';
import { DateFormatter, CmdFormatterFunc } from './DateFormatter';
export declare type WeekNumberCalculation = 'local' | 'ISO' | ((m: Date) => number);
export interface DateEnvSettings {
    timeZone: string;
    namedTimeZoneImpl?: NamedTimeZoneImplClass;
    calendarSystem: string;
    locale: Locale;
    weekNumberCalculation?: WeekNumberCalculation;
    firstDay?: number;
    weekText?: string;
    cmdFormatter?: CmdFormatterFunc;
    defaultSeparator?: string;
}
export declare type DateInput = Date | string | number | number[];
export interface DateMarkerMeta {
    marker: DateMarker;
    isTimeUnspecified: boolean;
    forcedTzo: number | null;
}
export declare class DateEnv {
    timeZone: string;
    namedTimeZoneImpl: NamedTimeZoneImpl;
    canComputeOffset: boolean;
    calendarSystem: CalendarSystem;
    locale: Locale;
    weekDow: number;
    weekDoy: number;
    weekNumberFunc: any;
    weekText: string;
    cmdFormatter?: CmdFormatterFunc;
    defaultSeparator: string;
    constructor(settings: DateEnvSettings);
    createMarker(input: DateInput): DateMarker;
    createNowMarker(): DateMarker;
    createMarkerMeta(input: DateInput): DateMarkerMeta;
    parse(s: string): {
        marker: Date;
        isTimeUnspecified: boolean;
        forcedTzo: any;
    };
    getYear(marker: DateMarker): number;
    getMonth(marker: DateMarker): number;
    add(marker: DateMarker, dur: Duration): DateMarker;
    subtract(marker: DateMarker, dur: Duration): DateMarker;
    addYears(marker: DateMarker, n: number): Date;
    addMonths(marker: DateMarker, n: number): Date;
    diffWholeYears(m0: DateMarker, m1: DateMarker): number;
    diffWholeMonths(m0: DateMarker, m1: DateMarker): number;
    greatestWholeUnit(m0: DateMarker, m1: DateMarker): {
        unit: string;
        value: number;
    };
    countDurationsBetween(m0: DateMarker, m1: DateMarker, d: Duration): number;
    startOf(m: DateMarker, unit: string): Date;
    startOfYear(m: DateMarker): DateMarker;
    startOfMonth(m: DateMarker): DateMarker;
    startOfWeek(m: DateMarker): DateMarker;
    computeWeekNumber(marker: DateMarker): number;
    format(marker: DateMarker, formatter: DateFormatter, dateOptions?: {
        forcedTzo?: number;
    }): string;
    formatRange(start: DateMarker, end: DateMarker, formatter: DateFormatter, dateOptions?: {
        forcedStartTzo?: number;
        forcedEndTzo?: number;
        isEndExclusive?: boolean;
        defaultSeparator?: string;
    }): string;
    formatIso(marker: DateMarker, extraOptions?: any): string;
    timestampToMarker(ms: number): Date;
    offsetForMarker(m: DateMarker): number;
    toDate(m: DateMarker, forcedTzo?: number): Date;
}
//# sourceMappingURL=env.d.ts.map