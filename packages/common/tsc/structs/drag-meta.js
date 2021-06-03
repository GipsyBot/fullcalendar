import { createDuration } from '../datelib/duration';
import { refineProps } from '../options';
/*
Information about what will happen when an external element is dragged-and-dropped
onto a calendar. Contains information for creating an event.
*/
var DRAG_META_REFINERS = {
    startTime: createDuration,
    duration: createDuration,
    create: Boolean,
    sourceId: String,
};
export function parseDragMeta(raw) {
    var _a = refineProps(raw, DRAG_META_REFINERS), refined = _a.refined, extra = _a.extra;
    return {
        startTime: refined.startTime || null,
        duration: refined.duration || null,
        create: refined.create != null ? refined.create : true,
        sourceId: refined.sourceId,
        leftoverProps: extra,
    };
}
//# sourceMappingURL=drag-meta.js.map