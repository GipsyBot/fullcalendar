import { ScrollGeomCache } from '../ScrollGeomCache';
export declare class AutoScroller {
    isEnabled: boolean;
    scrollQuery: (Window | string)[];
    edgeThreshold: number;
    maxVelocity: number;
    pointerScreenX: number | null;
    pointerScreenY: number | null;
    isAnimating: boolean;
    scrollCaches: ScrollGeomCache[] | null;
    msSinceRequest?: number;
    everMovedUp: boolean;
    everMovedDown: boolean;
    everMovedLeft: boolean;
    everMovedRight: boolean;
    start(pageX: number, pageY: number): void;
    handleMove(pageX: number, pageY: number): void;
    stop(): void;
    requestAnimation(now: number): void;
    private animate;
    private handleSide;
    private computeBestEdge;
    private buildCaches;
    private queryScrollEls;
}
//# sourceMappingURL=AutoScroller.d.ts.map