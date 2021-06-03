import { DateRange } from '../datelib/date-range';
import { DateEnv } from '../datelib/env';
import { Duration } from '../datelib/duration';
import { DateMarker } from '../datelib/marker';
import { EventStore } from './event-store';
import { CalendarContext } from '../CalendarContext';
import { EventRefined } from './event-parse';
export interface ParsedRecurring<RecurringData> {
    typeData: RecurringData;
    allDayGuess: boolean | null;
    duration: Duration | null;
}
export interface RecurringType<RecurringData> {
    parse: (refined: EventRefined, dateEnv: DateEnv) => ParsedRecurring<RecurringData> | null;
    expand: (typeData: any, framingRange: DateRange, dateEnv: DateEnv) => DateMarker[];
}
export declare function parseRecurring(refined: EventRefined, defaultAllDay: boolean | null, dateEnv: DateEnv, recurringTypes: RecurringType<any>[]): {
    allDay: boolean;
    duration: Duration;
    typeData: any;
    typeId: number;
};
export declare function expandRecurring(eventStore: EventStore, framingRange: DateRange, context: CalendarContext): EventStore;
//# sourceMappingURL=recurring-event.d.ts.map