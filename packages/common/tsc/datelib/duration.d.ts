export declare type DurationInput = DurationObjectInput | string | number;
export interface DurationObjectInput {
    years?: number;
    year?: number;
    months?: number;
    month?: number;
    weeks?: number;
    week?: number;
    days?: number;
    day?: number;
    hours?: number;
    hour?: number;
    minutes?: number;
    minute?: number;
    seconds?: number;
    second?: number;
    milliseconds?: number;
    millisecond?: number;
    ms?: number;
}
export interface Duration {
    years: number;
    months: number;
    days: number;
    milliseconds: number;
    specifiedWeeks?: boolean;
}
export declare function createDuration(input: DurationInput, unit?: string): Duration | null;
export declare function durationsEqual(d0: Duration, d1: Duration): boolean;
export declare function asCleanDays(dur: Duration): number;
export declare function addDurations(d0: Duration, d1: Duration): {
    years: number;
    months: number;
    days: number;
    milliseconds: number;
};
export declare function subtractDurations(d1: Duration, d0: Duration): Duration;
export declare function multiplyDuration(d: Duration, n: number): {
    years: number;
    months: number;
    days: number;
    milliseconds: number;
};
export declare function asRoughYears(dur: Duration): number;
export declare function asRoughMonths(dur: Duration): number;
export declare function asRoughDays(dur: Duration): number;
export declare function asRoughHours(dur: Duration): number;
export declare function asRoughMinutes(dur: Duration): number;
export declare function asRoughSeconds(dur: Duration): number;
export declare function asRoughMs(dur: Duration): number;
export declare function wholeDivideDurations(numerator: Duration, denominator: Duration): number;
export declare function greatestDurationDenominator(dur: Duration): {
    unit: string;
    value: number;
};
//# sourceMappingURL=duration.d.ts.map