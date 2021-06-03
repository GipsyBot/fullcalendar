import { __assign as __assign_1 } from "tslib";
import { __assign } from 'tslib';
import { guid } from '../util/misc';
import { startOfDay } from '../datelib/marker';
import { parseRecurring } from './recurring-event';
import { createEventInstance } from './event-instance';
import { identity, refineProps } from '../options';
import { EVENT_UI_REFINERS, createEventUi } from '../component/event-ui';
export var EVENT_NON_DATE_REFINERS = {
    id: String,
    groupId: String,
    title: String,
    url: String,
};
export var EVENT_DATE_REFINERS = {
    start: identity,
    end: identity,
    date: identity,
    allDay: Boolean,
};
var EVENT_REFINERS = __assign_1(__assign_1(__assign_1({}, EVENT_NON_DATE_REFINERS), EVENT_DATE_REFINERS), { extendedProps: identity });
export function parseEvent(raw, eventSource, context, allowOpenRange, refiners) {
    if (refiners === void 0) { refiners = buildEventRefiners(context); }
    var _a = refineEventDef(raw, context, refiners), refined = _a.refined, extra = _a.extra;
    var defaultAllDay = computeIsDefaultAllDay(eventSource, context);
    var recurringRes = parseRecurring(refined, defaultAllDay, context.dateEnv, context.pluginHooks.recurringTypes);
    if (recurringRes) {
        var def = parseEventDef(refined, extra, eventSource ? eventSource.sourceId : '', recurringRes.allDay, Boolean(recurringRes.duration), context);
        def.recurringDef = {
            typeId: recurringRes.typeId,
            typeData: recurringRes.typeData,
            duration: recurringRes.duration,
        };
        return { def: def, instance: null };
    }
    var singleRes = parseSingle(refined, defaultAllDay, context, allowOpenRange);
    if (singleRes) {
        var def = parseEventDef(refined, extra, eventSource ? eventSource.sourceId : '', singleRes.allDay, singleRes.hasEnd, context);
        var instance = createEventInstance(def.defId, singleRes.range, singleRes.forcedStartTzo, singleRes.forcedEndTzo);
        return { def: def, instance: instance };
    }
    return null;
}
export function refineEventDef(raw, context, refiners) {
    if (refiners === void 0) { refiners = buildEventRefiners(context); }
    return refineProps(raw, refiners);
}
export function buildEventRefiners(context) {
    return __assign_1(__assign_1(__assign_1({}, EVENT_UI_REFINERS), EVENT_REFINERS), context.pluginHooks.eventRefiners);
}
/*
Will NOT populate extendedProps with the leftover properties.
Will NOT populate date-related props.
*/
export function parseEventDef(refined, extra, sourceId, allDay, hasEnd, context) {
    var def = {
        title: refined.title || '',
        groupId: refined.groupId || '',
        publicId: refined.id || '',
        url: refined.url || '',
        recurringDef: null,
        defId: guid(),
        sourceId: sourceId,
        allDay: allDay,
        hasEnd: hasEnd,
        ui: createEventUi(refined, context),
        extendedProps: __assign_1(__assign_1({}, (refined.extendedProps || {})), extra),
    };
    for (var _i = 0, _a = context.pluginHooks.eventDefMemberAdders; _i < _a.length; _i++) {
        var memberAdder = _a[_i];
        __assign(def, memberAdder(refined));
    }
    // help out EventApi from having user modify props
    Object.freeze(def.ui.classNames);
    Object.freeze(def.extendedProps);
    return def;
}
function parseSingle(refined, defaultAllDay, context, allowOpenRange) {
    var allDay = refined.allDay;
    var startMeta;
    var startMarker = null;
    var hasEnd = false;
    var endMeta;
    var endMarker = null;
    var startInput = refined.start != null ? refined.start : refined.date;
    startMeta = context.dateEnv.createMarkerMeta(startInput);
    if (startMeta) {
        startMarker = startMeta.marker;
    }
    else if (!allowOpenRange) {
        return null;
    }
    if (refined.end != null) {
        endMeta = context.dateEnv.createMarkerMeta(refined.end);
    }
    if (allDay == null) {
        if (defaultAllDay != null) {
            allDay = defaultAllDay;
        }
        else {
            // fall back to the date props LAST
            allDay = (!startMeta || startMeta.isTimeUnspecified) &&
                (!endMeta || endMeta.isTimeUnspecified);
        }
    }
    if (allDay && startMarker) {
        startMarker = startOfDay(startMarker);
    }
    if (endMeta) {
        endMarker = endMeta.marker;
        if (allDay) {
            endMarker = startOfDay(endMarker);
        }
        if (startMarker && endMarker <= startMarker) {
            endMarker = null;
        }
    }
    if (endMarker) {
        hasEnd = true;
    }
    else if (!allowOpenRange) {
        hasEnd = context.options.forceEventDuration || false;
        endMarker = context.dateEnv.add(startMarker, allDay ?
            context.options.defaultAllDayEventDuration :
            context.options.defaultTimedEventDuration);
    }
    return {
        allDay: allDay,
        hasEnd: hasEnd,
        range: { start: startMarker, end: endMarker },
        forcedStartTzo: startMeta ? startMeta.forcedTzo : null,
        forcedEndTzo: endMeta ? endMeta.forcedTzo : null,
    };
}
function computeIsDefaultAllDay(eventSource, context) {
    var res = null;
    if (eventSource) {
        res = eventSource.defaultAllDay;
    }
    if (res == null) {
        res = context.options.defaultAllDay;
    }
    return res;
}
//# sourceMappingURL=event-parse.js.map