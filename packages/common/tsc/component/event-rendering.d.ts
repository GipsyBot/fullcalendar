import { EventDef, EventDefHash } from '../structs/event-def';
import { EventTuple } from '../structs/event-parse';
import { EventStore } from '../structs/event-store';
import { DateRange } from '../datelib/date-range';
import { Duration } from '../datelib/duration';
import { OrderSpec } from '../util/misc';
import { Seg } from './DateComponent';
import { EventApi } from '../api/EventApi';
import { EventUi, EventUiHash } from './event-ui';
import { ViewContext } from '../ViewContext';
import { DateFormatter } from '../datelib/DateFormatter';
import { DateMarker } from '../datelib/marker';
import { ViewApi } from '../ViewApi';
import { MountArg } from '../common/render-hook';
export interface EventRenderRange extends EventTuple {
    ui: EventUi;
    range: DateRange;
    isStart: boolean;
    isEnd: boolean;
}
export declare function sliceEventStore(eventStore: EventStore, eventUiBases: EventUiHash, framingRange: DateRange, nextDayThreshold?: Duration): {
    bg: EventRenderRange[];
    fg: EventRenderRange[];
};
export declare function hasBgRendering(def: EventDef): boolean;
export declare function setElSeg(el: HTMLElement, seg: Seg): void;
export declare function getElSeg(el: HTMLElement): Seg | null;
export declare function compileEventUis(eventDefs: EventDefHash, eventUiBases: EventUiHash): {
    [key: string]: EventUi;
};
export declare function compileEventUi(eventDef: EventDef, eventUiBases: EventUiHash): EventUi;
export declare function sortEventSegs(segs: any, eventOrderSpecs: OrderSpec<EventApi>[]): Seg[];
export declare function buildSegCompareObj(seg: Seg): {
    id: string;
    start: number;
    end: number;
    duration: number;
    allDay: number;
    _seg: Seg;
    defId: string;
    sourceId: string;
    publicId: string;
    groupId: string;
    hasEnd: boolean;
    recurringDef: {
        typeId: number;
        typeData: any;
        duration: Duration;
    };
    title: string;
    url: string;
    ui: EventUi;
    extendedProps: Record<string, any>;
};
export interface EventContentArg {
    event: EventApi;
    timeText: string;
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    isDraggable: boolean;
    isStartResizable: boolean;
    isEndResizable: boolean;
    isMirror: boolean;
    isStart: boolean;
    isEnd: boolean;
    isPast: boolean;
    isFuture: boolean;
    isToday: boolean;
    isSelected: boolean;
    isDragging: boolean;
    isResizing: boolean;
    view: ViewApi;
}
export declare type EventMountArg = MountArg<EventContentArg>;
export declare function computeSegDraggable(seg: Seg, context: ViewContext): boolean;
export declare function computeSegStartResizable(seg: Seg, context: ViewContext): boolean;
export declare function computeSegEndResizable(seg: Seg, context: ViewContext): boolean;
export declare function buildSegTimeText(seg: Seg, timeFormat: DateFormatter, context: ViewContext, defaultDisplayEventTime?: boolean, // defaults to true
defaultDisplayEventEnd?: boolean, // defaults to true
startOverride?: DateMarker, endOverride?: DateMarker): string;
export declare function getSegMeta(seg: Seg, todayRange: DateRange, nowDate?: DateMarker): {
    isPast: boolean;
    isFuture: boolean;
    isToday: boolean;
};
export declare function getEventClassNames(props: EventContentArg): string[];
export declare function buildEventRangeKey(eventRange: EventRenderRange): string;
//# sourceMappingURL=event-rendering.d.ts.map