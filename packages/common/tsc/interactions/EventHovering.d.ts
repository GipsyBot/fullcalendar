import { EventApi } from '../api/EventApi';
import { Interaction, InteractionSettings } from './interaction';
import { ViewApi } from '../ViewApi';
export interface EventHoveringArg {
    el: HTMLElement;
    event: EventApi;
    jsEvent: MouseEvent;
    view: ViewApi;
}
export declare class EventHovering extends Interaction {
    removeHoverListeners: () => void;
    currentSegEl: HTMLElement;
    constructor(settings: InteractionSettings);
    destroy(): void;
    handleEventElRemove: (el: HTMLElement) => void;
    handleSegEnter: (ev: Event, segEl: HTMLElement) => void;
    handleSegLeave: (ev: Event | null, segEl: HTMLElement) => void;
    triggerEvent(publicEvName: 'eventMouseEnter' | 'eventMouseLeave', ev: Event | null, segEl: HTMLElement): void;
}
//# sourceMappingURL=EventHovering.d.ts.map