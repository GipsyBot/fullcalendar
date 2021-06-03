import { __assign, __extends } from "tslib";
import { createElement, BaseComponent, RenderHook, } from '@fullcalendar/common';
import { TimeColsAxisCell } from './TimeColsAxisCell';
var TimeColsSlatsBody = /** @class */ (function (_super) {
    __extends(TimeColsSlatsBody, _super);
    function TimeColsSlatsBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeColsSlatsBody.prototype.render = function () {
        var _a = this, props = _a.props, context = _a.context;
        var options = context.options;
        var slatElRefs = props.slatElRefs;
        return (createElement("tbody", null, props.slatMetas.map(function (slatMeta, i) {
            var hookProps = {
                time: slatMeta.time,
                date: context.dateEnv.toDate(slatMeta.date),
                view: context.viewApi,
            };
            var classNames = [
                'fc-timegrid-slot',
                'fc-timegrid-slot-lane',
                slatMeta.isLabeled ? '' : 'fc-timegrid-slot-minor',
            ];
            return (createElement("tr", { key: slatMeta.key, ref: slatElRefs.createRef(slatMeta.key) },
                props.axis && (createElement(TimeColsAxisCell, __assign({}, slatMeta))),
                createElement(RenderHook, { hookProps: hookProps, classNames: options.slotLaneClassNames, content: options.slotLaneContent, didMount: options.slotLaneDidMount, willUnmount: options.slotLaneWillUnmount }, function (rootElRef, customClassNames, innerElRef, innerContent) { return (createElement("td", { ref: rootElRef, className: classNames.concat(customClassNames).join(' '), "data-time": slatMeta.isoTimeStr }, innerContent)); })));
        })));
    };
    return TimeColsSlatsBody;
}(BaseComponent));
export { TimeColsSlatsBody };
//# sourceMappingURL=TimeColsSlatsBody.js.map