import { __assign as __assign_1, __extends } from "tslib";
import { applyMutationToEventStore, elementClosest, getRelevantEvents, createEmptyEventStore, diffDates, enableCursor, disableCursor, EventApi, getElSeg, createDuration, Interaction, interactionSettingsToStore, buildEventApis, isInteractionValid, } from '@fullcalendar/common';
import { HitDragging, isHitsEqual } from './HitDragging';
import { FeaturefulElementDragging } from '../dnd/FeaturefulElementDragging';
var EventResizing = /** @class */ (function (_super) {
    __extends(EventResizing, _super);
    function EventResizing(settings) {
        var _this = _super.call(this, settings) || this;
        // internal state
        _this.draggingSegEl = null;
        _this.draggingSeg = null; // TODO: rename to resizingSeg? subjectSeg?
        _this.eventRange = null;
        _this.relevantEvents = null;
        _this.validMutation = null;
        _this.mutatedRelevantEvents = null;
        _this.handlePointerDown = function (ev) {
            var component = _this.component;
            var segEl = _this.querySegEl(ev);
            var seg = getElSeg(segEl);
            var eventRange = _this.eventRange = seg.eventRange;
            _this.dragging.minDistance = component.context.options.eventDragMinDistance;
            // if touch, need to be working with a selected event
            _this.dragging.setIgnoreMove(!_this.component.isValidSegDownEl(ev.origEvent.target) ||
                (ev.isTouch && _this.component.props.eventSelection !== eventRange.instance.instanceId));
        };
        _this.handleDragStart = function (ev) {
            var context = _this.component.context;
            var eventRange = _this.eventRange;
            _this.relevantEvents = getRelevantEvents(context.getCurrentData().eventStore, _this.eventRange.instance.instanceId);
            var segEl = _this.querySegEl(ev);
            _this.draggingSegEl = segEl;
            _this.draggingSeg = getElSeg(segEl);
            context.calendarApi.unselect();
            context.emitter.trigger('eventResizeStart', {
                el: segEl,
                event: new EventApi(context, eventRange.def, eventRange.instance),
                jsEvent: ev.origEvent,
                view: context.viewApi,
            });
        };
        _this.handleHitUpdate = function (hit, isFinal, ev) {
            var context = _this.component.context;
            var relevantEvents = _this.relevantEvents;
            var initialHit = _this.hitDragging.initialHit;
            var eventInstance = _this.eventRange.instance;
            var mutation = null;
            var mutatedRelevantEvents = null;
            var isInvalid = false;
            var interaction = {
                affectedEvents: relevantEvents,
                mutatedEvents: createEmptyEventStore(),
                isEvent: true,
            };
            if (hit) {
                var disallowed = hit.componentId === initialHit.componentId
                    && _this.isHitComboAllowed
                    && !_this.isHitComboAllowed(initialHit, hit);
                if (!disallowed) {
                    mutation = computeMutation(initialHit, hit, ev.subjectEl.classList.contains('fc-event-resizer-start'), eventInstance.range);
                }
            }
            if (mutation) {
                mutatedRelevantEvents = applyMutationToEventStore(relevantEvents, context.getCurrentData().eventUiBases, mutation, context);
                interaction.mutatedEvents = mutatedRelevantEvents;
                if (!isInteractionValid(interaction, hit.dateProfile, context)) {
                    isInvalid = true;
                    mutation = null;
                    mutatedRelevantEvents = null;
                    interaction.mutatedEvents = null;
                }
            }
            if (mutatedRelevantEvents) {
                context.dispatch({
                    type: 'SET_EVENT_RESIZE',
                    state: interaction,
                });
            }
            else {
                context.dispatch({ type: 'UNSET_EVENT_RESIZE' });
            }
            if (!isInvalid) {
                enableCursor();
            }
            else {
                disableCursor();
            }
            if (!isFinal) {
                if (mutation && isHitsEqual(initialHit, hit)) {
                    mutation = null;
                }
                _this.validMutation = mutation;
                _this.mutatedRelevantEvents = mutatedRelevantEvents;
            }
        };
        _this.handleDragEnd = function (ev) {
            var context = _this.component.context;
            var eventDef = _this.eventRange.def;
            var eventInstance = _this.eventRange.instance;
            var eventApi = new EventApi(context, eventDef, eventInstance);
            var relevantEvents = _this.relevantEvents;
            var mutatedRelevantEvents = _this.mutatedRelevantEvents;
            context.emitter.trigger('eventResizeStop', {
                el: _this.draggingSegEl,
                event: eventApi,
                jsEvent: ev.origEvent,
                view: context.viewApi,
            });
            if (_this.validMutation) {
                var updatedEventApi = new EventApi(context, mutatedRelevantEvents.defs[eventDef.defId], eventInstance ? mutatedRelevantEvents.instances[eventInstance.instanceId] : null);
                context.dispatch({
                    type: 'MERGE_EVENTS',
                    eventStore: mutatedRelevantEvents,
                });
                var eventChangeArg = {
                    oldEvent: eventApi,
                    event: updatedEventApi,
                    relatedEvents: buildEventApis(mutatedRelevantEvents, context, eventInstance),
                    revert: function () {
                        context.dispatch({
                            type: 'MERGE_EVENTS',
                            eventStore: relevantEvents,
                        });
                    },
                };
                context.emitter.trigger('eventResize', __assign_1(__assign_1({}, eventChangeArg), { el: _this.draggingSegEl, startDelta: _this.validMutation.startDelta || createDuration(0), endDelta: _this.validMutation.endDelta || createDuration(0), jsEvent: ev.origEvent, view: context.viewApi }));
                context.emitter.trigger('eventChange', eventChangeArg);
            }
            else {
                context.emitter.trigger('_noEventResize');
            }
            // reset all internal state
            _this.draggingSeg = null;
            _this.relevantEvents = null;
            _this.validMutation = null;
            // okay to keep eventInstance around. useful to set it in handlePointerDown
        };
        var component = settings.component;
        var dragging = _this.dragging = new FeaturefulElementDragging(settings.el);
        dragging.pointer.selector = '.fc-event-resizer';
        dragging.touchScrollAllowed = false;
        dragging.autoScroller.isEnabled = component.context.options.dragScroll;
        var hitDragging = _this.hitDragging = new HitDragging(_this.dragging, interactionSettingsToStore(settings));
        hitDragging.emitter.on('pointerdown', _this.handlePointerDown);
        hitDragging.emitter.on('dragstart', _this.handleDragStart);
        hitDragging.emitter.on('hitupdate', _this.handleHitUpdate);
        hitDragging.emitter.on('dragend', _this.handleDragEnd);
        return _this;
    }
    EventResizing.prototype.destroy = function () {
        this.dragging.destroy();
    };
    EventResizing.prototype.querySegEl = function (ev) {
        return elementClosest(ev.subjectEl, '.fc-event');
    };
    return EventResizing;
}(Interaction));
export { EventResizing };
function computeMutation(hit0, hit1, isFromStart, instanceRange) {
    var dateEnv = hit0.context.dateEnv;
    var date0 = hit0.dateSpan.range.start;
    var date1 = hit1.dateSpan.range.start;
    var delta = diffDates(date0, date1, dateEnv, hit0.largeUnit);
    if (isFromStart) {
        if (dateEnv.add(instanceRange.start, delta) < instanceRange.end) {
            return { startDelta: delta };
        }
    }
    else if (dateEnv.add(instanceRange.end, delta) > instanceRange.start) {
        return { endDelta: delta };
    }
    return null;
}
//# sourceMappingURL=EventResizing.js.map