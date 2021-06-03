import { __assign } from 'tslib';
import { createEmptyEventStore } from '../structs/event-store';
import { mapHash } from '../util/object';
import { memoize } from '../util/memoize';
import { combineEventUis } from './event-ui';
var EMPTY_EVENT_STORE = createEmptyEventStore(); // for purecomponents. TODO: keep elsewhere
var Splitter = /** @class */ (function () {
    function Splitter() {
        this.getKeysForEventDefs = memoize(this._getKeysForEventDefs);
        this.splitDateSelection = memoize(this._splitDateSpan);
        this.splitEventStore = memoize(this._splitEventStore);
        this.splitIndividualUi = memoize(this._splitIndividualUi);
        this.splitEventDrag = memoize(this._splitInteraction);
        this.splitEventResize = memoize(this._splitInteraction);
        this.eventUiBuilders = {}; // TODO: typescript protection
    }
    Splitter.prototype.splitProps = function (props) {
        var _this = this;
        var keyInfos = this.getKeyInfo(props);
        var defKeys = this.getKeysForEventDefs(props.eventStore);
        var dateSelections = this.splitDateSelection(props.dateSelection);
        var individualUi = this.splitIndividualUi(props.eventUiBases, defKeys); // the individual *bases*
        var eventStores = this.splitEventStore(props.eventStore, defKeys);
        var eventDrags = this.splitEventDrag(props.eventDrag);
        var eventResizes = this.splitEventResize(props.eventResize);
        var splitProps = {};
        this.eventUiBuilders = mapHash(keyInfos, function (info, key) { return _this.eventUiBuilders[key] || memoize(buildEventUiForKey); });
        for (var key in keyInfos) {
            var keyInfo = keyInfos[key];
            var eventStore = eventStores[key] || EMPTY_EVENT_STORE;
            var buildEventUi = this.eventUiBuilders[key];
            splitProps[key] = {
                businessHours: keyInfo.businessHours || props.businessHours,
                dateSelection: dateSelections[key] || null,
                eventStore: eventStore,
                eventUiBases: buildEventUi(props.eventUiBases[''], keyInfo.ui, individualUi[key]),
                eventSelection: eventStore.instances[props.eventSelection] ? props.eventSelection : '',
                eventDrag: eventDrags[key] || null,
                eventResize: eventResizes[key] || null,
            };
        }
        return splitProps;
    };
    Splitter.prototype._splitDateSpan = function (dateSpan) {
        var dateSpans = {};
        if (dateSpan) {
            var keys = this.getKeysForDateSpan(dateSpan);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                dateSpans[key] = dateSpan;
            }
        }
        return dateSpans;
    };
    Splitter.prototype._getKeysForEventDefs = function (eventStore) {
        var _this = this;
        return mapHash(eventStore.defs, function (eventDef) { return _this.getKeysForEventDef(eventDef); });
    };
    Splitter.prototype._splitEventStore = function (eventStore, defKeys) {
        var defs = eventStore.defs, instances = eventStore.instances;
        var splitStores = {};
        for (var defId in defs) {
            for (var _i = 0, _a = defKeys[defId]; _i < _a.length; _i++) {
                var key = _a[_i];
                if (!splitStores[key]) {
                    splitStores[key] = createEmptyEventStore();
                }
                splitStores[key].defs[defId] = defs[defId];
            }
        }
        for (var instanceId in instances) {
            var instance = instances[instanceId];
            for (var _b = 0, _c = defKeys[instance.defId]; _b < _c.length; _b++) {
                var key = _c[_b];
                if (splitStores[key]) { // must have already been created
                    splitStores[key].instances[instanceId] = instance;
                }
            }
        }
        return splitStores;
    };
    Splitter.prototype._splitIndividualUi = function (eventUiBases, defKeys) {
        var splitHashes = {};
        for (var defId in eventUiBases) {
            if (defId) { // not the '' key
                for (var _i = 0, _a = defKeys[defId]; _i < _a.length; _i++) {
                    var key = _a[_i];
                    if (!splitHashes[key]) {
                        splitHashes[key] = {};
                    }
                    splitHashes[key][defId] = eventUiBases[defId];
                }
            }
        }
        return splitHashes;
    };
    Splitter.prototype._splitInteraction = function (interaction) {
        var splitStates = {};
        if (interaction) {
            var affectedStores_1 = this._splitEventStore(interaction.affectedEvents, this._getKeysForEventDefs(interaction.affectedEvents));
            // can't rely on defKeys because event data is mutated
            var mutatedKeysByDefId = this._getKeysForEventDefs(interaction.mutatedEvents);
            var mutatedStores_1 = this._splitEventStore(interaction.mutatedEvents, mutatedKeysByDefId);
            var populate = function (key) {
                if (!splitStates[key]) {
                    splitStates[key] = {
                        affectedEvents: affectedStores_1[key] || EMPTY_EVENT_STORE,
                        mutatedEvents: mutatedStores_1[key] || EMPTY_EVENT_STORE,
                        isEvent: interaction.isEvent,
                    };
                }
            };
            for (var key in affectedStores_1) {
                populate(key);
            }
            for (var key in mutatedStores_1) {
                populate(key);
            }
        }
        return splitStates;
    };
    return Splitter;
}());
export { Splitter };
function buildEventUiForKey(allUi, eventUiForKey, individualUi) {
    var baseParts = [];
    if (allUi) {
        baseParts.push(allUi);
    }
    if (eventUiForKey) {
        baseParts.push(eventUiForKey);
    }
    var stuff = {
        '': combineEventUis(baseParts),
    };
    if (individualUi) {
        __assign(stuff, individualUi);
    }
    return stuff;
}
//# sourceMappingURL=event-splitting.js.map