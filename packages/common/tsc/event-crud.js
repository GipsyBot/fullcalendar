import { buildEventApis } from './api/EventApi';
export function handleEventStore(eventStore, context) {
    var emitter = context.emitter;
    if (emitter.hasHandlers('eventsSet')) {
        emitter.trigger('eventsSet', buildEventApis(eventStore, context));
    }
}
//# sourceMappingURL=event-crud.js.map