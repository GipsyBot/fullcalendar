/* eslint max-classes-per-file: "off" */
import { __extends } from "tslib";
/*
An object for getting/setting scroll-related information for an element.
Internally, this is done very differently for window versus DOM element,
so this object serves as a common interface.
*/
var ScrollController = /** @class */ (function () {
    function ScrollController() {
    }
    ScrollController.prototype.getMaxScrollTop = function () {
        return this.getScrollHeight() - this.getClientHeight();
    };
    ScrollController.prototype.getMaxScrollLeft = function () {
        return this.getScrollWidth() - this.getClientWidth();
    };
    ScrollController.prototype.canScrollVertically = function () {
        return this.getMaxScrollTop() > 0;
    };
    ScrollController.prototype.canScrollHorizontally = function () {
        return this.getMaxScrollLeft() > 0;
    };
    ScrollController.prototype.canScrollUp = function () {
        return this.getScrollTop() > 0;
    };
    ScrollController.prototype.canScrollDown = function () {
        return this.getScrollTop() < this.getMaxScrollTop();
    };
    ScrollController.prototype.canScrollLeft = function () {
        return this.getScrollLeft() > 0;
    };
    ScrollController.prototype.canScrollRight = function () {
        return this.getScrollLeft() < this.getMaxScrollLeft();
    };
    return ScrollController;
}());
export { ScrollController };
var ElementScrollController = /** @class */ (function (_super) {
    __extends(ElementScrollController, _super);
    function ElementScrollController(el) {
        var _this = _super.call(this) || this;
        _this.el = el;
        return _this;
    }
    ElementScrollController.prototype.getScrollTop = function () {
        return this.el.scrollTop;
    };
    ElementScrollController.prototype.getScrollLeft = function () {
        return this.el.scrollLeft;
    };
    ElementScrollController.prototype.setScrollTop = function (top) {
        this.el.scrollTop = top;
    };
    ElementScrollController.prototype.setScrollLeft = function (left) {
        this.el.scrollLeft = left;
    };
    ElementScrollController.prototype.getScrollWidth = function () {
        return this.el.scrollWidth;
    };
    ElementScrollController.prototype.getScrollHeight = function () {
        return this.el.scrollHeight;
    };
    ElementScrollController.prototype.getClientHeight = function () {
        return this.el.clientHeight;
    };
    ElementScrollController.prototype.getClientWidth = function () {
        return this.el.clientWidth;
    };
    return ElementScrollController;
}(ScrollController));
export { ElementScrollController };
var WindowScrollController = /** @class */ (function (_super) {
    __extends(WindowScrollController, _super);
    function WindowScrollController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WindowScrollController.prototype.getScrollTop = function () {
        return window.pageYOffset;
    };
    WindowScrollController.prototype.getScrollLeft = function () {
        return window.pageXOffset;
    };
    WindowScrollController.prototype.setScrollTop = function (n) {
        window.scroll(window.pageXOffset, n);
    };
    WindowScrollController.prototype.setScrollLeft = function (n) {
        window.scroll(n, window.pageYOffset);
    };
    WindowScrollController.prototype.getScrollWidth = function () {
        return document.documentElement.scrollWidth;
    };
    WindowScrollController.prototype.getScrollHeight = function () {
        return document.documentElement.scrollHeight;
    };
    WindowScrollController.prototype.getClientHeight = function () {
        return document.documentElement.clientHeight;
    };
    WindowScrollController.prototype.getClientWidth = function () {
        return document.documentElement.clientWidth;
    };
    return WindowScrollController;
}(ScrollController));
export { WindowScrollController };
//# sourceMappingURL=scroll-controller.js.map