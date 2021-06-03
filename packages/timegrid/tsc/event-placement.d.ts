import { SegRect, SegInput, SegEntryGroup } from '@fullcalendar/common';
export interface TimeColSegRect extends SegRect {
    stackDepth: number;
    stackForward: number;
}
export declare function computeFgSegPlacements(segInputs: SegInput[], strictOrder?: boolean, maxStackCnt?: number): {
    segRects: TimeColSegRect[];
    hiddenGroups: SegEntryGroup[];
};
//# sourceMappingURL=event-placement.d.ts.map