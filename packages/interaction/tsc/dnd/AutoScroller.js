import { ElementScrollGeomCache } from '../ElementScrollGeomCache';
import { WindowScrollGeomCache } from '../WindowScrollGeomCache';
// If available we are using native "performance" API instead of "Date"
// Read more about it on MDN:
// https://developer.mozilla.org/en-US/docs/Web/API/Performance
var getTime = typeof performance === 'function' ? performance.now : Date.now;
/*
For a pointer interaction, automatically scrolls certain scroll containers when the pointer
approaches the edge.

The caller must call start + handleMove + stop.
*/
var AutoScroller = /** @class */ (function () {
    function AutoScroller() {
        var _this = this;
        // options that can be set by caller
        this.isEnabled = true;
        this.scrollQuery = [window, '.fc-scroller'];
        this.edgeThreshold = 50; // pixels
        this.maxVelocity = 300; // pixels per second
        // internal state
        this.pointerScreenX = null;
        this.pointerScreenY = null;
        this.isAnimating = false;
        this.scrollCaches = null;
        // protect against the initial pointerdown being too close to an edge and starting the scroll
        this.everMovedUp = false;
        this.everMovedDown = false;
        this.everMovedLeft = false;
        this.everMovedRight = false;
        this.animate = function () {
            if (_this.isAnimating) { // wasn't cancelled between animation calls
                var edge = _this.computeBestEdge(_this.pointerScreenX + window.pageXOffset, _this.pointerScreenY + window.pageYOffset);
                if (edge) {
                    var now = getTime();
                    _this.handleSide(edge, (now - _this.msSinceRequest) / 1000);
                    _this.requestAnimation(now);
                }
                else {
                    _this.isAnimating = false; // will stop animation
                }
            }
        };
    }
    AutoScroller.prototype.start = function (pageX, pageY) {
        if (this.isEnabled) {
            this.scrollCaches = this.buildCaches();
            this.pointerScreenX = null;
            this.pointerScreenY = null;
            this.everMovedUp = false;
            this.everMovedDown = false;
            this.everMovedLeft = false;
            this.everMovedRight = false;
            this.handleMove(pageX, pageY);
        }
    };
    AutoScroller.prototype.handleMove = function (pageX, pageY) {
        if (this.isEnabled) {
            var pointerScreenX = pageX - window.pageXOffset;
            var pointerScreenY = pageY - window.pageYOffset;
            var yDelta = this.pointerScreenY === null ? 0 : pointerScreenY - this.pointerScreenY;
            var xDelta = this.pointerScreenX === null ? 0 : pointerScreenX - this.pointerScreenX;
            if (yDelta < 0) {
                this.everMovedUp = true;
            }
            else if (yDelta > 0) {
                this.everMovedDown = true;
            }
            if (xDelta < 0) {
                this.everMovedLeft = true;
            }
            else if (xDelta > 0) {
                this.everMovedRight = true;
            }
            this.pointerScreenX = pointerScreenX;
            this.pointerScreenY = pointerScreenY;
            if (!this.isAnimating) {
                this.isAnimating = true;
                this.requestAnimation(getTime());
            }
        }
    };
    AutoScroller.prototype.stop = function () {
        if (this.isEnabled) {
            this.isAnimating = false; // will stop animation
            for (var _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
                var scrollCache = _a[_i];
                scrollCache.destroy();
            }
            this.scrollCaches = null;
        }
    };
    AutoScroller.prototype.requestAnimation = function (now) {
        this.msSinceRequest = now;
        requestAnimationFrame(this.animate);
    };
    AutoScroller.prototype.handleSide = function (edge, seconds) {
        var scrollCache = edge.scrollCache;
        var edgeThreshold = this.edgeThreshold;
        var invDistance = edgeThreshold - edge.distance;
        var velocity = // the closer to the edge, the faster we scroll
         ((invDistance * invDistance) / (edgeThreshold * edgeThreshold)) * // quadratic
            this.maxVelocity * seconds;
        var sign = 1;
        switch (edge.name) {
            case 'left':
                sign = -1;
            // falls through
            case 'right':
                scrollCache.setScrollLeft(scrollCache.getScrollLeft() + velocity * sign);
                break;
            case 'top':
                sign = -1;
            // falls through
            case 'bottom':
                scrollCache.setScrollTop(scrollCache.getScrollTop() + velocity * sign);
                break;
        }
    };
    // left/top are relative to document topleft
    AutoScroller.prototype.computeBestEdge = function (left, top) {
        var edgeThreshold = this.edgeThreshold;
        var bestSide = null;
        for (var _i = 0, _a = this.scrollCaches; _i < _a.length; _i++) {
            var scrollCache = _a[_i];
            var rect = scrollCache.clientRect;
            var leftDist = left - rect.left;
            var rightDist = rect.right - left;
            var topDist = top - rect.top;
            var bottomDist = rect.bottom - top;
            // completely within the rect?
            if (leftDist >= 0 && rightDist >= 0 && topDist >= 0 && bottomDist >= 0) {
                if (topDist <= edgeThreshold && this.everMovedUp && scrollCache.canScrollUp() &&
                    (!bestSide || bestSide.distance > topDist)) {
                    bestSide = { scrollCache: scrollCache, name: 'top', distance: topDist };
                }
                if (bottomDist <= edgeThreshold && this.everMovedDown && scrollCache.canScrollDown() &&
                    (!bestSide || bestSide.distance > bottomDist)) {
                    bestSide = { scrollCache: scrollCache, name: 'bottom', distance: bottomDist };
                }
                if (leftDist <= edgeThreshold && this.everMovedLeft && scrollCache.canScrollLeft() &&
                    (!bestSide || bestSide.distance > leftDist)) {
                    bestSide = { scrollCache: scrollCache, name: 'left', distance: leftDist };
                }
                if (rightDist <= edgeThreshold && this.everMovedRight && scrollCache.canScrollRight() &&
                    (!bestSide || bestSide.distance > rightDist)) {
                    bestSide = { scrollCache: scrollCache, name: 'right', distance: rightDist };
                }
            }
        }
        return bestSide;
    };
    AutoScroller.prototype.buildCaches = function () {
        return this.queryScrollEls().map(function (el) {
            if (el === window) {
                return new WindowScrollGeomCache(false); // false = don't listen to user-generated scrolls
            }
            return new ElementScrollGeomCache(el, false); // false = don't listen to user-generated scrolls
        });
    };
    AutoScroller.prototype.queryScrollEls = function () {
        var els = [];
        for (var _i = 0, _a = this.scrollQuery; _i < _a.length; _i++) {
            var query = _a[_i];
            if (typeof query === 'object') {
                els.push(query);
            }
            else {
                els.push.apply(els, Array.prototype.slice.call(document.querySelectorAll(query)));
            }
        }
        return els;
    };
    return AutoScroller;
}());
export { AutoScroller };
//# sourceMappingURL=AutoScroller.js.map