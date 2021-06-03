import { ScrollGeomCache } from './ScrollGeomCache';
export declare class ElementScrollGeomCache extends ScrollGeomCache {
    constructor(el: HTMLElement, doesListening: boolean);
    getEventTarget(): EventTarget;
    computeClientRect(): {
        left: any;
        right: number;
        top: any;
        bottom: number;
    };
}
//# sourceMappingURL=ElementScrollGeomCache.d.ts.map