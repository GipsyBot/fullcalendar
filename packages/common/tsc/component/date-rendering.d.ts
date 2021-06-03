import { DateMarker } from '../datelib/marker';
import { DateRange } from '../datelib/date-range';
import { DateProfile } from '../DateProfileGenerator';
import { Theme } from '../theme/Theme';
export interface DateMeta {
    dow: number;
    isDisabled: boolean;
    isOther: boolean;
    isToday: boolean;
    isPast: boolean;
    isFuture: boolean;
}
export declare function getDateMeta(date: DateMarker, todayRange?: DateRange, nowDate?: DateMarker, dateProfile?: DateProfile): DateMeta;
export declare function getDayClassNames(meta: DateMeta, theme: Theme): string[];
export declare function getSlotClassNames(meta: DateMeta, theme: Theme): string[];
//# sourceMappingURL=date-rendering.d.ts.map