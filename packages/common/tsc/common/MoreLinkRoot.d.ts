/// <reference types="@fullcalendar/core-preact" />
import { Seg } from '../component/DateComponent';
import { DateRange } from '../datelib/date-range';
import { DateMarker } from '../datelib/marker';
import { DateProfile } from '../DateProfileGenerator';
import { Dictionary } from '../options';
import { ComponentChildren, createElement, Ref, RefObject, VNode } from '../vdom';
import { BaseComponent } from '../vdom-util';
import { ViewApi } from '../ViewApi';
import { MountArg } from './render-hook';
export declare type MoreLinkChildren = (rootElRef: Ref<any>, classNames: string[], innerElRef: Ref<any>, innerContent: ComponentChildren, handleClick: (ev: MouseEvent) => void) => ComponentChildren;
export interface MoreLinkRootProps {
    dateProfile: DateProfile;
    todayRange: DateRange;
    allDayDate: DateMarker | null;
    moreCnt: number;
    allSegs: Seg[];
    hiddenSegs: Seg[];
    extraDateSpan?: Dictionary;
    alignmentElRef: RefObject<HTMLElement>;
    alignGridTop?: boolean;
    topAlignmentElRef?: RefObject<HTMLElement>;
    defaultContent?: (hookProps: MoreLinkContentArg) => ComponentChildren;
    popoverContent: () => VNode;
    children: MoreLinkChildren;
}
export interface MoreLinkContentArg {
    num: number;
    text: string;
    shortText: string;
    view: ViewApi;
}
export declare type MoreLinkMountArg = MountArg<MoreLinkContentArg>;
interface MoreLinkRootState {
    isPopoverOpen: boolean;
}
export declare class MoreLinkRoot extends BaseComponent<MoreLinkRootProps, MoreLinkRootState> {
    private linkElRef;
    private parentEl;
    state: {
        isPopoverOpen: boolean;
    };
    render(): createElement.JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    updateParentEl(): void;
    handleClick: (ev: MouseEvent) => void;
    handlePopoverClose: () => void;
}
export declare function computeEarliestSegStart(segs: Seg[]): DateMarker;
export {};
//# sourceMappingURL=MoreLinkRoot.d.ts.map