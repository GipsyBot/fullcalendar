import { __assign, __extends } from "tslib";
import { createElement, StandardEvent, BaseComponent, createFormatter } from '@fullcalendar/common';
var DEFAULT_TIME_FORMAT = createFormatter({
    hour: 'numeric',
    minute: '2-digit',
    meridiem: false,
});
var TimeColEvent = /** @class */ (function (_super) {
    __extends(TimeColEvent, _super);
    function TimeColEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeColEvent.prototype.render = function () {
        var classNames = [
            'fc-timegrid-event',
            'fc-v-event',
        ];
        if (this.props.isShort) {
            classNames.push('fc-timegrid-event-short');
        }
        return (createElement(StandardEvent, __assign({}, this.props, { defaultTimeFormat: DEFAULT_TIME_FORMAT, extraClassNames: classNames })));
    };
    return TimeColEvent;
}(BaseComponent));
export { TimeColEvent };
//# sourceMappingURL=TimeColEvent.js.map