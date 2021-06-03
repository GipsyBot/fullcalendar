import { Rect } from './geom';
export interface EdgeInfo {
    borderLeft: number;
    borderRight: number;
    borderTop: number;
    borderBottom: number;
    scrollbarLeft: number;
    scrollbarRight: number;
    scrollbarBottom: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
}
export declare function computeEdges(el: HTMLElement, getPadding?: boolean): EdgeInfo;
export declare function computeInnerRect(el: any, goWithinPadding?: boolean, doFromWindowViewport?: boolean): {
    left: any;
    right: number;
    top: any;
    bottom: number;
};
export declare function computeRect(el: any): Rect;
export declare function computeClippedClientRect(el: HTMLElement): Rect | null;
export declare function computeHeightAndMargins(el: HTMLElement): number;
export declare function computeVMargins(el: HTMLElement): number;
export declare function getClippingParents(el: HTMLElement): HTMLElement[];
//# sourceMappingURL=dom-geom.d.ts.map