import { __extends } from "tslib";
import { addMs, startOfDay, addDays } from './datelib/marker';
import { createDuration } from './datelib/duration';
import { ViewContextType } from './ViewContext';
import { Component } from './vdom';
import { getNow } from './reducers/current-date';
var NowTimer = /** @class */ (function (_super) {
    __extends(NowTimer, _super);
    function NowTimer(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.initialNowDate = getNow(context.options.now, context.dateEnv);
        _this.initialNowQueriedMs = new Date().valueOf();
        _this.state = _this.computeTiming().currentState;
        return _this;
    }
    NowTimer.prototype.render = function () {
        var _a = this, props = _a.props, state = _a.state;
        return props.children(state.nowDate, state.todayRange);
    };
    NowTimer.prototype.componentDidMount = function () {
        this.setTimeout();
    };
    NowTimer.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.unit !== this.props.unit) {
            this.clearTimeout();
            this.setTimeout();
        }
    };
    NowTimer.prototype.componentWillUnmount = function () {
        this.clearTimeout();
    };
    NowTimer.prototype.computeTiming = function () {
        var _a = this, props = _a.props, context = _a.context;
        var unroundedNow = addMs(this.initialNowDate, new Date().valueOf() - this.initialNowQueriedMs);
        var currentUnitStart = context.dateEnv.startOf(unroundedNow, props.unit);
        var nextUnitStart = context.dateEnv.add(currentUnitStart, createDuration(1, props.unit));
        var waitMs = nextUnitStart.valueOf() - unroundedNow.valueOf();
        // there is a max setTimeout ms value (https://stackoverflow.com/a/3468650/96342)
        // ensure no longer than a day
        waitMs = Math.min(1000 * 60 * 60 * 24, waitMs);
        return {
            currentState: { nowDate: currentUnitStart, todayRange: buildDayRange(currentUnitStart) },
            nextState: { nowDate: nextUnitStart, todayRange: buildDayRange(nextUnitStart) },
            waitMs: waitMs,
        };
    };
    NowTimer.prototype.setTimeout = function () {
        var _this = this;
        var _a = this.computeTiming(), nextState = _a.nextState, waitMs = _a.waitMs;
        this.timeoutId = setTimeout(function () {
            _this.setState(nextState, function () {
                _this.setTimeout();
            });
        }, waitMs);
    };
    NowTimer.prototype.clearTimeout = function () {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    };
    NowTimer.contextType = ViewContextType;
    return NowTimer;
}(Component));
export { NowTimer };
function buildDayRange(date) {
    var start = startOfDay(date);
    var end = addDays(start, 1);
    return { start: start, end: end };
}
//# sourceMappingURL=NowTimer.js.map