import { sliceEventStore } from './component/event-rendering';
// HELPERS
/*
if nextDayThreshold is specified, slicing is done in an all-day fashion.
you can get nextDayThreshold from context.nextDayThreshold
*/
export function sliceEvents(props, allDay) {
    return sliceEventStore(props.eventStore, props.eventUiBases, props.dateProfile.activeRange, allDay ? props.nextDayThreshold : null).fg;
}
//# sourceMappingURL=View.js.map