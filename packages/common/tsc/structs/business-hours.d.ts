import { EventInput } from './event-parse';
import { EventStore } from './event-store';
import { CalendarContext } from '../CalendarContext';
export declare type BusinessHoursInput = boolean | EventInput | EventInput[];
export declare function parseBusinessHours(input: BusinessHoursInput, context: CalendarContext): EventStore;
//# sourceMappingURL=business-hours.d.ts.map