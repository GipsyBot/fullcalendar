import { Splitter, EventDef, DateSpan } from '@fullcalendar/common';
export declare class AllDaySplitter extends Splitter {
    getKeyInfo(): {
        allDay: {};
        timed: {};
    };
    getKeysForDateSpan(dateSpan: DateSpan): string[];
    getKeysForEventDef(eventDef: EventDef): string[];
}
//# sourceMappingURL=AllDaySplitter.d.ts.map