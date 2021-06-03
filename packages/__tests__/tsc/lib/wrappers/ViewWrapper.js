var ViewWrapper = /** @class */ (function () {
    function ViewWrapper(calendar, className) {
        var viewEl = calendar.el.querySelector('.fc-view');
        if (!viewEl || !viewEl.classList.contains(className)) {
            throw new Error("Can't find view with className '" + className + "' in test model");
        }
        this.el = viewEl;
    }
    return ViewWrapper;
}());
export { ViewWrapper };
//# sourceMappingURL=ViewWrapper.js.map