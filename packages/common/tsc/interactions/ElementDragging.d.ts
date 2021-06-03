import { Emitter } from '../common/Emitter';
export declare abstract class ElementDragging {
    emitter: Emitter<any>;
    constructor(el: HTMLElement, selector?: string);
    destroy(): void;
    abstract setIgnoreMove(bool: boolean): void;
    setMirrorIsVisible(bool: boolean): void;
    setMirrorNeedsRevert(bool: boolean): void;
    setAutoScrollEnabled(bool: boolean): void;
}
export declare type ElementDraggingClass = {
    new (el: HTMLElement, selector?: string): ElementDragging;
};
//# sourceMappingURL=ElementDragging.d.ts.map