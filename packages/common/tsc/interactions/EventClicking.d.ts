import { EventApi } from '../api/EventApi';
import { Interaction, InteractionSettings } from './interaction';
import { ViewApi } from '../ViewApi';
export interface EventClickArg {
    el: HTMLElement;
    event: EventApi;
    jsEvent: MouseEvent;
    view: ViewApi;
}
export declare class EventClicking extends Interaction {
    constructor(settings: InteractionSettings);
    handleSegClick: (ev: Event, segEl: HTMLElement) => void;
}
//# sourceMappingURL=EventClicking.d.ts.map