import { __extends } from "tslib";
import { Component } from '../vdom';
import { CalendarDataManager } from '../reducers/CalendarDataManager';
// TODO: move this to react plugin?
var CalendarDataProvider = /** @class */ (function (_super) {
    __extends(CalendarDataProvider, _super);
    function CalendarDataProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.handleData = function (data) {
            if (!_this.dataManager) { // still within initial run, before assignment in constructor
                // eslint-disable-next-line react/no-direct-mutation-state
                _this.state = data; // can't use setState yet
            }
            else {
                _this.setState(data);
            }
        };
        _this.dataManager = new CalendarDataManager({
            optionOverrides: props.optionOverrides,
            calendarApi: props.calendarApi,
            onData: _this.handleData,
        });
        return _this;
    }
    CalendarDataProvider.prototype.render = function () {
        return this.props.children(this.state);
    };
    CalendarDataProvider.prototype.componentDidUpdate = function (prevProps) {
        var newOptionOverrides = this.props.optionOverrides;
        if (newOptionOverrides !== prevProps.optionOverrides) { // prevent recursive handleData
            this.dataManager.resetOptions(newOptionOverrides);
        }
    };
    return CalendarDataProvider;
}(Component));
export { CalendarDataProvider };
//# sourceMappingURL=CalendarDataProvider.js.map