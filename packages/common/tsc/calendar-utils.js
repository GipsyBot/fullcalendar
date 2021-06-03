import { __assign as __assign_1 } from "tslib";
import { __assign } from 'tslib';
import { buildDateSpanApi } from './structs/date-span';
import { startOfDay } from './datelib/marker';
export function triggerDateSelect(selection, pev, context) {
    context.emitter.trigger('select', __assign_1(__assign_1({}, buildDateSpanApiWithContext(selection, context)), { jsEvent: pev ? pev.origEvent : null, view: context.viewApi || context.calendarApi.view }));
}
export function triggerDateUnselect(pev, context) {
    context.emitter.trigger('unselect', {
        jsEvent: pev ? pev.origEvent : null,
        view: context.viewApi || context.calendarApi.view,
    });
}
export function buildDateSpanApiWithContext(dateSpan, context) {
    var props = {};
    for (var _i = 0, _a = context.pluginHooks.dateSpanTransforms; _i < _a.length; _i++) {
        var transform = _a[_i];
        __assign(props, transform(dateSpan, context));
    }
    __assign(props, buildDateSpanApi(dateSpan, context.dateEnv));
    return props;
}
// Given an event's allDay status and start date, return what its fallback end date should be.
// TODO: rename to computeDefaultEventEnd
export function getDefaultEventEnd(allDay, marker, context) {
    var dateEnv = context.dateEnv, options = context.options;
    var end = marker;
    if (allDay) {
        end = startOfDay(end);
        end = dateEnv.add(end, options.defaultAllDayEventDuration);
    }
    else {
        end = dateEnv.add(end, options.defaultTimedEventDuration);
    }
    return end;
}
//# sourceMappingURL=calendar-utils.js.map