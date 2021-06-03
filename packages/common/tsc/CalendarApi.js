import { __spreadArrays } from "tslib";
import { createFormatter } from './datelib/formatting';
import { createDuration } from './datelib/duration';
import { parseDateSpan } from './structs/date-span';
import { parseEventSource } from './structs/event-source-parse';
import { parseEvent } from './structs/event-parse';
import { eventTupleToStore } from './structs/event-store';
import { getNow } from './reducers/current-date';
import { triggerDateSelect, triggerDateUnselect } from './calendar-utils';
import { hashValuesToArray } from './util/object';
import { eventApiToStore, buildEventApis } from './api/EventApi';
// public
import { EventSourceApi, EventApi, } from './api-type-deps';
var CalendarApi = /** @class */ (function () {
    function CalendarApi() {
    }
    CalendarApi.prototype.getCurrentData = function () {
        return this.currentDataManager.getCurrentData();
    };
    CalendarApi.prototype.dispatch = function (action) {
        return this.currentDataManager.dispatch(action);
    };
    Object.defineProperty(CalendarApi.prototype, "view", {
        get: function () { return this.getCurrentData().viewApi; } // for public API
        ,
        enumerable: false,
        configurable: true
    });
    CalendarApi.prototype.batchRendering = function (callback) {
        callback();
    };
    CalendarApi.prototype.updateSize = function () {
        this.trigger('_resize', true);
    };
    // Options
    // -----------------------------------------------------------------------------------------------------------------
    CalendarApi.prototype.setOption = function (name, val) {
        this.dispatch({
            type: 'SET_OPTION',
            optionName: name,
            rawOptionValue: val,
        });
    };
    CalendarApi.prototype.getOption = function (name) {
        return this.currentDataManager.currentCalendarOptionsInput[name];
    };
    CalendarApi.prototype.getAvailableLocaleCodes = function () {
        return Object.keys(this.getCurrentData().availableRawLocales);
    };
    // Trigger
    // -----------------------------------------------------------------------------------------------------------------
    CalendarApi.prototype.on = function (handlerName, handler) {
        var currentDataManager = this.currentDataManager;
        if (currentDataManager.currentCalendarOptionsRefiners[handlerName]) {
            currentDataManager.emitter.on(handlerName, handler);
        }
        else {
            console.warn("Unknown listener name '" + handlerName + "'");
        }
    };
    CalendarApi.prototype.off = function (handlerName, handler) {
        this.currentDataManager.emitter.off(handlerName, handler);
    };
    // not meant for public use
    CalendarApi.prototype.trigger = function (handlerName) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        (_a = this.currentDataManager.emitter).trigger.apply(_a, __spreadArrays([handlerName], args));
    };
    // View
    // -----------------------------------------------------------------------------------------------------------------
    CalendarApi.prototype.changeView = function (viewType, dateOrRange) {
        var _this = this;
        this.batchRendering(function () {
            _this.unselect();
            if (dateOrRange) {
                if (dateOrRange.start && dateOrRange.end) { // a range
                    _this.dispatch({
                        type: 'CHANGE_VIEW_TYPE',
                        viewType: viewType,
                    });
                    _this.dispatch({
                        type: 'SET_OPTION',
                        optionName: 'visibleRange',
                        rawOptionValue: dateOrRange,
                    });
                }
                else {
                    var dateEnv = _this.getCurrentData().dateEnv;
                    _this.dispatch({
                        type: 'CHANGE_VIEW_TYPE',
                        viewType: viewType,
                        dateMarker: dateEnv.createMarker(dateOrRange),
                    });
                }
            }
            else {
                _this.dispatch({
                    type: 'CHANGE_VIEW_TYPE',
                    viewType: viewType,
                });
            }
        });
    };
    // Forces navigation to a view for the given date.
    // `viewType` can be a specific view name or a generic one like "week" or "day".
    // needs to change
    CalendarApi.prototype.zoomTo = function (dateMarker, viewType) {
        var state = this.getCurrentData();
        var spec;
        viewType = viewType || 'day'; // day is default zoom
        spec = state.viewSpecs[viewType] || this.getUnitViewSpec(viewType);
        this.unselect();
        if (spec) {
            this.dispatch({
                type: 'CHANGE_VIEW_TYPE',
                viewType: spec.type,
                dateMarker: dateMarker,
            });
        }
        else {
            this.dispatch({
                type: 'CHANGE_DATE',
                dateMarker: dateMarker,
            });
        }
    };
    // Given a duration singular unit, like "week" or "day", finds a matching view spec.
    // Preference is given to views that have corresponding buttons.
    CalendarApi.prototype.getUnitViewSpec = function (unit) {
        var _a = this.getCurrentData(), viewSpecs = _a.viewSpecs, toolbarConfig = _a.toolbarConfig;
        var viewTypes = [].concat(toolbarConfig.viewsWithButtons);
        var i;
        var spec;
        for (var viewType in viewSpecs) {
            viewTypes.push(viewType);
        }
        for (i = 0; i < viewTypes.length; i += 1) {
            spec = viewSpecs[viewTypes[i]];
            if (spec) {
                if (spec.singleUnit === unit) {
                    return spec;
                }
            }
        }
        return null;
    };
    // Current Date
    // -----------------------------------------------------------------------------------------------------------------
    CalendarApi.prototype.prev = function () {
        this.unselect();
        this.dispatch({ type: 'PREV' });
    };
    CalendarApi.prototype.next = function () {
        this.unselect();
        this.dispatch({ type: 'NEXT' });
    };
    CalendarApi.prototype.prevYear = function () {
        var state = this.getCurrentData();
        this.unselect();
        this.dispatch({
            type: 'CHANGE_DATE',
            dateMarker: state.dateEnv.addYears(state.currentDate, -1),
        });
    };
    CalendarApi.prototype.nextYear = function () {
        var state = this.getCurrentData();
        this.unselect();
        this.dispatch({
            type: 'CHANGE_DATE',
            dateMarker: state.dateEnv.addYears(state.currentDate, 1),
        });
    };
    CalendarApi.prototype.today = function () {
        var state = this.getCurrentData();
        this.unselect();
        this.dispatch({
            type: 'CHANGE_DATE',
            dateMarker: getNow(state.calendarOptions.now, state.dateEnv),
        });
    };
    CalendarApi.prototype.gotoDate = function (zonedDateInput) {
        var state = this.getCurrentData();
        this.unselect();
        this.dispatch({
            type: 'CHANGE_DATE',
            dateMarker: state.dateEnv.createMarker(zonedDateInput),
        });
    };
    CalendarApi.prototype.incrementDate = function (deltaInput) {
        var state = this.getCurrentData();
        var delta = createDuration(deltaInput);
        if (delta) { // else, warn about invalid input?
            this.unselect();
            this.dispatch({
                type: 'CHANGE_DATE',
                dateMarker: state.dateEnv.add(state.currentDate, delta),
            });
        }
    };
    // for external API
    CalendarApi.prototype.getDate = function () {
        var state = this.getCurrentData();
        return state.dateEnv.toDate(state.currentDate);
    };
    // Date Formatting Utils
    // -----------------------------------------------------------------------------------------------------------------
    CalendarApi.prototype.formatDate = function (d, formatter) {
        var dateEnv = this.getCurrentData().dateEnv;
        return dateEnv.format(dateEnv.createMarker(d), createFormatter(formatter));
    };
    // `settings` is for formatter AND isEndExclusive
    CalendarApi.prototype.formatRange = function (d0, d1, settings) {
        var dateEnv = this.getCurrentData().dateEnv;
        return dateEnv.formatRange(dateEnv.createMarker(d0), dateEnv.createMarker(d1), createFormatter(settings), settings);
    };
    CalendarApi.prototype.formatIso = function (d, omitTime) {
        var dateEnv = this.getCurrentData().dateEnv;
        return dateEnv.formatIso(dateEnv.createMarker(d), { omitTime: omitTime });
    };
    // Date Selection / Event Selection / DayClick
    // -----------------------------------------------------------------------------------------------------------------
    // this public method receives start/end dates in any format, with any timezone
    // NOTE: args were changed from v3
    CalendarApi.prototype.select = function (dateOrObj, endDate) {
        var selectionInput;
        if (endDate == null) {
            if (dateOrObj.start != null) {
                selectionInput = dateOrObj;
            }
            else {
                selectionInput = {
                    start: dateOrObj,
                    end: null,
                };
            }
        }
        else {
            selectionInput = {
                start: dateOrObj,
                end: endDate,
            };
        }
        var state = this.getCurrentData();
        var selection = parseDateSpan(selectionInput, state.dateEnv, createDuration({ days: 1 }));
        if (selection) { // throw parse error otherwise?
            this.dispatch({ type: 'SELECT_DATES', selection: selection });
            triggerDateSelect(selection, null, state);
        }
    };
    // public method
    CalendarApi.prototype.unselect = function (pev) {
        var state = this.getCurrentData();
        if (state.dateSelection) {
            this.dispatch({ type: 'UNSELECT_DATES' });
            triggerDateUnselect(pev, state);
        }
    };
    // Public Events API
    // -----------------------------------------------------------------------------------------------------------------
    CalendarApi.prototype.addEvent = function (eventInput, sourceInput) {
        if (eventInput instanceof EventApi) {
            var def = eventInput._def;
            var instance = eventInput._instance;
            var currentData = this.getCurrentData();
            // not already present? don't want to add an old snapshot
            if (!currentData.eventStore.defs[def.defId]) {
                this.dispatch({
                    type: 'ADD_EVENTS',
                    eventStore: eventTupleToStore({ def: def, instance: instance }),
                });
                this.triggerEventAdd(eventInput);
            }
            return eventInput;
        }
        var state = this.getCurrentData();
        var eventSource;
        if (sourceInput instanceof EventSourceApi) {
            eventSource = sourceInput.internalEventSource;
        }
        else if (typeof sourceInput === 'boolean') {
            if (sourceInput) { // true. part of the first event source
                eventSource = hashValuesToArray(state.eventSources)[0];
            }
        }
        else if (sourceInput != null) { // an ID. accepts a number too
            var sourceApi = this.getEventSourceById(sourceInput); // TODO: use an internal function
            if (!sourceApi) {
                console.warn("Could not find an event source with ID \"" + sourceInput + "\""); // TODO: test
                return null;
            }
            eventSource = sourceApi.internalEventSource;
        }
        var tuple = parseEvent(eventInput, eventSource, state, false);
        if (tuple) {
            var newEventApi = new EventApi(state, tuple.def, tuple.def.recurringDef ? null : tuple.instance);
            this.dispatch({
                type: 'ADD_EVENTS',
                eventStore: eventTupleToStore(tuple),
            });
            this.triggerEventAdd(newEventApi);
            return newEventApi;
        }
        return null;
    };
    CalendarApi.prototype.triggerEventAdd = function (eventApi) {
        var _this = this;
        var emitter = this.getCurrentData().emitter;
        emitter.trigger('eventAdd', {
            event: eventApi,
            relatedEvents: [],
            revert: function () {
                _this.dispatch({
                    type: 'REMOVE_EVENTS',
                    eventStore: eventApiToStore(eventApi),
                });
            },
        });
    };
    // TODO: optimize
    CalendarApi.prototype.getEventById = function (id) {
        var state = this.getCurrentData();
        var _a = state.eventStore, defs = _a.defs, instances = _a.instances;
        id = String(id);
        for (var defId in defs) {
            var def = defs[defId];
            if (def.publicId === id) {
                if (def.recurringDef) {
                    return new EventApi(state, def, null);
                }
                for (var instanceId in instances) {
                    var instance = instances[instanceId];
                    if (instance.defId === def.defId) {
                        return new EventApi(state, def, instance);
                    }
                }
            }
        }
        return null;
    };
    CalendarApi.prototype.getEvents = function () {
        var currentData = this.getCurrentData();
        return buildEventApis(currentData.eventStore, currentData);
    };
    CalendarApi.prototype.removeAllEvents = function () {
        this.dispatch({ type: 'REMOVE_ALL_EVENTS' });
    };
    // Public Event Sources API
    // -----------------------------------------------------------------------------------------------------------------
    CalendarApi.prototype.getEventSources = function () {
        var state = this.getCurrentData();
        var sourceHash = state.eventSources;
        var sourceApis = [];
        for (var internalId in sourceHash) {
            sourceApis.push(new EventSourceApi(state, sourceHash[internalId]));
        }
        return sourceApis;
    };
    CalendarApi.prototype.getEventSourceById = function (id) {
        var state = this.getCurrentData();
        var sourceHash = state.eventSources;
        id = String(id);
        for (var sourceId in sourceHash) {
            if (sourceHash[sourceId].publicId === id) {
                return new EventSourceApi(state, sourceHash[sourceId]);
            }
        }
        return null;
    };
    CalendarApi.prototype.addEventSource = function (sourceInput) {
        var state = this.getCurrentData();
        if (sourceInput instanceof EventSourceApi) {
            // not already present? don't want to add an old snapshot
            if (!state.eventSources[sourceInput.internalEventSource.sourceId]) {
                this.dispatch({
                    type: 'ADD_EVENT_SOURCES',
                    sources: [sourceInput.internalEventSource],
                });
            }
            return sourceInput;
        }
        var eventSource = parseEventSource(sourceInput, state);
        if (eventSource) { // TODO: error otherwise?
            this.dispatch({ type: 'ADD_EVENT_SOURCES', sources: [eventSource] });
            return new EventSourceApi(state, eventSource);
        }
        return null;
    };
    CalendarApi.prototype.removeAllEventSources = function () {
        this.dispatch({ type: 'REMOVE_ALL_EVENT_SOURCES' });
    };
    CalendarApi.prototype.refetchEvents = function () {
        this.dispatch({ type: 'FETCH_EVENT_SOURCES', isRefetch: true });
    };
    // Scroll
    // -----------------------------------------------------------------------------------------------------------------
    CalendarApi.prototype.scrollToTime = function (timeInput) {
        var time = createDuration(timeInput);
        if (time) {
            this.trigger('_scrollRequest', { time: time });
        }
    };
    return CalendarApi;
}());
export { CalendarApi };
//# sourceMappingURL=CalendarApi.js.map