import { DateSpan } from './structs/date-span';
import { EventInteractionState } from './interactions/event-interaction-state';
import { SplittableProps } from './component/event-splitting';
import { CalendarContext } from './CalendarContext';
import { DateProfile } from './DateProfileGenerator';
export declare function isInteractionValid(interaction: EventInteractionState, dateProfile: DateProfile, context: CalendarContext): boolean;
export declare function isDateSelectionValid(dateSelection: DateSpan, dateProfile: DateProfile, context: CalendarContext): boolean;
export declare function isPropsValid(state: SplittableProps, context: CalendarContext, dateSpanMeta?: {}, filterConfig?: any): boolean;
//# sourceMappingURL=validation.d.ts.map