import { createElement, ComponentChildren, Ref } from '../vdom';
import { BaseComponent } from '../vdom-util';
import { CssDimValue, ScrollerLike } from './util';
export declare type OverflowValue = 'auto' | 'hidden' | 'scroll' | 'visible';
export interface ScrollerProps {
    overflowX: OverflowValue;
    overflowY: OverflowValue;
    overcomeLeft?: number;
    overcomeRight?: number;
    overcomeBottom?: number;
    maxHeight?: CssDimValue;
    liquid?: boolean;
    liquidIsAbsolute?: boolean;
    children?: ComponentChildren;
    elRef?: Ref<HTMLElement>;
}
export declare class Scroller extends BaseComponent<ScrollerProps> implements ScrollerLike {
    private el;
    render(): createElement.JSX.Element;
    handleEl: (el: HTMLElement) => void;
    needsXScrolling(): boolean;
    needsYScrolling(): boolean;
    getXScrollbarWidth(): number;
    getYScrollbarWidth(): number;
}
//# sourceMappingURL=Scroller.d.ts.map