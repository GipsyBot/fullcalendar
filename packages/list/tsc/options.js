import { identity, createFormatter, } from '@fullcalendar/common';
export var OPTION_REFINERS = {
    listDayFormat: createFalsableFormatter,
    listDaySideFormat: createFalsableFormatter,
    noEventsClassNames: identity,
    noEventsContent: identity,
    noEventsDidMount: identity,
    noEventsWillUnmount: identity,
};
function createFalsableFormatter(input) {
    return input === false ? null : createFormatter(input);
}
//# sourceMappingURL=options.js.map