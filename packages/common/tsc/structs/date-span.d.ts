import { DateRange, OpenDateRange } from '../datelib/date-range';
import { DateInput, DateEnv } from '../datelib/env';
import { Duration } from '../datelib/duration';
import { EventRenderRange } from '../component/event-rendering';
import { EventUiHash } from '../component/event-ui';
import { CalendarContext } from '../CalendarContext';
export interface OpenDateSpanInput {
    start?: DateInput;
    end?: DateInput;
    allDay?: boolean;
    [otherProp: string]: any;
}
export interface DateSpanInput extends OpenDateSpanInput {
    start: DateInput;
    end: DateInput;
}
export interface OpenDateSpan {
    range: OpenDateRange;
    allDay: boolean;
    [otherProp: string]: any;
}
export interface DateSpan extends OpenDateSpan {
    range: DateRange;
}
export interface RangeApi {
    start: Date;
    end: Date;
    startStr: string;
    endStr: string;
}
export interface DateSpanApi extends RangeApi {
    allDay: boolean;
}
export interface RangeApiWithTimeZone extends RangeApi {
    timeZone: string;
}
export interface DatePointApi {
    date: Date;
    dateStr: string;
    allDay: boolean;
}
export declare function parseDateSpan(raw: DateSpanInput, dateEnv: DateEnv, defaultDuration?: Duration): DateSpan | null;
export declare function parseOpenDateSpan(raw: OpenDateSpanInput, dateEnv: DateEnv): OpenDateSpan | null;
export declare function isDateSpansEqual(span0: DateSpan, span1: DateSpan): boolean;
export declare function buildDateSpanApi(span: DateSpan, dateEnv: DateEnv): DateSpanApi;
export declare function buildRangeApiWithTimeZone(range: DateRange, dateEnv: DateEnv, omitTime?: boolean): RangeApiWithTimeZone;
export declare function buildRangeApi(range: DateRange, dateEnv: DateEnv, omitTime?: boolean): RangeApi;
export declare function fabricateEventRange(dateSpan: DateSpan, eventUiBases: EventUiHash, context: CalendarContext): EventRenderRange;
//# sourceMappingURL=date-span.d.ts.map