import { PointerDragEvent } from './interactions/pointer';
import { DateSpanApi, DatePointApi, DateSpan } from './structs/date-span';
import { CalendarContext } from './CalendarContext';
import { ViewApi } from './ViewApi';
import { DateMarker } from './datelib/marker';
export interface DateClickApi extends DatePointApi {
    dayEl: HTMLElement;
    jsEvent: UIEvent;
    view: ViewApi;
}
export interface DateSelectionApi extends DateSpanApi {
    jsEvent: UIEvent;
    view: ViewApi;
}
export declare type DatePointTransform = (dateSpan: DateSpan, context: CalendarContext) => any;
export declare type DateSpanTransform = (dateSpan: DateSpan, context: CalendarContext) => any;
export declare type CalendarInteraction = {
    destroy: () => void;
};
export declare type CalendarInteractionClass = {
    new (context: CalendarContext): CalendarInteraction;
};
export declare type OptionChangeHandler = (propValue: any, context: CalendarContext) => void;
export declare type OptionChangeHandlerMap = {
    [propName: string]: OptionChangeHandler;
};
export interface DateSelectArg extends DateSpanApi {
    jsEvent: MouseEvent | null;
    view: ViewApi;
}
export declare function triggerDateSelect(selection: DateSpan, pev: PointerDragEvent | null, context: CalendarContext & {
    viewApi?: ViewApi;
}): void;
export interface DateUnselectArg {
    jsEvent: MouseEvent;
    view: ViewApi;
}
export declare function triggerDateUnselect(pev: PointerDragEvent | null, context: CalendarContext & {
    viewApi?: ViewApi;
}): void;
export declare function buildDateSpanApiWithContext(dateSpan: DateSpan, context: CalendarContext): DateSpanApi;
export declare function getDefaultEventEnd(allDay: boolean, marker: DateMarker, context: CalendarContext): DateMarker;
//# sourceMappingURL=calendar-utils.d.ts.map