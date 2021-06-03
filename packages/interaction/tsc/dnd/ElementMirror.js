import { removeElement, applyStyle, whenTransitionDone } from '@fullcalendar/common';
/*
An effect in which an element follows the movement of a pointer across the screen.
The moving element is a clone of some other element.
Must call start + handleMove + stop.
*/
var ElementMirror = /** @class */ (function () {
    function ElementMirror() {
        this.isVisible = false; // must be explicitly enabled
        this.sourceEl = null;
        this.mirrorEl = null;
        this.sourceElRect = null; // screen coords relative to viewport
        // options that can be set directly by caller
        this.parentNode = document.body;
        this.zIndex = 9999;
        this.revertDuration = 0;
    }
    ElementMirror.prototype.start = function (sourceEl, pageX, pageY) {
        this.sourceEl = sourceEl;
        this.sourceElRect = this.sourceEl.getBoundingClientRect();
        this.origScreenX = pageX - window.pageXOffset;
        this.origScreenY = pageY - window.pageYOffset;
        this.deltaX = 0;
        this.deltaY = 0;
        this.updateElPosition();
    };
    ElementMirror.prototype.handleMove = function (pageX, pageY) {
        this.deltaX = (pageX - window.pageXOffset) - this.origScreenX;
        this.deltaY = (pageY - window.pageYOffset) - this.origScreenY;
        this.updateElPosition();
    };
    // can be called before start
    ElementMirror.prototype.setIsVisible = function (bool) {
        if (bool) {
            if (!this.isVisible) {
                if (this.mirrorEl) {
                    this.mirrorEl.style.display = '';
                }
                this.isVisible = bool; // needs to happen before updateElPosition
                this.updateElPosition(); // because was not updating the position while invisible
            }
        }
        else if (this.isVisible) {
            if (this.mirrorEl) {
                this.mirrorEl.style.display = 'none';
            }
            this.isVisible = bool;
        }
    };
    // always async
    ElementMirror.prototype.stop = function (needsRevertAnimation, callback) {
        var _this = this;
        var done = function () {
            _this.cleanup();
            callback();
        };
        if (needsRevertAnimation &&
            this.mirrorEl &&
            this.isVisible &&
            this.revertDuration && // if 0, transition won't work
            (this.deltaX || this.deltaY) // if same coords, transition won't work
        ) {
            this.doRevertAnimation(done, this.revertDuration);
        }
        else {
            setTimeout(done, 0);
        }
    };
    ElementMirror.prototype.doRevertAnimation = function (callback, revertDuration) {
        var mirrorEl = this.mirrorEl;
        var finalSourceElRect = this.sourceEl.getBoundingClientRect(); // because autoscrolling might have happened
        mirrorEl.style.transition =
            'top ' + revertDuration + 'ms,' +
                'left ' + revertDuration + 'ms';
        applyStyle(mirrorEl, {
            left: finalSourceElRect.left,
            top: finalSourceElRect.top,
        });
        whenTransitionDone(mirrorEl, function () {
            mirrorEl.style.transition = '';
            callback();
        });
    };
    ElementMirror.prototype.cleanup = function () {
        if (this.mirrorEl) {
            removeElement(this.mirrorEl);
            this.mirrorEl = null;
        }
        this.sourceEl = null;
    };
    ElementMirror.prototype.updateElPosition = function () {
        if (this.sourceEl && this.isVisible) {
            applyStyle(this.getMirrorEl(), {
                left: this.sourceElRect.left + this.deltaX,
                top: this.sourceElRect.top + this.deltaY,
            });
        }
    };
    ElementMirror.prototype.getMirrorEl = function () {
        var sourceElRect = this.sourceElRect;
        var mirrorEl = this.mirrorEl;
        if (!mirrorEl) {
            mirrorEl = this.mirrorEl = this.sourceEl.cloneNode(true); // cloneChildren=true
            // we don't want long taps or any mouse interaction causing selection/menus.
            // would use preventSelection(), but that prevents selectstart, causing problems.
            mirrorEl.classList.add('fc-unselectable');
            mirrorEl.classList.add('fc-event-dragging');
            applyStyle(mirrorEl, {
                position: 'fixed',
                zIndex: this.zIndex,
                visibility: '',
                boxSizing: 'border-box',
                width: sourceElRect.right - sourceElRect.left,
                height: sourceElRect.bottom - sourceElRect.top,
                right: 'auto',
                bottom: 'auto',
                margin: 0,
            });
            this.parentNode.appendChild(mirrorEl);
        }
        return mirrorEl;
    };
    return ElementMirror;
}());
export { ElementMirror };
//# sourceMappingURL=ElementMirror.js.map