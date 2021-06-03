import { Duration, DateMarker, DateEnv } from '@fullcalendar/common';
export interface TimeSlatMeta {
    date: DateMarker;
    time: Duration;
    key: string;
    isoTimeStr: string;
    isLabeled: boolean;
}
export declare function buildSlatMetas(slotMinTime: Duration, slotMaxTime: Duration, explicitLabelInterval: Duration | null, slotDuration: Duration, dateEnv: DateEnv): TimeSlatMeta[];
//# sourceMappingURL=time-slat-meta.d.ts.map