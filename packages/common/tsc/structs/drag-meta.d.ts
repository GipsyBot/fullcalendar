import { createDuration, Duration } from '../datelib/duration';
import { RawOptionsFromRefiners, Dictionary } from '../options';
declare const DRAG_META_REFINERS: {
    startTime: typeof createDuration;
    duration: typeof createDuration;
    create: BooleanConstructor;
    sourceId: StringConstructor;
};
export declare type DragMetaInput = RawOptionsFromRefiners<typeof DRAG_META_REFINERS> & {
    [otherProp: string]: any;
};
export interface DragMeta {
    startTime: Duration | null;
    duration: Duration | null;
    create: boolean;
    sourceId: string;
    leftoverProps: Dictionary;
}
export declare function parseDragMeta(raw: DragMetaInput): DragMeta;
export {};
//# sourceMappingURL=drag-meta.d.ts.map