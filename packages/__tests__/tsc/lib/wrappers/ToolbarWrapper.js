var ToolbarWrapper = /** @class */ (function () {
    function ToolbarWrapper(el) {
        this.el = el;
    }
    ToolbarWrapper.prototype.getButtonEnabled = function (name) {
        var buttonEl = this.el.querySelector('.fc-' + name + '-button');
        return buttonEl && !buttonEl.disabled;
    };
    ToolbarWrapper.prototype.getButtonInfo = function (name, iconPrefix) {
        if (iconPrefix === void 0) { iconPrefix = 'fc-icon'; }
        var el = this.getButtonEl(name);
        if (el) {
            var iconEl = el.querySelector("." + iconPrefix);
            var iconNameMatch = iconEl && iconEl.className.match(new RegExp(iconPrefix + "-([^ ]+)"));
            return {
                text: $(el).text(),
                iconEl: iconEl,
                iconName: iconNameMatch ? iconNameMatch[1] : '',
            };
        }
        return null;
    };
    ToolbarWrapper.prototype.getButtonEl = function (name) {
        return this.el.querySelector(".fc-" + name + "-button");
    };
    ToolbarWrapper.prototype.getTitleText = function () {
        return this.el.querySelector('.fc-toolbar-title').innerText.trim();
    };
    ToolbarWrapper.prototype.getSectionContent = function (index) {
        return processSectionItems(this.el.querySelectorAll('.fc-toolbar-chunk')[index]);
    };
    return ToolbarWrapper;
}());
export { ToolbarWrapper };
function processSectionItems(sectionEl) {
    var children = Array.prototype.slice.call(sectionEl.children);
    return children.map(function (childEl) {
        if (childEl.classList.contains('fc-button')) {
            return {
                type: 'button',
                name: childEl.className.match(/fc-(\w+)-button/)[1],
            };
        }
        if (childEl.classList.contains('fc-button-group')) {
            return {
                type: 'button-group',
                children: processSectionItems(childEl),
            };
        }
        if (childEl.nodeName === 'H2') {
            return {
                type: 'title',
            };
        }
        throw new Error('Unknown type of content in toolbar');
    });
}
//# sourceMappingURL=ToolbarWrapper.js.map