import { DateSelectionApi, PointerDragEvent, CalendarContext } from '@fullcalendar/common';
import { PointerDragging } from '../dnd/PointerDragging';
export declare class UnselectAuto {
    private context;
    documentPointer: PointerDragging;
    isRecentPointerDateSelect: boolean;
    matchesCancel: boolean;
    matchesEvent: boolean;
    constructor(context: CalendarContext);
    destroy(): void;
    onSelect: (selectInfo: DateSelectionApi) => void;
    onDocumentPointerDown: (pev: PointerDragEvent) => void;
    onDocumentPointerUp: (pev: PointerDragEvent) => void;
}
//# sourceMappingURL=UnselectAuto.d.ts.map