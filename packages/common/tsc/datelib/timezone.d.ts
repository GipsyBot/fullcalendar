export declare abstract class NamedTimeZoneImpl {
    timeZoneName: string;
    constructor(timeZoneName: string);
    abstract offsetForArray(a: number[]): number;
    abstract timestampToArray(ms: number): number[];
}
export declare type NamedTimeZoneImplClass = {
    new (timeZoneName: string): NamedTimeZoneImpl;
};
//# sourceMappingURL=timezone.d.ts.map