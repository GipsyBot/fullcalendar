import { __extends } from "tslib";
import { BaseComponent, setRef } from './vdom-util';
import { createElement } from './vdom';
// TODO: do function component?
var ViewContainer = /** @class */ (function (_super) {
    __extends(ViewContainer, _super);
    function ViewContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            availableWidth: null,
        };
        _this.handleEl = function (el) {
            _this.el = el;
            setRef(_this.props.elRef, el);
            _this.updateAvailableWidth();
        };
        _this.handleResize = function () {
            _this.updateAvailableWidth();
        };
        return _this;
    }
    ViewContainer.prototype.render = function () {
        var _a = this, props = _a.props, state = _a.state;
        var aspectRatio = props.aspectRatio;
        var classNames = [
            'fc-view-harness',
            (aspectRatio || props.liquid || props.height)
                ? 'fc-view-harness-active' // harness controls the height
                : 'fc-view-harness-passive',
        ];
        var height = '';
        var paddingBottom = '';
        if (aspectRatio) {
            if (state.availableWidth !== null) {
                height = state.availableWidth / aspectRatio;
            }
            else {
                // while waiting to know availableWidth, we can't set height to *zero*
                // because will cause lots of unnecessary scrollbars within scrollgrid.
                // BETTER: don't start rendering ANYTHING yet until we know container width
                // NOTE: why not always use paddingBottom? Causes height oscillation (issue 5606)
                paddingBottom = (1 / aspectRatio) * 100 + "%";
            }
        }
        else {
            height = props.height || '';
        }
        return (createElement("div", { ref: this.handleEl, onClick: props.onClick, className: classNames.join(' '), style: { height: height, paddingBottom: paddingBottom } }, props.children));
    };
    ViewContainer.prototype.componentDidMount = function () {
        this.context.addResizeHandler(this.handleResize);
    };
    ViewContainer.prototype.componentWillUnmount = function () {
        this.context.removeResizeHandler(this.handleResize);
    };
    ViewContainer.prototype.updateAvailableWidth = function () {
        if (this.el && // needed. but why?
            this.props.aspectRatio // aspectRatio is the only height setting that needs availableWidth
        ) {
            this.setState({ availableWidth: this.el.offsetWidth });
        }
    };
    return ViewContainer;
}(BaseComponent));
export { ViewContainer };
//# sourceMappingURL=ViewContainer.js.map