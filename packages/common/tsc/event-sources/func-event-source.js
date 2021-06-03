import { unpromisify } from '../util/promise';
import { createPlugin } from '../plugin-system';
import { buildRangeApiWithTimeZone } from '../structs/date-span';
var eventSourceDef = {
    parseMeta: function (refined) {
        if (typeof refined.events === 'function') {
            return refined.events;
        }
        return null;
    },
    fetch: function (arg, success, failure) {
        var dateEnv = arg.context.dateEnv;
        var func = arg.eventSource.meta;
        unpromisify(func.bind(null, buildRangeApiWithTimeZone(arg.range, dateEnv)), function (rawEvents) {
            success({ rawEvents: rawEvents }); // needs an object response
        }, failure);
    },
};
export var funcEventSourcePlugin = createPlugin({
    eventSourceDefs: [eventSourceDef],
});
//# sourceMappingURL=func-event-source.js.map