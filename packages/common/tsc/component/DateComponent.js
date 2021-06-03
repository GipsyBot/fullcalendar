import { __extends } from "tslib";
import { BaseComponent } from '../vdom-util';
import { elementClosest } from '../util/dom-manip';
import { guid } from '../util/misc';
/*
an INTERACTABLE date component

PURPOSES:
- hook up to fg, fill, and mirror renderers
- interface for dragging and hits
*/
var DateComponent = /** @class */ (function (_super) {
    __extends(DateComponent, _super);
    function DateComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.uid = guid();
        return _this;
    }
    // Hit System
    // -----------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.prepareHits = function () {
    };
    DateComponent.prototype.queryHit = function (positionLeft, positionTop, elWidth, elHeight) {
        return null; // this should be abstract
    };
    // Pointer Interaction Utils
    // -----------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.isValidSegDownEl = function (el) {
        return !this.props.eventDrag && // HACK
            !this.props.eventResize && // HACK
            !elementClosest(el, '.fc-event-mirror');
    };
    DateComponent.prototype.isValidDateDownEl = function (el) {
        return !elementClosest(el, '.fc-event:not(.fc-bg-event)') &&
            !elementClosest(el, '.fc-more-link') && // a "more.." link
            !elementClosest(el, 'a[data-navlink]') && // a clickable nav link
            !elementClosest(el, '.fc-popover'); // hack
    };
    return DateComponent;
}(BaseComponent));
export { DateComponent };
//# sourceMappingURL=DateComponent.js.map