import { __extends } from "tslib";
import { createElement } from '../vdom';
import { BaseComponent, setRef } from '../vdom-util';
var VISIBLE_HIDDEN_RE = /^(visible|hidden)$/;
var Scroller = /** @class */ (function (_super) {
    __extends(Scroller, _super);
    function Scroller() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleEl = function (el) {
            _this.el = el;
            setRef(_this.props.elRef, el);
        };
        return _this;
    }
    Scroller.prototype.render = function () {
        var props = this.props;
        var liquid = props.liquid, liquidIsAbsolute = props.liquidIsAbsolute;
        var isAbsolute = liquid && liquidIsAbsolute;
        var className = ['fc-scroller'];
        if (liquid) {
            if (liquidIsAbsolute) {
                className.push('fc-scroller-liquid-absolute');
            }
            else {
                className.push('fc-scroller-liquid');
            }
        }
        return (createElement("div", { ref: this.handleEl, className: className.join(' '), style: {
                overflowX: props.overflowX,
                overflowY: props.overflowY,
                left: (isAbsolute && -(props.overcomeLeft || 0)) || '',
                right: (isAbsolute && -(props.overcomeRight || 0)) || '',
                bottom: (isAbsolute && -(props.overcomeBottom || 0)) || '',
                marginLeft: (!isAbsolute && -(props.overcomeLeft || 0)) || '',
                marginRight: (!isAbsolute && -(props.overcomeRight || 0)) || '',
                marginBottom: (!isAbsolute && -(props.overcomeBottom || 0)) || '',
                maxHeight: props.maxHeight || '',
            } }, props.children));
    };
    Scroller.prototype.needsXScrolling = function () {
        if (VISIBLE_HIDDEN_RE.test(this.props.overflowX)) {
            return false;
        }
        // testing scrollWidth>clientWidth is unreliable cross-browser when pixel heights aren't integers.
        // much more reliable to see if children are taller than the scroller, even tho doesn't account for
        // inner-child margins and absolute positioning
        var el = this.el;
        var realClientWidth = this.el.getBoundingClientRect().width - this.getYScrollbarWidth();
        var children = el.children;
        for (var i = 0; i < children.length; i += 1) {
            var childEl = children[i];
            if (childEl.getBoundingClientRect().width > realClientWidth) {
                return true;
            }
        }
        return false;
    };
    Scroller.prototype.needsYScrolling = function () {
        if (VISIBLE_HIDDEN_RE.test(this.props.overflowY)) {
            return false;
        }
        // testing scrollHeight>clientHeight is unreliable cross-browser when pixel heights aren't integers.
        // much more reliable to see if children are taller than the scroller, even tho doesn't account for
        // inner-child margins and absolute positioning
        var el = this.el;
        var realClientHeight = this.el.getBoundingClientRect().height - this.getXScrollbarWidth();
        var children = el.children;
        for (var i = 0; i < children.length; i += 1) {
            var childEl = children[i];
            if (childEl.getBoundingClientRect().height > realClientHeight) {
                return true;
            }
        }
        return false;
    };
    Scroller.prototype.getXScrollbarWidth = function () {
        if (VISIBLE_HIDDEN_RE.test(this.props.overflowX)) {
            return 0;
        }
        return this.el.offsetHeight - this.el.clientHeight; // only works because we guarantee no borders. TODO: add to CSS with important?
    };
    Scroller.prototype.getYScrollbarWidth = function () {
        if (VISIBLE_HIDDEN_RE.test(this.props.overflowY)) {
            return 0;
        }
        return this.el.offsetWidth - this.el.clientWidth; // only works because we guarantee no borders. TODO: add to CSS with important?
    };
    return Scroller;
}(BaseComponent));
export { Scroller };
//# sourceMappingURL=Scroller.js.map