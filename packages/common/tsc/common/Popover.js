import { __assign, __extends } from "tslib";
import { computeClippedClientRect } from '../util/dom-geom';
import { applyStyle, elementClosest, getEventTargetViaRoot } from '../util/dom-manip';
import { createElement, createPortal } from '../vdom';
import { BaseComponent, setRef } from '../vdom-util';
var PADDING_FROM_VIEWPORT = 10;
var Popover = /** @class */ (function (_super) {
    __extends(Popover, _super);
    function Popover() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleRootEl = function (el) {
            _this.rootEl = el;
            if (_this.props.elRef) {
                setRef(_this.props.elRef, el);
            }
        };
        // Triggered when the user clicks *anywhere* in the document, for the autoHide feature
        _this.handleDocumentMousedown = function (ev) {
            // only hide the popover if the click happened outside the popover
            var target = getEventTargetViaRoot(ev);
            if (!_this.rootEl.contains(target)) {
                _this.handleCloseClick();
            }
        };
        _this.handleCloseClick = function () {
            var onClose = _this.props.onClose;
            if (onClose) {
                onClose();
            }
        };
        return _this;
    }
    Popover.prototype.render = function () {
        var theme = this.context.theme;
        var props = this.props;
        var classNames = [
            'fc-popover',
            theme.getClass('popover'),
        ].concat(props.extraClassNames || []);
        return createPortal(createElement("div", __assign({ className: classNames.join(' ') }, props.extraAttrs, { ref: this.handleRootEl }),
            createElement("div", { className: 'fc-popover-header ' + theme.getClass('popoverHeader') },
                createElement("span", { className: "fc-popover-title" }, props.title),
                createElement("span", { className: 'fc-popover-close ' + theme.getIconClass('close'), onClick: this.handleCloseClick })),
            createElement("div", { className: 'fc-popover-body ' + theme.getClass('popoverContent') }, props.children)), props.parentEl);
    };
    Popover.prototype.componentDidMount = function () {
        document.addEventListener('mousedown', this.handleDocumentMousedown);
        this.updateSize();
    };
    Popover.prototype.componentWillUnmount = function () {
        document.removeEventListener('mousedown', this.handleDocumentMousedown);
    };
    Popover.prototype.updateSize = function () {
        var isRtl = this.context.isRtl;
        var _a = this.props, alignmentEl = _a.alignmentEl, alignGridTop = _a.alignGridTop;
        var rootEl = this.rootEl;
        var alignmentRect = computeClippedClientRect(alignmentEl);
        if (alignmentRect) {
            var popoverDims = rootEl.getBoundingClientRect();
            // position relative to viewport
            var popoverTop = alignGridTop
                ? elementClosest(alignmentEl, '.fc-scrollgrid').getBoundingClientRect().top
                : alignmentRect.top;
            var popoverLeft = isRtl ? alignmentRect.right - popoverDims.width : alignmentRect.left;
            // constrain
            popoverTop = Math.max(popoverTop, PADDING_FROM_VIEWPORT);
            popoverLeft = Math.min(popoverLeft, document.documentElement.clientWidth - PADDING_FROM_VIEWPORT - popoverDims.width);
            popoverLeft = Math.max(popoverLeft, PADDING_FROM_VIEWPORT);
            var origin_1 = rootEl.offsetParent.getBoundingClientRect();
            applyStyle(rootEl, {
                top: popoverTop - origin_1.top,
                left: popoverLeft - origin_1.left,
            });
        }
    };
    return Popover;
}(BaseComponent));
export { Popover };
//# sourceMappingURL=Popover.js.map