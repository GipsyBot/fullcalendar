import { createElement, BaseComponent, RefMap } from '@fullcalendar/common';
import { TimeSlatMeta } from './time-slat-meta';
export interface TimeColsSlatsBodyProps {
    axis: boolean;
    slatMetas: TimeSlatMeta[];
    slatElRefs: RefMap<HTMLTableRowElement>;
}
export declare class TimeColsSlatsBody extends BaseComponent<TimeColsSlatsBodyProps> {
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=TimeColsSlatsBody.d.ts.map