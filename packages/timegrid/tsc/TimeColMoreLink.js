import { __extends } from "tslib";
import { createElement, MoreLinkRoot, BaseComponent, createRef, setRef, } from '@fullcalendar/common';
import { renderPlainFgSegs } from './TimeCol';
var TimeColMoreLink = /** @class */ (function (_super) {
    __extends(TimeColMoreLink, _super);
    function TimeColMoreLink() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rootElRef = createRef();
        return _this;
    }
    TimeColMoreLink.prototype.render = function () {
        var _this = this;
        var props = this.props;
        return (createElement(MoreLinkRoot, { allDayDate: null, moreCnt: props.hiddenSegs.length, allSegs: props.hiddenSegs, hiddenSegs: props.hiddenSegs, alignmentElRef: this.rootElRef, defaultContent: renderMoreLinkInner, extraDateSpan: props.extraDateSpan, dateProfile: props.dateProfile, todayRange: props.todayRange, popoverContent: function () { return renderPlainFgSegs(props.hiddenSegs, props); } }, function (rootElRef, classNames, innerElRef, innerContent, handleClick) { return (createElement("a", { ref: function (el) {
                setRef(rootElRef, el);
                setRef(_this.rootElRef, el);
            }, className: ['fc-timegrid-more-link'].concat(classNames).join(' '), style: { top: props.top, bottom: props.bottom }, onClick: handleClick },
            createElement("div", { ref: innerElRef, className: "fc-timegrid-more-link-inner fc-sticky" }, innerContent))); }));
    };
    return TimeColMoreLink;
}(BaseComponent));
export { TimeColMoreLink };
function renderMoreLinkInner(props) {
    return props.shortText;
}
//# sourceMappingURL=TimeColMoreLink.js.map