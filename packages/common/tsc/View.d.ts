import { DateProfile } from './DateProfileGenerator';
import { EventStore } from './structs/event-store';
import { EventUiHash } from './component/event-ui';
import { EventRenderRange } from './component/event-rendering';
import { DateSpan } from './structs/date-span';
import { EventInteractionState } from './interactions/event-interaction-state';
import { Duration } from './datelib/duration';
export interface ViewProps {
    dateProfile: DateProfile;
    businessHours: EventStore;
    eventStore: EventStore;
    eventUiBases: EventUiHash;
    dateSelection: DateSpan | null;
    eventSelection: string;
    eventDrag: EventInteractionState | null;
    eventResize: EventInteractionState | null;
    isHeightAuto: boolean;
    forPrint: boolean;
}
export declare function sliceEvents(props: ViewProps & {
    dateProfile: DateProfile;
    nextDayThreshold: Duration;
}, allDay?: boolean): EventRenderRange[];
//# sourceMappingURL=View.d.ts.map