import { DateMeta } from './component/date-rendering';
import { Duration } from './datelib/duration';
import { ViewApi } from './ViewApi';
import { MountArg } from './common/render-hook';
export interface SlotLaneContentArg extends Partial<DateMeta> {
    time?: Duration;
    date?: Date;
    view: ViewApi;
}
export declare type SlotLaneMountArg = MountArg<SlotLaneContentArg>;
export interface SlotLabelContentArg {
    level: number;
    time: Duration;
    date: Date;
    view: ViewApi;
    text: string;
}
export declare type SlotLabelMountArg = MountArg<SlotLabelContentArg>;
export interface AllDayContentArg {
    text: string;
    view: ViewApi;
}
export declare type AllDayMountArg = MountArg<AllDayContentArg>;
export interface DayHeaderContentArg extends DateMeta {
    date: Date;
    view: ViewApi;
    text: string;
    [otherProp: string]: any;
}
export declare type DayHeaderMountArg = MountArg<DayHeaderContentArg>;
//# sourceMappingURL=render-hook-misc.d.ts.map