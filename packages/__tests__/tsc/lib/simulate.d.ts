declare let origSimulateEvent: any;
declare let touchUID: number;
declare let DEBUG_DELAY: number;
declare let DEBUG_MIN_DURATION: number;
declare let DEBUG_MIN_MOVES: number;
declare let DRAG_DEFAULTS: {
    point: any;
    localPoint: {
        left: string;
        top: string;
    };
    end: any;
    localEndPoint: {
        left: string;
        top: string;
    };
    dx: number;
    dy: number;
    moves: number;
    duration: number;
};
declare let dragStackCnt: number;
declare function simulateDrag(self: any, targetNode: any, startPoint: any, dx: any, dy: any, moveCnt: any, duration: any, options: any): void;
declare function normalizeElPoint(point: any, el: any): {
    left: any;
    top: any;
};
declare function isPoint(input: any): boolean;
//# sourceMappingURL=simulate.d.ts.map