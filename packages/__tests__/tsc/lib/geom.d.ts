export declare function getRectCenter(rect: any): {
    left: any;
    top: any;
};
export declare function intersectRects(rect0: any, rect1: any): {
    left: any;
    top: any;
    width: number;
    height: number;
    right: any;
    bottom: any;
};
export declare function rectsIntersect(rect0: any, rect1: any): boolean;
export declare function rectContainersOther(rect0: any, rect1: any): boolean;
export declare function joinRects(rect1: any, rect2: any): {
    left: number;
    right: number;
    top: number;
    bottom: number;
};
export declare function subtractPoints(point1: any, point0: any): {
    left: any;
    top: any;
};
export declare function addPoints(point0: any, point1: any): {
    left: any;
    top: any;
};
export declare function getRectTopLeft(rect: any): {
    left: any;
    top: any;
};
export declare function isRect(input: any): boolean;
export declare function isRectMostlyAbove(subjectRect: any, otherRect: any): boolean;
export declare function isRectMostlyLeft(subjectRect: any, otherRect: any): boolean;
export declare function isRectMostlyBounded(subjectRect: any, boundRect: any): boolean;
export declare function isRectMostlyHBounded(subjectRect: any, boundRect: any): boolean;
export declare function isRectMostlyVBounded(subjectRect: any, boundRect: any): boolean;
export declare function isRectsSimilar(rect1: any, rect2: any): boolean;
//# sourceMappingURL=geom.d.ts.map