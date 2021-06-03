import { DateProfile } from '../DateProfileGenerator';
import { DateSpan } from '../structs/date-span';
import { Rect } from '../util/geom';
import { ViewContext } from '../ViewContext';
export interface Hit {
    componentId?: string;
    context?: ViewContext;
    dateProfile: DateProfile;
    dateSpan: DateSpan;
    dayEl: HTMLElement;
    rect: Rect;
    layer: number;
    largeUnit?: string;
}
//# sourceMappingURL=hit.d.ts.map