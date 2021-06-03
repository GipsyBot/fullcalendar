import { DateMarker } from './marker';
export interface CalendarSystem {
    getMarkerYear(d: DateMarker): number;
    getMarkerMonth(d: DateMarker): number;
    getMarkerDay(d: DateMarker): number;
    arrayToMarker(arr: number[]): DateMarker;
    markerToArray(d: DateMarker): number[];
}
export declare function registerCalendarSystem(name: any, theClass: any): void;
export declare function createCalendarSystem(name: any): any;
//# sourceMappingURL=calendar-system.d.ts.map