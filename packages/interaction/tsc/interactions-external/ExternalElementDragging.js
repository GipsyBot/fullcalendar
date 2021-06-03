import { __assign as __assign_1 } from "tslib";
import { interactionSettingsStore, parseEventDef, createEventInstance, createEmptyEventStore, eventTupleToStore, config, parseDragMeta, EventApi, elementMatches, enableCursor, disableCursor, isInteractionValid, getDefaultEventEnd, refineEventDef, } from '@fullcalendar/common';
import { __assign } from 'tslib';
import { HitDragging } from '../interactions/HitDragging';
import { buildDatePointApiWithContext } from '../utils';
/*
Given an already instantiated draggable object for one-or-more elements,
Interprets any dragging as an attempt to drag an events that lives outside
of a calendar onto a calendar.
*/
var ExternalElementDragging = /** @class */ (function () {
    function ExternalElementDragging(dragging, suppliedDragMeta) {
        var _this = this;
        this.receivingContext = null;
        this.droppableEvent = null; // will exist for all drags, even if create:false
        this.suppliedDragMeta = null;
        this.dragMeta = null;
        this.handleDragStart = function (ev) {
            _this.dragMeta = _this.buildDragMeta(ev.subjectEl);
        };
        this.handleHitUpdate = function (hit, isFinal, ev) {
            var dragging = _this.hitDragging.dragging;
            var receivingContext = null;
            var droppableEvent = null;
            var isInvalid = false;
            var interaction = {
                affectedEvents: createEmptyEventStore(),
                mutatedEvents: createEmptyEventStore(),
                isEvent: _this.dragMeta.create,
            };
            if (hit) {
                receivingContext = hit.context;
                if (_this.canDropElOnCalendar(ev.subjectEl, receivingContext)) {
                    droppableEvent = computeEventForDateSpan(hit.dateSpan, _this.dragMeta, receivingContext);
                    interaction.mutatedEvents = eventTupleToStore(droppableEvent);
                    isInvalid = !isInteractionValid(interaction, hit.dateProfile, receivingContext);
                    if (isInvalid) {
                        interaction.mutatedEvents = createEmptyEventStore();
                        droppableEvent = null;
                    }
                }
            }
            _this.displayDrag(receivingContext, interaction);
            // show mirror if no already-rendered mirror element OR if we are shutting down the mirror (?)
            // TODO: wish we could somehow wait for dispatch to guarantee render
            dragging.setMirrorIsVisible(isFinal || !droppableEvent || !document.querySelector('.fc-event-mirror'));
            if (!isInvalid) {
                enableCursor();
            }
            else {
                disableCursor();
            }
            if (!isFinal) {
                dragging.setMirrorNeedsRevert(!droppableEvent);
                _this.receivingContext = receivingContext;
                _this.droppableEvent = droppableEvent;
            }
        };
        this.handleDragEnd = function (pev) {
            var _a = _this, receivingContext = _a.receivingContext, droppableEvent = _a.droppableEvent;
            _this.clearDrag();
            if (receivingContext && droppableEvent) {
                var finalHit = _this.hitDragging.finalHit;
                var finalView = finalHit.context.viewApi;
                var dragMeta = _this.dragMeta;
                receivingContext.emitter.trigger('drop', __assign_1(__assign_1({}, buildDatePointApiWithContext(finalHit.dateSpan, receivingContext)), { draggedEl: pev.subjectEl, jsEvent: pev.origEvent, view: finalView }));
                if (dragMeta.create) {
                    var addingEvents_1 = eventTupleToStore(droppableEvent);
                    receivingContext.dispatch({
                        type: 'MERGE_EVENTS',
                        eventStore: addingEvents_1,
                    });
                    if (pev.isTouch) {
                        receivingContext.dispatch({
                            type: 'SELECT_EVENT',
                            eventInstanceId: droppableEvent.instance.instanceId,
                        });
                    }
                    // signal that an external event landed
                    receivingContext.emitter.trigger('eventReceive', {
                        event: new EventApi(receivingContext, droppableEvent.def, droppableEvent.instance),
                        relatedEvents: [],
                        revert: function () {
                            receivingContext.dispatch({
                                type: 'REMOVE_EVENTS',
                                eventStore: addingEvents_1,
                            });
                        },
                        draggedEl: pev.subjectEl,
                        view: finalView,
                    });
                }
            }
            _this.receivingContext = null;
            _this.droppableEvent = null;
        };
        var hitDragging = this.hitDragging = new HitDragging(dragging, interactionSettingsStore);
        hitDragging.requireInitial = false; // will start outside of a component
        hitDragging.emitter.on('dragstart', this.handleDragStart);
        hitDragging.emitter.on('hitupdate', this.handleHitUpdate);
        hitDragging.emitter.on('dragend', this.handleDragEnd);
        this.suppliedDragMeta = suppliedDragMeta;
    }
    ExternalElementDragging.prototype.buildDragMeta = function (subjectEl) {
        if (typeof this.suppliedDragMeta === 'object') {
            return parseDragMeta(this.suppliedDragMeta);
        }
        if (typeof this.suppliedDragMeta === 'function') {
            return parseDragMeta(this.suppliedDragMeta(subjectEl));
        }
        return getDragMetaFromEl(subjectEl);
    };
    ExternalElementDragging.prototype.displayDrag = function (nextContext, state) {
        var prevContext = this.receivingContext;
        if (prevContext && prevContext !== nextContext) {
            prevContext.dispatch({ type: 'UNSET_EVENT_DRAG' });
        }
        if (nextContext) {
            nextContext.dispatch({ type: 'SET_EVENT_DRAG', state: state });
        }
    };
    ExternalElementDragging.prototype.clearDrag = function () {
        if (this.receivingContext) {
            this.receivingContext.dispatch({ type: 'UNSET_EVENT_DRAG' });
        }
    };
    ExternalElementDragging.prototype.canDropElOnCalendar = function (el, receivingContext) {
        var dropAccept = receivingContext.options.dropAccept;
        if (typeof dropAccept === 'function') {
            return dropAccept.call(receivingContext.calendarApi, el);
        }
        if (typeof dropAccept === 'string' && dropAccept) {
            return Boolean(elementMatches(el, dropAccept));
        }
        return true;
    };
    return ExternalElementDragging;
}());
export { ExternalElementDragging };
// Utils for computing event store from the DragMeta
// ----------------------------------------------------------------------------------------------------
function computeEventForDateSpan(dateSpan, dragMeta, context) {
    var defProps = __assign_1({}, dragMeta.leftoverProps);
    for (var _i = 0, _a = context.pluginHooks.externalDefTransforms; _i < _a.length; _i++) {
        var transform = _a[_i];
        __assign(defProps, transform(dateSpan, dragMeta));
    }
    var _b = refineEventDef(defProps, context), refined = _b.refined, extra = _b.extra;
    var def = parseEventDef(refined, extra, dragMeta.sourceId, dateSpan.allDay, context.options.forceEventDuration || Boolean(dragMeta.duration), // hasEnd
    context);
    var start = dateSpan.range.start;
    // only rely on time info if drop zone is all-day,
    // otherwise, we already know the time
    if (dateSpan.allDay && dragMeta.startTime) {
        start = context.dateEnv.add(start, dragMeta.startTime);
    }
    var end = dragMeta.duration ?
        context.dateEnv.add(start, dragMeta.duration) :
        getDefaultEventEnd(dateSpan.allDay, start, context);
    var instance = createEventInstance(def.defId, { start: start, end: end });
    return { def: def, instance: instance };
}
// Utils for extracting data from element
// ----------------------------------------------------------------------------------------------------
function getDragMetaFromEl(el) {
    var str = getEmbeddedElData(el, 'event');
    var obj = str ?
        JSON.parse(str) :
        { create: false }; // if no embedded data, assume no event creation
    return parseDragMeta(obj);
}
config.dataAttrPrefix = '';
function getEmbeddedElData(el, name) {
    var prefix = config.dataAttrPrefix;
    var prefixedName = (prefix ? prefix + '-' : '') + name;
    return el.getAttribute('data-' + prefixedName) || '';
}
//# sourceMappingURL=ExternalElementDragging.js.map