import { PointerDragEvent, Interaction, InteractionSettings, DatePointApi, ViewApi } from '@fullcalendar/common';
import { FeaturefulElementDragging } from '../dnd/FeaturefulElementDragging';
import { HitDragging } from './HitDragging';
export interface DateClickArg extends DatePointApi {
    dayEl: HTMLElement;
    jsEvent: MouseEvent;
    view: ViewApi;
}
export declare class DateClicking extends Interaction {
    dragging: FeaturefulElementDragging;
    hitDragging: HitDragging;
    constructor(settings: InteractionSettings);
    destroy(): void;
    handlePointerDown: (pev: PointerDragEvent) => void;
    handleDragEnd: (ev: PointerDragEvent) => void;
}
//# sourceMappingURL=DateClicking.d.ts.map