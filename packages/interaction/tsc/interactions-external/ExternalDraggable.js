import { BASE_OPTION_DEFAULTS } from '@fullcalendar/common';
import { FeaturefulElementDragging } from '../dnd/FeaturefulElementDragging';
import { ExternalElementDragging } from './ExternalElementDragging';
/*
Makes an element (that is *external* to any calendar) draggable.
Can pass in data that determines how an event will be created when dropped onto a calendar.
Leverages FullCalendar's internal drag-n-drop functionality WITHOUT a third-party drag system.
*/
var ExternalDraggable = /** @class */ (function () {
    function ExternalDraggable(el, settings) {
        var _this = this;
        if (settings === void 0) { settings = {}; }
        this.handlePointerDown = function (ev) {
            var dragging = _this.dragging;
            var _a = _this.settings, minDistance = _a.minDistance, longPressDelay = _a.longPressDelay;
            dragging.minDistance =
                minDistance != null ?
                    minDistance :
                    (ev.isTouch ? 0 : BASE_OPTION_DEFAULTS.eventDragMinDistance);
            dragging.delay =
                ev.isTouch ? // TODO: eventually read eventLongPressDelay instead vvv
                    (longPressDelay != null ? longPressDelay : BASE_OPTION_DEFAULTS.longPressDelay) :
                    0;
        };
        this.handleDragStart = function (ev) {
            if (ev.isTouch &&
                _this.dragging.delay &&
                ev.subjectEl.classList.contains('fc-event')) {
                _this.dragging.mirror.getMirrorEl().classList.add('fc-event-selected');
            }
        };
        this.settings = settings;
        var dragging = this.dragging = new FeaturefulElementDragging(el);
        dragging.touchScrollAllowed = false;
        if (settings.itemSelector != null) {
            dragging.pointer.selector = settings.itemSelector;
        }
        if (settings.appendTo != null) {
            dragging.mirror.parentNode = settings.appendTo; // TODO: write tests
        }
        dragging.emitter.on('pointerdown', this.handlePointerDown);
        dragging.emitter.on('dragstart', this.handleDragStart);
        new ExternalElementDragging(dragging, settings.eventData); // eslint-disable-line no-new
    }
    ExternalDraggable.prototype.destroy = function () {
        this.dragging.destroy();
    };
    return ExternalDraggable;
}());
export { ExternalDraggable };
//# sourceMappingURL=ExternalDraggable.js.map