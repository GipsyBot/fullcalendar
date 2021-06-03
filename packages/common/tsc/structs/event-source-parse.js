import { __assign } from "tslib";
import { guid } from '../util/misc';
import { EVENT_UI_REFINERS, createEventUi } from '../component/event-ui';
import { identity, refineProps } from '../options';
var EVENT_SOURCE_REFINERS = {
    id: String,
    defaultAllDay: Boolean,
    url: String,
    format: String,
    events: identity,
    eventDataTransform: identity,
    // for any network-related sources
    success: identity,
    failure: identity,
};
export function parseEventSource(raw, context, refiners) {
    if (refiners === void 0) { refiners = buildEventSourceRefiners(context); }
    var rawObj;
    if (typeof raw === 'string') {
        rawObj = { url: raw };
    }
    else if (typeof raw === 'function' || Array.isArray(raw)) {
        rawObj = { events: raw };
    }
    else if (typeof raw === 'object' && raw) { // not null
        rawObj = raw;
    }
    if (rawObj) {
        var _a = refineProps(rawObj, refiners), refined = _a.refined, extra = _a.extra;
        var metaRes = buildEventSourceMeta(refined, context);
        if (metaRes) {
            return {
                _raw: raw,
                isFetching: false,
                latestFetchId: '',
                fetchRange: null,
                defaultAllDay: refined.defaultAllDay,
                eventDataTransform: refined.eventDataTransform,
                success: refined.success,
                failure: refined.failure,
                publicId: refined.id || '',
                sourceId: guid(),
                sourceDefId: metaRes.sourceDefId,
                meta: metaRes.meta,
                ui: createEventUi(refined, context),
                extendedProps: extra,
            };
        }
    }
    return null;
}
export function buildEventSourceRefiners(context) {
    return __assign(__assign(__assign({}, EVENT_UI_REFINERS), EVENT_SOURCE_REFINERS), context.pluginHooks.eventSourceRefiners);
}
function buildEventSourceMeta(raw, context) {
    var defs = context.pluginHooks.eventSourceDefs;
    for (var i = defs.length - 1; i >= 0; i -= 1) { // later-added plugins take precedence
        var def = defs[i];
        var meta = def.parseMeta(raw);
        if (meta) {
            return { sourceDefId: i, meta: meta };
        }
    }
    return null;
}
//# sourceMappingURL=event-source-parse.js.map