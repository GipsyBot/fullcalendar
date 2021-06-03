import { PositionCache, DateMarker, DateProfile, Duration } from '@fullcalendar/common';
export declare class TimeColsSlatsCoords {
    positions: PositionCache;
    private dateProfile;
    private slotDuration;
    constructor(positions: PositionCache, dateProfile: DateProfile, slotDuration: Duration);
    safeComputeTop(date: DateMarker): number;
    computeDateTop(when: DateMarker, startOfDayDate?: DateMarker): number;
    computeTimeTop(duration: Duration): number;
}
//# sourceMappingURL=TimeColsSlatsCoords.d.ts.map