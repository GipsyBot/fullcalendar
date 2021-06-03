import { ComponentChildren, createElement } from '../vdom';
import { BaseComponent } from '../vdom-util';
import { EventContentArg } from '../component/event-rendering';
import { MinimalEventProps } from './EventRoot';
import { DateFormatter } from '../datelib/DateFormatter';
export interface StandardEventProps extends MinimalEventProps {
    extraClassNames: string[];
    defaultTimeFormat: DateFormatter;
    defaultDisplayEventTime?: boolean;
    defaultDisplayEventEnd?: boolean;
    disableDragging?: boolean;
    disableResizing?: boolean;
    defaultContent?: (hookProps: EventContentArg) => ComponentChildren;
}
export declare class StandardEvent extends BaseComponent<StandardEventProps> {
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=StandardEvent.d.ts.map