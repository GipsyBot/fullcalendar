import { Dictionary } from '../options';
export declare function removeElement(el: HTMLElement): void;
export declare function elementClosest(el: HTMLElement, selector: string): HTMLElement;
export declare function elementMatches(el: HTMLElement, selector: string): HTMLElement;
export declare function findElements(container: HTMLElement[] | HTMLElement | NodeListOf<HTMLElement>, selector: string): HTMLElement[];
export declare function findDirectChildren(parent: HTMLElement[] | HTMLElement, selector?: string): HTMLElement[];
export declare function applyStyle(el: HTMLElement, props: Dictionary): void;
export declare function applyStyleProp(el: HTMLElement, name: string, val: any): void;
export declare function getEventTargetViaRoot(ev: Event): EventTarget;
//# sourceMappingURL=dom-manip.d.ts.map