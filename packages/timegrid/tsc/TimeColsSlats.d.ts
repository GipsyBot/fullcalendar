/// <reference types="@fullcalendar/core-preact" />
import { createElement, VNode, BaseComponent, CssDimValue, DateProfile } from '@fullcalendar/common';
import { TimeSlatMeta } from './time-slat-meta';
import { TimeColsSlatsCoords } from './TimeColsSlatsCoords';
export interface TimeColsSlatsProps extends TimeColsSlatsContentProps {
    dateProfile: DateProfile;
    clientWidth: number | null;
    minHeight: CssDimValue;
    tableMinWidth: CssDimValue;
    tableColGroupNode: VNode;
    onCoords?: (coords: TimeColsSlatsCoords | null) => void;
}
interface TimeColsSlatsContentProps {
    axis: boolean;
    slatMetas: TimeSlatMeta[];
}
export declare class TimeColsSlats extends BaseComponent<TimeColsSlatsProps> {
    private rootElRef;
    private slatElRefs;
    render(): createElement.JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    updateSizing(): void;
}
export {};
//# sourceMappingURL=TimeColsSlats.d.ts.map