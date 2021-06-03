/// <reference types="@fullcalendar/core-preact" />
import { BaseComponent } from '../vdom-util';
import { DateMarker } from '../datelib/marker';
import { VNode, createElement } from '../vdom';
import { DateProfile } from '../DateProfileGenerator';
import { DateFormatter } from '../datelib/DateFormatter';
export interface DayHeaderProps {
    dateProfile: DateProfile;
    dates: DateMarker[];
    datesRepDistinctDays: boolean;
    renderIntro?: (rowKey: string) => VNode;
}
export declare class DayHeader extends BaseComponent<DayHeaderProps> {
    createDayHeaderFormatter: (explicitFormat: DateFormatter, datesRepDistinctDays: any, dateCnt: any) => DateFormatter;
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=DayHeader.d.ts.map