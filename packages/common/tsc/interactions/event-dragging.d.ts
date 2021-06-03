import { EventMutation } from '../structs/event-mutation';
import { Hit } from './hit';
import { EventDef } from '../structs/event-def';
import { EventUi } from '../component/event-ui';
import { CalendarContext } from '../CalendarContext';
import { Dictionary } from '../options';
export declare type eventDragMutationMassager = (mutation: EventMutation, hit0: Hit, hit1: Hit) => void;
export declare type EventDropTransformers = (mutation: EventMutation, context: CalendarContext) => Dictionary;
export declare type eventIsDraggableTransformer = (val: boolean, eventDef: EventDef, eventUi: EventUi, context: CalendarContext) => boolean;
//# sourceMappingURL=event-dragging.d.ts.map