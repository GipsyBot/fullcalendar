import { __extends } from "tslib";
import { createElement } from '../vdom';
import { getDayClassNames } from '../component/date-rendering';
import { formatDayString } from '../datelib/formatting-utils';
import { buildClassNameNormalizer, MountHook } from './render-hook';
import { BaseComponent } from '../vdom-util';
import { memoizeObjArg } from '../util/memoize';
import { refineDayCellHookProps } from './DayCellContent';
var DayCellRoot = /** @class */ (function (_super) {
    __extends(DayCellRoot, _super);
    function DayCellRoot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.refineHookProps = memoizeObjArg(refineDayCellHookProps);
        _this.normalizeClassNames = buildClassNameNormalizer();
        return _this;
    }
    DayCellRoot.prototype.render = function () {
        var _a = this, props = _a.props, context = _a.context;
        var options = context.options;
        var hookProps = this.refineHookProps({
            date: props.date,
            dateProfile: props.dateProfile,
            todayRange: props.todayRange,
            showDayNumber: props.showDayNumber,
            extraProps: props.extraHookProps,
            viewApi: context.viewApi,
            dateEnv: context.dateEnv,
        });
        var classNames = getDayClassNames(hookProps, context.theme).concat(hookProps.isDisabled
            ? [] // don't use custom classNames if disabled
            : this.normalizeClassNames(options.dayCellClassNames, hookProps));
        var dataAttrs = hookProps.isDisabled ? {} : {
            'data-date': formatDayString(props.date),
        };
        return (createElement(MountHook, { hookProps: hookProps, didMount: options.dayCellDidMount, willUnmount: options.dayCellWillUnmount, elRef: props.elRef }, function (rootElRef) { return props.children(rootElRef, classNames, dataAttrs, hookProps.isDisabled); }));
    };
    return DayCellRoot;
}(BaseComponent));
export { DayCellRoot };
//# sourceMappingURL=DayCellRoot.js.map