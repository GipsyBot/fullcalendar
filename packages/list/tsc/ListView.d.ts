import { createElement, ViewProps, DateMarker, DateRange, EventUiHash, EventRenderRange, EventStore, Seg, DateComponent, ViewApi, MountArg } from '@fullcalendar/common';
export interface NoEventsContentArg {
    text: string;
    view: ViewApi;
}
export declare type NoEventsMountArg = MountArg<NoEventsContentArg>;
export declare class ListView extends DateComponent<ViewProps> {
    private computeDateVars;
    private eventStoreToSegs;
    render(): createElement.JSX.Element;
    setRootEl: (rootEl: HTMLDivElement | null) => void;
    renderEmptyMessage(): createElement.JSX.Element;
    renderSegList(allSegs: Seg[], dayDates: DateMarker[]): createElement.JSX.Element;
    _eventStoreToSegs(eventStore: EventStore, eventUiBases: EventUiHash, dayRanges: DateRange[]): Seg[];
    eventRangesToSegs(eventRanges: EventRenderRange[], dayRanges: DateRange[]): any[];
    eventRangeToSegs(eventRange: EventRenderRange, dayRanges: DateRange[]): any[];
}
//# sourceMappingURL=ListView.d.ts.map