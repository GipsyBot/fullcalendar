import { DateProfile } from './DateProfileGenerator';
import { CalendarData } from './reducers/data-types';
import { RangeApiWithTimeZone } from './structs/date-span';
import { ViewApi } from './ViewApi';
export declare type DatesSetArg = RangeApiWithTimeZone & {
    view: ViewApi;
};
export declare function handleDateProfile(dateProfile: DateProfile, context: CalendarData): void;
//# sourceMappingURL=dates-set.d.ts.map