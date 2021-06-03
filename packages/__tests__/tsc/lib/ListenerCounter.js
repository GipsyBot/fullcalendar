import { __spreadArrays } from "tslib";
var IGNORED_EVENTS = {
    load: true,
};
var ListenerCounter = /** @class */ (function () {
    function ListenerCounter(el) {
        this.delta = 0;
        this.jQueryStartCount = 0;
        this.el = el;
    }
    ListenerCounter.prototype.startWatching = function () {
        var t = this;
        var el = t.el;
        var origAddEventListened = el.addEventListener;
        var origRemoveEventListener = el.removeEventListener;
        el.addEventListener = function (eventName) {
            var otherArgs = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                otherArgs[_i - 1] = arguments[_i];
            }
            if (!IGNORED_EVENTS[eventName]) {
                t.delta += 1;
            }
            return origAddEventListened.call.apply(origAddEventListened, __spreadArrays([el, eventName], otherArgs));
        };
        el.removeEventListener = function (eventName) {
            var otherArgs = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                otherArgs[_i - 1] = arguments[_i];
            }
            if (!IGNORED_EVENTS[eventName]) {
                t.delta -= 1;
            }
            return origRemoveEventListener.call.apply(origRemoveEventListener, __spreadArrays([el, eventName], otherArgs));
        };
        this.jQueryStartCount = countJqueryListeners(el);
    };
    ListenerCounter.prototype.stopWatching = function () {
        delete this.el.addEventListener;
        delete this.el.removeEventListener;
        return this.computeDelta();
    };
    ListenerCounter.prototype.computeDelta = function () {
        return this.delta + (countJqueryListeners(this.el) - this.jQueryStartCount);
    };
    return ListenerCounter;
}());
export { ListenerCounter };
function countJqueryListeners(el) {
    var hash = getJqueryHandlerHash(el);
    var cnt = 0;
    $.each(hash, function (name, handlers) {
        cnt += handlers.length;
    });
    return cnt;
}
function getJqueryHandlerHash(el) {
    return $._data($(el)[0], 'events') || {};
}
//# sourceMappingURL=ListenerCounter.js.map