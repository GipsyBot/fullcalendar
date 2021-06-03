import { Emitter, isDateSpansEqual, computeRect, constrainPoint, intersectRects, getRectCenter, diffPoints, rangeContainsRange, mapHash, } from '@fullcalendar/common';
import { OffsetTracker } from '../OffsetTracker';
/*
Tracks movement over multiple droppable areas (aka "hits")
that exist in one or more DateComponents.
Relies on an existing draggable.

emits:
- pointerdown
- dragstart
- hitchange - fires initially, even if not over a hit
- pointerup
- (hitchange - again, to null, if ended over a hit)
- dragend
*/
var HitDragging = /** @class */ (function () {
    function HitDragging(dragging, droppableStore) {
        var _this = this;
        // options that can be set by caller
        this.useSubjectCenter = false;
        this.requireInitial = true; // if doesn't start out on a hit, won't emit any events
        this.initialHit = null;
        this.movingHit = null;
        this.finalHit = null; // won't ever be populated if shouldIgnoreMove
        this.handlePointerDown = function (ev) {
            var dragging = _this.dragging;
            _this.initialHit = null;
            _this.movingHit = null;
            _this.finalHit = null;
            _this.prepareHits();
            _this.processFirstCoord(ev);
            if (_this.initialHit || !_this.requireInitial) {
                dragging.setIgnoreMove(false);
                // TODO: fire this before computing processFirstCoord, so listeners can cancel. this gets fired by almost every handler :(
                _this.emitter.trigger('pointerdown', ev);
            }
            else {
                dragging.setIgnoreMove(true);
            }
        };
        this.handleDragStart = function (ev) {
            _this.emitter.trigger('dragstart', ev);
            _this.handleMove(ev, true); // force = fire even if initially null
        };
        this.handleDragMove = function (ev) {
            _this.emitter.trigger('dragmove', ev);
            _this.handleMove(ev);
        };
        this.handlePointerUp = function (ev) {
            _this.releaseHits();
            _this.emitter.trigger('pointerup', ev);
        };
        this.handleDragEnd = function (ev) {
            if (_this.movingHit) {
                _this.emitter.trigger('hitupdate', null, true, ev);
            }
            _this.finalHit = _this.movingHit;
            _this.movingHit = null;
            _this.emitter.trigger('dragend', ev);
        };
        this.droppableStore = droppableStore;
        dragging.emitter.on('pointerdown', this.handlePointerDown);
        dragging.emitter.on('dragstart', this.handleDragStart);
        dragging.emitter.on('dragmove', this.handleDragMove);
        dragging.emitter.on('pointerup', this.handlePointerUp);
        dragging.emitter.on('dragend', this.handleDragEnd);
        this.dragging = dragging;
        this.emitter = new Emitter();
    }
    // sets initialHit
    // sets coordAdjust
    HitDragging.prototype.processFirstCoord = function (ev) {
        var origPoint = { left: ev.pageX, top: ev.pageY };
        var adjustedPoint = origPoint;
        var subjectEl = ev.subjectEl;
        var subjectRect;
        if (subjectEl !== document) {
            subjectRect = computeRect(subjectEl);
            adjustedPoint = constrainPoint(adjustedPoint, subjectRect);
        }
        var initialHit = this.initialHit = this.queryHitForOffset(adjustedPoint.left, adjustedPoint.top);
        if (initialHit) {
            if (this.useSubjectCenter && subjectRect) {
                var slicedSubjectRect = intersectRects(subjectRect, initialHit.rect);
                if (slicedSubjectRect) {
                    adjustedPoint = getRectCenter(slicedSubjectRect);
                }
            }
            this.coordAdjust = diffPoints(adjustedPoint, origPoint);
        }
        else {
            this.coordAdjust = { left: 0, top: 0 };
        }
    };
    HitDragging.prototype.handleMove = function (ev, forceHandle) {
        var hit = this.queryHitForOffset(ev.pageX + this.coordAdjust.left, ev.pageY + this.coordAdjust.top);
        if (forceHandle || !isHitsEqual(this.movingHit, hit)) {
            this.movingHit = hit;
            this.emitter.trigger('hitupdate', hit, false, ev);
        }
    };
    HitDragging.prototype.prepareHits = function () {
        this.offsetTrackers = mapHash(this.droppableStore, function (interactionSettings) {
            interactionSettings.component.prepareHits();
            return new OffsetTracker(interactionSettings.el);
        });
    };
    HitDragging.prototype.releaseHits = function () {
        var offsetTrackers = this.offsetTrackers;
        for (var id in offsetTrackers) {
            offsetTrackers[id].destroy();
        }
        this.offsetTrackers = {};
    };
    HitDragging.prototype.queryHitForOffset = function (offsetLeft, offsetTop) {
        var _a = this, droppableStore = _a.droppableStore, offsetTrackers = _a.offsetTrackers;
        var bestHit = null;
        for (var id in droppableStore) {
            var component = droppableStore[id].component;
            var offsetTracker = offsetTrackers[id];
            if (offsetTracker && // wasn't destroyed mid-drag
                offsetTracker.isWithinClipping(offsetLeft, offsetTop)) {
                var originLeft = offsetTracker.computeLeft();
                var originTop = offsetTracker.computeTop();
                var positionLeft = offsetLeft - originLeft;
                var positionTop = offsetTop - originTop;
                var origRect = offsetTracker.origRect;
                var width = origRect.right - origRect.left;
                var height = origRect.bottom - origRect.top;
                if (
                // must be within the element's bounds
                positionLeft >= 0 && positionLeft < width &&
                    positionTop >= 0 && positionTop < height) {
                    var hit = component.queryHit(positionLeft, positionTop, width, height);
                    if (hit && (
                    // make sure the hit is within activeRange, meaning it's not a dead cell
                    rangeContainsRange(hit.dateProfile.activeRange, hit.dateSpan.range)) &&
                        (!bestHit || hit.layer > bestHit.layer)) {
                        hit.componentId = id;
                        hit.context = component.context;
                        // TODO: better way to re-orient rectangle
                        hit.rect.left += originLeft;
                        hit.rect.right += originLeft;
                        hit.rect.top += originTop;
                        hit.rect.bottom += originTop;
                        bestHit = hit;
                    }
                }
            }
        }
        return bestHit;
    };
    return HitDragging;
}());
export { HitDragging };
export function isHitsEqual(hit0, hit1) {
    if (!hit0 && !hit1) {
        return true;
    }
    if (Boolean(hit0) !== Boolean(hit1)) {
        return false;
    }
    return isDateSpansEqual(hit0.dateSpan, hit1.dateSpan);
}
//# sourceMappingURL=HitDragging.js.map