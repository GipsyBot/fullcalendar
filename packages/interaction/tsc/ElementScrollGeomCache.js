import { __extends } from "tslib";
import { computeInnerRect, ElementScrollController } from '@fullcalendar/common';
import { ScrollGeomCache } from './ScrollGeomCache';
var ElementScrollGeomCache = /** @class */ (function (_super) {
    __extends(ElementScrollGeomCache, _super);
    function ElementScrollGeomCache(el, doesListening) {
        return _super.call(this, new ElementScrollController(el), doesListening) || this;
    }
    ElementScrollGeomCache.prototype.getEventTarget = function () {
        return this.scrollController.el;
    };
    ElementScrollGeomCache.prototype.computeClientRect = function () {
        return computeInnerRect(this.scrollController.el);
    };
    return ElementScrollGeomCache;
}(ScrollGeomCache));
export { ElementScrollGeomCache };
//# sourceMappingURL=ElementScrollGeomCache.js.map