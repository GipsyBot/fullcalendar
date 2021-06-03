import { Duration } from './datelib/duration';
import { Emitter } from './common/Emitter';
import { CalendarListeners } from './options';
export interface ScrollRequest {
    time?: Duration;
    [otherProp: string]: any;
}
export declare type ScrollRequestHandler = (request: ScrollRequest) => boolean;
export declare class ScrollResponder {
    private execFunc;
    private emitter;
    private scrollTime;
    private scrollTimeReset;
    queuedRequest: ScrollRequest;
    constructor(execFunc: ScrollRequestHandler, emitter: Emitter<CalendarListeners>, scrollTime: Duration, scrollTimeReset: boolean);
    detach(): void;
    update(isDatesNew: boolean): void;
    private fireInitialScroll;
    private handleScrollRequest;
    private drain;
}
//# sourceMappingURL=ScrollResponder.d.ts.map