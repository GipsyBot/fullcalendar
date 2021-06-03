import { __assign, __extends } from "tslib";
import { createElement, BaseComponent } from '@fullcalendar/common';
import { TimeColsAxisCell } from './TimeColsAxisCell';
var TimeBodyAxis = /** @class */ (function (_super) {
    __extends(TimeBodyAxis, _super);
    function TimeBodyAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeBodyAxis.prototype.render = function () {
        return this.props.slatMetas.map(function (slatMeta) { return (createElement("tr", { key: slatMeta.key },
            createElement(TimeColsAxisCell, __assign({}, slatMeta)))); });
    };
    return TimeBodyAxis;
}(BaseComponent));
export { TimeBodyAxis };
//# sourceMappingURL=TimeBodyAxis.js.map