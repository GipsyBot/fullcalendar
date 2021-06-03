import { config, elementClosest, Emitter } from '@fullcalendar/common';
config.touchMouseIgnoreWait = 500;
var ignoreMouseDepth = 0;
var listenerCnt = 0;
var isWindowTouchMoveCancelled = false;
/*
Uses a "pointer" abstraction, which monitors UI events for both mouse and touch.
Tracks when the pointer "drags" on a certain element, meaning down+move+up.

Also, tracks if there was touch-scrolling.
Also, can prevent touch-scrolling from happening.
Also, can fire pointermove events when scrolling happens underneath, even when no real pointer movement.

emits:
- pointerdown
- pointermove
- pointerup
*/
var PointerDragging = /** @class */ (function () {
    function PointerDragging(containerEl) {
        var _this = this;
        this.subjectEl = null;
        // options that can be directly assigned by caller
        this.selector = ''; // will cause subjectEl in all emitted events to be this element
        this.handleSelector = '';
        this.shouldIgnoreMove = false;
        this.shouldWatchScroll = true; // for simulating pointermove on scroll
        // internal states
        this.isDragging = false;
        this.isTouchDragging = false;
        this.wasTouchScroll = false;
        // Mouse
        // ----------------------------------------------------------------------------------------------------
        this.handleMouseDown = function (ev) {
            if (!_this.shouldIgnoreMouse() &&
                isPrimaryMouseButton(ev) &&
                _this.tryStart(ev)) {
                var pev = _this.createEventFromMouse(ev, true);
                _this.emitter.trigger('pointerdown', pev);
                _this.initScrollWatch(pev);
                if (!_this.shouldIgnoreMove) {
                    document.addEventListener('mousemove', _this.handleMouseMove);
                }
                document.addEventListener('mouseup', _this.handleMouseUp);
            }
        };
        this.handleMouseMove = function (ev) {
            var pev = _this.createEventFromMouse(ev);
            _this.recordCoords(pev);
            _this.emitter.trigger('pointermove', pev);
        };
        this.handleMouseUp = function (ev) {
            document.removeEventListener('mousemove', _this.handleMouseMove);
            document.removeEventListener('mouseup', _this.handleMouseUp);
            _this.emitter.trigger('pointerup', _this.createEventFromMouse(ev));
            _this.cleanup(); // call last so that pointerup has access to props
        };
        // Touch
        // ----------------------------------------------------------------------------------------------------
        this.handleTouchStart = function (ev) {
            if (_this.tryStart(ev)) {
                _this.isTouchDragging = true;
                var pev = _this.createEventFromTouch(ev, true);
                _this.emitter.trigger('pointerdown', pev);
                _this.initScrollWatch(pev);
                // unlike mouse, need to attach to target, not document
                // https://stackoverflow.com/a/45760014
                var targetEl = ev.target;
                if (!_this.shouldIgnoreMove) {
                    targetEl.addEventListener('touchmove', _this.handleTouchMove);
                }
                targetEl.addEventListener('touchend', _this.handleTouchEnd);
                targetEl.addEventListener('touchcancel', _this.handleTouchEnd); // treat it as a touch end
                // attach a handler to get called when ANY scroll action happens on the page.
                // this was impossible to do with normal on/off because 'scroll' doesn't bubble.
                // http://stackoverflow.com/a/32954565/96342
                window.addEventListener('scroll', _this.handleTouchScroll, true);
            }
        };
        this.handleTouchMove = function (ev) {
            var pev = _this.createEventFromTouch(ev);
            _this.recordCoords(pev);
            _this.emitter.trigger('pointermove', pev);
        };
        this.handleTouchEnd = function (ev) {
            if (_this.isDragging) { // done to guard against touchend followed by touchcancel
                var targetEl = ev.target;
                targetEl.removeEventListener('touchmove', _this.handleTouchMove);
                targetEl.removeEventListener('touchend', _this.handleTouchEnd);
                targetEl.removeEventListener('touchcancel', _this.handleTouchEnd);
                window.removeEventListener('scroll', _this.handleTouchScroll, true); // useCaptured=true
                _this.emitter.trigger('pointerup', _this.createEventFromTouch(ev));
                _this.cleanup(); // call last so that pointerup has access to props
                _this.isTouchDragging = false;
                startIgnoringMouse();
            }
        };
        this.handleTouchScroll = function () {
            _this.wasTouchScroll = true;
        };
        this.handleScroll = function (ev) {
            if (!_this.shouldIgnoreMove) {
                var pageX = (window.pageXOffset - _this.prevScrollX) + _this.prevPageX;
                var pageY = (window.pageYOffset - _this.prevScrollY) + _this.prevPageY;
                _this.emitter.trigger('pointermove', {
                    origEvent: ev,
                    isTouch: _this.isTouchDragging,
                    subjectEl: _this.subjectEl,
                    pageX: pageX,
                    pageY: pageY,
                    deltaX: pageX - _this.origPageX,
                    deltaY: pageY - _this.origPageY,
                });
            }
        };
        this.containerEl = containerEl;
        this.emitter = new Emitter();
        containerEl.addEventListener('mousedown', this.handleMouseDown);
        containerEl.addEventListener('touchstart', this.handleTouchStart, { passive: true });
        listenerCreated();
    }
    PointerDragging.prototype.destroy = function () {
        this.containerEl.removeEventListener('mousedown', this.handleMouseDown);
        this.containerEl.removeEventListener('touchstart', this.handleTouchStart, { passive: true });
        listenerDestroyed();
    };
    PointerDragging.prototype.tryStart = function (ev) {
        var subjectEl = this.querySubjectEl(ev);
        var downEl = ev.target;
        if (subjectEl &&
            (!this.handleSelector || elementClosest(downEl, this.handleSelector))) {
            this.subjectEl = subjectEl;
            this.isDragging = true; // do this first so cancelTouchScroll will work
            this.wasTouchScroll = false;
            return true;
        }
        return false;
    };
    PointerDragging.prototype.cleanup = function () {
        isWindowTouchMoveCancelled = false;
        this.isDragging = false;
        this.subjectEl = null;
        // keep wasTouchScroll around for later access
        this.destroyScrollWatch();
    };
    PointerDragging.prototype.querySubjectEl = function (ev) {
        if (this.selector) {
            return elementClosest(ev.target, this.selector);
        }
        return this.containerEl;
    };
    PointerDragging.prototype.shouldIgnoreMouse = function () {
        return ignoreMouseDepth || this.isTouchDragging;
    };
    // can be called by user of this class, to cancel touch-based scrolling for the current drag
    PointerDragging.prototype.cancelTouchScroll = function () {
        if (this.isDragging) {
            isWindowTouchMoveCancelled = true;
        }
    };
    // Scrolling that simulates pointermoves
    // ----------------------------------------------------------------------------------------------------
    PointerDragging.prototype.initScrollWatch = function (ev) {
        if (this.shouldWatchScroll) {
            this.recordCoords(ev);
            window.addEventListener('scroll', this.handleScroll, true); // useCapture=true
        }
    };
    PointerDragging.prototype.recordCoords = function (ev) {
        if (this.shouldWatchScroll) {
            this.prevPageX = ev.pageX;
            this.prevPageY = ev.pageY;
            this.prevScrollX = window.pageXOffset;
            this.prevScrollY = window.pageYOffset;
        }
    };
    PointerDragging.prototype.destroyScrollWatch = function () {
        if (this.shouldWatchScroll) {
            window.removeEventListener('scroll', this.handleScroll, true); // useCaptured=true
        }
    };
    // Event Normalization
    // ----------------------------------------------------------------------------------------------------
    PointerDragging.prototype.createEventFromMouse = function (ev, isFirst) {
        var deltaX = 0;
        var deltaY = 0;
        // TODO: repeat code
        if (isFirst) {
            this.origPageX = ev.pageX;
            this.origPageY = ev.pageY;
        }
        else {
            deltaX = ev.pageX - this.origPageX;
            deltaY = ev.pageY - this.origPageY;
        }
        return {
            origEvent: ev,
            isTouch: false,
            subjectEl: this.subjectEl,
            pageX: ev.pageX,
            pageY: ev.pageY,
            deltaX: deltaX,
            deltaY: deltaY,
        };
    };
    PointerDragging.prototype.createEventFromTouch = function (ev, isFirst) {
        var touches = ev.touches;
        var pageX;
        var pageY;
        var deltaX = 0;
        var deltaY = 0;
        // if touch coords available, prefer,
        // because FF would give bad ev.pageX ev.pageY
        if (touches && touches.length) {
            pageX = touches[0].pageX;
            pageY = touches[0].pageY;
        }
        else {
            pageX = ev.pageX;
            pageY = ev.pageY;
        }
        // TODO: repeat code
        if (isFirst) {
            this.origPageX = pageX;
            this.origPageY = pageY;
        }
        else {
            deltaX = pageX - this.origPageX;
            deltaY = pageY - this.origPageY;
        }
        return {
            origEvent: ev,
            isTouch: true,
            subjectEl: this.subjectEl,
            pageX: pageX,
            pageY: pageY,
            deltaX: deltaX,
            deltaY: deltaY,
        };
    };
    return PointerDragging;
}());
export { PointerDragging };
// Returns a boolean whether this was a left mouse click and no ctrl key (which means right click on Mac)
function isPrimaryMouseButton(ev) {
    return ev.button === 0 && !ev.ctrlKey;
}
// Ignoring fake mouse events generated by touch
// ----------------------------------------------------------------------------------------------------
function startIgnoringMouse() {
    ignoreMouseDepth += 1;
    setTimeout(function () {
        ignoreMouseDepth -= 1;
    }, config.touchMouseIgnoreWait);
}
// We want to attach touchmove as early as possible for Safari
// ----------------------------------------------------------------------------------------------------
function listenerCreated() {
    listenerCnt += 1;
    if (listenerCnt === 1) {
        window.addEventListener('touchmove', onWindowTouchMove, { passive: false });
    }
}
function listenerDestroyed() {
    listenerCnt -= 1;
    if (!listenerCnt) {
        window.removeEventListener('touchmove', onWindowTouchMove, { passive: false });
    }
}
function onWindowTouchMove(ev) {
    if (isWindowTouchMoveCancelled) {
        ev.preventDefault();
    }
}
//# sourceMappingURL=PointerDragging.js.map