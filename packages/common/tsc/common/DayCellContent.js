import { __assign, __extends } from "tslib";
import { createElement } from '../vdom';
import { getDateMeta } from '../component/date-rendering';
import { createFormatter } from '../datelib/formatting';
import { ContentHook } from './render-hook';
import { BaseComponent } from '../vdom-util';
var DAY_NUM_FORMAT = createFormatter({ day: 'numeric' });
var DayCellContent = /** @class */ (function (_super) {
    __extends(DayCellContent, _super);
    function DayCellContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DayCellContent.prototype.render = function () {
        var _a = this, props = _a.props, context = _a.context;
        var options = context.options;
        var hookProps = refineDayCellHookProps({
            date: props.date,
            dateProfile: props.dateProfile,
            todayRange: props.todayRange,
            showDayNumber: props.showDayNumber,
            extraProps: props.extraHookProps,
            viewApi: context.viewApi,
            dateEnv: context.dateEnv,
        });
        return (createElement(ContentHook, { hookProps: hookProps, content: options.dayCellContent, defaultContent: props.defaultContent }, props.children));
    };
    return DayCellContent;
}(BaseComponent));
export { DayCellContent };
export function refineDayCellHookProps(raw) {
    var date = raw.date, dateEnv = raw.dateEnv;
    var dayMeta = getDateMeta(date, raw.todayRange, null, raw.dateProfile);
    return __assign(__assign(__assign({ date: dateEnv.toDate(date), view: raw.viewApi }, dayMeta), { dayNumberText: raw.showDayNumber ? dateEnv.format(date, DAY_NUM_FORMAT) : '' }), raw.extraProps);
}
//# sourceMappingURL=DayCellContent.js.map