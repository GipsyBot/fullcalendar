import { __extends } from "tslib";
import { BaseComponent } from './vdom-util';
import { getCanVGrowWithinCell } from './util/table-styling';
var CalendarRoot = /** @class */ (function (_super) {
    __extends(CalendarRoot, _super);
    function CalendarRoot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            forPrint: false,
        };
        _this.handleBeforePrint = function () {
            _this.setState({ forPrint: true });
        };
        _this.handleAfterPrint = function () {
            _this.setState({ forPrint: false });
        };
        return _this;
    }
    CalendarRoot.prototype.render = function () {
        var props = this.props;
        var options = props.options;
        var forPrint = this.state.forPrint;
        var isHeightAuto = forPrint || options.height === 'auto' || options.contentHeight === 'auto';
        var height = (!isHeightAuto && options.height != null) ? options.height : '';
        var classNames = [
            'fc',
            forPrint ? 'fc-media-print' : 'fc-media-screen',
            "fc-direction-" + options.direction,
            props.theme.getClass('root'),
        ];
        if (!getCanVGrowWithinCell()) {
            classNames.push('fc-liquid-hack');
        }
        return props.children(classNames, height, isHeightAuto, forPrint);
    };
    CalendarRoot.prototype.componentDidMount = function () {
        var emitter = this.props.emitter;
        emitter.on('_beforeprint', this.handleBeforePrint);
        emitter.on('_afterprint', this.handleAfterPrint);
    };
    CalendarRoot.prototype.componentWillUnmount = function () {
        var emitter = this.props.emitter;
        emitter.off('_beforeprint', this.handleBeforePrint);
        emitter.off('_afterprint', this.handleAfterPrint);
    };
    return CalendarRoot;
}(BaseComponent));
export { CalendarRoot };
//# sourceMappingURL=CalendarRoot.js.map