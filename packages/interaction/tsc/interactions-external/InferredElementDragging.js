import { __extends } from "tslib";
import { ElementDragging } from '@fullcalendar/common';
import { PointerDragging } from '../dnd/PointerDragging';
/*
Detects when a *THIRD-PARTY* drag-n-drop system interacts with elements.
The third-party system is responsible for drawing the visuals effects of the drag.
This class simply monitors for pointer movements and fires events.
It also has the ability to hide the moving element (the "mirror") during the drag.
*/
var InferredElementDragging = /** @class */ (function (_super) {
    __extends(InferredElementDragging, _super);
    function InferredElementDragging(containerEl) {
        var _this = _super.call(this, containerEl) || this;
        _this.shouldIgnoreMove = false;
        _this.mirrorSelector = '';
        _this.currentMirrorEl = null;
        _this.handlePointerDown = function (ev) {
            _this.emitter.trigger('pointerdown', ev);
            if (!_this.shouldIgnoreMove) {
                // fire dragstart right away. does not support delay or min-distance
                _this.emitter.trigger('dragstart', ev);
            }
        };
        _this.handlePointerMove = function (ev) {
            if (!_this.shouldIgnoreMove) {
                _this.emitter.trigger('dragmove', ev);
            }
        };
        _this.handlePointerUp = function (ev) {
            _this.emitter.trigger('pointerup', ev);
            if (!_this.shouldIgnoreMove) {
                // fire dragend right away. does not support a revert animation
                _this.emitter.trigger('dragend', ev);
            }
        };
        var pointer = _this.pointer = new PointerDragging(containerEl);
        pointer.emitter.on('pointerdown', _this.handlePointerDown);
        pointer.emitter.on('pointermove', _this.handlePointerMove);
        pointer.emitter.on('pointerup', _this.handlePointerUp);
        return _this;
    }
    InferredElementDragging.prototype.destroy = function () {
        this.pointer.destroy();
    };
    InferredElementDragging.prototype.setIgnoreMove = function (bool) {
        this.shouldIgnoreMove = bool;
    };
    InferredElementDragging.prototype.setMirrorIsVisible = function (bool) {
        if (bool) {
            // restore a previously hidden element.
            // use the reference in case the selector class has already been removed.
            if (this.currentMirrorEl) {
                this.currentMirrorEl.style.visibility = '';
                this.currentMirrorEl = null;
            }
        }
        else {
            var mirrorEl = this.mirrorSelector ?
                document.querySelector(this.mirrorSelector) :
                null;
            if (mirrorEl) {
                this.currentMirrorEl = mirrorEl;
                mirrorEl.style.visibility = 'hidden';
            }
        }
    };
    return InferredElementDragging;
}(ElementDragging));
export { InferredElementDragging };
//# sourceMappingURL=InferredElementDragging.js.map