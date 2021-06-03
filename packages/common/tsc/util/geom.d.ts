export interface Point {
    left: number;
    top: number;
}
export interface Rect {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
export declare function pointInsideRect(point: Point, rect: Rect): boolean;
export declare function intersectRects(rect1: Rect, rect2: Rect): Rect | false;
export declare function translateRect(rect: Rect, deltaX: number, deltaY: number): Rect;
export declare function constrainPoint(point: Point, rect: Rect): Point;
export declare function getRectCenter(rect: Rect): Point;
export declare function diffPoints(point1: Point, point2: Point): Point;
//# sourceMappingURL=geom.d.ts.map