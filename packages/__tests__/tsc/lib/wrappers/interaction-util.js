import '@fullcalendar/interaction'; // what!?
export function waitEventDrag(calendar, dragging) {
    return new Promise(function (resolve) {
        var modifiedEvent = false;
        calendar.on('eventDrop', function (arg) {
            modifiedEvent = arg.event;
        });
        calendar.on('_noEventDrop', function () {
            resolve(false);
        });
        dragging.then(function () {
            setTimeout(function () {
                resolve(modifiedEvent);
            });
        });
    });
}
export function waitEventDrag2(calendar, dragging) {
    return new Promise(function (resolve) {
        var theArg = false;
        calendar.on('eventDrop', function (arg) {
            theArg = arg;
        });
        calendar.on('_noEventDrop', function () {
            resolve(false);
        });
        dragging.then(function () {
            setTimeout(function () {
                resolve(theArg);
            });
        });
    });
}
export function waitEventResize(calendar, dragging) {
    return new Promise(function (resolve) {
        var modifiedEvent = false;
        calendar.on('eventResize', function (arg) {
            modifiedEvent = arg.event;
        });
        dragging.then(function () {
            setTimeout(function () {
                resolve(modifiedEvent);
            });
        });
    });
}
export function waitEventResize2(calendar, dragging) {
    return new Promise(function (resolve) {
        var theArg = false;
        calendar.on('eventResize', function (arg) {
            theArg = arg;
        });
        dragging.then(function () {
            setTimeout(function () {
                resolve(theArg);
            });
        });
    });
}
export function waitDateSelect(calendar, dragging) {
    return new Promise(function (resolve) {
        var selectInfo = null;
        calendar.on('select', function (arg) {
            selectInfo = arg;
        });
        dragging.then(function () {
            setTimeout(function () {
                resolve(selectInfo);
            });
        });
    });
}
export function waitDateClick(calendar, dragging) {
    return new Promise(function (resolve) {
        var dateClickArg = null;
        calendar.on('dateClick', function (arg) {
            dateClickArg = arg;
        });
        dragging.then(function () {
            setTimeout(function () {
                resolve(dateClickArg);
            });
        });
    });
}
//# sourceMappingURL=interaction-util.js.map