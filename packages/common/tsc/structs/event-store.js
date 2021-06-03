import { __assign } from "tslib";
import { parseEvent, buildEventRefiners } from './event-parse';
import { filterHash } from '../util/object';
export function parseEvents(rawEvents, eventSource, context, allowOpenRange) {
    var eventStore = createEmptyEventStore();
    var eventRefiners = buildEventRefiners(context);
    for (var _i = 0, rawEvents_1 = rawEvents; _i < rawEvents_1.length; _i++) {
        var rawEvent = rawEvents_1[_i];
        var tuple = parseEvent(rawEvent, eventSource, context, allowOpenRange, eventRefiners);
        if (tuple) {
            eventTupleToStore(tuple, eventStore);
        }
    }
    return eventStore;
}
export function eventTupleToStore(tuple, eventStore) {
    if (eventStore === void 0) { eventStore = createEmptyEventStore(); }
    eventStore.defs[tuple.def.defId] = tuple.def;
    if (tuple.instance) {
        eventStore.instances[tuple.instance.instanceId] = tuple.instance;
    }
    return eventStore;
}
// retrieves events that have the same groupId as the instance specified by `instanceId`
// or they are the same as the instance.
// why might instanceId not be in the store? an event from another calendar?
export function getRelevantEvents(eventStore, instanceId) {
    var instance = eventStore.instances[instanceId];
    if (instance) {
        var def_1 = eventStore.defs[instance.defId];
        // get events/instances with same group
        var newStore = filterEventStoreDefs(eventStore, function (lookDef) { return isEventDefsGrouped(def_1, lookDef); });
        // add the original
        // TODO: wish we could use eventTupleToStore or something like it
        newStore.defs[def_1.defId] = def_1;
        newStore.instances[instance.instanceId] = instance;
        return newStore;
    }
    return createEmptyEventStore();
}
function isEventDefsGrouped(def0, def1) {
    return Boolean(def0.groupId && def0.groupId === def1.groupId);
}
export function createEmptyEventStore() {
    return { defs: {}, instances: {} };
}
export function mergeEventStores(store0, store1) {
    return {
        defs: __assign(__assign({}, store0.defs), store1.defs),
        instances: __assign(__assign({}, store0.instances), store1.instances),
    };
}
export function filterEventStoreDefs(eventStore, filterFunc) {
    var defs = filterHash(eventStore.defs, filterFunc);
    var instances = filterHash(eventStore.instances, function (instance) { return (defs[instance.defId] // still exists?
    ); });
    return { defs: defs, instances: instances };
}
export function excludeSubEventStore(master, sub) {
    var defs = master.defs, instances = master.instances;
    var filteredDefs = {};
    var filteredInstances = {};
    for (var defId in defs) {
        if (!sub.defs[defId]) { // not explicitly excluded
            filteredDefs[defId] = defs[defId];
        }
    }
    for (var instanceId in instances) {
        if (!sub.instances[instanceId] && // not explicitly excluded
            filteredDefs[instances[instanceId].defId] // def wasn't filtered away
        ) {
            filteredInstances[instanceId] = instances[instanceId];
        }
    }
    return {
        defs: filteredDefs,
        instances: filteredInstances,
    };
}
//# sourceMappingURL=event-store.js.map