import { createPlugin } from '../plugin-system';
var eventSourceDef = {
    ignoreRange: true,
    parseMeta: function (refined) {
        if (Array.isArray(refined.events)) {
            return refined.events;
        }
        return null;
    },
    fetch: function (arg, success) {
        success({
            rawEvents: arg.eventSource.meta,
        });
    },
};
export var arrayEventSourcePlugin = createPlugin({
    eventSourceDefs: [eventSourceDef],
});
//# sourceMappingURL=array-event-source.js.map