import { Calendar, createPlugin } from '@fullcalendar/core';
import { __assign } from 'tslib';
import { parseLocalDate, parseUtcDate } from './date-parsing';
// Other Important Global Stuff
// ---------------------------------------------------------------------------------------------------------------------
import './hacks';
import './simulate';
import './date-matchers';
// Setup / Teardown
// ---------------------------------------------------------------------------------------------------------------------
var optionsStack = null;
beforeEach(function () {
    optionsStack = [];
});
afterEach(function () {
    optionsStack = null;
    if (window.currentCalendar) {
        window.currentCalendar.destroy();
        window.currentCalendar = null;
    }
    $('#calendar').remove();
});
// Calendar Options and Initialization
// ---------------------------------------------------------------------------------------------------------------------
function pushOptions(options) {
    beforeEach(function () { return optionsStack.push(options); });
}
// called within an `it`
// needs to be called *before* initCalendar
function spyOnCalendarCallback(name, func) {
    var options = {};
    options[name] = func || (function () { });
    spyOn(options, name).and.callThrough();
    optionsStack.push(options);
    return options[name];
}
function initCalendar(moreOptions, el) {
    var $el;
    if (moreOptions) {
        optionsStack.push(moreOptions);
    }
    if (el) {
        $el = $(el);
    }
    else {
        $el = $('<div id="calendar">').appendTo('body');
    }
    if (window.currentCalendar) {
        window.currentCalendar.destroy();
    }
    var options = getCurrentOptions();
    var newCalendar = null;
    options.plugins = options.plugins.concat([
        createPlugin({
            contextInit: function (context) {
                newCalendar = window.currentCalendar = context.calendarApi;
            },
        }),
    ]);
    var cool = new Calendar($el[0], options);
    if (newCalendar === window.currentCalendar) {
        newCalendar.render();
    }
    else {
        newCalendar.destroy();
    }
    return cool;
}
function getCurrentOptions() {
    var args = [{}].concat(optionsStack);
    return $.extend.apply($, args); // eslint-disable-line prefer-spread
}
// Categorizing Tests
// ---------------------------------------------------------------------------------------------------------------------
/*
describeOptions(optionName, descriptionAndValueHash, callback)
describeOptions(descriptionAndOptionsHash, callback)
 */
function describeOptions(optName, hash, callback) {
    if ($.type(optName) === 'object') {
        callback = hash;
        hash = optName;
        optName = null;
    }
    $.each(hash, function (desc, val) {
        var opts;
        if (optName) {
            opts = {};
            opts[optName] = val;
        }
        else {
            opts = val;
        }
        opts = $.extend(true, {}, opts);
        describe(desc, function () {
            pushOptions(opts);
            callback(val);
        });
    });
}
function describeValues(hash, callback) {
    $.each(hash, 
    /**
     * @param desc {string}
     */
    function (desc, val) {
        describe(desc, function () {
            callback(val);
        });
    });
}
// Timezone Tests (needed?)
// ---------------------------------------------------------------------------------------------------------------------
var timeZoneScenarios = {
    local: {
        description: 'when local timezone',
        value: 'local',
        parseDate: parseLocalDate,
    },
    UTC: {
        description: 'when UTC timezone',
        value: 'UTC',
        parseDate: parseUtcDate,
    },
};
function describeTimeZones(callback) {
    $.each(timeZoneScenarios, function (name, scenario) {
        describe(scenario.description, function () {
            pushOptions({
                timeZone: name,
            });
            callback(scenario);
        });
    });
}
function describeTimeZone(name, callback) {
    var scenario = timeZoneScenarios[name];
    describe(scenario.description, function () {
        pushOptions({
            timeZone: name,
        });
        callback(scenario);
    });
}
// Misc
// ---------------------------------------------------------------------------------------------------------------------
function oneCall(func) {
    var called;
    called = false;
    return function () {
        if (!called) {
            called = true;
            return func.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return null;
    };
}
function spyOnMethod(Class, methodName, dontCallThrough) {
    var origMethod = Class.prototype.hasOwnProperty(methodName) // eslint-disable-line no-prototype-builtins
        ? Class.prototype[methodName]
        : null;
    var spy = spyOn(Class.prototype, methodName);
    if (!dontCallThrough) {
        spy = spy.and.callThrough();
    }
    spy.restore = function () {
        if (origMethod) {
            Class.prototype[methodName] = origMethod;
        }
        else {
            delete Class.prototype[methodName];
        }
    };
    return spy;
}
// wraps an existing function in a spy, calling through to the function
function spyCall(func) {
    func = func || (function () { });
    var obj = { func: func };
    spyOn(obj, 'func').and.callThrough();
    return obj.func;
}
__assign(window, {
    spyOnCalendarCallback: spyOnCalendarCallback,
    pushOptions: pushOptions,
    initCalendar: initCalendar,
    getCurrentOptions: getCurrentOptions,
    describeOptions: describeOptions,
    describeValues: describeValues,
    describeTimeZones: describeTimeZones,
    describeTimeZone: describeTimeZone,
    oneCall: oneCall,
    spyOnMethod: spyOnMethod,
    spyCall: spyCall,
});
pushOptions({
    timeZone: 'UTC',
    eventDisplay: 'auto',
});
//# sourceMappingURL=globals.js.map