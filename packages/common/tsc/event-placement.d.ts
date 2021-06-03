export interface SegInput {
    index: number;
    spanStart: number;
    spanEnd: number;
    thickness: number;
}
export interface SegEntry {
    segInput: SegInput;
    spanStart: number;
    spanEnd: number;
    thickness: number;
}
export interface SegRect extends SegEntry {
    levelCoord: number;
}
export interface SegInsertion {
    levelCoord: number;
    nextLevel: number;
    lateralStart: number;
    lateralEnd: number;
    touchingEntry: SegEntry;
    stackCnt: number;
}
export interface SegEntryGroup {
    spanStart: number;
    spanEnd: number;
    entries: SegEntry[];
}
export declare class SegHierarchy {
    strictOrder: boolean;
    allowReslicing: boolean;
    maxCoord: number;
    maxStackCnt: number;
    levelCoords: number[];
    entriesByLevel: SegEntry[][];
    stackCnts: {
        [entryId: string]: number;
    };
    addSegs(segInputs: SegInput[]): SegEntry[];
    insertEntry(entry: SegEntry, hiddenEntries: SegEntry[]): number;
    isInsertionValid(insertion: SegInsertion, entry: SegEntry): boolean;
    handleInvalidInsertion(insertion: SegInsertion, entry: SegEntry, hiddenEntries: SegEntry[]): number;
    splitEntry(entry: SegEntry, barrier: SegEntry, hiddenEntries: SegEntry[]): number;
    insertEntryAt(entry: SegEntry, insertion: SegInsertion): void;
    findInsertion(newEntry: SegEntry): SegInsertion;
    toRects(): SegRect[];
}
export declare function getEntrySpanEnd(entry: SegEntry): number;
export declare function buildEntryKey(entry: SegEntry): string;
export declare function groupIntersectingEntries(entries: SegEntry[]): SegEntryGroup[];
export declare function binarySearch<Item>(a: Item[], searchVal: number, getItemVal: (item: Item) => number): [number, number];
//# sourceMappingURL=event-placement.d.ts.map