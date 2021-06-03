import { BaseComponent } from '../vdom-util';
import { EventRenderRange } from './event-rendering';
import { EventInstanceHash } from '../structs/event-instance';
import { Hit } from '../interactions/hit';
import { Dictionary } from '../options';
export declare type DateComponentHash = {
    [uid: string]: DateComponent<any, any>;
};
export interface Seg {
    component?: DateComponent<any, any>;
    isStart: boolean;
    isEnd: boolean;
    eventRange?: EventRenderRange;
    [otherProp: string]: any;
    el?: never;
}
export interface EventSegUiInteractionState {
    affectedInstances: EventInstanceHash;
    segs: Seg[];
    isEvent: boolean;
}
export declare abstract class DateComponent<Props = Dictionary, State = Dictionary> extends BaseComponent<Props, State> {
    uid: string;
    prepareHits(): void;
    queryHit(positionLeft: number, positionTop: number, elWidth: number, elHeight: number): Hit | null;
    isValidSegDownEl(el: HTMLElement): boolean;
    isValidDateDownEl(el: HTMLElement): boolean;
}
//# sourceMappingURL=DateComponent.d.ts.map