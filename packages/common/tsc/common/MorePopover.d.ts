import { DateComponent } from '../component/DateComponent';
import { DateRange } from '../datelib/date-range';
import { DateMarker } from '../datelib/marker';
import { DateProfile } from '../DateProfileGenerator';
import { Hit } from '../interactions/hit';
import { Dictionary } from '../options';
import { createElement, ComponentChildren } from '../vdom';
export interface MorePopoverProps {
    startDate: DateMarker;
    endDate: DateMarker;
    dateProfile: DateProfile;
    parentEl: HTMLElement;
    alignmentEl: HTMLElement;
    alignGridTop?: boolean;
    todayRange: DateRange;
    extraDateSpan: Dictionary;
    children: ComponentChildren;
    onClose?: () => void;
}
export declare class MorePopover extends DateComponent<MorePopoverProps> {
    rootEl: HTMLElement;
    render(): createElement.JSX.Element;
    handleRootEl: (rootEl: HTMLDivElement | null) => void;
    queryHit(positionLeft: number, positionTop: number, elWidth: number, elHeight: number): Hit;
}
//# sourceMappingURL=MorePopover.d.ts.map