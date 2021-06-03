import { DateMarker, Seg, EventSegUiInteractionState } from '@fullcalendar/common';
export interface TimeColsSeg extends Seg {
    col: number;
    start: DateMarker;
    end: DateMarker;
}
export declare function splitSegsByCol(segs: TimeColsSeg[] | null, colCnt: number): TimeColsSeg[][];
export declare function splitInteractionByCol(ui: EventSegUiInteractionState | null, colCnt: number): EventSegUiInteractionState[];
//# sourceMappingURL=TimeColsSeg.d.ts.map