export declare class PositionCache {
    els: HTMLElement[];
    originClientRect: ClientRect;
    lefts: any;
    rights: any;
    tops: any;
    bottoms: any;
    constructor(originEl: HTMLElement, els: HTMLElement[], isHorizontal: boolean, isVertical: boolean);
    buildElHorizontals(originClientLeft: number): void;
    buildElVerticals(originClientTop: number): void;
    leftToIndex(leftPosition: number): any;
    topToIndex(topPosition: number): any;
    getWidth(leftIndex: number): number;
    getHeight(topIndex: number): number;
}
//# sourceMappingURL=PositionCache.d.ts.map