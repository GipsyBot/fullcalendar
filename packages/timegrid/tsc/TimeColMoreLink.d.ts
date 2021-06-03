import { createElement, BaseComponent, Dictionary, DateProfile, DateRange, DateMarker, EventSegUiInteractionState } from '@fullcalendar/common';
import { TimeColsSeg } from './TimeColsSeg';
export interface TimeColMoreLinkProps {
    hiddenSegs: TimeColsSeg[];
    top: number;
    bottom: number;
    extraDateSpan?: Dictionary;
    dateProfile: DateProfile;
    todayRange: DateRange;
    nowDate: DateMarker;
    eventSelection: string;
    eventDrag: EventSegUiInteractionState;
    eventResize: EventSegUiInteractionState;
}
export declare class TimeColMoreLink extends BaseComponent<TimeColMoreLinkProps> {
    rootElRef: import("preact").RefObject<HTMLElement>;
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=TimeColMoreLink.d.ts.map