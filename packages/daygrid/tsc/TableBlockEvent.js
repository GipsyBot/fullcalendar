import { __assign, __extends } from "tslib";
import { createElement, StandardEvent, BaseComponent } from '@fullcalendar/common';
import { DEFAULT_TABLE_EVENT_TIME_FORMAT } from './event-rendering';
var TableBlockEvent = /** @class */ (function (_super) {
    __extends(TableBlockEvent, _super);
    function TableBlockEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableBlockEvent.prototype.render = function () {
        var props = this.props;
        return (createElement(StandardEvent, __assign({}, props, { extraClassNames: ['fc-daygrid-event', 'fc-daygrid-block-event', 'fc-h-event'], defaultTimeFormat: DEFAULT_TABLE_EVENT_TIME_FORMAT, defaultDisplayEventEnd: props.defaultDisplayEventEnd, disableResizing: !props.seg.eventRange.def.allDay })));
    };
    return TableBlockEvent;
}(BaseComponent));
export { TableBlockEvent };
//# sourceMappingURL=TableBlockEvent.js.map