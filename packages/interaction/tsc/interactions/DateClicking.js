import { __assign, __extends } from "tslib";
import { Interaction, interactionSettingsToStore, } from '@fullcalendar/common';
import { FeaturefulElementDragging } from '../dnd/FeaturefulElementDragging';
import { HitDragging, isHitsEqual } from './HitDragging';
import { buildDatePointApiWithContext } from '../utils';
/*
Monitors when the user clicks on a specific date/time of a component.
A pointerdown+pointerup on the same "hit" constitutes a click.
*/
var DateClicking = /** @class */ (function (_super) {
    __extends(DateClicking, _super);
    function DateClicking(settings) {
        var _this = _super.call(this, settings) || this;
        _this.handlePointerDown = function (pev) {
            var dragging = _this.dragging;
            var downEl = pev.origEvent.target;
            // do this in pointerdown (not dragend) because DOM might be mutated by the time dragend is fired
            dragging.setIgnoreMove(!_this.component.isValidDateDownEl(downEl));
        };
        // won't even fire if moving was ignored
        _this.handleDragEnd = function (ev) {
            var component = _this.component;
            var pointer = _this.dragging.pointer;
            if (!pointer.wasTouchScroll) {
                var _a = _this.hitDragging, initialHit = _a.initialHit, finalHit = _a.finalHit;
                if (initialHit && finalHit && isHitsEqual(initialHit, finalHit)) {
                    var context = component.context;
                    var arg = __assign(__assign({}, buildDatePointApiWithContext(initialHit.dateSpan, context)), { dayEl: initialHit.dayEl, jsEvent: ev.origEvent, view: context.viewApi || context.calendarApi.view });
                    context.emitter.trigger('dateClick', arg);
                }
            }
        };
        // we DO want to watch pointer moves because otherwise finalHit won't get populated
        _this.dragging = new FeaturefulElementDragging(settings.el);
        _this.dragging.autoScroller.isEnabled = false;
        var hitDragging = _this.hitDragging = new HitDragging(_this.dragging, interactionSettingsToStore(settings));
        hitDragging.emitter.on('pointerdown', _this.handlePointerDown);
        hitDragging.emitter.on('dragend', _this.handleDragEnd);
        return _this;
    }
    DateClicking.prototype.destroy = function () {
        this.dragging.destroy();
    };
    return DateClicking;
}(Interaction));
export { DateClicking };
//# sourceMappingURL=DateClicking.js.map