import { EventDef } from '../structs/event-def';
import { EventInstance } from '../structs/event-instance';
import { EventMutation } from '../structs/event-mutation';
import { CalendarContext } from '../CalendarContext';
import { EventStore } from '../structs/event-store';
import { Dictionary } from '../options';
import { DateInput, DurationInput, FormatterInput, EventSourceApi } from '../api-type-deps';
export declare class EventApi {
    _context: CalendarContext;
    _def: EventDef;
    _instance: EventInstance | null;
    constructor(context: CalendarContext, def: EventDef, instance?: EventInstance);
    setProp(name: string, val: string): void;
    setExtendedProp(name: string, val: any): void;
    setStart(startInput: DateInput, options?: {
        granularity?: string;
        maintainDuration?: boolean;
    }): void;
    setEnd(endInput: DateInput | null, options?: {
        granularity?: string;
    }): void;
    setDates(startInput: DateInput, endInput: DateInput | null, options?: {
        allDay?: boolean;
        granularity?: string;
    }): void;
    moveStart(deltaInput: DurationInput): void;
    moveEnd(deltaInput: DurationInput): void;
    moveDates(deltaInput: DurationInput): void;
    setAllDay(allDay: boolean, options?: {
        maintainDuration?: boolean;
    }): void;
    formatRange(formatInput: FormatterInput): string;
    mutate(mutation: EventMutation): void;
    remove(): void;
    get source(): EventSourceApi | null;
    get start(): Date | null;
    get end(): Date | null;
    get startStr(): string;
    get endStr(): string;
    get id(): string;
    get groupId(): string;
    get allDay(): boolean;
    get title(): string;
    get url(): string;
    get display(): string;
    get startEditable(): boolean;
    get durationEditable(): boolean;
    get constraint(): string | EventStore;
    get overlap(): boolean;
    get allow(): import("../api-type-deps").AllowFunc;
    get backgroundColor(): string;
    get borderColor(): string;
    get textColor(): string;
    get classNames(): string[];
    get extendedProps(): Record<string, any>;
    toPlainObject(settings?: {
        collapseExtendedProps?: boolean;
        collapseColor?: boolean;
    }): Dictionary;
    toJSON(): Record<string, any>;
}
export declare function eventApiToStore(eventApi: EventApi): EventStore;
export declare function buildEventApis(eventStore: EventStore, context: CalendarContext, excludeInstance?: EventInstance): EventApi[];
//# sourceMappingURL=EventApi.d.ts.map