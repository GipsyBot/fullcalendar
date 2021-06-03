import { Seg } from '../component/DateComponent';
import { ComponentChildren, createElement, Ref, RefObject } from '../vdom';
import { EventContentArg } from '../component/event-rendering';
import { BaseComponent } from '../vdom-util';
export interface MinimalEventProps {
    seg: Seg;
    isDragging: boolean;
    isResizing: boolean;
    isDateSelecting: boolean;
    isSelected: boolean;
    isPast: boolean;
    isFuture: boolean;
    isToday: boolean;
}
export interface EventRootProps extends MinimalEventProps {
    timeText: string;
    disableDragging?: boolean;
    disableResizing?: boolean;
    defaultContent: (hookProps: EventContentArg) => ComponentChildren;
    children: (rootElRef: Ref<any>, classNames: string[], innerElRef: Ref<any>, innerContent: ComponentChildren, hookProps: EventContentArg) => ComponentChildren;
}
export declare class EventRoot extends BaseComponent<EventRootProps> {
    elRef: RefObject<HTMLElement>;
    render(): createElement.JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: EventRootProps): void;
}
//# sourceMappingURL=EventRoot.d.ts.map