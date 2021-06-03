import { DateRange } from '../datelib/date-range';
export interface EventInstance {
    instanceId: string;
    defId: string;
    range: DateRange;
    forcedStartTzo: number | null;
    forcedEndTzo: number | null;
}
export declare type EventInstanceHash = {
    [instanceId: string]: EventInstance;
};
export declare function createEventInstance(defId: string, range: DateRange, forcedStartTzo?: number, forcedEndTzo?: number): EventInstance;
//# sourceMappingURL=event-instance.d.ts.map